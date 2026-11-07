# Kabir Saheb Doha Website

A contemplative static website featuring 58 Hindi dohas attributed to Sant Kabir, each paired with an English translation.

## Features

- Random doha draw
- Hindi and English keyword search
- Search normalization for capitalization and extra spaces
- Recently viewed history
- Separate Hindi and English copy buttons
- Kabir Saheb portrait
- Responsive OLED-black design

## Project structure

- `index.html` — semantic page structure and references to the other layers
- `styles.css` — visual design and responsive layout
- `data/dohas.js` — browser-native data store containing all 58 Hindi and English records
- `script.js` — application behavior, search, history, drawing, and copy actions
- `images/` — Kabir Saheb portrait (WebP with JPEG fallback) and touch icon
- `_headers` — Cloudflare cache-control and security headers
- `.assetsignore` — files Cloudflare should not publish

When you change `styles.css`, `script.js` or `data/dohas.js`, bump the `?v=` version on its reference in `index.html` so browsers pick up the new file.

The data file loads before `script.js`, so the site works when opened directly from disk without a server or build step.

## Run locally

Download the repository and open `index.html` in a modern web browser. No external assets or package installation are required.

## Live website

[Open the public Cloudflare deployment](https://kabir-saheb.sant-vani.workers.dev/)

The production website is hosted on Cloudflare Workers and is automatically deployed from the `main` branch.
