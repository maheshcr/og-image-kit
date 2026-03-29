/**
 * Blog post OG image template.
 * Clean, readable layout with title, author, and metadata.
 */

import { div, span, img, truncate } from '../helpers.js';

/**
 * Create a blog post OG image card.
 *
 * @param {object} data
 * @param {string} data.title - Post title
 * @param {string} [data.author] - Author name
 * @param {string} [data.date] - Publication date
 * @param {string} [data.readTime] - e.g. "5 min read"
 * @param {string} [data.siteName] - Site or blog name
 * @param {string} [data.logo] - Logo URL or data URI
 * @param {string} [data.accentColor='#3B82F6'] - Accent color
 */
export function blogPostCard({
  title,
  author,
  date,
  readTime,
  siteName,
  logo,
  accentColor = '#3B82F6',
}) {
  const topBar = [];
  if (logo) {
    topBar.push(img(logo, { width: 32, height: 32, borderRadius: 6 }));
  }
  if (siteName) {
    topBar.push(span({ fontSize: 18, color: '#6B7280' }, siteName));
  }

  const metaParts = [];
  if (author) metaParts.push(author);
  if (date) metaParts.push(date);
  if (readTime) metaParts.push(readTime);

  const children = [];

  // Top bar
  if (topBar.length > 0) {
    children.push(
      div({ display: 'flex', alignItems: 'center', gap: 12 }, topBar)
    );
  }

  // Title
  children.push(
    div(
      { fontSize: 56, fontWeight: 700, color: '#111827', lineHeight: 1.2, marginTop: 'auto' },
      truncate(title, 80)
    )
  );

  // Bottom section
  const bottom = [];
  if (metaParts.length > 0) {
    bottom.push(
      div({ display: 'flex', alignItems: 'center', gap: 8, fontSize: 20, color: '#6B7280' },
        metaParts.join('  \u00B7  ')
      )
    );
  }
  // Accent bar
  bottom.push(
    div({ width: 120, height: 4, background: accentColor, borderRadius: 2, marginTop: 16 })
  );

  children.push(
    div({ display: 'flex', flexDirection: 'column', marginTop: 'auto' }, bottom)
  );

  return div(
    {
      width: 1200, height: 630, display: 'flex', flexDirection: 'column',
      padding: '60px', background: 'white', fontFamily: 'Inter',
    },
    children
  );
}
