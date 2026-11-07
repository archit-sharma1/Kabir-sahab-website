import { readFileSync } from 'node:fs';
import { openSync, type Font } from 'fontkit';
import { describe, expect, it } from 'vitest';
import { dohas } from './dohas.js';

// The Devanagari font is trimmed at build time (scripts/subset-fonts.mjs,
// which `npm test` runs first). Every character the site draws in it must
// still be in the trimmed font, or it would fall back to a system font.
const DEVANAGARI = /[ऀ-ॿ᳐-᳹‌‍₨₹⃰◌꠰-꠹꣠-ꣿ]/gu;
const font = openSync('src/lib/assets/fonts/tiro-devanagari-hindi-subset.woff2') as Font;
const full = openSync('fonts-src/tiro-devanagari-hindi-devanagari-400-normal.woff2') as Font;

describe('trimmed Devanagari font', () => {
	it('contains every Devanagari character in the dohas, sources and components', () => {
		const text = [
			...dohas.flatMap((d) => [d.text, d.source ?? '']),
			readFileSync('src/lib/components/SiteHeader.svelte', 'utf8')
		].join('');
		const missing = [...new Set(text.match(DEVANAGARI) ?? [])].filter((ch) => !font.hasGlyphForCodePoint(ch.codePointAt(0)!));
		expect(missing).toEqual([]);
	});

	it('is much smaller than the full font', () => {
		expect(font.numGlyphs).toBeLessThan(full.numGlyphs / 2);
	});
});
