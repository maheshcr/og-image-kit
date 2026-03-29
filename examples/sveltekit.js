/**
 * SvelteKit — OG Image Endpoint
 *
 * File: src/routes/api/og/+server.js
 *
 * Usage: /api/og?title=Hello+World&author=Jane+Doe
 */

import { generateOGImage, blogPostCard, loadDefaultFonts } from 'og-image-kit';

const fonts = loadDefaultFonts();

export async function GET({ url }) {
  const title = url.searchParams.get('title') || 'Untitled';
  const author = url.searchParams.get('author') || '';

  const markup = blogPostCard({
    title,
    author,
    siteName: 'My Blog',
    accentColor: '#3B82F6',
  });

  const png = await generateOGImage(markup, { fonts });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
