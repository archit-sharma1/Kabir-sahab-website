<script lang="ts">
	import { dohas, type Doha } from '../dohas.js';
	import { createSearch, MIN_QUERY_LENGTH, type SearchResult } from '../search.js';

	let { onselect }: { onselect: (id: number) => void } = $props();

	const search = createSearch(dohas);

	let query = $state('');
	let result = $state<SearchResult>({ status: 'empty' });
	let searchedFor = $state('');

	function run() {
		searchedFor = query.trim();
		result = search(query);
	}

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
	<div id="searchStatus" aria-live="polite">{status}</div>
	<div class="search-results" id="searchResults">
		{#if result.status === 'done'}
			{#each result.matches as d (d.id)}
				<button type="button" class="search-result" onclick={() => onselect(d.id)}>
					<p class="sr-line"><span class="sr-number">{d.id}.</span> <span lang="hi">{firstLine(d)}</span></p>
					<p class="sr-meaning">{d.meaning}</p>
				</button>
			{/each}
		{/if}
	</div>
</div>
