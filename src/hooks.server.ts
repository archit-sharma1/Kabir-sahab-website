import type { Handle } from '@sveltejs/kit/hooks';
import portrait from '#lib/assets/kabir-saheb.png?enhanced';

// The portrait is the largest element on the home page. Its preload must come
// before SvelteKit's script preloads, or the browser queues it behind them
// (measured: LCP 2.0 s vs 4.0 s on a throttled connection). Component <head>
// tags always come after SvelteKit's own, so the tag is inserted here into
// the %kabir.portrait-preload% placeholder in app.html. It runs when pages are
// prerendered, and uses the same hashed AVIF files as <enhanced:img>.
const PORTRAIT_PRELOAD = `<link rel="preload" as="image" type="image/avif" imagesrcset="${portrait.sources.avif}" fetchpriority="high" />`;

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%kabir.portrait-preload%', PORTRAIT_PRELOAD)
	});
