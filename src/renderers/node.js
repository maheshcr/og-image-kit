/**
 * Node.js renderer using @resvg/resvg-js.
 */

import { Resvg } from '@resvg/resvg-js';

/**
 * Convert SVG string to PNG buffer.
 * @param {string} svg - SVG markup
 * @param {number} width - Output width
 * @returns {Uint8Array} PNG data
 */
export function svgToPng(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
  });
  return resvg.render().asPng();
}
