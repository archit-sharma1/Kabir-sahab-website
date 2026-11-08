import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		// Build-time image optimisation for <enhanced:img> (AVIF/WebP, 1x/2x). Must come before sveltekit().
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in Svelte 6.
				runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
			},
			// Every page is prerendered to plain HTML in build/, which Cloudflare
			// serves as static assets (no server code runs).
			// Inline the stylesheet into each page so it doesn't block the first paint.
			inlineStyleThreshold: 32768,
			adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', precompress: false, strict: true }),
			// Content-Security-Policy as a <meta> tag on every page. In 'hash' mode
			// SvelteKit adds the hash of its own inline start-up script, so no
			// 'unsafe-inline' is needed. frame-ancestors can't go in a <meta> tag;
			// it is sent as a header from static/_headers instead.
			csp: {
				mode: 'hash',
				directives: {
					'default-src': ['self'],
					'script-src': ['self'],
					'style-src': ['self'],
					// SvelteKit's route announcer (tells screen readers about page
					// changes) is hidden with an inline style attribute. Style
					// attributes can't run code; <style> elements stay 'self' only.
					'style-src-attr': ['unsafe-inline'],
					'img-src': ['self'],
					'font-src': ['self'],
					'connect-src': ['self'],
					'object-src': ['none'],
					'base-uri': ['self'],
					'form-action': ['none']
				}
			}
		})
	],
	test: {
		include: ['src/**/*.test.ts']
	}
});
