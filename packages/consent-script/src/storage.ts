import type { ConsentState } from './types';

const STORAGE_KEY = 'safebanner_consent';

export function getStoredConsent(): ConsentState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ConsentState;
  } catch {
    return null;
  }
}

export function storeConsent(consent: ConsentState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage not available
  }
}

export function clearConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage not available
  }
}

export function hasConsented(): boolean {
  return getStoredConsent() !== null;
}
