import type { ConsentConfig } from './types';

export function getStyles(config: ConsentConfig): string {
  const primaryColor = config.primaryColor || '#2563eb';
  const isTop = config.position === 'top';
  const isCorner = config.position?.includes('-');
  const isAuto = config.theme === 'auto';
  const isDark = config.theme === 'dark';
  const isBar = config.layout === 'bar';
  const isCard = config.layout === 'card';

  // Spacing
  const offset = config.offset ?? 16;
  const maxWidth = config.maxWidth;

  // Border radius
  const defaultRadius = (isCorner || isCard) ? 16 : 0;
  const bannerRadius = config.borderRadius ?? defaultRadius;
  const btnRadius =
    config.buttonStyle === 'pill' ? 9999 :
    config.buttonStyle === 'square' ? 0 :
    config.borderRadius != null ? Math.max(4, Math.round(config.borderRadius * 0.5)) : 6;

  // Theme colors — auto uses light as base, media query overrides to dark
  const bg = isDark ? '#1f2937' : '#ffffff';
  const text = isDark ? '#f9fafb' : '#111827';
  const textMuted = isDark ? '#d1d5db' : '#6b7280';
  const btnSecondaryBg = isDark ? '#374151' : '#f3f4f6';
  const btnSecondaryText = isDark ? '#f9fafb' : '#374151';
  const poweredByColor = isDark ? '#6b7280' : '#9ca3af';

  // Banner position block
  let positionCSS: string;
  if (isCard) {
    positionCSS = `
      left: 50%;
      bottom: ${offset}px;
      max-width: ${maxWidth ?? 480}px;
      width: calc(100% - ${offset * 2}px);
      transform: translateX(-50%) translateY(12px);
    `;
  } else if (isCorner) {
    const h = config.position?.includes('right') ? `right: ${offset}px;` : `left: ${offset}px;`;
    const v = isTop ? `top: ${offset}px;` : `bottom: ${offset}px;`;
    positionCSS = `${h} ${v} max-width: 400px;`;
  } else if (isTop) {
    positionCSS = `top: 0; left: 0; right: 0;
      ${maxWidth ? `max-width: ${maxWidth}px; margin-left: auto; margin-right: auto;` : ''}`;
  } else {
    positionCSS = `bottom: 0; left: 0; right: 0;
      ${maxWidth ? `max-width: ${maxWidth}px; margin-left: auto; margin-right: auto;` : ''}`;
  }

  // Visible state transform
  const hiddenTransform = isCard
    ? 'transform: translateX(-50%) translateY(12px);'
    : `transform: translateY(${isTop ? '-8px' : '8px'});`;
  const visibleTransform = isCard
    ? 'transform: translateX(-50%) translateY(0);'
    : 'transform: translateY(0);';

  const autoOverride = isAuto ? `
    @media (prefers-color-scheme: dark) {
      .cm-banner {
        background: #1f2937 !important;
        color: #f9fafb !important;
      }
      .cm-text { color: #d1d5db !important; }
      .cm-btn-secondary { background: #374151 !important; color: #f9fafb !important; }
      .cm-btn-link { color: #d1d5db !important; }
      .cm-label-required { color: #9ca3af !important; }
      .cm-powered-by, .cm-powered-by a { color: #6b7280 !important; }
      .cm-bar-text { color: #d1d5db !important; }
    }
  ` : '';

  const barStyles = isBar ? `
    .cm-banner {
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 60px;
      flex-wrap: wrap;
    }
    .cm-bar-text {
      font-size: 13px;
      color: ${textMuted};
      flex: 1;
      min-width: 160px;
    }
    .cm-buttons {
      flex-wrap: nowrap;
      gap: 8px;
    }
    .cm-btn {
      padding: 7px 14px;
      font-size: 13px;
      white-space: nowrap;
    }
    .cm-btn-link {
      padding: 7px 8px;
    }
  ` : '';

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
    ${isBar ? '.cm-overlay { display: none; }' : ''}

    .cm-banner {
      position: fixed;
      ${positionCSS}
      background: ${bg};
      color: ${text};
      padding: 24px 28px;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18), 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 99999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      ${bannerRadius > 0 ? `border-radius: ${bannerRadius}px;` : ''}
      opacity: 0;
      ${hiddenTransform}
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .cm-banner.cm-visible {
      opacity: 1;
      ${visibleTransform}
    }

    .cm-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .cm-text {
      margin: 0 0 16px 0;
      color: ${textMuted};
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
      border-radius: ${btnRadius}px;
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
      background: ${btnSecondaryBg};
      color: ${btnSecondaryText};
    }

    .cm-btn-link {
      background: transparent;
      color: ${textMuted};
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
      color: #9ca3af;
    }

    .cm-powered-by {
      margin-top: 12px;
      font-size: 11px;
      color: ${poweredByColor};
    }

    .cm-powered-by a {
      color: ${poweredByColor};
      text-decoration: none;
    }

    .cm-powered-by a:hover {
      text-decoration: underline;
    }

    .cm-logo {
      display: block;
      max-height: 32px;
      max-width: 120px;
      width: auto;
      margin-bottom: 12px;
      object-fit: contain;
    }

    ${barStyles}
    ${autoOverride}
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
