import type { ConsentCategory, DetectedCookie } from './types';

// Known cookie patterns and their categories
const COOKIE_PATTERNS: Array<{ pattern: RegExp; category: ConsentCategory }> = [
  // Analytics
  { pattern: /^_ga/, category: 'analytics' },
  { pattern: /^_gid/, category: 'analytics' },
  { pattern: /^_gat/, category: 'analytics' },
  { pattern: /^__utm/, category: 'analytics' },
  { pattern: /^_hjid/, category: 'analytics' },
  { pattern: /^mp_/, category: 'analytics' },
  { pattern: /^amplitude/, category: 'analytics' },
  { pattern: /^plausible/, category: 'analytics' },

  // Marketing
  { pattern: /^_fbp/, category: 'marketing' },
  { pattern: /^_fbc/, category: 'marketing' },
  { pattern: /^fr$/, category: 'marketing' },
  { pattern: /^_gcl/, category: 'marketing' },
  { pattern: /^_pinterest/, category: 'marketing' },
  { pattern: /^_tt_/, category: 'marketing' },
  { pattern: /^li_/, category: 'marketing' },
  { pattern: /^IDE$/, category: 'marketing' },
  { pattern: /^ads$/, category: 'marketing' },
];

export function detectCookies(): DetectedCookie[] {
  const cookies = document.cookie.split(';').map(c => c.trim().split('=')[0]);
  const detected: DetectedCookie[] = [];

  for (const name of cookies) {
    if (!name) continue;

    let category: ConsentCategory = 'necessary';

    for (const { pattern, category: cat } of COOKIE_PATTERNS) {
      if (pattern.test(name)) {
        category = cat;
        break;
      }
    }

    detected.push({ name, category });
  }

  return detected;
}

export function categorize(cookieName: string): ConsentCategory {
  for (const { pattern, category } of COOKIE_PATTERNS) {
    if (pattern.test(cookieName)) {
      return category;
    }
  }
  return 'necessary';
}

export function deleteCookiesByCategory(category: ConsentCategory): void {
  const cookies = detectCookies();
  const toDelete = cookies.filter(c => c.category === category);

  for (const cookie of toDelete) {
    document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
  }
}
