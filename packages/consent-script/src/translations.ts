/**
 * Static translations - no runtime loading, no interpolation.
 * Free languages stay in the core bundle.
 * Pro languages are loaded lazily from a static JSON asset.
 */

export const FREE_LANGUAGE_CODES = ['en', 'fr', 'de'] as const;
export const PRO_LANGUAGE_CODES = [
  'es', 'it', 'nl', 'pt', 'pl', 'sv', 'da', 'fi', 'cs', 'no',
  'ro', 'hu', 'el', 'tr', 'uk', 'bg', 'hr', 'sk', 'sl', 'lt',
  'lv', 'et', 'mt', 'ga', 'ca', 'eu', 'gl', 'is', 'sq', 'sr',
  'bs', 'mk', 'ru', 'ar', 'he', 'ja', 'ko', 'zh', 'hi', 'id',
  'ms', 'th', 'vi', 'fa',
] as const;

export type FreeLanguage = typeof FREE_LANGUAGE_CODES[number];
export type ProLanguage = typeof PRO_LANGUAGE_CODES[number];
export type SupportedLanguage = FreeLanguage | ProLanguage;

export interface Translations {
  title: string;
  description: string;
  preferencesTitle: string;
  preferencesDescription: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  save: string;
  necessary: string;
  analytics: string;
  marketing: string;
  required: string;
  privacyPolicy: string;
}

const FREE_TRANSLATIONS: Record<FreeLanguage, Translations> = {
  en: {
    title: 'Cookie Consent',
    description: 'We use cookies to improve your experience and analyze site traffic.',
    preferencesTitle: 'Cookie Preferences',
    preferencesDescription: 'Choose which cookies you want to accept.',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    customize: 'Customize',
    save: 'Save Preferences',
    necessary: 'Necessary',
    analytics: 'Analytics',
    marketing: 'Marketing',
    required: '(Required)',
    privacyPolicy: 'Privacy Policy',
  },
  fr: {
    title: 'Consentement aux cookies',
    description: 'Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.',
    preferencesTitle: 'Préférences de cookies',
    preferencesDescription: 'Choisissez les cookies que vous souhaitez accepter.',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    customize: 'Personnaliser',
    save: 'Enregistrer',
    necessary: 'Nécessaires',
    analytics: 'Analytiques',
    marketing: 'Marketing',
    required: '(Requis)',
    privacyPolicy: 'Politique de confidentialité',
  },
  de: {
    title: 'Cookie-Einwilligung',
    description: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Datenverkehr zu analysieren.',
    preferencesTitle: 'Cookie-Einstellungen',
    preferencesDescription: 'Wählen Sie, welche Cookies Sie akzeptieren möchten.',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    customize: 'Anpassen',
    save: 'Speichern',
    necessary: 'Notwendig',
    analytics: 'Analyse',
    marketing: 'Marketing',
    required: '(Erforderlich)',
    privacyPolicy: 'Datenschutzrichtlinie',
  },
};

const translations: Partial<Record<SupportedLanguage, Translations>> = {
  ...FREE_TRANSLATIONS,
};

function normalizeLanguage(lang: string | undefined): SupportedLanguage | null {
  if (!lang) return null;

  const normalized = lang.toLowerCase().slice(0, 2) as SupportedLanguage;
  return isSupportedLanguageCode(normalized) ? normalized : null;
}

function isSupportedLanguageCode(lang: SupportedLanguage): boolean {
  return (
    FREE_LANGUAGE_CODES.includes(lang as FreeLanguage) ||
    PRO_LANGUAGE_CODES.includes(lang as ProLanguage)
  );
}

export function registerTranslations(
  nextTranslations: Partial<Record<ProLanguage, Translations>>
): void {
  Object.assign(translations, nextTranslations);
}

export function hasTranslations(lang: string | undefined): boolean {
  const normalized = normalizeLanguage(lang);
  return normalized ? Boolean(translations[normalized]) : false;
}

/**
 * Get translations for a language. Falls back to English if not found.
 */
export function getTranslations(lang: string | undefined): Translations {
  const normalized = normalizeLanguage(lang);
  return (normalized && translations[normalized]) || FREE_TRANSLATIONS.en;
}

/**
 * Check if a language is supported
 */
export function isSupported(lang: string): lang is SupportedLanguage {
  return normalizeLanguage(lang) !== null;
}

export function isProLanguage(lang: string | undefined): boolean {
  const normalized = normalizeLanguage(lang);
  return normalized ? PRO_LANGUAGE_CODES.includes(normalized as ProLanguage) : false;
}

export function resolveLanguage(
  requestedLanguage: string | undefined,
  hasProLicense: boolean
): SupportedLanguage {
  const normalized = normalizeLanguage(requestedLanguage);
  if (!normalized) return 'en';
  if (FREE_LANGUAGE_CODES.includes(normalized as FreeLanguage)) return normalized;
  return hasProLicense ? normalized : 'en';
}
