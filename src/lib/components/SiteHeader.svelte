<script lang="ts">
	// One 2x source (264 × 350). @sveltejs/enhanced-img turns it into AVIF,
	// WebP and JPEG at 132 px (1x) and 264 px (2x) with hashed file names.
	import portrait from '#lib/assets/kabir-saheb.png?enhanced';

	// The preload for this image is added at the top of <head> by
	// src/hooks.server.ts, so it is fetched before scripts and fonts.
</script>

<enhanced:img
	src={portrait}
	class="portrait"
	id="portraitImg"
	width="132"
	height="175"
	fetchpriority="high"
	alt="Portrait of Kabir Saheb"
/>

<div class="heading">
	<p class="kicker" lang="hi">संत कबीर साहेब</p>
	<h1>Kabir Saheb</h1>
	<p class="tagline">
		Freedom is primary—freedom from the ego. The centre of action is intent, and intent is all that matters.
	</p>
	<p class="tagline-credit">— Acharya Prashant</p>
</div>
