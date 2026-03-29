export interface VNode {
  type: string;
  props: {
    src?: string;
    style?: Record<string, string | number>;
    children?: string | VNode | (string | VNode)[];
  };
}

export interface FontDescriptor {
  name: string;
  data: Buffer | ArrayBuffer | Uint8Array;
  weight: number;
  style: 'normal' | 'italic';
}

export interface Renderer {
  svgToPng: (svg: string, width: number) => Uint8Array;
}

export interface GenerateOptions {
  width?: number;
  height?: number;
  fonts: FontDescriptor[];
  /** Output format. Defaults to 'png'. */
  format?: 'png' | 'svg';
  /** Enable emoji rendering. */
  emoji?: 'twemoji';
  /** Custom renderer (e.g. from 'og-image-kit/edge'). */
  renderer?: Renderer;
}

// --- Helpers (zero dependencies) ---

/** Create a div VDOM node for satori. */
export function div(style: Record<string, any>, children?: string | VNode | (string | VNode)[]): VNode;

/** Create a span VDOM node. */
export function span(style: Record<string, any>, children?: string | VNode | (string | VNode)[]): VNode;

/** Create an img VDOM node. src can be a URL, data URI, or base64 string. */
export function img(src: string, style?: Record<string, any>): VNode;

/** Create an h1-styled div (fontSize 48, bold). */
export function h1(style: Record<string, any>, children?: string | VNode | (string | VNode)[]): VNode;

/** Create an h2-styled div (fontSize 36, bold). */
export function h2(style: Record<string, any>, children?: string | VNode | (string | VNode)[]): VNode;

/** Create a paragraph-styled div (fontSize 20, lineHeight 1.5). */
export function p(style: Record<string, any>, children?: string | VNode | (string | VNode)[]): VNode;

/** Truncate text to a maximum length with a suffix. */
export function truncate(text: string, maxLength: number, suffix?: string): string;

// --- Fonts ---

/** Load a font file synchronously (Node only). Checks bundled fonts first. */
export function loadFont(nameOrPath: string): Buffer;

/** Load a font file asynchronously. Accepts URLs or file paths. Edge-compatible. */
export function loadFontAsync(urlOrPath: string): Promise<Uint8Array>;

/** Load a font from Google Fonts. Optionally subset with `text` parameter. */
export function loadGoogleFont(family: string, weight?: number, text?: string): Promise<Uint8Array>;

/** Load the bundled default font set synchronously (Node only). */
export function loadDefaultFonts(): FontDescriptor[];

/** Load the bundled default font set asynchronously (edge-compatible). */
export function loadDefaultFontsAsync(): Promise<FontDescriptor[]>;

// --- Generator ---

/** Generate an OG image. Returns PNG buffer (default) or SVG string. */
export function generateOGImage(markup: VNode, options?: GenerateOptions): Promise<Uint8Array | string>;

// --- Templates ---

/** Dark gradient container (1200x630). SanskritKatha aesthetic. */
export function darkGradientContainer(children: (string | VNode)[], overrides?: Record<string, any>): VNode;

/** Gold gradient stat display. */
export function goldStat(value: string | number, label: string): VNode;

/** Horizontal divider line. */
export function divider(width?: number): VNode;

// Generic templates

export interface BlogPostCardData {
  title: string;
  author?: string;
  date?: string;
  readTime?: string;
  siteName?: string;
  logo?: string;
  accentColor?: string;
}
/** Blog post OG image card. */
export function blogPostCard(data: BlogPostCardData): VNode;

export interface ProductLaunchCardData {
  name: string;
  tagline?: string;
  logo?: string;
  features?: string[];
  background?: string;
  accentColor?: string;
}
/** Product launch OG image card. */
export function productLaunchCard(data: ProductLaunchCardData): VNode;

export interface EventCardData {
  title: string;
  date?: string;
  time?: string;
  location?: string;
  organizer?: string;
  accentColor?: string;
  background?: string;
}
/** Event OG image card. */
export function eventCard(data: EventCardData): VNode;

export interface ProfileCardData {
  name: string;
  title?: string;
  avatar?: string;
  bio?: string;
  stats?: { label: string; value: string | number }[];
  background?: string;
}
/** Profile OG image card. */
export function profileCard(data: ProfileCardData): VNode;
