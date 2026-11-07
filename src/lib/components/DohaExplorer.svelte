<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { copyText, shareText } from '../clipboard.js';
	import { explorer } from '../explorer.svelte.js';
	import DohaCard from './DohaCard.svelte';
	import HistoryList from './HistoryList.svelte';
	import SearchBox from './SearchBox.svelte';

	let card = $state<HTMLElement>();

	// Per-doha links use the URL hash (#doha-N) for now.
	const HASH = /^#doha-(\d+)$/;

	function setHash(id: number) {
		if (location.hash === `#doha-${id}`) return;
		goto(`#doha-${id}`, { replace: true, shallow: true });
	}

	function openFromHash() {
		const m = HASH.exec(location.hash);
		if (!m || Number(m[1]) === explorer.currentId) return;
		explorer.open(Number(m[1]));
	}

	onMount(() => {
		explorer.load();
		openFromHash();
		window.addEventListener('hashchange', openFromHash);
		return () => window.removeEventListener('hashchange', openFromHash);
	});

	async function draw() {
		// Keep the reader's viewport fixed when the new doha changes the page height.
		const { scrollX, scrollY } = window;
		setHash(explorer.draw());
		await tick();
		window.scrollTo(scrollX, scrollY);
		requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
	}

	function openFromSearch(id: number) {
		explorer.open(id);
		setHash(id);
		card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	function openFromHistory(id: number) {
		explorer.open(id);
		setHash(id);
	}

	// Button labels that flash a confirmation for 1.5 s.
	let flashed = $state<Record<string, string>>({});
	function flash(key: string, label: string) {
		flashed[key] = label;
		setTimeout(() => delete flashed[key], 1500);
	}

	async function copy(key: 'hindi' | 'english') {
		const d = explorer.current;
		if (!d) return;
		await copyText(key === 'hindi' ? d.text : d.meaning);
		flash(key, 'Copied!');
	}

	async function share() {
		const d = explorer.current;
		if (!d) return;
		const url = `${location.origin}${location.pathname}#doha-${d.id}`;
		const text = shareText(d);
		if (navigator.share) {
			try {
				await navigator.share({ title: `Kabir Saheb — Doha ${d.id}`, text, url });
				return;
			} catch (err) {
				if ((err as Error)?.name === 'AbortError') return;
			}
		}
		await copyText(`${text}\n${url}`);
		flash('share', 'Link copied!');
	}
</script>

<SearchBox onselect={openFromSearch} />

<DohaCard doha={explorer.current} bind:element={card} />

<div class="actions">
	<button id="drawBtn" type="button" onclick={draw}>Draw a Doha</button>
	<button id="copyHindiBtn" class="secondary" type="button" hidden={!explorer.current} onclick={() => copy('hindi')}
		>{flashed.hindi ?? 'Copy Hindi'}</button
	>
	<button id="copyMeaningBtn" class="secondary" type="button" hidden={!explorer.current} onclick={() => copy('english')}
		>{flashed.english ?? 'Copy English'}</button
	>
	<button id="shareBtn" class="secondary" type="button" hidden={!explorer.current} onclick={share}
		>{flashed.share ?? 'Share'}</button
	>
</div>
<p class="counter" id="counter">{explorer.counter}</p>

<HistoryList dohas={explorer.previous} onselect={openFromHistory} />
