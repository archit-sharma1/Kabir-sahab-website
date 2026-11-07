<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Doha not found' : 'Something went wrong'} — Kabir Saheb</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="notice" role="alert">
	{#if page.status === 404}
		<p>That page doesn't exist. Draw a doha below, or <a href="/">start from the home page</a>.</p>
	{:else}
		<p>Something went wrong ({page.status}). <a href="/">Back to the home page</a>.</p>
	{/if}
</div>
