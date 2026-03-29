/**
 * Product launch OG image template.
 * Bold, centered layout showcasing a product name, tagline, and key features.
 */

import { div, span, img } from '../helpers.js';

/**
 * Create a product launch OG image card.
 *
 * @param {object} data
 * @param {string} data.name - Product name
 * @param {string} [data.tagline] - Short tagline
 * @param {string} [data.logo] - Logo URL or data URI
 * @param {string[]} [data.features] - Up to 3 feature highlights
 * @param {string} [data.background='linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'] - Background
 * @param {string} [data.accentColor='#818CF8'] - Accent color for features
 */
export function productLaunchCard({
  name,
  tagline,
  logo,
  features = [],
  background = 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  accentColor = '#818CF8',
}) {
  const children = [];

  // Logo
  if (logo) {
    children.push(
      div({ display: 'flex', marginBottom: 24 }, [
        img(logo, { width: 64, height: 64, borderRadius: 12 }),
      ])
    );
  }

  // Product name
  children.push(
    div({ fontSize: 64, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }, name)
  );

  // Tagline
  if (tagline) {
    children.push(
      div({ fontSize: 24, color: 'rgba(255,255,255,0.6)', marginTop: 12, maxWidth: 800 }, tagline)
    );
  }

  // Features
  if (features.length > 0) {
    const featureNodes = features.slice(0, 3).map(f =>
      div(
        {
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 18, color: 'rgba(255,255,255,0.8)',
        },
        [
          div({ width: 6, height: 6, borderRadius: 3, background: accentColor }),
          span({}, f),
        ]
      )
    );
    children.push(
      div({ display: 'flex', gap: 32, marginTop: 40 }, featureNodes)
    );
  }

  return div(
    {
      width: 1200, height: 630, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '60px', background, fontFamily: 'Inter',
    },
    children
  );
}
