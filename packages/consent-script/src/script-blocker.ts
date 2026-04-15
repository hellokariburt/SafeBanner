import type { ConsentCategory, ConsentState } from './types';

/**
 * Script Blocker (Pro feature)
 *
 * Developers mark scripts they want blocked until consent:
 *
 *   <script
 *     type="text/safebanner"
 *     data-consent="analytics"
 *     data-src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"
 *   ></script>
 *
 * SafeBanner will not load these scripts until the matching consent
 * category is granted. When consent is given, the original element
 * is replaced with a real <script> that loads the resource.
 *
 * Inline scripts are also supported — omit data-src and put the code
 * inside the tag body:
 *
 *   <script type="text/safebanner" data-consent="marketing">
 *     fbq('init', '1234');
 *   </script>
 */

const SELECTOR = 'script[type="text/safebanner"]';
const ACTIVATED_ATTR = 'data-safebanner-activated';

interface BlockedScript {
  element: HTMLScriptElement;
  category: ConsentCategory;
  src: string | null;
  inline: string | null;
}

const ATTRIBUTES_TO_COPY = [
  'id',
  'nonce',
  'integrity',
  'crossorigin',
  'referrerpolicy',
] as const;

function discoverBlockedScripts(): BlockedScript[] {
  const scripts: BlockedScript[] = [];
  const elements = document.querySelectorAll<HTMLScriptElement>(SELECTOR);

  for (const el of elements) {
    if (el.hasAttribute(ACTIVATED_ATTR)) continue;

    const category = el.dataset.consent as ConsentCategory | undefined;
    if (category !== 'analytics' && category !== 'marketing') continue;

    const src = el.dataset.src || null;
    const inline = !src && el.textContent ? el.textContent.trim() : null;

    if (!src && !inline) continue;

    scripts.push({ element: el, category, src, inline });
  }

  return scripts;
}

function activateScript(blocked: BlockedScript): void {
  const script = document.createElement('script');

  const type = blocked.element.dataset.type;
  if (type) {
    script.type = type;
  }

  for (const attr of ATTRIBUTES_TO_COPY) {
    const value = blocked.element.getAttribute(attr) || blocked.element.dataset[attr];
    if (value) {
      script.setAttribute(attr, value);
    }
  }

  if (blocked.src) {
    script.src = blocked.src;
    // Carry over async/defer if the original element specified them
    if (blocked.element.hasAttribute('data-async')) script.async = true;
    if (blocked.element.hasAttribute('data-defer')) script.defer = true;
  } else if (blocked.inline) {
    script.textContent = blocked.inline;
  }

  // Mark as activated so we don't process it again
  blocked.element.setAttribute(ACTIVATED_ATTR, 'true');

  // Insert the real script right after the placeholder
  blocked.element.parentNode?.insertBefore(script, blocked.element.nextSibling);
}

/**
 * Enforce script blocking based on current consent state.
 * Call this after every consent change.
 */
export function enforceScriptBlocking(consent: ConsentState): void {
  const blocked = discoverBlockedScripts();

  for (const entry of blocked) {
    const allowed = consent[entry.category];
    if (allowed) {
      activateScript(entry);
    }
  }
}

/**
 * Returns true if the page has any scripts with type="text/safebanner".
 * Used to determine if script blocking is relevant.
 */
export function hasBlockedScripts(): boolean {
  return document.querySelectorAll(SELECTOR).length > 0;
}
