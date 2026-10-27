# Kabir Saheb Doha Website

A contemplative static website featuring 55 Hindi dohas attributed to Sant Kabir, each paired with an English translation.

## Features

- Random doha draw
- Hindi and English keyword search
- Search normalization for capitalization and extra spaces
- Recently viewed history
- Separate Hindi and English copy buttons
- Embedded Kabir Saheb portrait
- Responsive OLED-black design

## Project structure

- `index.html` — semantic page structure and references to the other layers
- `styles.css` — visual design and responsive layout
- `data/dohas.js` — browser-native data store containing all 55 Hindi and English records
- `script.js` — application behavior, search, history, drawing, and copy actions

The data file loads before `script.js`, so the site works when opened directly from disk without a server or build step.

## Run locally

Download the repository and open `index.html` in a modern web browser. No external assets or package installation are required.

## Live website

[Open the public Cloudflare deployment](https://kabir-sahab-website.sarchit216-as.workers.dev/)

The production website is hosted on Cloudflare Workers and is automatically deployed from the `main` branch.
