import type { ConsentConfig, ConsentState, ConsentCategory } from './types';
import { getStoredConsent, storeConsent, clearConsent, hasConsented } from './storage';
import { detectCookies, deleteCookiesByCategory } from './detector';
import { showBanner, hideBanner, isBannerVisible } from './banner';
import { initGoogleConsent, updateGoogleConsent, type GoogleConsentMode } from './google-consent';
import { hasTranslations, isProLanguage, registerTranslations, resolveLanguage, type ProLanguage, type Translations } from './translations';

// Export types for consumers
export type { ConsentConfig, ConsentState, ConsentCategory };

const LICENSE_CACHE_PREFIX = 'safebanner_license:';
const LICENSE_CACHE_TTL = 24 * 60 * 60 * 1000;
const BANNER_REOPEN_DELAY = 320;

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
    projectKey: script.dataset.projectKey,
    // Pro customization attributes — only applied when license is valid
    layout: (script.dataset.layout as ConsentConfig['layout']),
    maxWidth: script.dataset.maxWidth != null ? parseInt(script.dataset.maxWidth, 10) : undefined,
    offset: script.dataset.offset != null ? parseInt(script.dataset.offset, 10) : undefined,
    logoUrl: script.dataset.logo,
    borderRadius: script.dataset.radius != null ? parseInt(script.dataset.radius, 10) : undefined,
    buttonStyle: (script.dataset.buttonStyle as ConsentConfig['buttonStyle']),
    bannerTitle: script.dataset.bannerTitle,
    bannerDescription: script.dataset.bannerDescription,
    acceptLabel: script.dataset.acceptLabel,
    rejectLabel: script.dataset.rejectLabel,
    customizeLabel: script.dataset.customizeLabel,
    saveLabel: script.dataset.saveLabel,
  };
}

function getScriptElement(): HTMLScriptElement | null {
  return document.currentScript as HTMLScriptElement | null;
}

function getValidationEndpoint(): string | null {
  const script = getScriptElement();
  if (!script?.src) return null;

  try {
    return new URL('/api/validate-key', script.src).toString();
  } catch {
    return null;
  }
}

function getProTranslationsEndpoint(): string | null {
  const script = getScriptElement();
  if (!script?.src) return null;

  try {
    return new URL('/safebanner-pro-translations.json', script.src).toString();
  } catch {
    return null;
  }
}

function getLicenseCache(projectKey: string): boolean | null {
  try {
    const cached = localStorage.getItem(`${LICENSE_CACHE_PREFIX}${projectKey}`);
    if (!cached) return null;

    const parsed = JSON.parse(cached) as { valid: boolean; expiresAt: number };
    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem(`${LICENSE_CACHE_PREFIX}${projectKey}`);
      return null;
    }

    return parsed.valid;
  } catch {
    return null;
  }
}

function setLicenseCache(projectKey: string, valid: boolean): void {
  try {
    localStorage.setItem(
      `${LICENSE_CACHE_PREFIX}${projectKey}`,
      JSON.stringify({
        valid,
        expiresAt: Date.now() + LICENSE_CACHE_TTL,
      })
    );
  } catch {
    // localStorage not available
  }
}

// Main SafeBanner class
class SafeBanner {
  private config: ConsentConfig;
  private initialized = false;
  private googleConsentInitialized = false;
  private requestedLanguage: string | undefined;
  private hasProLicense = false;
  private validationStarted = false;
  private proTranslationsPromise: Promise<void> | null = null;

  constructor(config: ConsentConfig = {}) {
    this.config = { ...getConfigFromScript(), ...config };
    this.requestedLanguage = this.config.lang;
    this.applyLicenseState(this.getCachedLicenseState());

    // Initialize Google Consent Mode IMMEDIATELY (before DOM ready)
    // This must happen before any Google tags load
    this.initGoogleConsentMode();
    this.validateProjectKey();
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

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    // If already consented, enforce preferences
    if (hasConsented()) {
      this.enforceConsent();
      return;
    }

    await this.ensureRequestedLanguageLoaded();

    // Show banner for new visitors
    showBanner(this.getBannerConfig());
  }

  /**
   * Send consent update to Google
   */
  private sendGoogleConsentUpdate(consent: ConsentState): void {
    if (this.config.googleConsentMode === 'off') return;
    updateGoogleConsent(consent);
  }

  private getCachedLicenseState(): boolean {
    if (!this.config.projectKey) return false;
    return getLicenseCache(this.config.projectKey) === true;
  }

  private applyLicenseState(valid: boolean): void {
    this.hasProLicense = valid;
    this.config.lang = resolveLanguage(this.requestedLanguage, valid);
    this.config.showBranding = !valid;
  }

  private async ensureRequestedLanguageLoaded(): Promise<void> {
    if (!this.hasProLicense || !isProLanguage(this.requestedLanguage)) return;
    if (hasTranslations(this.requestedLanguage)) return;
    if (this.proTranslationsPromise) return this.proTranslationsPromise;

    const endpoint = getProTranslationsEndpoint();
    if (!endpoint) return;

    this.proTranslationsPromise = (async () => {
      try {
        const response = await fetch(endpoint, { mode: 'cors' });
        if (!response.ok) return;

        const data = (await response.json()) as Partial<Record<ProLanguage, Translations>>;
        registerTranslations(data);
      } catch {
        // Keep the English fallback if translation loading fails.
      } finally {
        this.proTranslationsPromise = null;
      }
    })();

    return this.proTranslationsPromise;
  }

  private async validateProjectKey(): Promise<void> {
    if (this.validationStarted || !this.config.projectKey) return;
    this.validationStarted = true;

    const endpoint = getValidationEndpoint();
    if (!endpoint) return;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectKey: this.config.projectKey,
          hostname: window.location.hostname,
        }),
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { valid?: boolean };
      const valid = data.valid === true;
      setLicenseCache(this.config.projectKey, valid);
      await this.upgradeLicenseState(valid);
    } catch {
      // Validation is best-effort. Free behavior remains the safe default.
    }
  }

  private async upgradeLicenseState(valid: boolean): Promise<void> {
    const previousLanguage = this.config.lang;
    const previousBranding = this.config.showBranding;
    this.applyLicenseState(valid);
    await this.ensureRequestedLanguageLoaded();

    if (!isBannerVisible()) {
      return;
    }

    const brandingChanged = previousBranding !== this.config.showBranding;
    const languageChanged =
      previousLanguage !== this.config.lang &&
      isProLanguage(this.requestedLanguage);

    if (brandingChanged && !this.config.showBranding) {
      document.querySelector('.cm-powered-by')?.remove();
    }

    if (brandingChanged || languageChanged) {
      hideBanner();
      window.setTimeout(() => {
        if (!hasConsented()) {
          showBanner(this.getBannerConfig());
        }
      }, BANNER_REOPEN_DELAY);
    }
  }

  private getBannerConfig(): ConsentConfig {
    const proFields = this.hasProLicense
      ? {
          layout: this.config.layout,
          theme: this.config.theme,
          maxWidth: this.config.maxWidth,
          offset: this.config.offset,
          logoUrl: this.config.logoUrl,
          borderRadius: this.config.borderRadius,
          buttonStyle: this.config.buttonStyle,
          bannerTitle: this.config.bannerTitle,
          bannerDescription: this.config.bannerDescription,
          acceptLabel: this.config.acceptLabel,
          rejectLabel: this.config.rejectLabel,
          customizeLabel: this.config.customizeLabel,
          saveLabel: this.config.saveLabel,
        }
      : {
          layout: undefined,
          theme: this.config.theme === 'auto' ? ('light' as const) : this.config.theme,
          maxWidth: undefined,
          offset: undefined,
          logoUrl: undefined,
          borderRadius: undefined,
          buttonStyle: undefined,
          bannerTitle: undefined,
          bannerDescription: undefined,
          acceptLabel: undefined,
          rejectLabel: undefined,
          customizeLabel: undefined,
          saveLabel: undefined,
        };

    return {
      ...this.config,
      ...proFields,
      onAccept: (consent) => {
        this.sendGoogleConsentUpdate(consent);
        this.enforceConsent();
        this.config.onAccept?.(consent);
      },
      onDecline: () => {
        const consent = getStoredConsent();
        if (consent) {
          this.sendGoogleConsentUpdate(consent);
        }
        this.enforceConsent();
        this.config.onDecline?.();
      },
      onUpdate: (consent) => {
        this.sendGoogleConsentUpdate(consent);
        this.enforceConsent();
        this.config.onUpdate?.(consent);
      },
    };
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
      showBanner(this.getBannerConfig());
    }
  }

  show(): void {
    if (!isBannerVisible()) {
      showBanner(this.getBannerConfig());
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
