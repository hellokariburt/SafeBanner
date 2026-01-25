import type { ConsentConfig, ConsentState, ConsentCategory } from './types';
import { getStoredConsent, storeConsent, clearConsent, hasConsented } from './storage';
import { detectCookies, deleteCookiesByCategory } from './detector';
import { showBanner, hideBanner, isBannerVisible } from './banner';
import { initGoogleConsent, updateGoogleConsent, type GoogleConsentMode } from './google-consent';

// Export types for consumers
export type { ConsentConfig, ConsentState, ConsentCategory };

// Parse config from script tag data attributes
function getConfigFromScript(): ConsentConfig {
  const script = document.currentScript as HTMLScriptElement | null;
  if (!script) return {};

  // Parse google consent mode: 'advanced' (default), 'basic', or 'off'
  let googleConsentMode: ConsentConfig['googleConsentMode'] = 'advanced';
  const gcmAttr = script.dataset.googleConsent;
  if (gcmAttr === 'basic' || gcmAttr === 'off') {
    googleConsentMode = gcmAttr;
  }

  return {
    position: (script.dataset.position as ConsentConfig['position']) || 'bottom',
    theme: (script.dataset.theme as ConsentConfig['theme']) || 'light',
    primaryColor: script.dataset.color,
    companyName: script.dataset.company,
    privacyPolicyUrl: script.dataset.privacy,
    lang: script.dataset.lang,
    googleConsentMode,
  };
}

// Main SafeBanner class
class SafeBanner {
  private config: ConsentConfig;
  private initialized = false;
  private googleConsentInitialized = false;

  constructor(config: ConsentConfig = {}) {
    this.config = { ...getConfigFromScript(), ...config };

    // Initialize Google Consent Mode IMMEDIATELY (before DOM ready)
    // This must happen before any Google tags load
    this.initGoogleConsentMode();
  }

  /**
   * Initialize Google Consent Mode v2 with default denied state.
   * Called immediately in constructor, before DOM is ready.
   */
  private initGoogleConsentMode(): void {
    if (this.googleConsentInitialized) return;
    if (this.config.googleConsentMode === 'off') return;

    const mode = this.config.googleConsentMode === 'basic' ? 'basic' : 'advanced';
    initGoogleConsent(mode);
    this.googleConsentInitialized = true;

    // If user already consented, send update immediately
    const existingConsent = getStoredConsent();
    if (existingConsent) {
      updateGoogleConsent(existingConsent);
    }
  }

  init(): void {
    if (this.initialized) return;
    this.initialized = true;

    // If already consented, enforce preferences
    if (hasConsented()) {
      this.enforceConsent();
      return;
    }

    // Show banner for new visitors
    showBanner({
      ...this.config,
      onAccept: (consent) => {
        this.sendGoogleConsentUpdate(consent);
        this.enforceConsent();
        this.config.onAccept?.(consent);
      },
      onDecline: () => {
        const consent = getStoredConsent();
        if (consent) this.sendGoogleConsentUpdate(consent);
        this.enforceConsent();
        this.config.onDecline?.();
      },
      onUpdate: (consent) => {
        this.sendGoogleConsentUpdate(consent);
        this.enforceConsent();
        this.config.onUpdate?.(consent);
      },
    });
  }

  /**
   * Send consent update to Google
   */
  private sendGoogleConsentUpdate(consent: ConsentState): void {
    if (this.config.googleConsentMode === 'off') return;
    updateGoogleConsent(consent);
  }

  private enforceConsent(): void {
    const consent = getStoredConsent();
    if (!consent) return;

    // Delete cookies for declined categories
    if (!consent.analytics) {
      deleteCookiesByCategory('analytics');
    }
    if (!consent.marketing) {
      deleteCookiesByCategory('marketing');
    }
  }

  // Public API
  getConsent(): ConsentState | null {
    return getStoredConsent();
  }

  hasConsented(): boolean {
    return hasConsented();
  }

  hasConsentFor(category: ConsentCategory): boolean {
    const consent = getStoredConsent();
    if (!consent) return category === 'necessary';
    return consent[category];
  }

  updateConsent(updates: Partial<Omit<ConsentState, 'timestamp'>>): void {
    const current = getStoredConsent() || {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    };

    const newConsent: ConsentState = {
      ...current,
      ...updates,
      necessary: true, // Always true
      timestamp: Date.now(),
    };

    storeConsent(newConsent);
    this.sendGoogleConsentUpdate(newConsent);
    this.enforceConsent();
    this.config.onUpdate?.(newConsent);
  }

  reset(): void {
    clearConsent();
    // Reset Google consent to denied state
    this.sendGoogleConsentUpdate({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
    if (!isBannerVisible()) {
      showBanner(this.config);
    }
  }

  show(): void {
    if (!isBannerVisible()) {
      showBanner(this.config);
    }
  }

  hide(): void {
    hideBanner();
  }

  detectCookies() {
    return detectCookies();
  }
}

// Auto-initialize when script loads
const instance = new SafeBanner();

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => instance.init());
} else {
  instance.init();
}

// Expose to window for programmatic access
declare global {
  interface Window {
    safeBanner: SafeBanner;
  }
}

window.safeBanner = instance;

export default instance;
