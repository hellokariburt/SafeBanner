import type { ConsentConfig, ConsentState } from './types';
import { injectStyles } from './styles';
import { storeConsent, getStoredConsent } from './storage';
import { getTranslations, type Translations } from './translations';

let bannerElement: HTMLElement | null = null;
let overlayElement: HTMLElement | null = null;

/**
 * Validates a URL is safe (http/https only).
 * Returns null for invalid or dangerous URLs.
 */
function safeURL(url: string): string | null {
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Creates a text node or element with safe text content.
 */
function createText(text: string): Text {
  return document.createTextNode(text);
}

/**
 * Creates the "Powered by SafeBanner" attribution footer.
 */
function createPoweredBy(): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'cm-powered-by';
  const link = document.createElement('a');
  link.href = 'https://www.safebanner.com';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Powered by SafeBanner';
  div.appendChild(link);
  return div;
}

/**
 * Creates the privacy policy link element (or null if no valid URL).
 */
function createPrivacyLink(url: string | undefined, text: string): HTMLAnchorElement | null {
  if (!url) return null;

  const safeHref = safeURL(url);
  if (!safeHref) return null;

  const link = document.createElement('a');
  link.href = safeHref;
  link.className = 'cm-link';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = text;
  return link;
}

/**
 * Creates a button element.
 */
function createButton(text: string, action: string, className: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = className;
  btn.dataset.action = action;
  btn.textContent = text;
  return btn;
}

/**
 * Creates a checkbox category row.
 */
function createCategoryRow(
  category: string,
  label: string,
  checked: boolean,
  disabled: boolean,
  required: boolean,
  requiredText?: string
): HTMLLabelElement {
  const labelEl = document.createElement('label');
  labelEl.className = 'cm-category';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'cm-checkbox';
  checkbox.dataset.category = category;
  checkbox.checked = checked;
  checkbox.disabled = disabled;

  const spanOuter = document.createElement('span');
  spanOuter.className = 'cm-label';

  const spanText = document.createElement('span');
  spanText.className = 'cm-label-text';
  spanText.textContent = label;
  spanOuter.appendChild(spanText);

  if (required && requiredText) {
    const spanRequired = document.createElement('span');
    spanRequired.className = 'cm-label-required';
    spanRequired.textContent = requiredText;
    spanOuter.appendChild(spanRequired);
  }

  labelEl.appendChild(checkbox);
  labelEl.appendChild(spanOuter);
  return labelEl;
}

/**
 * Builds the initial consent banner (simple view).
 */
function buildSimpleBanner(config: ConsentConfig, t: Translations): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Title
  const title = document.createElement('div');
  title.className = 'cm-title';
  title.textContent = t.title;
  fragment.appendChild(title);

  // Text paragraph
  const text = document.createElement('p');
  text.className = 'cm-text';
  text.appendChild(createText(t.description + ' '));

  const privacyLink = createPrivacyLink(config.privacyPolicyUrl, t.privacyPolicy);
  if (privacyLink) {
    text.appendChild(privacyLink);
  }
  fragment.appendChild(text);

  // Buttons
  const buttons = document.createElement('div');
  buttons.className = 'cm-buttons';
  buttons.appendChild(createButton(t.acceptAll, 'accept-all', 'cm-btn cm-btn-primary'));
  buttons.appendChild(createButton(t.rejectAll, 'reject-all', 'cm-btn cm-btn-secondary'));
  buttons.appendChild(createButton(t.customize, 'customize', 'cm-btn cm-btn-link'));
  fragment.appendChild(buttons);

  if (config.showBranding !== false) {
    fragment.appendChild(createPoweredBy());
  }

  return fragment;
}

/**
 * Builds the detailed preferences view.
 */
function buildDetailsBanner(config: ConsentConfig, t: Translations): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const stored = getStoredConsent();

  // Title
  const title = document.createElement('div');
  title.className = 'cm-title';
  title.textContent = t.preferencesTitle;
  fragment.appendChild(title);

  // Text paragraph
  const text = document.createElement('p');
  text.className = 'cm-text';
  text.appendChild(createText(t.preferencesDescription + ' '));

  const privacyLink = createPrivacyLink(config.privacyPolicyUrl, t.privacyPolicy);
  if (privacyLink) {
    text.appendChild(privacyLink);
  }
  fragment.appendChild(text);

  // Categories
  const categories = document.createElement('div');
  categories.className = 'cm-categories';
  categories.appendChild(createCategoryRow('necessary', t.necessary, true, true, true, t.required));
  categories.appendChild(createCategoryRow('analytics', t.analytics, stored?.analytics ?? false, false, false));
  categories.appendChild(createCategoryRow('marketing', t.marketing, stored?.marketing ?? false, false, false));
  fragment.appendChild(categories);

  // Buttons
  const buttons = document.createElement('div');
  buttons.className = 'cm-buttons';
  buttons.appendChild(createButton(t.save, 'save', 'cm-btn cm-btn-primary'));
  buttons.appendChild(createButton(t.acceptAll, 'accept-all', 'cm-btn cm-btn-secondary'));
  fragment.appendChild(buttons);

  if (config.showBranding !== false) {
    fragment.appendChild(createPoweredBy());
  }

  return fragment;
}

function getConsentFromCheckboxes(): ConsentState {
  const analytics = bannerElement?.querySelector<HTMLInputElement>('[data-category="analytics"]')?.checked ?? false;
  const marketing = bannerElement?.querySelector<HTMLInputElement>('[data-category="marketing"]')?.checked ?? false;

  return {
    necessary: true,
    analytics,
    marketing,
    timestamp: Date.now(),
  };
}

export function showBanner(config: ConsentConfig): void {
  injectStyles(config);

  const t = getTranslations(config.lang);

  // Create overlay
  overlayElement = document.createElement('div');
  overlayElement.className = 'cm-overlay';
  document.body.appendChild(overlayElement);

  // Create banner
  bannerElement = document.createElement('div');
  bannerElement.className = 'cm-banner';
  bannerElement.setAttribute('role', 'dialog');
  bannerElement.setAttribute('aria-label', t.title);
  bannerElement.appendChild(buildSimpleBanner(config, t));
  document.body.appendChild(bannerElement);

  // Trigger animation
  requestAnimationFrame(() => {
    overlayElement?.classList.add('cm-visible');
    bannerElement?.classList.add('cm-visible');
  });

  // Handle clicks
  bannerElement.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const action = target.dataset.action;

    if (!action) return;

    switch (action) {
      case 'accept-all': {
        const consent: ConsentState = {
          necessary: true,
          analytics: true,
          marketing: true,
          timestamp: Date.now(),
        };
        storeConsent(consent);
        hideBanner();
        config.onAccept?.(consent);
        break;
      }
      case 'reject-all': {
        const consent: ConsentState = {
          necessary: true,
          analytics: false,
          marketing: false,
          timestamp: Date.now(),
        };
        storeConsent(consent);
        hideBanner();
        config.onDecline?.();
        break;
      }
      case 'customize': {
        if (bannerElement) {
          bannerElement.textContent = ''; // Clear safely
          bannerElement.appendChild(buildDetailsBanner(config, t));
        }
        break;
      }
      case 'save': {
        const consent = getConsentFromCheckboxes();
        storeConsent(consent);
        hideBanner();
        config.onUpdate?.(consent);
        break;
      }
    }
  });
}

export function hideBanner(): void {
  overlayElement?.classList.remove('cm-visible');
  bannerElement?.classList.remove('cm-visible');

  setTimeout(() => {
    overlayElement?.remove();
    bannerElement?.remove();
    overlayElement = null;
    bannerElement = null;
  }, 300);
}

export function isBannerVisible(): boolean {
  return bannerElement !== null;
}
