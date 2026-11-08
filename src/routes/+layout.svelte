<script lang="ts">
	import '../app.css';
	import DohaExplorer from '#lib/components/DohaExplorer.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<!--
	The header, explorer and footer live in the layout so they stay mounted
	while the reader moves between "/" and "/doha/N". Pages only add their
	<head> tags (and the error page its message).
-->
<main class="loom">
	<SiteHeader />
	{@render children()}
	<DohaExplorer />
	<SiteFooter />
</main>
