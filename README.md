# Kabir Saheb Doha Website

A contemplative website featuring 58 Hindi dohas traditionally attributed to Kabir Saheb, each paired with an original plain-sense English meaning.

Built with **SvelteKit 3** (Svelte 5, TypeScript) and fully prerendered: every page is plain HTML served by Cloudflare.

## Features

- **Draw a Doha:** a random doha, with no repeats until every doha has been shown once.
- **A page per doha:** `/doha/1` … `/doha/58`, each with its own title and link-preview text, so a shared link shows *that* doha in WhatsApp. The URL follows the reader and the Back button works.
- **Numbered dohas with sources:** each card shows "Doha N" and its source (e.g. `बीजक — साखी ३`). Dohas with no recorded source say "Traditionally attributed to Kabir Saheb". Dohas that could not be traced to any published collection say "Source unverified".
- **Hindi and English search:**
  - Matches whole words (`ram` finds राम but not "trample") and needs at least 2 letters.
  - Ignores capitalization and extra spaces.
  - Understands romanised Hindi (`mann` → मन, `ram` → राम) and English themes (`truth`, `death`, `ego`).
- **Copy buttons:** Copy Hindi and Copy English work separately.
- **Share:** opens the phone's share sheet, or copies the doha and its `/doha/N` link.
- **Previously drawn:** the last five dohas before the current one. The list survives a page refresh.
- **Search-engine friendly:** prerendered pages, `sitemap.xml`, and the doha text in the HTML (works without JavaScript).
- **Self-hosted fonts:** Poppins, Cormorant Garamond and Tiro Devanagari Hindi.
- **Language markup:** the page is marked English and the Hindi text is marked Hindi, for screen readers and search engines.
- **Security:** a strict Content-Security-Policy and long-term caching of hashed assets.
- **Kabir Saheb portrait** and a responsive OLED-black design.

## Develop

Requires Node 22.17 or later.

```bash
npm install
npm run dev                  # dev server with hot reload at http://localhost:5173
npm test                     # unit tests (corpus checks, search regressions, history)
npm run check                # type-check with svelte-check
npm run build                # prerender the site into build/
npm run preview:cloudflare   # build, then serve build/ through Cloudflare's runtime (wrangler dev)
```

## Project structure

- `src/lib/dohas.ts`: **the only content store**, with all 58 records (`id`, Hindi `text`, English `meaning`, optional `source`, optional `unverified`). Edit dohas here.
- `src/lib/search.ts`, `history.ts`, `explorer.svelte.ts`: search, history/draw logic and shared state, with tests in `*.test.ts`.
- `src/lib/components/`: `SiteHeader`, `SearchBox`, `DohaCard`, `HistoryList`, `DohaExplorer`, `SiteFooter`, `Seo`.
- `src/routes/`: the layout, the home page, `/doha/[id]` pages, the error page and `sitemap.xml`.
- `src/app.css`: fonts and the visual design.
- `static/`: images, fonts, `favicon.ico`, `robots.txt` and the Cloudflare `_headers` file, copied into `build/`.
- `vite.config.ts`: SvelteKit config (static adapter, Content-Security-Policy) and test config.
- `wrangler.jsonc`: Cloudflare Worker config; serves `build/` as static assets.
- `PROJECT_INSTRUCTIONS.md`: detailed rules for anyone (human or AI) changing the site.

## Naming

On the page, Kabir is always called **Kabir Saheb** in English text (meanings, footer, labels, titles). The Hindi verses are left exactly as written (कबीर, कबीरा, कबिरा).

## Credits

- **Dohas:** traditionally attributed to Kabir Saheb, from the Bijak and the oral tradition. The English meanings are original plain-sense renderings.
- **Tagline:** Acharya Prashant.
- **Portrait:** "Kabir Saheb", painting by Sharan, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kabir_Das.jpg), licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). It has been resized and cropped for this site, and the adapted images are shared under the same licence.
- **Fonts:** Poppins, Cormorant Garamond and Tiro Devanagari Hindi, all under SIL OFL 1.1 (see `static/fonts/LICENSE.md`).

## Live website

[Open the public Cloudflare deployment](https://kabir-saheb.sant-vani.workers.dev/)

Hosted on Cloudflare Workers (static assets). Each push to `main` is built (`npm run build`) and deployed (`npx wrangler deploy`) automatically by Cloudflare Workers Builds.
