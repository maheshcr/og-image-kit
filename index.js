/**
 * og-image-kit — Simple OG image generator
 *
 * Usage:
 *   import { generateOGImage, div, loadFont } from 'og-image-kit';
 *
 *   const png = await generateOGImage(
 *     div({ display: 'flex', background: '#1a0f2e', color: 'white', width: 1200, height: 630 }, [
 *       div({ fontSize: 48 }, 'Hello World')
 *     ]),
 *     { fonts: [{ name: 'Inter', data: loadFont('Inter-Regular.ttf'), weight: 400, style: 'normal' }] }
 *   );
 *
 * Works with any framework — just wire the PNG buffer to your route handler.
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- VDOM helpers ---

/**
 * Create a div VDOM node for satori.
 * @param {Record<string, any>} style - CSS-like style object
 * @param {string | object | Array} [children] - Text, single node, or array of nodes
 */
export function div(style, children) {
	return { type: 'div', props: { style, ...(children !== undefined ? { children } : {}) } };
}

/**
 * Create a span VDOM node.
 */
export function span(style, children) {
	return { type: 'span', props: { style, ...(children !== undefined ? { children } : {}) } };
}

// --- Font loading ---

/** Bundled font directory */
const FONT_DIR = join(__dirname, 'fonts');

/**
 * Load a font file. Checks the bundled fonts directory first, then the provided path.
 * @param {string} nameOrPath - Font filename (e.g. 'Inter-Regular.ttf') or absolute path
 * @returns {Buffer}
 */
export function loadFont(nameOrPath) {
	// Try bundled fonts first
	try {
		return readFileSync(join(FONT_DIR, nameOrPath));
	} catch {
		// Fall back to absolute/relative path
		return readFileSync(resolve(nameOrPath));
	}
}

// --- Pre-built font sets ---

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

// --- Image generation ---

/**
 * Generate an OG image as a PNG buffer.
 *
 * @param {object} markup - Satori VDOM tree (use div() helper to build)
 * @param {object} options
 * @param {number} [options.width=1200] - Image width
 * @param {number} [options.height=630] - Image height
 * @param {Array} options.fonts - Font descriptors (use loadFont() or loadDefaultFonts())
 * @returns {Promise<Buffer>} PNG buffer
 */
export async function generateOGImage(markup, options = {}) {
	const { width = 1200, height = 630, fonts } = options;

	if (!fonts || fonts.length === 0) {
		throw new Error('og-image-kit: At least one font must be provided');
	}

	// Ensure font data is Buffer
	const normalizedFonts = fonts.map(f => ({
		...f,
		data: Buffer.isBuffer(f.data) ? f.data : Buffer.from(f.data)
	}));

	const svg = await satori(markup, { width, height, fonts: normalizedFonts });

	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: width }
	});

	return resvg.render().asPng();
}

// --- Template helpers ---

/**
 * Create a standard dark gradient background container (1200x630).
 * Matches the SanskritKatha share card aesthetic.
 */
export function darkGradientContainer(children, overrides = {}) {
	return div({
		width: 1200, height: 630, padding: '48px 60px',
		background: 'linear-gradient(135deg, #1a0f2e 0%, #2D1B44 30%, #3D1F0F 70%, #4A2010 100%)',
		color: 'white', display: 'flex', flexDirection: 'column',
		alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter',
		...overrides
	}, children);
}

/**
 * Create a gold gradient stat display.
 */
export function goldStat(value, label) {
	return div({ display: 'flex', flexDirection: 'column', alignItems: 'center' }, [
		div({ fontSize: 48, fontWeight: 700, color: '#FFD700' }, String(value)),
		div({ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginTop: 4 }, label)
	]);
}

/**
 * Create a horizontal divider line.
 */
export function divider(width = 120) {
	return div({ width, height: 1, background: 'rgba(255,200,100,0.4)', margin: '14px 0 24px' });
}
