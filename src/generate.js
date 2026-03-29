/**
 * Core image generation — converts VDOM markup to PNG/SVG via satori + resvg.
 */

import satori from 'satori';

/**
 * Normalize font data to ArrayBuffer (works in both Node and edge).
 */
function normalizeFontData(data) {
  if (data instanceof ArrayBuffer) return data;
  if (data instanceof Uint8Array) return data.buffer;
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data)) {
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }
  return data;
}

/**
 * Generate an OG image.
 *
 * @param {object} markup - Satori VDOM tree (use div() helper to build)
 * @param {object} options
 * @param {number} [options.width=1200] - Image width
 * @param {number} [options.height=630] - Image height
 * @param {Array} options.fonts - Font descriptors (use loadFont() or loadDefaultFonts())
 * @param {'png'|'svg'} [options.format='png'] - Output format
 * @param {'twemoji'} [options.emoji] - Enable emoji rendering via Twemoji
 * @param {{ svgToPng: (svg: string, width: number) => Uint8Array }} [options.renderer] - Custom renderer (e.g. from og-image-kit/edge)
 * @returns {Promise<Uint8Array|string>} PNG buffer or SVG string
 */
export async function generateOGImage(markup, options = {}) {
  const {
    width = 1200,
    height = 630,
    fonts,
    format = 'png',
    emoji,
    renderer,
  } = options;

  if (!fonts || fonts.length === 0) {
    throw new Error('og-image-kit: At least one font must be provided');
  }

  const normalizedFonts = fonts.map(f => ({
    ...f,
    data: normalizeFontData(f.data),
  }));

  const satoriOpts = { width, height, fonts: normalizedFonts };

  if (emoji === 'twemoji') {
    satoriOpts.loadAdditionalAsset = async (languageCode, segment) => {
      if (languageCode === 'emoji') {
        const codePoints = [...segment]
          .map(c => c.codePointAt(0).toString(16))
          .join('-');
        const url = `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${codePoints}.svg`;
        try {
          const res = await fetch(url);
          if (!res.ok) return undefined;
          const svgText = await res.text();
          return `data:image/svg+xml,${encodeURIComponent(svgText)}`;
        } catch {
          return undefined;
        }
      }
      return undefined;
    };
  }

  const svg = await satori(markup, satoriOpts);

  if (format === 'svg') return svg;

  // PNG rendering — use custom renderer or default to Node renderer
  if (renderer?.svgToPng) {
    return renderer.svgToPng(svg, width);
  }

  // Lazy-load Node renderer so generate.js can be parsed in edge runtimes
  const { svgToPng } = await import('./renderers/node.js');
  return svgToPng(svg, width);
}
