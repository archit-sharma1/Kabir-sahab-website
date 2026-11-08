// Shared state for the doha explorer: the doha on the card, the draw round
// and "Previously drawn". It lives in a module (not a component) so it
// survives navigation between pages.

import { dohas, type Doha } from './dohas.js';
import { addToHistory, drawNext, loadHistory, previousIds, saveHistory } from './history.js';

export const dohaById: ReadonlyMap<number, Doha> = new Map(dohas.map((d) => [d.id, d]));
const allIds = dohas.map((d) => d.id);

class Explorer {
	currentId = $state<number | null>(null);
	recent = $state<number[]>([]);
	seen = $state<number[]>([]);
	/** "doha N of 252 shown this round" after a draw; empty otherwise. */
	counter = $state('');

	#loaded = false;

	current = $derived(this.currentId === null ? null : (dohaById.get(this.currentId) ?? null));
	previous = $derived(previousIds(this.recent, this.currentId).flatMap((id) => dohaById.get(id) ?? []));

	/** Read saved history once, in the browser. */
	load() {
		if (this.#loaded) return;
		this.#loaded = true;
		this.recent = loadHistory(new Set(allIds));
	}

	/** Show a doha chosen by the reader (search, history or a link). */
	open(id: number) {
		if (!dohaById.has(id)) return;
		this.currentId = id;
		this.recent = addToHistory(this.recent, id);
		this.counter = '';
		saveHistory(this.recent);
	}

	/** Draw a random doha not yet shown this round. */
	draw(): number {
		const next = drawNext(allIds, this.seen);
		this.seen = next.seen;
		this.currentId = next.id;
		this.recent = addToHistory(this.recent, next.id);
		this.counter = `doha ${this.seen.length} of ${allIds.length} shown this round`;
		saveHistory(this.recent);
		return next.id;
	}
}

export const explorer = new Explorer();
