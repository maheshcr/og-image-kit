# og-image-kit

The simplest way to generate Open Graph images. VDOM helpers + [satori](https://github.com/vercel/satori) + [resvg](https://github.com/nicholasgasior/resvg-js). Works in Node, edge runtimes, and every framework.

## Install

```bash
npm install og-image-kit
# or
pnpm add og-image-kit
```

## Quick Start

```js
import { generateOGImage, div, loadDefaultFonts } from 'og-image-kit';

const png = await generateOGImage(
  div(
    { display: 'flex', width: 1200, height: 630, background: '#1a0f2e', color: 'white', alignItems: 'center', justifyContent: 'center' },
    [div({ fontSize: 48 }, 'Hello World')]
  ),
  { fonts: loadDefaultFonts() }
);

// png is a Uint8Array — serve it, write it to disk, whatever you need
```

## API Reference

### VDOM Helpers

Build satori-compatible markup trees with zero dependencies. These work in any runtime.

| Function | Description |
|----------|-------------|
| `div(style, children?)` | Create a div node |
| `span(style, children?)` | Create a span node |
| `img(src, style?)` | Create an img node (URL, data URI, or base64) |
| `h1(style, children?)` | Div with `fontSize: 48, fontWeight: 700` defaults |
| `h2(style, children?)` | Div with `fontSize: 36, fontWeight: 700` defaults |
| `p(style, children?)` | Div with `fontSize: 20, lineHeight: 1.5` defaults |
| `truncate(text, maxLength, suffix?)` | Truncate text with `...` (or custom suffix) |

Style objects use the same CSS-like properties that [satori supports](https://github.com/vercel/satori#css). Children can be a string, a single node, or an array of nodes.

```js
import { div, h1, p, img, truncate } from 'og-image-kit';

const card = div(
  { display: 'flex', flexDirection: 'column', width: 1200, height: 630, padding: 60, background: '#fff' },
  [
    img('https://example.com/logo.png', { width: 48, height: 48 }),
    h1({ color: '#111' }, truncate(title, 60)),
    p({ color: '#666' }, 'A description here'),
  ]
);
```

### Font Loading

| Function | Runtime | Description |
|----------|---------|-------------|
| `loadFont(nameOrPath)` | Node | Sync. Checks bundled fonts first, then file path |
| `loadDefaultFonts()` | Node | Sync. Returns Inter + Noto Sans Devanagari (Regular & Bold) |
| `loadFontAsync(urlOrPath)` | Any | Async. Fetches from URL or reads from disk |
| `loadDefaultFontsAsync()` | Any | Async version of `loadDefaultFonts()` |
| `loadGoogleFont(family, weight?, text?)` | Any | Load a font from Google Fonts |

**Bundled fonts:** Inter (Regular, Bold) and Noto Sans Devanagari (Regular, Bold) are included in the package.

```js
// Node — sync
const fonts = loadDefaultFonts();

// Edge or Node — async
const fonts = await loadDefaultFontsAsync();

// Google Fonts
import { loadGoogleFont } from 'og-image-kit';
const roboto = await loadGoogleFont('Roboto', 400);
const fonts = [{ name: 'Roboto', data: roboto, weight: 400, style: 'normal' }];

// Custom font file
import { loadFont } from 'og-image-kit';
const myFont = loadFont('/path/to/MyFont.ttf');
```

### Image Generation

```js
const result = await generateOGImage(markup, options);
```

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | `number` | `1200` | Image width in pixels |
| `height` | `number` | `630` | Image height in pixels |
| `fonts` | `FontDescriptor[]` | *required* | Array of font descriptors |
| `format` | `'png' \| 'svg'` | `'png'` | Output format |
| `emoji` | `'twemoji'` | `undefined` | Enable emoji rendering |
| `renderer` | `{ svgToPng }` | Node default | Custom renderer (for edge) |

**Returns:** `Uint8Array` (PNG) or `string` (SVG).

### Templates

Ready-made OG image layouts. Import from `og-image-kit` or `og-image-kit/templates`.

#### `blogPostCard(data)`

```js
import { blogPostCard, generateOGImage, loadDefaultFonts } from 'og-image-kit';

const png = await generateOGImage(
  blogPostCard({
    title: 'How to Generate OG Images',
    author: 'Jane Doe',
    date: 'Mar 29, 2026',
    readTime: '5 min read',
    siteName: 'My Blog',
    logo: 'https://example.com/logo.png', // optional
    accentColor: '#3B82F6',               // optional
  }),
  { fonts: loadDefaultFonts() }
);
```

#### `productLaunchCard(data)`

```js
productLaunchCard({
  name: 'My Product',
  tagline: 'The best tool for the job',
  logo: 'https://example.com/icon.png',
  features: ['Fast', 'Simple', 'Open Source'],
  background: 'linear-gradient(135deg, #0F172A, #1E293B)', // optional
  accentColor: '#818CF8', // optional
})
```

#### `eventCard(data)`

```js
eventCard({
  title: 'AI Workshop 2026',
  date: 'April 15, 2026',
  time: '7:00 PM IST',
  location: 'Online',
  organizer: 'Acme Corp',
  accentColor: '#F59E0B', // optional
})
```

#### `profileCard(data)`

```js
profileCard({
  name: 'Jane Doe',
  title: 'Software Engineer',
  avatar: 'https://example.com/avatar.jpg',
  bio: 'Building tools for the web.',
  stats: [
    { label: 'Posts', value: 48 },
    { label: 'Stars', value: 256 },
  ],
  background: 'linear-gradient(135deg, #667eea, #764ba2)', // optional
})
```

#### SanskritKatha Templates

```js
import { darkGradientContainer, goldStat, divider, div } from 'og-image-kit';

const markup = darkGradientContainer([
  goldStat(600, 'stories'),
  divider(),
  div({ fontSize: 24, color: 'white' }, 'SanskritKatha'),
]);
```

## Edge Runtime Usage

og-image-kit works in edge runtimes (Cloudflare Workers, Vercel Edge, Deno Deploy).

**SVG mode (zero extra dependencies):**

```js
import { generateOGImage, div, loadFontAsync } from 'og-image-kit';

const fontData = await loadFontAsync('https://cdn.example.com/Inter-Regular.ttf');
const fonts = [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' }];

const svg = await generateOGImage(
  div({ display: 'flex', width: 1200, height: 630, background: '#111', color: '#fff', fontSize: 48 }, 'Hello'),
  { fonts, format: 'svg' }
);
```

**PNG mode (requires `@resvg/resvg-wasm`):**

```bash
npm install @resvg/resvg-wasm
```

```js
import { generateOGImage, div, loadFontAsync } from 'og-image-kit';
import { initWasm, svgToPng } from 'og-image-kit/edge';
import resvgWasm from '@resvg/resvg-wasm/index_bg.wasm';

await initWasm(resvgWasm);

const png = await generateOGImage(markup, {
  fonts,
  renderer: { svgToPng },
});
```

## Emoji Support

Enable Twemoji rendering by passing `emoji: 'twemoji'`:

```js
const png = await generateOGImage(
  div({ display: 'flex', width: 1200, height: 630, fontSize: 48 }, 'Hello World 🎉🚀'),
  { fonts: loadDefaultFonts(), emoji: 'twemoji' }
);
```

Emojis are fetched from the Twemoji CDN at render time.

## Framework Examples

See the [examples/](./examples/) directory for complete, copy-paste-ready code:

- [Next.js App Router](./examples/nextjs-app-router.js)
- [SvelteKit](./examples/sveltekit.js)
- [Express](./examples/express.js)
- [Hono (Cloudflare Workers)](./examples/hono-edge.js)

## Prompts for AI Coding Tools

When using an AI coding tool (Claude Code, Cursor, Copilot, etc.), you can use these prompts to integrate og-image-kit:

> I'm using the `og-image-kit` npm package. Create an API route that generates OG images. Use `generateOGImage`, `div`, and `loadDefaultFonts`. Return the PNG buffer with content-type `image/png`.

> Using `og-image-kit`, create a dynamic OG image endpoint that accepts `?title=` and `?author=` query params. Use the `blogPostCard` template with `loadDefaultFonts()`.

> Build a custom OG image layout with `og-image-kit` using the `div()`, `h1()`, `img()`, and `p()` VDOM helpers. Use a gradient background, a logo in the corner, and centered title text.

## License

MIT
