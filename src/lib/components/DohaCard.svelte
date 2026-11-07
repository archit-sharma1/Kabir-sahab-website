<script lang="ts">
	import type { Doha } from '../dohas.js';

	let { doha, element = $bindable() }: { doha: Doha | null; element?: HTMLElement } = $props();

	const sourceLabel = (d: Doha) =>
		d.unverified ? 'Source unverified' : (d.source ?? 'Traditionally attributed to Kabir Saheb');
</script>

<div class="card" id="card" bind:this={element}>
	{#if doha}
		<p class="doha-meta">
			<span class="doha-number">Doha {doha.id}</span>
			<span
				class="doha-source"
				class:unverified={doha.unverified}
				lang={doha.source && !doha.unverified ? 'hi' : undefined}
				title={doha.unverified ? 'No published source has been found for this doha yet.' : undefined}
				>{sourceLabel(doha)}</span
			>
		</p>
		<p class="doha-text" lang="hi">{doha.text}</p>
		<p class="meaning">{doha.meaning}</p>
	{:else}
		<p class="placeholder" id="placeholder">Press the button to draw a doha.</p>
	{/if}
</div>
