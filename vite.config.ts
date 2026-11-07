import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in Svelte 6.
				runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
			},
			// Every page is prerendered to plain HTML in build/, which Cloudflare
			// serves as static assets (no server code runs).
			adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', precompress: false, strict: true })
		})
	],
	test: {
		include: ['src/**/*.test.ts']
	}
});
