import { describe, expect, it } from 'vitest';
import { dohas } from './dohas.js';
import { createSearch } from './search.js';

const search = createSearch(dohas);

function ids(query: string): number[] {
	const result = search(query);
	if (result.status !== 'done') throw new Error(`"${query}" returned ${result.status}`);
	return result.matches.map((d) => d.id);
}

// The required regression searches from PROJECT_INSTRUCTIONS.md, section 6.
describe('required regression searches', () => {
	it.each([
		['काली चादर', [55]],
		['गुरु बेचारा', [55]],
		['चौथे राम', [56]],
		['four forms of ram', [56]],
		['ऐसी वाणी', [57]],
		['speak such words', [57]],
		['प्रभुता चेरी', [58]],
		['power itself becomes', [58]],
		['घट घट राम', [11]]
	])('%s → %j', (query, expected) => {
		expect(ids(query)).toEqual(expected);
	});

	it('diamond → 2', () => expect(ids('diamond')).toHaveLength(2));
	it('marketplace → 3', () => expect(ids('marketplace')).toHaveLength(3));

	it('ram → 3, never "trample" (#2)', () => {
		expect(ids('ram')).toHaveLength(3);
		expect(ids('ram')).not.toContain(2);
	});

	it.each(['mann', 'guru', 'love', 'ego', 'truth', 'death'])('placeholder example "%s" finds something', (q) => {
		expect(ids(q).length).toBeGreaterThan(0);
	});

	it('ignores case and extra spaces', () => {
		expect(ids('  DIAMOND   ')).toEqual(ids('diamond'));
		expect(ids('Four   Forms of RAM')).toEqual([56]);
	});

	it('needs at least 2 letters', () => {
		expect(search('a')).toEqual({ status: 'too-short' });
		expect(search('   ')).toEqual({ status: 'empty' });
	});

	it('folds nukta: बजार finds the बाज़ार dohas', () => {
		expect(ids('बजार')).toEqual(ids('bazar'));
	});
});
