(function () {
  'use strict';

  // A curated collection of well-known dohas (couplets) attributed to Sant Kabir Das (c. 15th century).
  // These verses are traditionally attributed to Kabir, from the Bijak and the oral
  // tradition, passed down for over 500 years. English renderings below are plain-sense paraphrases, not
  // literal or copyrighted translations.
  const dohas = Array.isArray(window.KABIR_DOHAS) ? window.KABIR_DOHAS : [];
  // Hand-off is complete: remove the global so the corpus isn't listed on
  // `window` in the DevTools console. The array now lives only in this closure.
  try { delete window.KABIR_DOHAS; } catch (e) { window.KABIR_DOHAS = undefined; }
  if (dohas.length === 0) throw new Error("Doha data failed to load.");

  const card = document.getElementById('card');
  const btn = document.getElementById('drawBtn');
  const copyHindiBtn = document.getElementById('copyHindiBtn');
  const copyMeaningBtn = document.getElementById('copyMeaningBtn');
  const shareBtn = document.getElementById('shareBtn');
  const counter = document.getElementById('counter');
  const historySection = document.getElementById('historySection');
  const historyList = document.getElementById('historyList');
  const historyEmpty = document.getElementById('historyEmpty');

  // Recently viewed dohas, newest first, including the one on the card.
  // Saved by doha id in localStorage so the list survives a refresh; if
  // storage is unavailable (private mode, file:// quirks) it stays in memory.
  const HISTORY_KEY = 'kabir-saheb.history';
  const HISTORY_SIZE = 5;
  let seenIndices = [];
  let recent = loadHistory();
  let currentIndex = null;

  function loadHistory(){
    try {
      const ids = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      if (!Array.isArray(ids)) return [];
      return ids
        .map(id => dohas.findIndex(d => d.id === id))
        .filter(idx => idx !== -1)
        .slice(0, HISTORY_SIZE + 1);
    } catch (e) {
      return [];
    }
  }

  function saveHistory(){
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(recent.map(idx => dohas[idx].id)));
    } catch (e) {}
  }

  function pickIndex(){
    if (seenIndices.length >= dohas.length) seenIndices = [];
    let idx;
    do {
      idx = Math.floor(Math.random() * dohas.length);
    } while (seenIndices.includes(idx));
    seenIndices.push(idx);
    return idx;
  }

  // Each doha has a permanent `id` in data/dohas.js; it never changes, even
  // if dohas are removed or reordered, so numbers and links stay stable.
  function sourceLabel(d){
    return d.source || 'Traditionally attributed to Kabir';
  }

  function metaLine(d){
    return '<p class="doha-meta"><span class="doha-number">Doha ' + d.id + '</span>' +
      '<span class="doha-source"' + (d.source ? ' lang="hi"' : '') + '>' + sourceLabel(d) + '</span></p>';
  }

  function showDoha(idx){
    currentIndex = idx;
    const d = dohas[idx];
    card.innerHTML =
      metaLine(d) +
      '<p class="doha-text" lang="hi">' + d.text + '</p>' +
      '<p class="meaning">' + d.meaning + '</p>';
    copyHindiBtn.hidden = false;
    copyMeaningBtn.hidden = false;
    shareBtn.hidden = false;
    setDohaHash(d.id);
    renderHistory();
  }

  // Per-doha links use the URL hash (#doha-12), so they also work when the
  // page is opened from disk and need no server routes.
  const HASH_PREFIX = '#doha-';

  function dohaLink(d){
    return location.href.split('#')[0] + HASH_PREFIX + d.id;
  }

  function setDohaHash(id){
    if (location.hash === HASH_PREFIX + id) return;
    try { window.history.replaceState(null, '', HASH_PREFIX + id); } catch (e) {}
  }

  function indexFromHash(){
    const m = /^#doha-(\d+)$/.exec(location.hash);
    if (!m) return -1;
    const id = Number(m[1]);
    return dohas.findIndex(d => d.id === id);
  }

  function firstLine(text){
    return text.split('\n')[0];
  }

  function addToHistory(idx){
    // Move to front if already present. Keep one extra slot because the
    // doha on the card is not listed under "previously drawn".
    recent = recent.filter(i => i !== idx);
    recent.unshift(idx);
    if (recent.length > HISTORY_SIZE + 1) recent = recent.slice(0, HISTORY_SIZE + 1);
    saveHistory();
  }

  function renderHistory(){
    const previous = recent.filter(idx => idx !== currentIndex).slice(0, HISTORY_SIZE);
    historySection.hidden = previous.length === 0;
    historyList.innerHTML = '';
    if (previous.length === 0){
      historyList.appendChild(historyEmpty);
      return;
    }
    previous.forEach(idx => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'history-item';
      item.lang = 'hi';
      item.textContent = firstLine(dohas[idx].text);
      item.addEventListener('click', () => {
        addToHistory(idx);
        showDoha(idx);
        counter.textContent = '';
      });
      historyList.appendChild(item);
    });
  }

  function renderDoha(){
    // Keep the user's current viewport fixed when a new doha changes the page height.
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const idx = pickIndex();
    addToHistory(idx);
    showDoha(idx);
    counter.textContent = 'doha ' + (seenIndices.length) + ' of ' + dohas.length + ' shown this round';
    window.scrollTo(scrollX, scrollY);
    requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
  }

  async function copyText(text, button, doneLabel){
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    }
    const original = button.textContent;
    button.textContent = doneLabel || 'Copied!';
    setTimeout(() => { button.textContent = original; }, 1500);
  }

  function copyHindi(){
    if (currentIndex === null) return;
    copyText(dohas[currentIndex].text, copyHindiBtn);
  }

  function copyMeaning(){
    if (currentIndex === null) return;
    copyText(dohas[currentIndex].meaning, copyMeaningBtn);
  }

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchStatus = document.getElementById('searchStatus');
  const searchResults = document.getElementById('searchResults');

  function normalizeSearchText(value){
    return String(value || '')
      .normalize('NFC')
      .toLocaleLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Search matches whole words, not letters inside words, so "ram" finds
  // "राम" and "Ram" but not "trample". Every query word must match (in any
  // order). Romanised Hindi and a few English themes are expanded below so
  // common queries like "mann", "truth" or "death" find the right dohas.
  const MIN_QUERY_LENGTH = 2;
  const STOP_WORDS = new Set(['a', 'an', 'the', 'of', 'to', 'in', 'is', 'and', 'or', 'on', 'at', 'by', 'for', 'be']);
  const SEARCH_ALIASES = {
    // Romanised Hindi → Devanagari
    man: ['मन', 'मना', 'mind'], mann: ['मन', 'मना', 'mind'], mana: ['मन', 'मना', 'mind'], mun: ['मन', 'mind'],
    ram: ['राम'], raam: ['राम'], rama: ['राम'],
    guru: ['गुरु'], hari: ['हरि'], prabhu: ['प्रभु'], govind: ['गोविन्द'],
    sai: ['साईं'], sain: ['साईं'], saain: ['साईं'], sayeen: ['साईं'],
    kabir: ['कबीर', 'कबीरा', 'कबिरा'], kabira: ['कबीर', 'कबीरा', 'कबिरा'],
    prem: ['प्रेम', 'love'], pyar: ['प्रेम', 'love'],
    shabd: ['शब्द', 'शब्दहि', 'शब्दे', 'word'], shabad: ['शब्द', 'शब्दहि', 'शब्दे', 'word'], sabad: ['शब्द', 'शब्दहि', 'शब्दे', 'word'],
    heera: ['हीरा', 'diamond'], hira: ['हीरा', 'diamond'], hansa: ['हंसा', 'swan'], hans: ['हंसा', 'swan'],
    bazar: ['बाज़ार', 'marketplace'], bazaar: ['बाज़ार', 'marketplace'], bajar: ['बाज़ार', 'marketplace'], murari: ['मुरार'], 'बजार': ['बाज़ार'],
    chandan: ['चंदन', 'sandalwood'], paani: ['पानी', 'water'], pani: ['पानी', 'water'],
    jeev: ['जीव', 'जीवत'], jiv: ['जीव', 'जीवत'], kaal: ['काल'], kal: ['काल'], aaj: ['आज'],
    dukh: ['दुःख', 'sorrow'], sukh: ['सुख', 'joy'], nindak: ['निंदक', 'critic'], aapa: ['आपा', 'ego'],
    // English themes → related words used in the dohas and meanings
    mind: ['मन', 'मना'], love: ['प्रेम'], word: ['शब्द', 'शब्दहि', 'शब्दे'],
    ego: ['आपा', 'pride'], pride: ['ego', 'आपा'],
    truth: ['true', 'truly', 'real', 'reality', 'essence', 'सत्य', 'सांच', 'सार'],
    death: ['die', 'died', 'dies', 'dying', 'mortal', 'forever', 'vanish', 'मुआ', 'मुए', 'मरि'],
    die: ['death', 'died', 'dies', 'dying', 'मुआ', 'मुए'],
    god: ['lord', 'divine', 'हरि', 'राम', 'साईं', 'प्रभु', 'गोविन्द', 'परमेश्वर', 'भगवान'],
    lord: ['god', 'divine', 'हरि', 'राम', 'साईं', 'प्रभु', 'गोविन्द', 'परमेश्वर', 'भगवान'],
    diamond: ['हीरा', 'हीरे'], swan: ['हंसा'], critic: ['निंदक'], teacher: ['गुरु', 'guru'],
  };
  const ENGLISH_SUFFIXES = ['s', 'es', 'ed', 'd', 'ing', "'s"];

  // Extra folding for search only: drop nukta and treat chandrabindu as
  // anusvara, so बाजार/बाज़ार and माँ/मां match each other.
  function foldForSearch(value){
    return normalizeSearchText(value)
      .normalize('NFD')
      .replace(/़/g, '')
      .replace(/ँ/g, 'ं')
      .normalize('NFC');
  }

  function tokenize(value){
    return foldForSearch(value).split(/[^\p{L}\p{M}\p{N}']+/u).filter(Boolean);
  }

  const searchIndex = dohas.map(d => new Set(tokenize(d.text + ' ' + (d.meaning || '') + ' ' + (d.source || ''))));

  function wordMatches(words, term){
    if (words.has(term)) return true;
    if (!/^[a-z']+$/.test(term)) return false;
    return ENGLISH_SUFFIXES.some(suffix => words.has(term + suffix));
  }

  function termAlternatives(term){
    const aliases = (SEARCH_ALIASES[term] || []).map(foldForSearch);
    return [term].concat(aliases);
  }

  function runSearch(){
    const query = normalizeSearchText(searchInput.value);
    searchResults.innerHTML = '';
    if (query === ''){
      searchStatus.textContent = '';
      return;
    }
    const allTerms = tokenize(query);
    const meaningful = allTerms.filter(t => !STOP_WORDS.has(t));
    const terms = (meaningful.length ? meaningful : allTerms).filter(t => t.length >= MIN_QUERY_LENGTH);
    if (terms.length === 0){
      searchStatus.textContent = 'Type at least ' + MIN_QUERY_LENGTH + ' letters to search.';
      return;
    }
    const matches = [];
    searchIndex.forEach((words, idx) => {
      const allFound = terms.every(term => termAlternatives(term).some(alt => wordMatches(words, alt)));
      if (allFound) matches.push(idx);
    });
    if (matches.length === 0){
      searchStatus.textContent = 'No doha found for "' + searchInput.value.trim() + '".';
      return;
    }
    searchStatus.textContent = matches.length + ' doha' + (matches.length > 1 ? 's' : '') + ' found for "' + searchInput.value.trim() + '":';
    matches.forEach(idx => {
      const result = document.createElement('button');
      result.type = 'button';
      result.className = 'search-result';
      result.innerHTML =
        '<p class="sr-line"><span class="sr-number">' + dohas[idx].id + '.</span> <span lang="hi">' + firstLine(dohas[idx].text) + '</span></p>' +
        '<p class="sr-meaning">' + dohas[idx].meaning + '</p>';
      result.addEventListener('click', () => {
        addToHistory(idx);
        showDoha(idx);
        counter.textContent = '';
        card.scrollIntoView({ behavior:'smooth', block:'center' });
      });
      searchResults.appendChild(result);
    });
  }

  searchBtn.addEventListener('click', runSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch();
  });

  btn.addEventListener('click', renderDoha);
  copyHindiBtn.addEventListener('click', copyHindi);
  copyMeaningBtn.addEventListener('click', copyMeaning);

  async function shareDoha(){
    if (currentIndex === null) return;
    const d = dohas[currentIndex];
    const url = dohaLink(d);
    const text = d.text + '\n\n' + d.meaning + '\n— Kabir Saheb, Doha ' + d.id;
    if (navigator.share){
      try {
        await navigator.share({ title: 'Kabir Saheb — Doha ' + d.id, text: text, url: url });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    copyText(text + '\n' + url, shareBtn, 'Link copied!');
  }

  shareBtn.addEventListener('click', shareDoha);

  function openFromHash(){
    const idx = indexFromHash();
    if (idx === -1 || idx === currentIndex) return;
    addToHistory(idx);
    showDoha(idx);
    counter.textContent = '';
  }

  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  renderHistory();
})();
