<script lang="ts">
	import type { Doha } from '../dohas.js';

	let { dohas, onselect }: { dohas: Doha[]; onselect: (id: number) => void } = $props();
</script>

<div class="history" id="historySection" hidden={dohas.length === 0}>
	<h2>previously drawn</h2>
	<div class="history-list" id="historyList">
		{#each dohas as d (d.id)}
			<button type="button" class="history-item" lang="hi" onclick={() => onselect(d.id)}>
				{d.text.split('\n')[0]}
			</button>
		{/each}
	</div>
</div>
