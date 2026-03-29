/**
 * VDOM helpers for building satori markup trees.
 * Zero dependencies — safe for edge runtimes.
 */

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

/**
 * Create an img VDOM node for satori.
 * @param {string} src - Image URL, data URI, or base64 string
 * @param {Record<string, any>} [style] - CSS-like style object
 */
export function img(src, style = {}) {
  return { type: 'img', props: { src, style } };
}

/**
 * Create an h1-styled div (fontSize 48, bold).
 */
export function h1(style, children) {
  return div({ fontSize: 48, fontWeight: 700, ...style }, children);
}

/**
 * Create an h2-styled div (fontSize 36, bold).
 */
export function h2(style, children) {
  return div({ fontSize: 36, fontWeight: 700, ...style }, children);
}

/**
 * Create a paragraph-styled div (fontSize 20, lineHeight 1.5).
 */
export function p(style, children) {
  return div({ fontSize: 20, lineHeight: 1.5, ...style }, children);
}

/**
 * Truncate text to a maximum length with a suffix.
 * @param {string} text - Input text
 * @param {number} maxLength - Maximum character count (including suffix)
 * @param {string} [suffix='...'] - Suffix to append when truncated
 * @returns {string}
 */
export function truncate(text, maxLength, suffix = '...') {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length).trimEnd() + suffix;
}
