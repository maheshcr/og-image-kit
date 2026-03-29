/**
 * Hono on Cloudflare Workers — OG Image Route (Edge)
 *
 * Install: npm install hono og-image-kit @resvg/resvg-wasm
 *
 * Usage: /api/og?title=Hello+World
 */

import { Hono } from 'hono';
import { generateOGImage, div, h1, p, loadFontAsync } from 'og-image-kit';
import { initWasm, svgToPng } from 'og-image-kit/edge';
import resvgWasm from '@resvg/resvg-wasm/index_bg.wasm';

const app = new Hono();

let fontsLoaded = null;

async function getFonts() {
  if (fontsLoaded) return fontsLoaded;
  await initWasm(resvgWasm);
  const interData = await loadFontAsync('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf');
  fontsLoaded = [{ name: 'Inter', data: interData, weight: 400, style: 'normal' }];
  return fontsLoaded;
}

app.get('/api/og', async (c) => {
  const title = c.req.query('title') || 'Untitled';
  const fonts = await getFonts();

  const markup = div(
    {
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      width: 1200, height: 630, padding: 60,
      background: 'linear-gradient(135deg, #0F172A, #1E293B)',
      fontFamily: 'Inter',
    },
    [
      h1({ color: 'white', textAlign: 'center' }, title),
      p({ color: 'rgba(255,255,255,0.6)', marginTop: 16 }, 'Generated with og-image-kit'),
    ]
  );

  const png = await generateOGImage(markup, { fonts, renderer: { svgToPng } });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
});

export default app;
