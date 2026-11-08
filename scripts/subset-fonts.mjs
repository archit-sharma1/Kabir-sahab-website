// Trim the Tiro Devanagari Hindi font to exactly the glyphs the site draws.
//
// Runs automatically before `dev`, `build` and `test` (see package.json), so
// dohas added later are always covered: their glyphs get into the font on the
// next build. The full font lives in fonts-src/ (not served); the trimmed font
// is written to src/lib/assets/fonts/, where Vite gives it a hashed,
// year-cached file name via the url() in src/app.css.
//
// How: every run of Devanagari text in src/ (all dohas, sources and component
// text) is shaped with HarfBuzz, the shaping engine Chrome and Android use, to
// find the exact glyphs it renders to, conjuncts included (and the
// intermediate glyphs the conjunct rules pass through). The font is then
// subset to those glyphs (plus each character on its own), keeping the layout
// rules that produce them. Combinations that never occur in the text are
// dropped; that is where the size saving comes from.
//
// Only text rendered in this font is affected: the doha card, search results,
// history and the kicker, all of which come from src/. The search box and the
// status line use other font stacks, so typed Hindi always renders in the
// system font. The page text itself, and what search engines index, is plain
// Unicode and is never affected by font subsetting.

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import fontverter from 'fontverter';
import * as hb from 'harfbuzzjs';

const require = createRequire(import.meta.url);

const SOURCE = 'fonts-src/tiro-devanagari-hindi-devanagari-400-normal.woff2';
const OUT_DIR = 'src/lib/assets/fonts';
const OUT = join(OUT_DIR, 'tiro-devanagari-hindi-subset.woff2');

// Characters in this face's unicode-range (see src/app.css).
const DEVA = '\\u0900-\\u097F\\u1CD0-\\u1CF9\\u200C\\u200D\\u20A8\\u20B9\\u20F0\\u25CC\\uA830-\\uA839\\uA8E0-\\uA8FF';
const DEVA_CHAR = new RegExp(`[${DEVA}]`, 'gu');
// A run of Devanagari, allowing the spaces and punctuation between words, so
// shaping sees whole words exactly as the browser will.
const DEVA_RUN = new RegExp(`[${DEVA}][${DEVA}\\s,.!?;:'"()—–-]*`, 'gu');

// Always kept as standalone glyphs: joiners, dotted circle, dandas and digits.
const ALWAYS = '‌‍◌।॥०१२३४५६७८९';

async function* sourceFiles(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name !== 'assets') yield* sourceFiles(path);
		} else if (/\.(ts|svelte|html)$/.test(entry.name) && !entry.name.endsWith('.test.ts')) {
			yield path;
		}
	}
}

/** Every run of Devanagari text in src/, after JSON-style "\n" escapes are turned into newlines. */
export async function collectRuns() {
	const runs = new Set([...ALWAYS]);
	for await (const path of sourceFiles('src')) {
		const text = (await readFile(path, 'utf8')).replace(/\\n/g, '\n');
		for (const run of text.match(DEVA_RUN) ?? []) runs.add(run);
	}
	return runs;
}

/** Shape each run (and each character alone) and return the glyph ids used, plus the characters. */
function shapeRuns(ttf, runs) {
	const blob = new hb.Blob(ttf);
	const face = new hb.Face(blob, 0);
	const font = new hb.Font(face);
	const glyphs = new Set([0]); // .notdef
	const chars = new Set();
	const shapeOne = (text) => {
		const buf = new hb.Buffer();
		buf.addText(text);
		buf.guessSegmentProperties();
		// Conjuncts form in several steps (e.g. क + ् → half-क, then half-क + य
		// → क्य), so keep the glyphs from *every* step of the shaping trace, not
		// just the final ones; otherwise a later rule has nothing to start from.
		for (const step of hb.shapeWithTrace(font, buf, [], 0, 0)) {
			if (!step.glyphs) continue;
			for (const g of step.t) glyphs.add(g.g);
		}
		for (const g of buf.getGlyphInfos()) glyphs.add(g.codepoint);
	};
	for (const run of runs) {
		shapeOne(run);
		for (const ch of run.match(DEVA_CHAR) ?? []) chars.add(ch);
	}
	for (const ch of chars) shapeOne(ch);
	return { glyphs, chars };
}

/** Subset with HarfBuzz: keep these characters and glyphs, all layout features, no extra closure. */
async function subset(ttf, chars, glyphs) {
	const { instance } = await WebAssembly.instantiate(await readFile(require.resolve('harfbuzzjs/dist/harfbuzz-subset.wasm')));
	const w = instance.exports;
	w._initialize();
	const heap = () => new Uint8Array(w.memory.buffer);

	const input = w.hb_subset_input_create_or_fail();
	const ptr = w.malloc(ttf.byteLength);
	heap().set(new Uint8Array(ttf), ptr);
	const blob = w.hb_blob_create(ptr, ttf.byteLength, 2 /* writable */, 0, 0);
	const face = w.hb_face_create(blob, 0);
	w.hb_blob_destroy(blob);

	const features = w.hb_subset_input_set(input, 6 /* layout feature tags */);
	w.hb_set_clear(features);
	w.hb_set_invert(features); // keep all layout features
	w.hb_subset_input_set_flags(input, w.hb_subset_input_get_flags(input) | 0x200 /* no layout closure */);

	const unicodes = w.hb_subset_input_unicode_set(input);
	for (const ch of chars) w.hb_set_add(unicodes, ch.codePointAt(0));
	const gids = w.hb_subset_input_glyph_set(input);
	for (const g of glyphs) w.hb_set_add(gids, g);

	const out = w.hb_subset_or_fail(face, input);
	w.hb_subset_input_destroy(input);
	if (out === 0) throw new Error('HarfBuzz could not subset the font');
	const resultBlob = w.hb_face_reference_blob(out);
	const data = w.hb_blob_get_data(resultBlob, 0);
	const length = w.hb_blob_get_length(resultBlob);
	const result = Buffer.from(heap().subarray(data, data + length));
	w.hb_blob_destroy(resultBlob);
	w.hb_face_destroy(out);
	w.hb_face_destroy(face);
	w.free(ptr);
	return result;
}

const full = await readFile(SOURCE);
const ttf = await fontverter.convert(full, 'truetype');
const runs = await collectRuns();
const { glyphs, chars } = shapeRuns(ttf, runs);
const woff2 = await fontverter.convert(await subset(ttf, [...chars, ...ALWAYS], glyphs), 'woff2', 'truetype');
await mkdir(OUT_DIR, { recursive: true });
await writeFile(OUT, woff2);

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
console.log(
	`subset-fonts: ${runs.size} text runs, ${chars.size} characters, ${glyphs.size} glyphs → ${OUT} (${kb(woff2.length)}, full font ${kb(full.length)})`
);
