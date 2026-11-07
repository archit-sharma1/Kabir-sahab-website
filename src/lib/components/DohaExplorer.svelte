<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import { copyText, shareText } from '../clipboard.js';
	import { explorer } from '../explorer.svelte.js';
	import DohaCard from './DohaCard.svelte';
	import HistoryList from './HistoryList.svelte';
	import SearchBox from './SearchBox.svelte';

	let card = $state<HTMLElement>();

	// The doha of the /doha/N page being viewed, if any. Before the reader
	// picks anything (and in the prerendered HTML) the card shows this one.
	const pageDoha = $derived(page.data.doha ?? null);
	const shown = $derived(explorer.current ?? pageDoha);

	/** Each doha has its own page; showing one moves the URL there (new history entry, no scroll jump). */
	function visit(id: number) {
		if (page.url.pathname !== `/doha/${id}`) goto(`/doha/${id}`, { reset: false });
	}

	onMount(() => {
		explorer.load();
		// Links shared before /doha/N pages existed used #doha-N on the home page.
		const legacy = /^#doha-(\d+)$/.exec(location.hash);
		if (legacy && location.pathname === '/') goto(`/doha/${legacy[1]}`, { replace: true });
	});

	// Arriving on a doha page from outside (first load, a link, back/forward)
	// makes it the current doha. Our own goto() calls are skipped: the card has
	// already changed, and a slow navigation must not overwrite a newer draw.
	afterNavigate((nav) => {
		const d = page.data.doha;
		if (nav.type !== 'goto' && d && d.id !== explorer.currentId) explorer.open(d.id);
	});

	async function draw() {
		// Keep the reader's viewport fixed when the new doha changes the page height.
		const { scrollX, scrollY } = window;
		visit(explorer.draw());
		await tick();
		window.scrollTo(scrollX, scrollY);
		requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
	}

	function openFromSearch(id: number) {
		explorer.open(id);
		visit(id);
		card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	function openFromHistory(id: number) {
		explorer.open(id);
		visit(id);
	}

	// Button labels that flash a confirmation for 1.5 s.
	let flashed = $state<Record<string, string>>({});
	function flash(key: string, label: string) {
		flashed[key] = label;
		setTimeout(() => delete flashed[key], 1500);
	}

	async function copy(key: 'hindi' | 'english') {
		const d = shown;
		if (!d) return;
		await copyText(key === 'hindi' ? d.text : d.meaning);
		flash(key, 'Copied!');
	}

	async function share() {
		const d = shown;
		if (!d) return;
		const url = `${location.origin}/doha/${d.id}`;
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

<DohaCard doha={shown} bind:element={card} />

<div class="actions">
	<button id="drawBtn" type="button" onclick={draw}>Draw a Doha</button>
	<button id="copyHindiBtn" class="secondary" type="button" hidden={!shown} onclick={() => copy('hindi')}
		>{flashed.hindi ?? 'Copy Hindi'}</button
	>
	<button id="copyMeaningBtn" class="secondary" type="button" hidden={!shown} onclick={() => copy('english')}
		>{flashed.english ?? 'Copy English'}</button
	>
	<button id="shareBtn" class="secondary" type="button" hidden={!shown} onclick={share}
		>{flashed.share ?? 'Share'}</button
	>
</div>
<p class="counter" id="counter">{explorer.counter}</p>

<HistoryList dohas={explorer.previous} onselect={openFromHistory} />
