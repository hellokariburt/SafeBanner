export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export interface ConsentConfig {
  position?: 'bottom' | 'top' | 'bottom-left' | 'bottom-right';
  theme?: 'light' | 'dark';
  primaryColor?: string;
  companyName?: string;
  privacyPolicyUrl?: string;
  /** Language code: free = 'en', 'fr', 'de'; pro = 'es', 'it', 'nl', 'pt' */
  lang?: string;
  /** Google Consent Mode v2: 'advanced' (default) sends pings for modeling, 'basic' blocks completely */
  googleConsentMode?: 'advanced' | 'basic' | 'off';
  /** Pro license key */
  projectKey?: string;
  /** Internal: hide "Powered by SafeBanner" when a valid Pro license is active */
  showBranding?: boolean;
  onAccept?: (consent: ConsentState) => void;
  onDecline?: () => void;
  onUpdate?: (consent: ConsentState) => void;
}

export interface DetectedCookie {
  name: string;
  category: ConsentCategory;
}
