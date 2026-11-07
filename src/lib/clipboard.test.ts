import { describe, expect, it } from 'vitest';
import { shareText } from './clipboard.js';

describe('shareText', () => {
	it('ends with "— Kabir Saheb", a blank line, then the link (no doha number)', () => {
		const text = shareText({ text: 'line one।\nline two॥', meaning: 'Meaning.' }, 'https://example.org/doha/7');
		expect(text).toBe('line one।\nline two॥\n\nMeaning.\n— Kabir Saheb\n\nhttps://example.org/doha/7');
		expect(text).not.toMatch(/Doha \d/);
	});
});
