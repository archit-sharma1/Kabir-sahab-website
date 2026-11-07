<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const firstLine = $derived(data.doha.text.split('\n')[0]);
	const oneLine = $derived(data.doha.text.replace('\n', ' '));
	// Search results show ~155 characters; the Hindi line comes first.
	const description = $derived(clip(`${oneLine} — ${data.doha.meaning}`, 155));

	function clip(s: string, max: number) {
		return s.length <= max ? s : `${s.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
	}
</script>

<Seo title="Doha {data.doha.id}: {firstLine} — Kabir Saheb" {description} path="/doha/{data.doha.id}" />
