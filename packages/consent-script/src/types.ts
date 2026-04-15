export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export interface ConsentConfig {
  position?: 'bottom' | 'top' | 'bottom-left' | 'bottom-right';
  theme?: 'light' | 'dark' | 'auto';
  /** Pro: banner layout style */
  layout?: 'banner' | 'bar' | 'card';
  /** Pro: max width of the banner in px */
  maxWidth?: number;
  /** Pro: offset from edges in px (corner/card positions, default 16) */
  offset?: number;
  primaryColor?: string;
  companyName?: string;
  privacyPolicyUrl?: string;
  /** Language code: free includes en/fr/de; Pro unlocks additional built-in languages */
  lang?: string;
  /** Google Consent Mode v2: 'advanced' (default) sends pings for modeling, 'basic' blocks completely */
  googleConsentMode?: 'advanced' | 'basic' | 'off';
  /** Pro license key */
  projectKey?: string;
  /** Internal: hide "Powered by SafeBanner" when a valid Pro license is active */
  showBranding?: boolean;
  /** Pro: Custom banner title */
  bannerTitle?: string;
  /** Pro: Custom banner description */
  bannerDescription?: string;
  /** Pro: Custom "Accept All" button label */
  acceptLabel?: string;
  /** Pro: Custom "Reject All" button label */
  rejectLabel?: string;
  /** Pro: Custom "Customize" button label */
  customizeLabel?: string;
  /** Pro: Custom "Save Preferences" button label */
  saveLabel?: string;
  /** Pro: Logo image URL displayed in the banner */
  logoUrl?: string;
  /** Pro: Banner and button border radius in px (default: 0 full-width, 12 corner) */
  borderRadius?: number;
  /** Pro: Button shape — 'default' (6px), 'pill', 'square' */
  buttonStyle?: 'default' | 'pill' | 'square';
  /** Pro: number of days before consent expires and the banner re-appears */
  consentExpiryDays?: number;
  onAccept?: (consent: ConsentState) => void;
  onDecline?: () => void;
  onUpdate?: (consent: ConsentState) => void;
}

export interface DetectedCookie {
  name: string;
  category: ConsentCategory;
}
