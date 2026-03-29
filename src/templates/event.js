/**
 * Event OG image template.
 * Clear layout with date prominence, title, and event details.
 */

import { div, span } from '../helpers.js';

/**
 * Create an event OG image card.
 *
 * @param {object} data
 * @param {string} data.title - Event title
 * @param {string} [data.date] - Event date (e.g. "March 15, 2026")
 * @param {string} [data.time] - Event time (e.g. "7:00 PM IST")
 * @param {string} [data.location] - Venue or "Online"
 * @param {string} [data.organizer] - Organizer name
 * @param {string} [data.accentColor='#F59E0B'] - Accent color
 * @param {string} [data.background='linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'] - Background
 */
export function eventCard({
  title,
  date,
  time,
  location,
  organizer,
  accentColor = '#F59E0B',
  background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
}) {
  const children = [];

  // Date badge
  if (date) {
    children.push(
      div(
        {
          display: 'flex', padding: '8px 20px', borderRadius: 8,
          background: accentColor, color: '#000', fontSize: 18,
          fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
        },
        date
      )
    );
  }

  // Title
  children.push(
    div(
      {
        fontSize: 52, fontWeight: 700, color: 'white', lineHeight: 1.2,
        marginTop: 24, maxWidth: 900, textAlign: 'center',
      },
      title
    )
  );

  // Details row
  const details = [];
  if (time) details.push(time);
  if (location) details.push(location);
  if (details.length > 0) {
    children.push(
      div(
        { display: 'flex', gap: 24, marginTop: 24, fontSize: 22, color: 'rgba(255,255,255,0.7)' },
        details.map(d => span({}, d))
      )
    );
  }

  // Organizer
  if (organizer) {
    children.push(
      div(
        { fontSize: 16, color: 'rgba(255,255,255,0.4)', marginTop: 'auto', textTransform: 'uppercase', letterSpacing: '0.1em' },
        `Hosted by ${organizer}`
      )
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
