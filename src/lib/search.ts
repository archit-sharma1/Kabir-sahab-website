import type { Doha } from './dohas.js';

// Search matches whole words, not letters inside words, so "ram" finds
// "राम" and "Ram" but not "trample". Every query word must match (in any
// order). Romanised Hindi and a few English themes are expanded through
// SEARCH_ALIASES so common queries like "mann", "truth" or "death" find the
// right dohas.

export const MIN_QUERY_LENGTH = 2;

const STOP_WORDS = new Set(['a', 'an', 'the', 'of', 'to', 'in', 'is', 'and', 'or', 'on', 'at', 'by', 'for', 'be']);

// Add to this when a natural query finds nothing.
export const SEARCH_ALIASES: Record<string, string[]> = {
	// Romanised Hindi → Devanagari
	man: ['मन', 'मना', 'mind'],
	mann: ['मन', 'मना', 'mind'],
	mana: ['मन', 'मना', 'mind'],
	mun: ['मन', 'mind'],
	ram: ['राम'],
	raam: ['राम'],
	rama: ['राम'],
	guru: ['गुरु'],
	hari: ['हरि'],
	prabhu: ['प्रभु'],
	govind: ['गोविन्द'],
	sai: ['साईं'],
	sain: ['साईं'],
	saain: ['साईं'],
	sayeen: ['साईं'],
	kabir: ['कबीर', 'कबीरा', 'कबिरा'],
	kabira: ['कबीर', 'कबीरा', 'कबिरा'],
	prem: ['प्रेम', 'love'],
	pyar: ['प्रेम', 'love'],
	shabd: ['शब्द', 'शब्दहि', 'शब्दे', 'word'],
	shabad: ['शब्द', 'शब्दहि', 'शब्दे', 'word'],
	sabad: ['शब्द', 'शब्दहि', 'शब्दे', 'word'],
	heera: ['हीरा', 'diamond'],
	hira: ['हीरा', 'diamond'],
	hansa: ['हंसा', 'swan'],
	hans: ['हंसा', 'swan'],
	bazar: ['बाज़ार', 'marketplace'],
	bazaar: ['बाज़ार', 'marketplace'],
	bajar: ['बाज़ार', 'marketplace'],
	बजार: ['बाज़ार'],
	murari: ['मुरार'],
	chandan: ['चंदन', 'sandalwood'],
	paani: ['पानी', 'water'],
	pani: ['पानी', 'water'],
	jeev: ['जीव', 'जीवत'],
	jiv: ['जीव', 'जीवत'],
	kaal: ['काल'],
	kal: ['काल'],
	aaj: ['आज'],
	dukh: ['दुःख', 'sorrow'],
	sukh: ['सुख', 'joy'],
	nindak: ['निंदक', 'critic'],
	aapa: ['आपा', 'ego'],
	// English themes → related words used in the dohas and meanings
	mind: ['मन', 'मना'],
	love: ['प्रेम'],
	word: ['शब्द', 'शब्दहि', 'शब्दे'],
	ego: ['आपा', 'pride'],
	pride: ['ego', 'आपा'],
	truth: ['true', 'truly', 'real', 'reality', 'essence', 'सत्य', 'सांच', 'सार'],
	death: ['die', 'died', 'dies', 'dying', 'mortal', 'forever', 'vanish', 'मुआ', 'मुए', 'मरि'],
	die: ['death', 'died', 'dies', 'dying', 'मुआ', 'मुए'],
	god: ['lord', 'divine', 'हरि', 'राम', 'साईं', 'प्रभु', 'गोविन्द', 'परमेश्वर', 'भगवान'],
	lord: ['god', 'divine', 'हरि', 'राम', 'साईं', 'प्रभु', 'गोविन्द', 'परमेश्वर', 'भगवान'],
	diamond: ['हीरा', 'हीरे'],
	swan: ['हंसा'],
	critic: ['निंदक'],
	teacher: ['गुरु', 'guru']
};

const ENGLISH_SUFFIXES = ['s', 'es', 'ed', 'd', 'ing', "'s"];

/** NFC, locale lowercase, collapse whitespace, trim. */
export function normalizeSearchText(value: unknown): string {
	return String(value ?? '')
		.normalize('NFC')
		.toLocaleLowerCase()
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Extra folding for search only: drop nukta and treat chandrabindu as
 * anusvara, so बाजार/बाज़ार and माँ/मां match each other.
 */
function foldForSearch(value: string): string {
	return normalizeSearchText(value)
		.normalize('NFD')
		.replace(/़/g, '')
		.replace(/ँ/g, 'ं')
		.normalize('NFC');
}

/** Split on anything that is not a letter, combining mark (matra) or digit. */
function tokenize(value: string): string[] {
	return foldForSearch(value)
		.split(/[^\p{L}\p{M}\p{N}']+/u)
		.filter(Boolean);
}

function wordMatches(words: Set<string>, term: string): boolean {
	if (words.has(term)) return true;
	if (!/^[a-z']+$/.test(term)) return false;
	return ENGLISH_SUFFIXES.some((suffix) => words.has(term + suffix));
}

function termAlternatives(term: string): string[] {
	return [term, ...(SEARCH_ALIASES[term] ?? []).map(foldForSearch)];
}

export type SearchResult =
	| { status: 'empty' }
	| { status: 'too-short' }
	| { status: 'done'; matches: Doha[] };

/**
 * Build a search function over a corpus. The word index is built lazily, on
 * the first search: building it for every doha costs ~40 ms on a slow phone,
 * and most visits never search, so page start-up shouldn't pay for it.
 */
export function createSearch(corpus: readonly Doha[]) {
	let index: Set<string>[] | null = null;
	const buildIndex = () => corpus.map((d) => new Set(tokenize(`${d.text} ${d.meaning} ${d.source ?? ''}`)));

	return function search(query: string): SearchResult {
		index ??= buildIndex();
		if (normalizeSearchText(query) === '') return { status: 'empty' };
		const allTerms = tokenize(query);
		const meaningful = allTerms.filter((t) => !STOP_WORDS.has(t));
		const terms = (meaningful.length ? meaningful : allTerms).filter((t) => t.length >= MIN_QUERY_LENGTH);
		if (terms.length === 0) return { status: 'too-short' };
		const words = index;
		const matches = corpus.filter((_, i) =>
			terms.every((term) => termAlternatives(term).some((alt) => wordMatches(words[i], alt)))
		);
		return { status: 'done', matches };
	};
}
