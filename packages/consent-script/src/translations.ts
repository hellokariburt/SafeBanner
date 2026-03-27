/**
 * Static translations - no runtime loading, no interpolation.
 * Add languages here. Missing language → fallback to 'en'.
 */

export type FreeLanguage = 'en' | 'fr' | 'de';
export type ProLanguage = 'es' | 'it' | 'nl' | 'pt';
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
  es: {
    title: 'Consentimiento de cookies',
    description: 'Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio.',
    preferencesTitle: 'Preferencias de cookies',
    preferencesDescription: 'Elige qué cookies deseas aceptar.',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
    customize: 'Personalizar',
    save: 'Guardar preferencias',
    necessary: 'Necesarias',
    analytics: 'Analítica',
    marketing: 'Marketing',
    required: '(Obligatorio)',
    privacyPolicy: 'Política de privacidad',
  },
  it: {
    title: 'Consenso ai cookie',
    description: 'Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico del sito.',
    preferencesTitle: 'Preferenze cookie',
    preferencesDescription: 'Scegli quali cookie desideri accettare.',
    acceptAll: 'Accetta tutto',
    rejectAll: 'Rifiuta tutto',
    customize: 'Personalizza',
    save: 'Salva preferenze',
    necessary: 'Necessari',
    analytics: 'Analitici',
    marketing: 'Marketing',
    required: '(Obbligatorio)',
    privacyPolicy: 'Informativa sulla privacy',
  },
  nl: {
    title: 'Cookie-toestemming',
    description: 'We gebruiken cookies om je ervaring te verbeteren en het siteverkeer te analyseren.',
    preferencesTitle: 'Cookievoorkeuren',
    preferencesDescription: 'Kies welke cookies je wilt accepteren.',
    acceptAll: 'Alles accepteren',
    rejectAll: 'Alles weigeren',
    customize: 'Aanpassen',
    save: 'Voorkeuren opslaan',
    necessary: 'Noodzakelijk',
    analytics: 'Analyse',
    marketing: 'Marketing',
    required: '(Vereist)',
    privacyPolicy: 'Privacybeleid',
  },
  pt: {
    title: 'Consentimento de cookies',
    description: 'Usamos cookies para melhorar sua experiência e analisar o tráfego do site.',
    preferencesTitle: 'Preferências de cookies',
    preferencesDescription: 'Escolha quais cookies deseja aceitar.',
    acceptAll: 'Aceitar tudo',
    rejectAll: 'Recusar tudo',
    customize: 'Personalizar',
    save: 'Salvar preferências',
    necessary: 'Necessários',
    analytics: 'Análises',
    marketing: 'Marketing',
    required: '(Obrigatório)',
    privacyPolicy: 'Política de privacidade',
  },
};

const FREE_LANGUAGES: FreeLanguage[] = ['en', 'fr', 'de'];
const PRO_LANGUAGES: ProLanguage[] = ['es', 'it', 'nl', 'pt'];

function normalizeLanguage(lang: string | undefined): SupportedLanguage | null {
  if (!lang) return null;

  const normalized = lang.toLowerCase().slice(0, 2) as SupportedLanguage;
  return normalized in TRANSLATIONS ? normalized : null;
}

/**
 * Get translations for a language. Falls back to English if not found.
 */
export function getTranslations(lang: string | undefined): Translations {
  return TRANSLATIONS[normalizeLanguage(lang) || 'en'];
}

/**
 * Check if a language is supported
 */
export function isSupported(lang: string): lang is SupportedLanguage {
  return normalizeLanguage(lang) !== null;
}

export function isProLanguage(lang: string | undefined): boolean {
  const normalized = normalizeLanguage(lang);
  return normalized ? PRO_LANGUAGES.includes(normalized as ProLanguage) : false;
}

export function resolveLanguage(
  requestedLanguage: string | undefined,
  hasProLicense: boolean
): SupportedLanguage {
  const normalized = normalizeLanguage(requestedLanguage);
  if (!normalized) return 'en';
  if (FREE_LANGUAGES.includes(normalized as FreeLanguage)) return normalized;
  return hasProLicense ? normalized : 'en';
}
