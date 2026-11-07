import { describe, expect, it } from 'vitest';
import { dohas } from './dohas.js';

describe('doha corpus', () => {
	it('has 58 records', () => expect(dohas).toHaveLength(58));

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

	it('every doha has two lines ending in । and ॥', () => {
		for (const d of dohas) {
			const lines = d.text.split('\n');
			expect(lines, `doha ${d.id}`).toHaveLength(2);
			expect(lines[0].endsWith('।'), `doha ${d.id} line 1`).toBe(true);
			expect(lines[1].endsWith('॥'), `doha ${d.id} line 2`).toBe(true);
		}
	});

	it('English meanings always say "Kabir Saheb", never bare "Kabir"', () => {
		for (const d of dohas) {
			expect(/\bKabir\b(?! Saheb)/.test(d.meaning), `doha ${d.id}: ${d.meaning}`).toBe(false);
		}
	});

	it('only dohas 23 and 25 are marked unverified', () => {
		expect(dohas.filter((d) => d.unverified).map((d) => d.id)).toEqual([23, 25]);
	});
});
