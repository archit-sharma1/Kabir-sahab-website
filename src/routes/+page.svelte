<script lang="ts">
	import DohaExplorer from '#lib/components/DohaExplorer.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import { OG_IMAGE, OG_IMAGE_ALT, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '#lib/site.js';
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<meta name="description" content={SITE_DESCRIPTION} />
	<link rel="canonical" href="{SITE_URL}/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={SITE_TITLE} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:url" content="{SITE_URL}/" />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={OG_IMAGE_ALT} />
	<meta property="og:locale" content="en_IN" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<main class="loom">
	<SiteHeader />
	<DohaExplorer />
	<SiteFooter />
</main>
