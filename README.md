# Kabir Saheb Doha Website

A contemplative static website featuring 58 Hindi dohas traditionally attributed to Kabir Saheb, each paired with an original plain-sense English meaning.

## Features

- **Draw a Doha:** a random doha, with no repeats until every doha has been shown once.
- **Numbered dohas with sources:** each card shows "Doha N" and its source (e.g. `बीजक — साखी ३`). Dohas with no recorded source say "Traditionally attributed to Kabir Saheb". Dohas that could not be traced to any published collection say "Source unverified".
- **Hindi and English search:**
  - Matches whole words (`ram` finds राम but not "trample") and needs at least 2 letters.
  - Ignores capitalization and extra spaces.
  - Understands romanised Hindi (`mann` → मन, `ram` → राम) and English themes (`truth`, `death`, `ego`).
- **Copy buttons:** Copy Hindi and Copy English work separately.
- **Links and sharing:** every doha has its own link (`#doha-12`), and a Share button opens the phone's share sheet or copies the doha and link.
- **Previously drawn:** the last five dohas before the current one. The list survives a page refresh.
- **Link previews:** WhatsApp and X show a title and picture (`images/og-image.jpg`).
- **Self-hosted fonts:** Poppins, Cormorant Garamond and Tiro Devanagari Hindi.
- **Language markup:** the page is marked English and the Hindi text is marked Hindi, for screen readers and search engines.
- **Kabir Saheb portrait** and a responsive OLED-black design.

## Project structure

- `index.html` — page structure, meta and preview tags, and references to the other files
- `styles.css` — `@font-face` rules, visual design and responsive layout
- `script.js` — drawing, search, history, copy, share and per-doha links
- `data/dohas.js` — the only content store: all 58 records (`id`, Hindi `text`, English `meaning`, optional `source`, optional `unverified`)
- `images/` — portrait (WebP with JPEG fallback), Apple touch icon, and the 1200×630 link-preview image
- `fonts/` — the eight `.woff2` font files and their licences (SIL OFL 1.1)
- `favicon.ico` — browser tab icon
- `_headers` — Cloudflare cache-control and security headers
- `.assetsignore` — files Cloudflare should not publish (Markdown, `.git`)
- `PROJECT_INSTRUCTIONS.md` — detailed rules for anyone (human or AI) changing the site

When you change `styles.css`, `script.js` or `data/dohas.js`, bump the `?v=` version on all three references in `index.html` (e.g. `?v=20261107.15` → `?v=20261108.1`) so browsers pick up the new files.

The data file loads before `script.js`, so the site works when opened directly from disk without a server or build step.

## Naming

On the page, Kabir is always called **Kabir Saheb** in English text (meanings, footer, labels, titles). The Hindi verses are left exactly as written (कबीर, कबीरा, कबिरा).

## Run locally

Download the repository and open `index.html` in a modern web browser. No package installation or internet connection is needed: fonts and images are in the repository.

## Credits

- **Dohas:** traditionally attributed to Kabir Saheb, from the Bijak and the oral tradition. The English meanings are original plain-sense renderings.
- **Tagline:** Acharya Prashant.
- **Portrait:** "Kabir Saheb", painting by Sharan, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kabir_Das.jpg), licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). It has been resized and cropped for this site, and the adapted images are shared under the same licence.
- **Fonts:** Poppins, Cormorant Garamond and Tiro Devanagari Hindi, all under SIL OFL 1.1 (see `fonts/LICENSE.md`).

## Live website

[Open the public Cloudflare deployment](https://kabir-saheb.sant-vani.workers.dev/)

The production website is hosted on Cloudflare Workers and is automatically deployed from the `main` branch.
