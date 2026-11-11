# Kabir Saheb Doha Website — Project Instructions

Last updated: 7 November 2026 (IST)

## 1. Project identity

- **Project:** Kabir Saheb Doha Website
- **Canonical GitHub repository:** `archit-sharma1/Kabir-sahab-website`
- **Repository URL:** https://github.com/archit-sharma1/Kabir-sahab-website
- **Default branch:** `main`
- **Repository visibility:** Private
- **Canonical production URL:** https://kabir-saheb.sant-vani.workers.dev/
- **Framework:** SvelteKit 3 (Svelte 5, TypeScript, Vite 8), fully prerendered with `@sveltejs/adapter-static`
- **Hosting:** Cloudflare Workers static assets (Worker `kabir-saheb`), built and deployed automatically from GitHub `main`
- **Legacy ChatGPT Site:** https://kabir-saheb-dohe.sarchit216-as.chatgpt.site

GitHub is now the source of truth. Make future code and content changes in the GitHub repository, not in the legacy ChatGPT Site, unless the user explicitly asks to update both.

## 2. Website description

This is a contemplative, responsive website presenting 58 Hindi dohas attributed to Kabir Saheb, each paired with an original English plain-sense meaning. Visitors can:

- draw a random doha;
- search in Hindi, romanised Hindi or English;
- copy the Hindi and English text separately;
- share a doha;
- open any doha at its own address (`/doha/N`);
- revisit recently drawn verses, even after a refresh.

Each card shows the doha number and its source.

The website uses a minimal OLED-black design and the Kabir Saheb portrait. It is built with SvelteKit and **prerendered**: `npm run build` writes plain HTML, CSS and JS for the home page, all 58 doha pages, the 404 page and `sitemap.xml` into `build/`, and Cloudflare serves those files. No server code runs in production.

## 3. Current project structure

```text
Kabir-sahab-website/
├── src/
│   ├── app.html                  # HTML shell (lang="en", icons, portrait preload slot)
│   ├── hooks.server.ts           # Puts the portrait preload first in <head>
│   ├── app.css                   # @font-face rules and the complete visual design
│   ├── app.d.ts                  # App.PageData type (doha on /doha/N pages)
│   ├── lib/
│   │   ├── dohas.ts              # THE doha content store (typed, 58 records)
│   │   ├── search.ts             # Whole-word search + SEARCH_ALIASES
│   │   ├── history.ts            # "Previously drawn" + no-repeat draw
│   │   ├── explorer.svelte.ts    # Shared state: current doha, round, history
│   │   ├── clipboard.ts          # Copy helper and share text
│   │   ├── site.ts               # Site URL, title, description, preview image
│   │   ├── assets/kabir-saheb.png # Portrait source (2x), optimised at build time
│   │   ├── *.test.ts             # Vitest unit tests (run with npm test)
│   │   └── components/           # SiteHeader, SearchBox, DohaCard, HistoryList,
│   │                             # DohaExplorer, SiteFooter, Seo
│   └── routes/
│       ├── +layout.svelte        # Header, explorer and footer (stay mounted)
│       ├── +layout.ts            # prerender = true for every page
│       ├── +page.svelte          # Home: head tags only
│       ├── +error.svelte         # 404 / error notice (noindex)
│       ├── doha/[id]/            # /doha/1 … /doha/58 with their own head tags
│       └── sitemap.xml/          # Prerendered sitemap
├── static/                       # Copied as-is into build/
│   ├── _headers                  # Cloudflare cache-control and security headers
│   ├── favicon.ico, robots.txt
│   ├── images/                   # Touch icon and og-image.jpg (fixed URLs)
│   └── fonts/                    # Latin .woff2 files + licences (Devanagari is generated)
├── fonts-src/                    # Full Tiro Devanagari font (not served; trimmed at build)
├── scripts/subset-fonts.mjs      # Trims it to the glyphs the site uses (runs before dev/build/test)
├── vite.config.ts                # SvelteKit config (adapter, CSP), Vitest config
├── wrangler.jsonc                # Cloudflare Worker: serves build/ as static assets
├── package.json                  # Scripts: dev, build, check, test, preview:cloudflare
├── README.md
└── PROJECT_INSTRUCTIONS.md
```

`build/`, `.svelte-kit/` and `node_modules/` are generated and git-ignored.

Imports inside the app use Node subpath imports: `import { dohas } from '#lib/dohas.js'`. That is SvelteKit 3's replacement for `$lib`; write `.js` even for `.ts` files.

## 4. Architectural responsibilities

### `src/lib/dohas.ts`

- Is the only canonical doha content store. Pages and components `import` it; nothing is put on `window`.
- Every record must contain non-empty Hindi doha text and a non-empty English meaning.
- Every record has a permanent numeric `id` (1–58 today; 59–184 are retired). Ids are shown as "Doha N" and are the `/doha/N` page address. **Never renumber or reuse an id**; a new doha gets the next unused number, and a removed doha's id is retired (its page then returns 404).
- An optional `source` (e.g. `बीजक — साखी ३`) is shown on the card. Records without one show "Traditionally attributed to Kabir Saheb". Only add a source you can cite. Records that no published collection could be traced to carry `unverified: true` and show "Source unverified" instead (currently ids 23 and 25). Remove the flag and add a `source` once one is found.
- The current production corpus contains **exactly 58 records**, the original dohas (ids 1–58). Ids 59–184 (126 unverified BhaktiMala verses added in PR #26) were removed at the maintainer's request; those ids are retired and never reused, and `/doha/59` … `/doha/184` return 404.
- `src/lib/dohas.test.ts` enforces the count, unique ids, line endings (`।` / `॥` for dohas 1–58; every verse ends with `॥`), the "Kabir Saheb" rule and the unverified list. Update the test when the corpus changes on purpose.

### `src/lib/search.ts`, `history.ts`, `explorer.svelte.ts`

- Pure logic lives in `src/lib` and is unit-tested. Components stay thin.
- `explorer.svelte.ts` holds the current doha, the draw round, the counter and the history in Svelte 5 `$state`. Because it is a module, state survives navigation between pages.
- History is stored by doha id in `localStorage` under `kabir-saheb.history`. The doha on the card is never listed under "Previously drawn".

### Components and routes

- `+layout.svelte` renders the header, `DohaExplorer` and footer, so they stay mounted while the reader moves between `/` and `/doha/N`. Pages only add head tags through `Seo.svelte`.
- `DohaExplorer`:
  - Draw, search results and history items move to `/doha/N` with `goto(…, { reset: false })`. That is a normal history entry (Back works) with no scroll jump; Draw also keeps the viewport fixed.
  - Only first loads, links and Back/Forward set the card from the URL (`afterNavigate`, `type !== 'goto'`), so a slow navigation can never overwrite a newer draw.
  - Old `/#doha-N` links redirect to `/doha/N`.
- **Share** uses `navigator.share` when available. Otherwise it copies the same content and shows "Link copied!". Shared content is the doha, a blank line, the meaning, `— Kabir Saheb` (no doha number), a blank line, and the `/doha/N` link (`shareText` in `src/lib/clipboard.ts`, covered by a test).
- `/doha/[id]/+page.ts` lists every id in `entries()` so all 58 pages are prerendered. The doha itself is in the HTML, so search engines and readers without JavaScript see it.
- `<html lang="en">`. Every element containing Hindi carries `lang="hi"`: the kicker, the doha text, Hindi source labels, search-result first lines and history items. Keep this when adding new Hindi text.
- Keep the existing IDs and class names (`#drawBtn`, `#card`, `.doha-text`, `.history-item`…). The CSS and the browser regression tests rely on them.

### Images and loading performance

- The portrait uses **`@sveltejs/enhanced-img`** (plugin in `vite.config.ts`, before `sveltekit()`). The only source file is `src/lib/assets/kabir-saheb.png`, at 2x the display size (264 × 350). At build time `<enhanced:img>` in `SiteHeader.svelte` turns it into AVIF, WebP and JPEG at 132 px (1x) and 264 px (2x), with hashed names under `/_app/immutable/assets/` (cached for a year). EXIF data is stripped and width and height are set. AVIF is 2.8 KB at 1x and 7.9 KB at 2x. To change the portrait, replace that PNG; never hand-make resized copies.
- The portrait is the largest element on the home page, so its AVIF preload must come **before** SvelteKit's script preloads. Component `<svelte:head>` tags always come after them, so `src/hooks.server.ts` inserts the preload into the `%kabir.portrait-preload%` placeholder at the top of `app.html` when pages are prerendered. Under throttling this is the difference between LCP 2.0 s and 4.0 s.
- `og-image.jpg` and `apple-touch-icon.png` stay in `static/images/`: crawlers and iOS need fixed URLs.
- **The CSS is inlined into every page** (`inlineStyleThreshold` in `vite.config.ts`), so there is no render-blocking stylesheet request. SvelteKit's CSP hash mode adds the `<style>` hash automatically. This works because the portrait preload comes first in `<head>`. Measured under real slow-4G throttling: first paint 2.1 s → 0.9 s, LCP 2.1 s → 1.4 s, score 97 → 100.
- **The Devanagari font is trimmed at build time** to the glyphs the site actually draws: 96.5 KB → 23.5 KB. `scripts/subset-fonts.mjs` runs automatically before `dev`, `build`, `test` and `check`:
  1. It finds every run of Devanagari text in `src/` (all dohas, sources and component text).
  2. It shapes each run with HarfBuzz (the shaping engine Chrome and Android use), keeping the glyphs from *every* shaping step, because conjuncts form in stages (क + ् → half-क → क्य).
  3. It subsets the full font in `fonts-src/` to those glyphs and writes `src/lib/assets/fonts/tiro-devanagari-hindi-subset.woff2` (git-ignored). `src/app.css` imports it, so Vite gives it a hashed, year-cached name.
  - **New dohas need no extra step:** their letters and conjuncts are added on the next build. `src/lib/fonts.test.ts` fails if any character in `src/` is missing from the trimmed font.
  - **Verification:** all 184 verses, source labels and the kicker were rendered in Chrome with both fonts and compared pixel by pixel, with 0 differences.
  - **Search engines and copying are unaffected:** the HTML holds plain Unicode text. The search box and status line use other font stacks, so typed Hindi renders in the system font and never needs this font.
  - **Licence:** subsetting is allowed by the SIL OFL; the font has no Reserved Font Name.
- **No fonts are preloaded.** The `@font-face` rules in the inlined CSS start the font downloads as soon as text needs them, with `font-display: swap`. Fonts are cached for a year, so returning visitors get them before the first paint, with no visible font swap.
- **Loading fonts from JavaScript after page load (the `FontFace` API) was tried and rejected.** It helped Lighthouse's simulated score slightly, but returning visitors saw a 50–130 ms flash of the fallback font on every page load.
- When reading Lighthouse, run it in an incognito window without extensions. Password-manager extensions (e.g. Bitwarden) add JavaScript and block the back/forward cache ("WebAuthentication API").

### `src/app.css`

- Owns the OLED-black visual system and responsive layout, starting with `@font-face` rules for the self-hosted fonts in `static/fonts/` (`font-display: swap`; Tiro Devanagari Hindi is split into Devanagari and Latin subsets with `unicode-range`).
- Do not switch to Google Fonts or another CDN: the CSP allows only `'self'`.
- **No inline `<style>` elements or inline event handlers.** Use classes in `app.css`.
- **Phones up to 430px wide** get a slightly smaller doha size (1.15rem), narrower card padding and a smaller search input, so most doha lines stay on one line (measured: 0–3 of 58 dohas wrap at 390–430px, 17 at 360px). Check this with all dohas after adding long ones.
- The footer text is 0.95rem in a light warm grey (`#b8b0a1`, 9.8:1 contrast on black, up from 5.7:1) so the credits are readable on phones.
- Avoid visual redesigns unless the user explicitly requests one.

### `vite.config.ts` (CSP)

- SvelteKit writes a Content-Security-Policy `<meta>` tag into every prerendered page (`csp.mode: 'hash'`). It adds the hash of its own start-up script, so `script-src` stays `'self'` with no `'unsafe-inline'`.
- `style-src-attr 'unsafe-inline'` is allowed only because SvelteKit's route announcer (which tells screen readers about page changes) is hidden with an inline `style` attribute. Style attributes can't run code.
- If a new external resource is added (fonts, scripts, images from another domain), add it to these directives or it will be blocked.

### `static/_headers` (Cloudflare)

- Pages (`/`, `/doha/*`): `Cache-Control: public, max-age=300, stale-while-revalidate=86400`. Browsers reuse a page for 5 minutes without asking at all; after that they show their copy instantly and refresh it in the background, for up to a day. A new deploy therefore reaches returning visitors within about 5 minutes. Cloudflare's edge cache sits in front either way (`cf-cache-status: HIT`). `/sitemap.xml` and `/robots.txt` are cached for an hour; `/_app/version.json` keeps `max-age=0` because SvelteKit checks it to notice new deploys.
- `/_app/immutable/*` (SvelteKit's hashed JS/CSS) and `/fonts/*` are cached for a year as `immutable`; `/images/*` for 30 days. **No more manual `?v=` bumping**: SvelteKit puts a content hash in every JS/CSS file name.
- Security headers: HSTS, COOP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, and a header CSP with what a `<meta>` CSP can't express (`frame-ancestors 'none'`).

### `wrangler.jsonc`

- Worker name `kabir-saheb` (must match the dashboard). It serves `build/` as static assets with `not_found_handling: "404-page"` (unknown URLs get `404.html` with a 404 status) and `html_handling: "auto-trailing-slash"` (`/doha/12/` redirects to `/doha/12`).
- If the production URL changes, update `wrangler.jsonc`, `SITE_URL` in `src/lib/site.ts` and `static/robots.txt`.

## 5. Non-negotiable functional requirements

Preserve all of the following unless the user explicitly requests a change:

- All 58 Hindi dohas and all 58 English meanings.
- Random **Draw a Doha** behavior (no repeats until every doha has been shown), with the "doha N of 58 shown this round" counter.
- Hindi and English keyword search. Results show the first 3 (`PREVIEW_COUNT` in `SearchBox.svelte`) with a "Show all N dohas" / "Show fewer" button; every new search collapses back to 3. A List / Grid toggle (list is default; grid is 2 columns on every screen width) appears when there are 2 or more results, and the chosen view stays for later searches.
- Separate **Copy Hindi** and **Copy English** buttons, and **Share**.
- A prerendered page per doha at `/doha/N`, with its own title, description and preview text. Old `/#doha-N` links keep redirecting.
- "Previously drawn" lists the last five dohas viewed **before** the one on the card. It survives a refresh, and falls back to memory if storage is blocked.
- Clicking a search result or history item displays that doha.
- Kabir Saheb portrait and attribution (painting by Sharan, Wikimedia Commons, CC BY-SA 4.0, with the note that adapted images are shared under the same licence).
- Tagline credit "— Acharya Prashant" (same italic Cormorant Garamond as the quote).
- Doha number and source label on every card.
- Existing OLED-black responsive design.
- No automatic scrolling when drawing a doha.

Opening `index.html` directly from disk is **no longer supported** (dropped with the SvelteKit migration). Preview locally with `npm run dev` or `npm run preview:cloudflare`.

## 6. Search contract

Search lives in `src/lib/search.ts` and must examine both fields for every record:

1. Hindi doha text.
2. English meaning.

Before comparison, both the query and searchable content must be normalized by:

1. Converting to a string.
2. Applying Unicode NFC normalization.
3. Converting to lowercase with locale-aware lowercasing.
4. Replacing consecutive whitespace with one regular space.
5. Trimming leading and trailing whitespace.

Reference behavior:

```js
function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFC")
    .toLocaleLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
```

Search must therefore ignore English capitalization and extra spaces while remaining reliable for Devanagari text.

### Whole-word matching

- Search matches **whole words**, not letters inside words: `ram` finds `राम` and `Ram` but not `trample`. Words are split on anything that is not a letter, combining mark (matra) or digit, so Devanagari words tokenize correctly.
- Every query word must match somewhere in the doha or its meaning, in any order. Common English stop words (`of`, `the`, `a`…) are ignored when other words are present.
- Queries shorter than 2 letters show "Type at least 2 letters to search."
- English words also match simple plural/verb endings (`word` → `words`, `die` → `died`).
- For search only, nukta is ignored and chandrabindu is treated as anusvara (`बजार` = `बाज़ार` stem, `माँ` = `मां`).
- The word index is built **lazily, on the first search**, not when the page starts. Building it for all verses cost ~40 ms of main-thread time on a mobile-speed CPU, about half of hydration, and most visits never search. Keep heavy work out of component setup.
- `SEARCH_ALIASES` in `src/lib/search.ts` maps romanised Hindi (`mann` → `मन`, `ram` → `राम`, `shabd` → `शब्द`…) and English themes (`truth`, `death`, `god`, `ego`…) to related words. `sach`, `saanch`, `sachcha`, `satya`, `सच`, `सांच`, `सत्य`, `सच्चा` and `सच्चाई` search exactly like `truth` (shared `TRUTH_WORDS` list; tested). Add to it when a natural query finds nothing.

### Required regression searches

| Query | Expected result |
| --- | --- |
| `काली चादर` | 1 result: the “गुरु बेचारा…” doha |
| `गुरु बेचारा` | 1 result: the “गुरु बेचारा…” doha |
| `diamond` | 2 matching dohas in the current corpus |
| `marketplace` | 3 matching dohas in the current corpus |
| `चौथे राम` | 1 result: the “चार राम…” doha |
| `four forms of ram` | 1 result: the “चार राम…” doha |
| `ऐसी वाणी` | 1 result: the “ऐसी वाणी…” doha |
| `speak such words` | 1 result: the “ऐसी वाणी…” doha |
| `प्रभुता चेरी` | 1 result: the “प्रभुता को…” doha |
| `power itself becomes` | 1 result: the “प्रभुता को…” doha |
| `घट घट राम` | 1 result: the “कस्तूरी कुण्डल बसे…” doha |
| `ram` | 3 results; must not include “माटी कहे कुम्हार…” (“trample”) |
| `a` | No results, message asks for at least 2 letters |
| `mann`, `guru`, `love`, `ego`, `truth`, `death` | At least 1 result each (the placeholder examples must all work) |

All of these, plus uppercase and extra-space variants, are automated in `src/lib/search.test.ts` (`npm test`). Add a row there whenever you add one here.

## 7. Required latest dohas

These records must remain present in the corpus.

### Doha 54

**Hindi**

```text
हीरा पड़ा बाज़ार में, दुनिया जामे डोल।
जहाँ हीरे का पारखी, तहाँ हीरे का मोल॥
```

**English**

```text
A diamond lies in the marketplace while the world wanders around it. Where there is a true appraiser of diamonds, there the diamond receives its proper value.
```

### Doha 55

**Hindi**

```text
गुरु बेचारा क्या करे, शब्द न लागे अंग।
कहैं कबीर काली चादर, कैसे चढ़े रंग॥
```

**English**

```text
What can the poor Guru do if the Word does not touch one's being? Kabir Saheb says: how can a black cloth take on another colour?
```

### Doha 56

**Hindi**

```text
चार राम हैं जगत में, तीन राम व्यवहार।
चौथे राम सो सार हैं, ताको करो विचार॥
```

**English**

```text
There are four forms of Ram in the world; three are known in ordinary usage. The fourth Ram is the true essence—reflect deeply upon that Ram.
```

### Doha 57

**Hindi**

```text
ऐसी वाणी बोलिए, मन का आपा खोए।
औरन को शीतल करे, आपहुँ शीतल होए॥
```

**English**

```text
Speak such words that the ego of the mind dissolves. They bring coolness to others, and you too become serene.
```

### Doha 58

**Hindi**

```text
प्रभुता को सब कोई भजै, प्रभु को भजै न कोय।
कहैं कबीर प्रभु को भजै, प्रभुता चेरी होय॥
```

**English**

```text
Everyone worships power, but no one worships Prabhu, the Real. Kabir Saheb says: whoever worships Prabhu, power itself becomes their servant.
```

**Text conventions (applied 7 November 2026):** the first line of every doha ends with `।` and the second with `॥`. The word for market is spelled `बाज़ार` throughout. Doha 55 uses `चढ़े` (corrected from `चाढ़े`). Doha 30 uses the common version "कबीर सोता क्या करे, जागो जपो मुरार। / एक दिना है सोवना, लंबे पाँव पसार॥".

**Other approved corrections (7 November 2026):**

- Doha 31 (Bijak sakhi 3) uses a literal English meaning, approved by the user: "Our Word is from the very beginning; the living being has entered into the Word. A basket for keeping flowers — and the horse has eaten the ghee." No published commentary on line 2 was found, so do not add an interpretation without approval.
- Doha 33 (Bijak sakhi 5), line 1, reads "शब्द शब्द बहु अंतरा, सार शब्द मथि लीजे।" (the Bijak form). Line 2 varies between editions.
- Dohas 23 and 25 are kept but marked `unverified: true`.

**Wording conventions for meanings:**

- Kabir is always "Kabir Saheb" in English text: "Kabir Saheb says", "says Kabir Saheb", "Kabir Saheb's".
- Where the doha names the Real (साईं, हरि, राम, गोविन्द, प्रभु, ठाकुर), keep that name transliterated (Sai, Hari, Ram, Govind, Prabhu, Thakur). Where it names nothing, say "the Truth" or "the Real". Do not use "God" or "the Lord" as a person.

Do not silently modernize, transliterate, respell, or rewrite these approved texts. Propose textual corrections separately and obtain approval before changing the corpus.

## 8. GitHub change workflow

For every future update:

1. Read the latest `main` branch before editing.
2. Create a new, narrowly named branch such as `fix/search-spacing`, `content/doha-31-meaning` or `feat/share-button`.
3. Make the smallest changes necessary in the appropriate files.
4. Do not overwrite unrelated user changes.
5. Validate syntax, corpus integrity, search behavior, and preserved functionality.
6. Commit with a clear summary.
7. Open a pull request into `main`. For several related updates, use one small branch per update. These can be stacked (each based on the previous branch) and merged in order with **Create a merge commit**, deleting each branch so GitHub retargets the next PR to `main`. The PR must explain:
   - What changed.
   - Why it changed.
   - Which files changed.
   - What was tested.
   - Any known limitations.
8. Give the pull-request link to the user for validation.
9. Do **not** merge the pull request unless the user explicitly requests it.
10. After the user merges it, the feature branch may be deleted.

Do not push feature work directly to `main`. Do not create a new repository or change the repository URL.

## 9. Validation checklist

Run checks proportional to the change. A normal content or behavior change should include all of the following.

### Automated (must all pass before opening a PR)

```bash
npm install
npm test          # Vitest: corpus integrity, regression searches, history/draw
npm run check     # svelte-check: 0 errors, 0 warnings
npm run build     # prerenders 187 HTML pages + sitemap into build/
```

### In a browser

Run `npm run preview:cloudflare`. It builds and serves `build/` through Cloudflare's own runtime (`wrangler dev`), so `_headers`, 404 handling and redirects match production. Then check:

- No console errors, and no Content-Security-Policy violations.
- Portrait appears and fonts load.
- **Draw a Doha** works repeatedly. The URL moves to `/doha/N`, the title follows, the viewport doesn't jump, and the counter reads "doha N of 58".
- **Back** returns to the previous doha.
- Copy Hindi, Copy English and Share work. Without `navigator.share`, Share copies the doha, meaning, `— Kabir Saheb`, a blank line and the `/doha/N` link.
- Copy and Share buttons appear when a doha is opened from search, history or a link, not only after Draw.
- History shows the last five previous dohas, never the current one, and survives a refresh.
- `/doha/N` opened directly shows that doha, including with JavaScript disabled.
- `/#doha-12` redirects to `/doha/12`. `/doha/999` returns 404 with the notice.
- Layout remains usable on narrow mobile screens and desktop widths.
- Lighthouse Accessibility, Best Practices and SEO show no failed audits.

### Post-deployment smoke test

After the user merges the pull request and Cloudflare deploys `main`:

- Open the production URL in a logged-out/private browser session. Confirm it does not redirect to Cloudflare Access login.
- Repeat the search, draw, copy and share checks against production.
- Open `/doha/31` directly and check its title.
- In DevTools, check the response headers: pages `max-age=300, stale-while-revalidate=86400`; `/_app/immutable/*` and fonts a year; CSP; HSTS.
- Check that `/README.md` returns 404.
- Paste a `/doha/N` link into WhatsApp and check that the preview shows that doha's title and text.

## 10. Cloudflare deployment and access

- The canonical public site runs at `kabir-saheb.sant-vani.workers.dev`, served by the Worker `kabir-saheb`.
- **Workers Builds settings** (Cloudflare dashboard → Workers & Pages → `kabir-saheb` → Settings → Build):
  - Build command: `npm run build`
  - Deploy command: `npx wrangler deploy`
  - Root directory: `/`
- `wrangler deploy` reads `wrangler.jsonc` and uploads `build/`.
- Merges into `main` trigger the production build and deployment automatically.
- Keep **production traffic public** because the website is intended for public reading.
- If preview deployments are used, restrict **previews only** to the owner's Cloudflare account or exact authorized email.
- Do not select an Access policy that protects **all production traffic**.
- If previews are not needed, disable Preview URLs instead.
- Never disable the production `workers.dev` route when the goal is merely to disable authentication.

If a deployment succeeds but the public URL shows a Cloudflare login screen, Cloudflare Access is protecting production. Remove that production rule or make this Worker public, then retest as a logged-out visitor.

If a build fails, the previous deployment stays live. Check the build log in the dashboard.

## 11. Security and privacy rules

- This is a client-side static website. Anything shipped in HTML, CSS or JavaScript, including the doha data bundled from `src/lib/dohas.ts`, is publicly downloadable.
- Never add passwords, API tokens, private keys, personal data, or other secrets to the repository.
- Do not treat repository privacy as protection for secrets included in deployed assets.
- Keep external links using `rel="noopener noreferrer"` when opening a new tab.
- Avoid adding analytics, cookies, trackers, or third-party scripts without explicit user approval.
- Preserve the source attribution and the CC BY-SA 4.0 portrait credit in the footer and README.

## 12. Content policy for doha updates

When the user requests new or corrected verses:

1. Preserve the submitted Devanagari text exactly unless correction is requested.
2. Add a clear English plain-sense translation.
3. Check for exact and near duplicates before insertion.
4. Update the count shown in documentation if the corpus size changes.
5. Add new search regression cases for distinctive Hindi and English terms.
6. Avoid presenting uncertain authorship or textual variants as definitively verified; flag uncertainty in the pull request.
7. Do not copy a modern copyrighted translation. Use an original plain-sense rendering.

## 13. Current completed milestones

- Original single-file website repaired while preserving its design and functionality.
- Missing two dohas and English translations added.
- Corpus verified at 55 dohas before the latest content addition.
- Search updated to inspect Hindi and English with case and whitespace normalization.
- Required search regression queries tested successfully.
- HTML, CSS, application JavaScript, and doha data separated for easier review.
- `data/dohas.js` established as the canonical content store.
- Split-file version merged into GitHub `main` through a pull request.
- Cloudflare Worker deployment created and made publicly accessible.
- Public production search smoke tests passed for `काली चादर`, `गुरु बेचारा`, `diamond`, and `marketplace`.
- Doha 56, “चार राम हैं जगत में…”, added with an original English plain-sense translation.
- Doha 57, “ऐसी वाणी बोलिए…”, added with an original English plain-sense translation.
- Doha 58, “प्रभुता को सब कोई भजै…”, added with an original English plain-sense translation.
- 126 additional discovery verses from BhaktiMala added as ids 59–184 with original literal English translations; all are marked `unverified: true` pending confirmation from published Kabir sources (PR #26). Later removed again: only the original 58 dohas are kept, and ids 59–184 are retired.
- Shared text signature changed to `— Kabir Saheb` (no doha number), with a blank line before the link (PR #28).

**7 November 2026 (PRs #9–#23):**

- **Performance and privacy:**
  - Portrait moved out of `script.js` into image files; `script.js` went from 540 KB to about 7 KB.
  - Doha data no longer exposed on `window`.
  - Cloudflare `_headers` added for caching and security.
- **Lighthouse:** contrast, `<main>` landmark, meta description, favicon and image sizing fixed. Accessibility, Best Practices and SEO all reach 100.
- **Search:** whole-word matching, 2-letter minimum, and aliases for romanised Hindi and English themes.
- **Footer:** corrected corpus wording, painter credit with Commons link and CC BY-SA 4.0 licence, tagline credited to Acharya Prashant.
- **Doha text:**
  - #55 spelling fixed (चढ़े) and #30 replaced with its rhyming version.
  - All line endings unified to `।` / `॥`, and बाज़ार spelled one way.
  - #33 line 1 restored to the Bijak form, and #31 given a literal meaning.
- **Meanings:** personal "God/Lord" replaced with the doha's own names or "the Truth/the Real", and "Kabir" with "Kabir Saheb".
- **Stable ids and sources:** permanent ids, "Doha N" and source labels; #23 and #25 marked "Source unverified".
- **Links and sharing:** per-doha links, Share button, and link-preview tags with a 1200×630 image.
- **Fonts and language:** self-hosted fonts, `lang="en"` page with Hindi marked `lang="hi"`.
- **History:** "Previously drawn" no longer repeats the current doha and survives a refresh.

**7 November 2026, SvelteKit migration (PRs #27, #29, #30 and the deploy PR):**

- **Stack:** moved to SvelteKit 3 (Svelte 5, TypeScript), fully prerendered with adapter-static and served by Cloudflare from `build/`.
- **Data:** the doha data (all 184 verses, including PR #26) became a typed module (`src/lib/dohas.ts`); the `window` global is gone for good. PR #28's share format was carried over.
- **Code:** search and history logic moved into `src/lib`, with 32 Vitest tests. The UI was split into Svelte components with the same look and behaviour.
- **Per-doha pages:** `/doha/1` … `/doha/184` are prerendered with their own titles, descriptions and preview text. The URL follows the reader, Back works, Share links to `/doha/N`, and old `#doha-N` links redirect.
- **Site files:** 404 page, `sitemap.xml` and `robots.txt` added.
- **Security and caching:** strict CSP via SvelteKit `<meta>` tags (hash mode), hashed JS/CSS cached for a year, and no more manual `?v=` bumps.

## 14. Instructions for future AI collaborators

When asked to update this project:

- Treat this file and the latest GitHub `main` branch as project context.
- Inspect the current files before proposing or making changes.
- Use GitHub branches and pull requests as the default delivery workflow.
- Preserve the existing design and behavior unless the requested change requires otherwise.
- Keep content in `src/lib/dohas.ts`, logic in `src/lib/*.ts` (with tests), UI in `src/lib/components/`, page head tags in `src/routes/`, and styles in `src/app.css`.
- This is **SvelteKit 3**, not 2: config is in `vite.config.ts` (there is no `svelte.config.js`), imports use `#lib/…` (not `$lib`), and `goto` takes `{ replace, reset, shallow }`.
- Run `npm test`, `npm run check` and `npm run build` before opening a pull request, and test in `npm run preview:cloudflare`.
- Never edit `src/lib/assets/fonts/` by hand: it is generated. To change the Devanagari font, replace the file in `fonts-src/`.
- Report exact tests and results; do not claim deployment until the live URL has been checked.
- Call him "Kabir Saheb" in all English text you add.
- Ask for clarification only when a choice would materially change content, design, access, or repository history.
