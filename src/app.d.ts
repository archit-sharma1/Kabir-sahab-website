// See https://svelte.dev/docs/kit/types#app.d.ts
import type { Doha } from '#lib/dohas.js';

declare global {
	namespace App {
		interface PageData {
			/** Set on /doha/[id] pages: the doha that page is about. */
			doha?: Doha;
		}
	}
}

export {};
