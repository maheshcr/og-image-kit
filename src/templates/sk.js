/**
 * SanskritKatha-style templates.
 * Dark gradient aesthetic with gold accents.
 */

import { div } from '../helpers.js';

/**
 * Create a standard dark gradient background container (1200x630).
 */
export function darkGradientContainer(children, overrides = {}) {
  return div({
    width: 1200, height: 630, padding: '48px 60px',
    background: 'linear-gradient(135deg, #1a0f2e 0%, #2D1B44 30%, #3D1F0F 70%, #4A2010 100%)',
    color: 'white', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter',
    ...overrides,
  }, children);
}

/**
 * Create a gold gradient stat display.
 */
export function goldStat(value, label) {
  return div({ display: 'flex', flexDirection: 'column', alignItems: 'center' }, [
    div({ fontSize: 48, fontWeight: 700, color: '#FFD700' }, String(value)),
    div({ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginTop: 4 }, label),
  ]);
}

/**
 * Create a horizontal divider line.
 */
export function divider(width = 120) {
  return div({ width, height: 1, background: 'rgba(255,200,100,0.4)', margin: '14px 0 24px' });
}
