/** Initialize the WASM module. Must be called once before svgToPng. */
export function initWasm(wasmModule: WebAssembly.Module | ArrayBuffer | Response): Promise<void>;

/** Convert SVG string to PNG using resvg-wasm. Requires initWasm() first. */
export function svgToPng(svg: string, width: number): Uint8Array;
