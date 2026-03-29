/**
 * Font loading utilities.
 * Sync functions use Node fs. Async functions use fetch (edge-compatible).
 */

import { readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = join(__dirname, '..', 'fonts');

/** Bundled font directory path (exposed for advanced usage). */
export const BUNDLED_FONT_DIR = FONT_DIR;

/**
 * Load a font file. Checks the bundled fonts directory first, then the provided path.
 * @param {string} nameOrPath - Font filename (e.g. 'Inter-Regular.ttf') or absolute path
 * @returns {Buffer}
 */
export function loadFont(nameOrPath) {
  try {
    return readFileSync(join(FONT_DIR, nameOrPath));
  } catch {
    return readFileSync(resolve(nameOrPath));
  }
}

/**
 * Load the bundled Inter + Noto Sans Devanagari font set.
 * Returns an array ready to pass as the `fonts` option.
 */
export function loadDefaultFonts() {
  return [
    { name: 'Inter', data: loadFont('Inter-Regular.ttf'), weight: 400, style: 'normal' },
    { name: 'Inter', data: loadFont('Inter-Bold.ttf'), weight: 700, style: 'normal' },
    { name: 'Noto Sans Devanagari', data: loadFont('NotoSansDevanagari-Regular.ttf'), weight: 400, style: 'normal' },
    { name: 'Noto Sans Devanagari', data: loadFont('NotoSansDevanagari-Bold.ttf'), weight: 700, style: 'normal' },
  ];
}

// --- Async (edge-compatible) ---

/**
 * Load a font file asynchronously. Fetches from URL or reads from disk.
 * Works in both Node.js and edge runtimes.
 * @param {string} urlOrPath - URL (http/https), bundled font filename, or file path
 * @returns {Promise<Uint8Array>}
 */
export async function loadFontAsync(urlOrPath) {
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    const res = await fetch(urlOrPath);
    if (!res.ok) throw new Error(`Failed to fetch font: ${urlOrPath} (${res.status})`);
    return new Uint8Array(await res.arrayBuffer());
  }
  // Local file — dynamic import so edge bundlers can tree-shake fs
  const { readFile } = await import('fs/promises');
  try {
    return new Uint8Array(await readFile(join(FONT_DIR, urlOrPath)));
  } catch {
    return new Uint8Array(await readFile(resolve(urlOrPath)));
  }
}

/**
 * Load a font from Google Fonts.
 * @param {string} family - Font family name (e.g. 'Roboto')
 * @param {number} [weight=400] - Font weight
 * @param {string} [text] - Optional text to subset the font (reduces size)
 * @returns {Promise<Uint8Array>}
 */
export async function loadGoogleFont(family, weight = 400, text) {
  const params = new URLSearchParams({
    family: `${family}:wght@${weight}`,
  });
  if (text) params.set('text', text);

  const cssUrl = `https://fonts.googleapis.com/css2?${params}`;
  const cssRes = await fetch(cssUrl, {
    headers: {
      // Request woff2 format by pretending to be a modern browser
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  if (!cssRes.ok) throw new Error(`Failed to fetch Google Fonts CSS for "${family}" (${cssRes.status})`);
  const css = await cssRes.text();

  const urlMatch = css.match(/src:\s*url\(([^)]+)\)/);
  if (!urlMatch) throw new Error(`Could not extract font URL from Google Fonts CSS for "${family}"`);

  return loadFontAsync(urlMatch[1]);
}

/**
 * Load the bundled default font set asynchronously (edge-compatible).
 * Returns an array ready to pass as the `fonts` option.
 */
export async function loadDefaultFontsAsync() {
  const [interReg, interBold, notoReg, notoBold] = await Promise.all([
    loadFontAsync('Inter-Regular.ttf'),
    loadFontAsync('Inter-Bold.ttf'),
    loadFontAsync('NotoSansDevanagari-Regular.ttf'),
    loadFontAsync('NotoSansDevanagari-Bold.ttf'),
  ]);
  return [
    { name: 'Inter', data: interReg, weight: 400, style: 'normal' },
    { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
    { name: 'Noto Sans Devanagari', data: notoReg, weight: 400, style: 'normal' },
    { name: 'Noto Sans Devanagari', data: notoBold, weight: 700, style: 'normal' },
  ];
}
