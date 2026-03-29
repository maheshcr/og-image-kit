/**
 * Profile card OG image template.
 * Centered layout with avatar, name, title, bio, and stats.
 */

import { div, span, img } from '../helpers.js';

/**
 * Create a profile OG image card.
 *
 * @param {object} data
 * @param {string} data.name - Person's name
 * @param {string} [data.title] - Role or title
 * @param {string} [data.avatar] - Avatar URL or data URI
 * @param {string} [data.bio] - Short bio (1-2 lines)
 * @param {{ label: string, value: string | number }[]} [data.stats] - Stats to display (up to 4)
 * @param {string} [data.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'] - Background
 */
export function profileCard({
  name,
  title,
  avatar,
  bio,
  stats = [],
  background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}) {
  const children = [];

  // Avatar
  if (avatar) {
    children.push(
      div({ display: 'flex', marginBottom: 20 }, [
        img(avatar, { width: 96, height: 96, borderRadius: 48 }),
      ])
    );
  }

  // Name
  children.push(
    div({ fontSize: 48, fontWeight: 700, color: 'white' }, name)
  );

  // Title
  if (title) {
    children.push(
      div({ fontSize: 24, color: 'rgba(255,255,255,0.7)', marginTop: 8 }, title)
    );
  }

  // Bio
  if (bio) {
    children.push(
      div(
        {
          fontSize: 20, color: 'rgba(255,255,255,0.6)', marginTop: 16,
          maxWidth: 700, textAlign: 'center', lineHeight: 1.5,
        },
        bio
      )
    );
  }

  // Stats
  if (stats.length > 0) {
    const statNodes = stats.slice(0, 4).map(s =>
      div({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }, [
        div({ fontSize: 32, fontWeight: 700, color: 'white' }, String(s.value)),
        div(
          {
            fontSize: 12, color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          },
          s.label
        ),
      ])
    );
    children.push(
      div(
        {
          display: 'flex', gap: 48, marginTop: 32,
          padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.15)',
        },
        statNodes
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
