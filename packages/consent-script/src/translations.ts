/**
 * Static translations - no runtime loading, no interpolation.
 * Add languages here. Missing language → fallback to 'en'.
 */

export type SupportedLanguage = 'en' | 'fr' | 'de';

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

const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
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

/**
 * Get translations for a language. Falls back to English if not found.
 */
export function getTranslations(lang: string | undefined): Translations {
  if (!lang) return TRANSLATIONS.en;

  const normalized = lang.toLowerCase().slice(0, 2) as SupportedLanguage;
  return TRANSLATIONS[normalized] || TRANSLATIONS.en;
}

/**
 * Check if a language is supported
 */
export function isSupported(lang: string): lang is SupportedLanguage {
  return ['en', 'fr', 'de'].includes(lang.toLowerCase().slice(0, 2));
}
