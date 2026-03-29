# Changelog

## 0.1.0 (2026-03-29)

Initial public release.

### Features

- VDOM helpers: `div`, `span`, `img`, `h1`, `h2`, `p`
- Text truncation: `truncate(text, maxLength, suffix?)`
- Sync font loading: `loadFont`, `loadDefaultFonts` (Node)
- Async font loading: `loadFontAsync`, `loadDefaultFontsAsync` (edge-compatible)
- Google Fonts: `loadGoogleFont(family, weight?, text?)`
- Image generation: `generateOGImage` with PNG and SVG output
- Emoji support via Twemoji (`emoji: 'twemoji'` option)
- Edge runtime support via `og-image-kit/edge` with `@resvg/resvg-wasm`
- Custom renderer adapter pattern for edge PNG output
- Bundled fonts: Inter (Regular, Bold), Noto Sans Devanagari (Regular, Bold)

### Templates

- `blogPostCard` — blog post with title, author, date, accent bar
- `productLaunchCard` — product name, tagline, feature highlights
- `eventCard` — event title, date badge, time, location, organizer
- `profileCard` — avatar, name, title, bio, stats row
- `darkGradientContainer` — SanskritKatha-style dark gradient layout
- `goldStat` — gold accent stat display
- `divider` — horizontal divider line
