<script lang="ts">
	import { dohas, type Doha } from '../dohas.js';
	import { createSearch, MIN_QUERY_LENGTH, type SearchResult } from '../search.js';

	let { onselect }: { onselect: (id: number) => void } = $props();

	const search = createSearch(dohas);

	/** Results shown before "Show all". */
	const PREVIEW_COUNT = 3;

	let query = $state('');
	let result = $state<SearchResult>({ status: 'empty' });
	let searchedFor = $state('');
	let showAll = $state(false);
	/** List is the default; the reader can switch to a 2-column grid. */
	let view = $state<'list' | 'grid'>('list');

	function run() {
		searchedFor = query.trim();
		result = search(query);
		showAll = false;
	}

	const matches = $derived(result.status === 'done' ? result.matches : []);
	const visible = $derived(showAll ? matches : matches.slice(0, PREVIEW_COUNT));

	const firstLine = (d: Doha) => d.text.split('\n')[0];

	const status = $derived.by(() => {
		if (result.status === 'empty') return '';
		if (result.status === 'too-short') return `Type at least ${MIN_QUERY_LENGTH} letters to search.`;
		const n = result.matches.length;
		if (n === 0) return `No doha found for "${searchedFor}".`;
		return `${n} doha${n > 1 ? 's' : ''} found for "${searchedFor}":`;
	});
</script>

<div class="search">
	<h2>search doha by keyword</h2>
	<form
		class="search-row"
		role="search"
		onsubmit={(e) => {
			e.preventDefault();
			run();
		}}
	>
		<input
			type="text"
			id="searchInput"
			aria-label="Search dohas by keyword"
			placeholder="e.g. mann, guru, love, ego, truth..."
			bind:value={query}
		/>
		<button id="searchBtn" class="secondary" type="submit">Search</button>
	</form>
	<div class="search-toolbar">
		<div id="searchStatus" aria-live="polite">{status}</div>
		{#if matches.length > 1}
			<div class="view-toggle" role="group" aria-label="Show results as">
				<button type="button" class="view-option" aria-pressed={view === 'list'} onclick={() => (view = 'list')}>
					List
				</button>
				<button type="button" class="view-option" aria-pressed={view === 'grid'} onclick={() => (view = 'grid')}>
					Grid
				</button>
			</div>
		{/if}
	</div>
	<div class="search-results" class:grid={view === 'grid'} id="searchResults">
		{#each visible as d (d.id)}
			<button type="button" class="search-result" onclick={() => onselect(d.id)}>
				<p class="sr-line"><span class="sr-number">{d.id}.</span> <span lang="hi">{firstLine(d)}</span></p>
				<p class="sr-meaning">{d.meaning}</p>
			</button>
		{/each}
	</div>
	{#if matches.length > PREVIEW_COUNT}
		<button
			type="button"
			class="secondary show-all"
			id="showAllBtn"
			aria-expanded={showAll}
			aria-controls="searchResults"
			onclick={() => (showAll = !showAll)}
		>
			{showAll ? 'Show fewer' : `Show all ${matches.length} dohas`}
		</button>
	{/if}
</div>
