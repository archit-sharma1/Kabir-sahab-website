# Kabir Saheb Doha Website — Project Instructions

Last updated: 7 November 2026 (IST)

## 1. Project identity

- **Project:** Kabir Saheb Doha Website
- **Canonical GitHub repository:** `archit-sharma1/Kabir-sahab-website`
- **Repository URL:** https://github.com/archit-sharma1/Kabir-sahab-website
- **Default branch:** `main`
- **Repository visibility:** Private
- **Canonical production URL:** https://kabir-saheb.sant-vani.workers.dev/
- **Hosting:** Cloudflare Workers with automatic deployment from GitHub
- **Legacy ChatGPT Site:** https://kabir-saheb-dohe.sarchit216-as.chatgpt.site

GitHub is now the source of truth. Make future code and content changes in the GitHub repository, not in the legacy ChatGPT Site, unless the user explicitly asks to update both.

## 2. Website description

This is a contemplative, responsive static website presenting 58 Hindi dohas traditionally attributed to Kabir Saheb, each paired with an original English plain-sense meaning. Visitors can:

- draw a random doha;
- search in Hindi, romanised Hindi or English;
- copy the Hindi and English text separately;
- share a doha or link straight to it (`#doha-N`);
- revisit recently drawn verses, even after a refresh.

Each card shows the doha number and its source.

The website uses a minimal OLED-black design and preserves the supplied Kabir Saheb portrait. It requires no framework, package installation, server, or build process and must remain usable when `index.html` is opened directly from disk.

## 3. Current project structure

```text
Kabir-sahab-website/
├── index.html          # Semantic markup, meta/preview tags and asset references
├── styles.css          # @font-face rules, visual design and responsive styling
├── script.js           # Draw, search, history, copy, share and #doha-N links
├── data/
│   └── dohas.js        # Canonical browser-native store containing all dohas
├── images/             # Portrait (WebP + JPEG), touch icon, og-image.jpg (1200×630)
├── fonts/              # 8 self-hosted .woff2 files + LICENSE.md / OFL.txt
├── favicon.ico         # Browser tab icon
├── _headers            # Cloudflare cache-control and security headers
├── .assetsignore       # Files Cloudflare must not publish (Markdown, .git)
└── README.md           # Repository overview and usage notes
```

Load order in `index.html` is important:

```html
<script src="data/dohas.js"></script>
<script src="script.js"></script>
```

`data/dohas.js` must load first because it defines `window.KABIR_DOHAS`. `script.js` reads that array into its own closure and then deletes the global, so the corpus is not listed on `window` in the DevTools console. (The data file itself is still publicly downloadable, as with any static site.)

Both files, and `styles.css`, are referenced with a `?v=YYYYMMDD.N` version string (currently `?v=20261107.15`; all three share one value). **Bump that version in `index.html` whenever `styles.css`, `script.js` or `data/dohas.js` changes**, because `_headers` lets browsers cache those files for up to 7 days. Do not replace it with a fetched JSON file unless the user explicitly agrees to drop direct `file://` offline support.

## 4. Architectural responsibilities

### `index.html`

- Contains semantic page structure only.
- References `styles.css`, `data/dohas.js`, and `script.js` (each with a `?v=` cache-busting version).
- Wraps the page content in a `<main>` landmark and includes a meta description. Do not put the doha count in the description or titles; it goes stale.
- Carries Open Graph and Twitter tags with absolute URLs to the production domain. The preview image is `images/og-image.jpg` (1200×630). If the production URL changes, update `canonical`, `og:url` and both image URLs.
- Must not absorb the full CSS, application logic, or doha database back into inline blocks.
- `<html lang="en">`. Every element containing Hindi carries `lang="hi"`: the kicker, the doha text, Hindi source labels, search-result first lines and history items. Keep this when adding new Hindi text.
- Preloads the two above-the-fold fonts (Cormorant Garamond 600 and the Tiro Devanagari subset).
- Preserve accessible labels, IDs, headings, footer attribution, and mobile viewport configuration.

### `styles.css`

- Owns the existing OLED-black visual system and responsive layout.
- Preserve the portrait presentation, doha card, buttons, search results, history section, typography, spacing, and focus/hover states.
- Starts with `@font-face` rules for the self-hosted fonts in `fonts/` (`font-display: swap`; Tiro Devanagari Hindi is split into Devanagari and Latin subsets with `unicode-range`). Do not switch to Google Fonts or another CDN: the CSP allows only `'self'`, and the site must work offline.
- Avoid visual redesigns unless the user explicitly requests one.

### `data/dohas.js`

- Is the only canonical doha content store.
- Exposes an array through `window.KABIR_DOHAS`.
- Every record must contain non-empty Hindi doha text and a non-empty English meaning.
- Every record has a permanent numeric `id` (1–58 today). Ids are shown as "Doha N" and used in links. **Never renumber or reuse an id**; a new doha gets the next unused number, and a removed doha's id is retired.
- An optional `source` (e.g. `बीजक — साखी ३`) is shown on the card. Records without one show "Traditionally attributed to Kabir Saheb". Only add a source you can cite. Records that no published collection could be traced to carry `unverified: true` and show "Source unverified" instead (currently ids 23 and 25). Remove the flag and add a `source` once one is found.
- The current production corpus contains **exactly 58 records**.
- When adding, correcting, or removing a doha, edit this file rather than duplicating content in HTML or `script.js`.

### `script.js`

- Runs inside an IIFE so none of its variables become globals.
- Reads the corpus with:

```js
const dohas = Array.isArray(window.KABIR_DOHAS) ? window.KABIR_DOHAS : [];
```

  and then removes `window.KABIR_DOHAS`.

- Must fail clearly if the data file does not load.
- Owns random drawing, bilingual search, history, copy and share buttons, result selection, and `#doha-N` links.
- **Links:** showing a doha updates the URL hash to `#doha-<id>` (via `window.history.replaceState`), and loading or changing the hash opens that doha. Links use the permanent `id`, never the array position.
- **Share:** uses `navigator.share` when available. Otherwise it copies the doha, meaning and link, and shows "Link copied!".
- **History:** stored by doha id in `localStorage` under `kabir-saheb.history`. The doha on the card is never listed under "Previously drawn".
- The portrait is a normal image file in `images/` (a 264 px wide WebP with a JPEG fallback, shown at 132 px). It used to be embedded in `script.js` as about 500 KB of Base64; do not re-embed it. Relative image paths still work when `index.html` is opened from disk.

### `_headers` (Cloudflare)

- HTML is served with `Cache-Control: public, max-age=0, must-revalidate`, so browsers revalidate with the ETag and get a cheap 304 when nothing changed. New deploys appear immediately.
- CSS, JS and `data/` are cached for 7 days (busted by the `?v=` version); images for 30 days; `/fonts/*` for a year as `immutable` (a changed font must get a new file name).
- Also sets security headers (CSP, HSTS, COOP, X-Frame-Options, nosniff, Referrer-Policy). If a new external resource is added (fonts, scripts, images from another domain), update the Content-Security-Policy or it will be blocked.

## 5. Non-negotiable functional requirements

Preserve all of the following unless the user explicitly requests a change:

- All 58 Hindi dohas and all 58 English meanings.
- Random **Draw a Doha** behavior.
- Hindi and English keyword search.
- Separate **Copy Hindi** and **Copy English** buttons.
- "Previously drawn" lists the last five dohas viewed **before** the one on the card (the current doha is never repeated there). It is saved by doha id in `localStorage` (`kabir-saheb.history`) so it survives a refresh, and falls back to memory if storage is blocked.
- Clicking a search result or history item displays that doha.
- Kabir Saheb portrait and attribution (painting by Sharan, Wikimedia Commons, CC BY-SA 4.0, with the note that adapted images are shared under the same licence).
- Tagline credit "— Acharya Prashant".
- Per-doha links (`#doha-N`) and the Share button.
- Doha number and source label on every card.
- Existing OLED-black responsive design.
- Direct offline use without installing packages or running a server.
- No automatic scrolling when drawing a doha.

## 6. Search contract

Search must examine both fields for every record:

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
- `SEARCH_ALIASES` in `script.js` maps romanised Hindi (`mann` → `मन`, `ram` → `राम`, `shabd` → `शब्द`…) and English themes (`truth`, `death`, `god`, `ego`…) to related words. Add to it when a natural query finds nothing.

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

Also test uppercase English and queries containing leading, trailing, and repeated spaces.

## 7. Required latest dohas

These records must remain present in the 58-doha corpus.

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

Run checks proportional to the change. A normal content or behavior change should include all of the following:

### Static validation

- `index.html` references `styles.css`.
- `index.html` loads `data/dohas.js` before `script.js`.
- No accidental reintroduction of large inline CSS or application JavaScript.
- `node --check data/dohas.js` succeeds.
- `node --check script.js` succeeds.
- `window.KABIR_DOHAS` contains exactly 58 complete records.
- No record has blank Hindi or English content.
- CSS braces and syntax remain balanced.

### Functional validation

- Page loads without console errors.
- `typeof window.KABIR_DOHAS` is `"undefined"` after load.
- Lighthouse Accessibility, Best Practices and SEO show no failed audits.
- Portrait appears.
- **Draw a Doha** works repeatedly.
- Copy Hindi and Copy English work independently.
- History shows the last five previous dohas, never the current one, reopens them on click, and survives a page refresh.
- Empty search is handled gracefully.
- Hindi and English searches work.
- Search ignores capitalization and extra whitespace.
- All the regression searches in section 6 return the expected results.
- `#doha-N` opens that doha, including from `file://`. Share copies the doha and link when `navigator.share` is unavailable.
- Copy and Share buttons appear when a doha is opened from search, history or a link, not only after Draw.
- The `?v=` version was bumped if `styles.css`, `script.js` or `data/dohas.js` changed.
- Layout remains usable on narrow mobile screens and desktop widths.

### Post-deployment smoke test

After the user merges the pull request and Cloudflare deploys `main`:

- Open the production URL in a logged-out/private browser session.
- Confirm it does not redirect to Cloudflare Access login.
- Repeat the mandatory search tests against production.
- Confirm the draw, copy and share controls still work.
- Check the response headers in DevTools (Cache-Control, CSP, HSTS), and that `/README.md` returns 404.
- Paste the URL into WhatsApp and check that the preview shows the title and picture.

## 10. Cloudflare deployment and access

- The canonical public site runs at `kabir-saheb.sant-vani.workers.dev`.
- Merges into `main` should trigger the production deployment automatically.
- Keep **production traffic public** because the website is intended for public reading.
- If preview deployments are used, restrict **previews only** to the owner's Cloudflare account or exact authorized email.
- Do not select an Access policy that protects **all production traffic**.
- If previews are not needed, disable Preview URLs instead.
- Never disable the production `workers.dev` route when the goal is merely to disable authentication.

If a deployment succeeds but the public URL shows a Cloudflare login screen, Cloudflare Access is protecting production. Remove that production rule or make this Worker public, then retest as a logged-out visitor.

## 11. Security and privacy rules

- This is a client-side static website. Anything shipped in HTML, CSS, JavaScript, or the data file is publicly downloadable.
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

## 14. Instructions for future AI collaborators

When asked to update this project:

- Treat this file and the latest GitHub `main` branch as project context.
- Inspect the current files before proposing or making changes.
- Use GitHub branches and pull requests as the default delivery workflow.
- Preserve the existing design and behavior unless the requested change requires otherwise.
- Keep content in `data/dohas.js`, styles in `styles.css`, structure in `index.html`, and behavior in `script.js`.
- Call him "Kabir Saheb" in all English text you add.
- Validate locally before opening a pull request.
- Report exact tests and results; do not claim deployment until the live URL has been checked.
- Ask for clarification only when a choice would materially change content, design, access, or repository history.

