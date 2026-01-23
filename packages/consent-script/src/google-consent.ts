import type { ConsentState } from './types';

export type GoogleConsentMode = 'advanced' | 'basic';

interface GoogleConsentSignals {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  wait_for_update?: number;
  ads_data_redaction?: boolean;
}

// Track if we've sent the default signal
let defaultSent = false;
let consentMode: GoogleConsentMode = 'advanced';

/**
 * Check if gtag function exists
 */
function hasGtag(): boolean {
  return typeof window !== 'undefined' && typeof (window as any).gtag === 'function';
}

/**
 * Call gtag with consent command
 */
function callGtag(command: 'default' | 'update', signals: GoogleConsentSignals): void {
  if (!hasGtag()) return;

  try {
    (window as any).gtag('consent', command, signals);
  } catch (e) {
    console.warn('[SafeBanner] Failed to send Google consent signal:', e);
  }
}

/**
 * Map SafeBanner consent state to Google Consent Mode v2 signals
 */
function mapToGoogleSignals(consent: ConsentState | null, mode: GoogleConsentMode): GoogleConsentSignals {
  const analyticsGranted = consent?.analytics ?? false;
  const marketingGranted = consent?.marketing ?? false;

  const signals: GoogleConsentSignals = {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: marketingGranted ? 'granted' : 'denied',
    ad_user_data: marketingGranted ? 'granted' : 'denied',
    ad_personalization: marketingGranted ? 'granted' : 'denied',
  };

  // In advanced mode, enable ads_data_redaction when marketing is denied
  // This allows Google to still receive pings for conversion modeling
  if (mode === 'advanced' && !marketingGranted) {
    signals.ads_data_redaction = true;
  }

  return signals;
}

/**
 * Initialize Google Consent Mode with default denied state.
 * MUST be called before any Google tags load.
 */
export function initGoogleConsent(mode: GoogleConsentMode = 'advanced'): void {
  consentMode = mode;

  // Warn if gtag doesn't exist yet (expected - tags should load after)
  // But also check if consent was already set (bad - means tags loaded first)
  if (hasGtag()) {
    // Check if dataLayer has consent commands already
    const dataLayer = (window as any).dataLayer;
    if (Array.isArray(dataLayer)) {
      const hasExistingConsent = dataLayer.some(
        (item: any) => Array.isArray(item) && item[0] === 'consent'
      );
      if (hasExistingConsent) {
        console.warn(
          '[SafeBanner] Google consent signals detected before SafeBanner initialized. ' +
          'Ensure SafeBanner script loads BEFORE Google tags for proper consent handling.'
        );
      }
    }
  }

  // Initialize dataLayer if it doesn't exist (gtag may not be loaded yet)
  (window as any).dataLayer = (window as any).dataLayer || [];

  // Define gtag function if it doesn't exist
  if (!hasGtag()) {
    (window as any).gtag = function() {
      (window as any).dataLayer.push(arguments);
    };
  }

  // Send default denied state with wait_for_update
  const defaultSignals = mapToGoogleSignals(null, mode);
  defaultSignals.wait_for_update = 500; // Google recommended delay

  callGtag('default', defaultSignals);
  defaultSent = true;
}

/**
 * Update Google Consent Mode after user makes a choice.
 */
export function updateGoogleConsent(consent: ConsentState): void {
  // If default wasn't sent, send it first
  if (!defaultSent) {
    initGoogleConsent(consentMode);
  }

  const signals = mapToGoogleSignals(consent, consentMode);
  callGtag('update', signals);
}

/**
 * Check if Google Consent Mode has been initialized
 */
export function isGoogleConsentInitialized(): boolean {
  return defaultSent;
}

/**
 * Get the current consent mode setting
 */
export function getGoogleConsentMode(): GoogleConsentMode {
  return consentMode;
}
