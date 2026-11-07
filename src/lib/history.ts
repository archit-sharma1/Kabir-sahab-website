// "Previously drawn" history and the no-repeat random draw.
//
// History holds doha ids, newest first, including the doha on the card.
// It is saved in localStorage so it survives a refresh; if storage is
// unavailable (private mode, blocked storage) it simply stays in memory.

export const HISTORY_KEY = 'kabir-saheb.history';
export const HISTORY_SIZE = 5;

/** Move `id` to the front. Keeps one extra slot for the doha on the card. */
export function addToHistory(recent: readonly number[], id: number): number[] {
	return [id, ...recent.filter((x) => x !== id)].slice(0, HISTORY_SIZE + 1);
}

/** The dohas to list under "Previously drawn": never the one on the card. */
export function previousIds(recent: readonly number[], currentId: number | null): number[] {
	return recent.filter((x) => x !== currentId).slice(0, HISTORY_SIZE);
}

export function loadHistory(validIds: ReadonlySet<number>, storage: Storage | undefined = globalThis.localStorage): number[] {
	try {
		const parsed: unknown = JSON.parse(storage?.getItem(HISTORY_KEY) ?? '[]');
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((x): x is number => typeof x === 'number' && validIds.has(x)).slice(0, HISTORY_SIZE + 1);
	} catch {
		return [];
	}
}

export function saveHistory(recent: readonly number[], storage: Storage | undefined = globalThis.localStorage): void {
	try {
		storage?.setItem(HISTORY_KEY, JSON.stringify(recent));
	} catch {
		// Storage blocked or full: history stays in memory only.
	}
}

/**
 * Pick a random id not yet seen this round. When every doha has been shown,
 * a new round starts. Returns the picked id and the updated seen list.
 */
export function drawNext(
	allIds: readonly number[],
	seen: readonly number[],
	random: () => number = Math.random
): { id: number; seen: number[] } {
	const round = seen.length >= allIds.length ? [] : [...seen];
	const remaining = allIds.filter((id) => !round.includes(id));
	const id = remaining[Math.floor(random() * remaining.length)];
	return { id, seen: [...round, id] };
}
