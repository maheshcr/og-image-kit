/**
 * og-image-kit — The simplest way to generate Open Graph images.
 *
 * Usage:
 *   import { generateOGImage, div, loadDefaultFonts } from 'og-image-kit';
 *
 *   const png = await generateOGImage(
 *     div({ display: 'flex', background: '#1a0f2e', color: 'white', width: 1200, height: 630 }, [
 *       div({ fontSize: 48 }, 'Hello World')
 *     ]),
 *     { fonts: loadDefaultFonts() }
 *   );
 */

// Helpers
export { div, span, img, h1, h2, p, truncate } from './helpers.js';

// Fonts
export { loadFont, loadFontAsync, loadGoogleFont, loadDefaultFonts, loadDefaultFontsAsync } from './fonts.js';

// Generator
export { generateOGImage } from './generate.js';

// Templates
export {
  darkGradientContainer, goldStat, divider,
  blogPostCard, productLaunchCard, eventCard, profileCard,
} from './templates/index.js';
