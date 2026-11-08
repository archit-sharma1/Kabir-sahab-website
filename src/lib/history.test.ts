import { describe, expect, it } from 'vitest';
import { addToHistory, drawNext, HISTORY_KEY, HISTORY_SIZE, loadHistory, previousIds, saveHistory } from './history.js';

function memoryStorage(initial: Record<string, string> = {}): Storage {
	const data = new Map(Object.entries(initial));
	return {
		get length() {
			return data.size;
		},
		clear: () => data.clear(),
		getItem: (k) => data.get(k) ?? null,
		key: (i) => [...data.keys()][i] ?? null,
		removeItem: (k) => void data.delete(k),
		setItem: (k, v) => void data.set(k, String(v))
	};
}

describe('history', () => {
	it('moves a doha to the front and keeps one extra slot', () => {
		let recent: number[] = [];
		for (const id of [1, 2, 3, 4, 5, 6, 7, 3]) recent = addToHistory(recent, id);
		expect(recent).toEqual([3, 7, 6, 5, 4, 2]);
		expect(recent).toHaveLength(HISTORY_SIZE + 1);
	});

	it('never lists the doha on the card', () => {
		expect(previousIds([3, 7, 6, 5, 4, 2], 3)).toEqual([7, 6, 5, 4, 2]);
		expect(previousIds([3, 7, 6, 5, 4, 2], null)).toEqual([3, 7, 6, 5, 4]);
	});

	it('round-trips through storage and drops unknown ids', () => {
		const storage = memoryStorage();
		saveHistory([5, 999, 2], storage);
		expect(loadHistory(new Set([2, 5]), storage)).toEqual([5, 2]);
	});

	it('ignores corrupt storage', () => {
		const storage = memoryStorage({ [HISTORY_KEY]: 'not json' });
		expect(loadHistory(new Set([1]), storage)).toEqual([]);
	});
});

describe('drawNext', () => {
	it('shows every doha once per round, then starts again', () => {
		const all = [1, 2, 3, 4];
		let seen: number[] = [];
		const drawn: number[] = [];
		for (let i = 0; i < 4; i++) ({ seen, id: drawn[i] } = drawNext(all, seen));
		expect([...drawn].sort()).toEqual(all);
		const next = drawNext(all, seen);
		expect(next.seen).toEqual([next.id]);
	});
});
