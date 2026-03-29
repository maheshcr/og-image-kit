export interface VNode {
	type: string;
	props: {
		style?: Record<string, string | number>;
		children?: string | VNode | (string | VNode)[];
	};
}

export interface FontDescriptor {
	name: string;
	data: Buffer | ArrayBuffer;
	weight: number;
	style: 'normal' | 'italic';
}

export interface GenerateOptions {
	width?: number;
	height?: number;
	fonts: FontDescriptor[];
}

/** Create a div VDOM node for satori. */
export function div(style: Record<string, any>, children?: string | VNode | (string | VNode)[]): VNode;

/** Create a span VDOM node. */
export function span(style: Record<string, any>, children?: string | VNode | (string | VNode)[]): VNode;

/** Load a font file from bundled fonts or a path. */
export function loadFont(nameOrPath: string): Buffer;

/** Load the bundled Inter + Noto Sans Devanagari font set. */
export function loadDefaultFonts(): FontDescriptor[];

/** Generate an OG image as a PNG buffer. */
export function generateOGImage(markup: VNode, options?: GenerateOptions): Promise<Buffer>;

/** Create a dark gradient container (1200x630). */
export function darkGradientContainer(children: (string | VNode)[], overrides?: Record<string, any>): VNode;

/** Create a gold gradient stat display. */
export function goldStat(value: string | number, label: string): VNode;

/** Create a horizontal divider line. */
export function divider(width?: number): VNode;
