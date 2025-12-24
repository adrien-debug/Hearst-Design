/**
 * EXPORT.JS - Fonctions d'Export (REFONTE v3.0)
 * Hearst Design System
 */

import { showToast } from './ui-controls.js';

/**
 * Exporte le thème en JSON
 * @param {Object} palette - Palette à exporter
 * @param {string} name - Nom du fichier
 */
export function exportAsJSON(palette, name = 'theme') {
  const data = {
    name: palette.name,
    exportedAt: new Date().toISOString(),
    version: '3.0.0',
    palette: palette
  };
  
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, `hearst-${name}.json`, 'application/json');
  showToast('success', 'Exported', 'JSON file downloaded');
}

/**
 * Exporte le thème en CSS
 * @param {Object} palette - Palette à exporter
 * @param {string} name - Nom du fichier
 */
export function exportAsCSS(palette, name = 'theme') {
  const css = `/**
 * ${palette.name}
 * Exported from Hearst Theme Builder
 * ${new Date().toISOString()}
 */

:root {
  /* Backgrounds */
  --bg-primary: ${palette.background.bgPrimary};
  --bg-secondary: ${palette.background.bgSecondary};
  --bg-tertiary: ${palette.background.bgTertiary};
  --bg-elevated: ${palette.background.bgElevated};
  --bg-card: ${palette.background.bgCard};
  
  /* Text */
  --text-primary: ${palette.text.textPrimary};
  --text-secondary: ${palette.text.textSecondary};
  --text-tertiary: ${palette.text.textTertiary};
  --text-on-accent: ${palette.text.textOnAccent};
  
  /* Accents */
  --accent-primary: ${palette.accents.accentPrimary};
  --accent-secondary: ${palette.accents.accentSecondary};
  --accent-tertiary: ${palette.accents.accentTertiary};
  --accent-light: ${palette.accents.accentLight};
  --accent-muted: ${palette.accents.accentMuted};
  
  /* Borders */
  --border-subtle: ${palette.borders.borderSubtle};
  --border-default: ${palette.borders.borderDefault};
  --border-strong: ${palette.borders.borderStrong};
  --border-accent: ${palette.borders.borderAccent};
  
  /* Effects */
  --glow: ${palette.effects.glow};
  --glow-strong: ${palette.effects.glowStrong};
  
  /* Gradient */
  --gradient: ${palette.gradient};
}
`;
  
  downloadFile(css, `hearst-${name}.css`, 'text/css');
  showToast('success', 'Exported', 'CSS file downloaded');
}

/**
 * Exporte les design tokens en JSON
 * @param {Object} palette - Palette
 */
export function exportDesignTokens(palette) {
  const tokens = {
    color: {
      background: {
        primary: { value: palette.background.bgPrimary },
        secondary: { value: palette.background.bgSecondary },
        tertiary: { value: palette.background.bgTertiary },
        elevated: { value: palette.background.bgElevated }
      },
      text: {
        primary: { value: palette.text.textPrimary },
        secondary: { value: palette.text.textSecondary },
        tertiary: { value: palette.text.textTertiary }
      },
      accent: {
        primary: { value: palette.accents.accentPrimary },
        secondary: { value: palette.accents.accentSecondary }
      },
      border: {
        subtle: { value: palette.borders.borderSubtle },
        default: { value: palette.borders.borderDefault },
        strong: { value: palette.borders.borderStrong }
      }
    }
  };
  
  const json = JSON.stringify(tokens, null, 2);
  downloadFile(json, 'design-tokens.json', 'application/json');
  showToast('success', 'Exported', 'Design tokens downloaded');
}

/**
 * Télécharge un fichier
 * @param {string} content - Contenu du fichier
 * @param {string} filename - Nom du fichier
 * @param {string} mimeType - Type MIME
 */
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==================== GLOBAL EXPORTS ====================

if (typeof window !== 'undefined') {
  window.exportAsJSON = exportAsJSON;
  window.exportAsCSS = exportAsCSS;
  window.exportDesignTokens = exportDesignTokens;
}
