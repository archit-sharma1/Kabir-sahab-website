import { describe, expect, it } from 'vitest';
import { dohas } from './dohas.js';

describe('doha corpus', () => {
	it('has 184 records', () => expect(dohas).toHaveLength(184));

	it('ids are unique positive integers', () => {
		const ids = dohas.map((d) => d.id);
		expect(new Set(ids).size).toBe(ids.length);
		expect(ids.every((id) => Number.isInteger(id) && id > 0)).toBe(true);
	});

	it('every record has Hindi text and an English meaning', () => {
		for (const d of dohas) {
			expect(d.text.trim(), `doha ${d.id}`).not.toBe('');
			expect(d.meaning.trim(), `doha ${d.id}`).not.toBe('');
		}
	});

	it('dohas 1–58 have two lines ending in । and ॥', () => {
		for (const d of dohas.filter((x) => x.id <= 58)) {
			const lines = d.text.split('\n');
			expect(lines, `doha ${d.id}`).toHaveLength(2);
			expect(lines[0].endsWith('।'), `doha ${d.id} line 1`).toBe(true);
			expect(lines[1].endsWith('॥'), `doha ${d.id} line 2`).toBe(true);
		}
	});

	it('every verse has at least two lines and ends with ॥', () => {
		for (const d of dohas) {
			expect(d.text.split('\n').length, `doha ${d.id}`).toBeGreaterThanOrEqual(2);
			expect(d.text.endsWith('॥'), `doha ${d.id}`).toBe(true);
		}
	});

	it('English meanings always say "Kabir Saheb", never bare "Kabir"', () => {
		for (const d of dohas) {
			expect(/\bKabir\b(?! Saheb)/.test(d.meaning), `doha ${d.id}: ${d.meaning}`).toBe(false);
		}
	});

	it('unverified: 23, 25 and the BhaktiMala additions 59–184', () => {
		const expected = [23, 25, ...Array.from({ length: 126 }, (_, i) => 59 + i)];
		expect(dohas.filter((d) => d.unverified).map((d) => d.id)).toEqual(expected);
	});

	it('no record is both unverified and sourced', () => {
		expect(dohas.filter((d) => d.unverified && d.source)).toEqual([]);
	});
});
