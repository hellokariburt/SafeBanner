import type { ConsentConfig } from './types';

export function getStyles(config: ConsentConfig): string {
  const primaryColor = config.primaryColor || '#2563eb';
  const isTop = config.position === 'top';
  const isCorner = config.position?.includes('-');

  return `
    .cm-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 99998;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .cm-overlay.cm-visible {
      opacity: 1;
    }

    .cm-banner {
      position: fixed;
      ${isTop ? 'top: 0;' : 'bottom: 0;'}
      ${isCorner ? `${config.position?.includes('right') ? 'right: 16px;' : 'left: 16px;'} max-width: 400px;` : 'left: 0; right: 0;'}
      ${isCorner ? (isTop ? 'top: 16px;' : 'bottom: 16px;') : ''}
      background: ${config.theme === 'dark' ? '#1f2937' : '#ffffff'};
      color: ${config.theme === 'dark' ? '#f9fafb' : '#111827'};
      padding: 24px 28px;
      box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.15), 0 -2px 8px rgba(0, 0, 0, 0.1);
      z-index: 99999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      ${isCorner ? 'border-radius: 12px;' : ''}
      opacity: 0;
      transform: translateY(${isTop ? '-8px' : '8px'});
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .cm-banner.cm-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .cm-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .cm-text {
      margin: 0 0 16px 0;
      color: ${config.theme === 'dark' ? '#d1d5db' : '#6b7280'};
    }

    .cm-link {
      color: ${primaryColor};
      text-decoration: none;
    }
    .cm-link:hover {
      text-decoration: underline;
    }

    .cm-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .cm-btn {
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s ease;
    }
    .cm-btn:hover {
      opacity: 0.9;
    }

    .cm-btn-primary {
      background: ${primaryColor};
      color: #ffffff;
    }

    .cm-btn-secondary {
      background: ${config.theme === 'dark' ? '#374151' : '#f3f4f6'};
      color: ${config.theme === 'dark' ? '#f9fafb' : '#374151'};
    }

    .cm-btn-link {
      background: transparent;
      color: ${config.theme === 'dark' ? '#d1d5db' : '#6b7280'};
      padding: 10px 12px;
    }

    .cm-categories {
      margin: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .cm-category {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .cm-checkbox {
      width: 18px;
      height: 18px;
      accent-color: ${primaryColor};
    }

    .cm-checkbox:disabled {
      opacity: 0.5;
    }

    .cm-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .cm-label-text {
      font-weight: 500;
    }

    .cm-label-required {
      font-size: 12px;
      color: ${config.theme === 'dark' ? '#9ca3af' : '#9ca3af'};
    }

    .cm-powered-by {
      margin-top: 12px;
      font-size: 11px;
      color: ${config.theme === 'dark' ? '#6b7280' : '#9ca3af'};
    }

    .cm-powered-by a {
      color: ${config.theme === 'dark' ? '#6b7280' : '#9ca3af'};
      text-decoration: none;
    }

    .cm-powered-by a:hover {
      text-decoration: underline;
    }
  `;
}

export function injectStyles(config: ConsentConfig): void {
  const styleId = 'consent-manager-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = getStyles(config);
  document.head.appendChild(style);
}
