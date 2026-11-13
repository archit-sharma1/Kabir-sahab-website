<script lang="ts">
	import { page } from '$app/state';
	import { dohas } from '#lib/dohas.js';

	// /doha/505 → "Doha 505 doesn't exist"; any other missing page → "Page not found".
	const missingId = $derived(/^\/doha\/(\d+)\/?$/.exec(page.url.pathname)?.[1] ?? null);
	const heading = $derived(
		page.status !== 404 ? 'Something went wrong' : missingId ? `Doha ${missingId} doesn't exist` : 'Page not found'
	);

	// "numbered 1 to 58" only while the ids have no gaps; otherwise just the count.
	const ids = dohas.map((d) => d.id);
	const first = Math.min(...ids);
	const last = Math.max(...ids);
	const range = last - first + 1 === ids.length ? `, numbered ${first} to ${last}` : '';
</script>

<svelte:head>
	<title>{page.status === 404 ? (missingId ? 'Doha not found' : 'Page not found') : 'Something went wrong'} — Kabir Saheb</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="not-found" role="alert">
	<p class="not-found-title"><span class="not-found-icon" aria-hidden="true">!</span>{heading}</p>
	{#if page.status === 404}
		<p class="not-found-text">
			This site has {dohas.length} dohas{range}. Draw one below, search by keyword, or
			<a href="/">start from the home page</a>.
		</p>
	{:else}
		<p class="not-found-text">Error {page.status}. <a href="/">Back to the home page</a>.</p>
	{/if}
</div>
