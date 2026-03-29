/**
 * Express — OG Image Route
 *
 * Usage: /api/og?title=Hello+World&author=Jane+Doe
 */

import express from 'express';
import { generateOGImage, blogPostCard, loadDefaultFonts } from 'og-image-kit';

const app = express();
const fonts = loadDefaultFonts();

app.get('/api/og', async (req, res) => {
  const { title = 'Untitled', author = '' } = req.query;

  const markup = blogPostCard({
    title,
    author,
    siteName: 'My Blog',
    accentColor: '#3B82F6',
  });

  const png = await generateOGImage(markup, { fonts });

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.end(png);
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
