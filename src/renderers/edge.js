/**
 * Edge renderer using @resvg/resvg-wasm.
 *
 * Usage:
 *   import { initWasm, svgToPng } from 'og-image-kit/edge';
 *   import resvgWasm from '@resvg/resvg-wasm/index_bg.wasm';
 *
 *   await initWasm(resvgWasm);
 *   // Then pass { renderer: { svgToPng } } to generateOGImage
 */

let initialized = false;
let ResvgClass = null;

/**
 * Initialize the WASM module. Must be called once before svgToPng.
 * @param {WebAssembly.Module | ArrayBuffer | Response} wasmModule - The WASM module to initialize with
 */
export async function initWasm(wasmModule) {
  if (initialized) return;
  const mod = await import('@resvg/resvg-wasm');
  await mod.initWasm(wasmModule);
  ResvgClass = mod.Resvg;
  initialized = true;
}

/**
 * Convert SVG string to PNG using resvg-wasm.
 * Requires initWasm() to have been called first.
 * @param {string} svg - SVG markup
 * @param {number} width - Output width
 * @returns {Uint8Array} PNG data
 */
export function svgToPng(svg, width) {
  if (!initialized) {
    throw new Error('og-image-kit/edge: Call initWasm() before svgToPng()');
  }
  const resvg = new ResvgClass(svg, {
    fitTo: { mode: 'width', value: width },
  });
  return resvg.render().asPng();
}
