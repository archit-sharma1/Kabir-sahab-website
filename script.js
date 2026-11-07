(function () {
  'use strict';

  // A curated collection of well-known dohas (couplets) attributed to Sant Kabir Das (c. 15th century).
  // These verses are part of the public-domain Kabir Bijak / Sakhi tradition, passed down orally
  // and in print for over 500 years. English renderings below are plain-sense paraphrases, not
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
  const counter = document.getElementById('counter');
  const historySection = document.getElementById('historySection');
  const historyList = document.getElementById('historyList');
  const historyEmpty = document.getElementById('historyEmpty');

  // In-memory only: this history is intentionally NOT saved to disk/storage,
  // so it starts fresh every time the page is opened or refreshed.
  let seenIndices = [];
  let history = [];       // holds up to 5 most-recent doha indices, newest first
  let currentIndex = null;
  let drawCount = 0;

  function pickIndex(){
    if (seenIndices.length >= dohas.length) seenIndices = [];
    let idx;
    do {
      idx = Math.floor(Math.random() * dohas.length);
    } while (seenIndices.includes(idx));
    seenIndices.push(idx);
    return idx;
  }

  function showDoha(idx){
    currentIndex = idx;
    const d = dohas[idx];
    card.innerHTML =
      '<p class="doha-text">' + d.text + '</p>' +
      (d.meaning ? '<p class="meaning">' + d.meaning + '</p>' :
        '<p class="meaning">' + d.source + '</p>');
    copyMeaningBtn.disabled = !d.meaning;
    copyMeaningBtn.title = d.meaning ? '' : 'English meaning is not included for this Bijak sakhi.';
    renderHistory();
  }

  function firstLine(text){
    return text.split('\n')[0];
  }

  function addToHistory(idx){
    // move to front if already present, else unshift and cap at 5
    history = history.filter(i => i !== idx);
    history.unshift(idx);
    if (history.length > 5) history = history.slice(0, 5);
  }

  function renderHistory(){
    historySection.hidden = drawCount < 2;
    if (drawCount < 2 || history.length === 0){
      historyList.innerHTML = '';
      historyList.appendChild(historyEmpty);
      return;
    }
    historyList.innerHTML = '';
    history.forEach(idx => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'history-item' + (idx === currentIndex ? ' active' : '');
      item.textContent = firstLine(dohas[idx].text);
      item.addEventListener('click', () => {
        showDoha(idx);
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
    drawCount += 1;
    showDoha(idx);
    copyHindiBtn.hidden = false;
    copyMeaningBtn.hidden = false;
    counter.textContent = 'doha ' + (seenIndices.length) + ' of ' + dohas.length + ' shown this round';
    window.scrollTo(scrollX, scrollY);
    requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
  }

  async function copyText(text, button){
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
    button.textContent = 'Copied!';
    setTimeout(() => { button.textContent = original; }, 1500);
  }

  function copyHindi(){
    if (currentIndex === null) return;
    copyText(dohas[currentIndex].text, copyHindiBtn);
  }

  function copyMeaning(){
    if (currentIndex === null || !dohas[currentIndex].meaning) return;
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

  function runSearch(){
    const query = normalizeSearchText(searchInput.value);
    searchResults.innerHTML = '';
    if (query === ''){
      searchStatus.textContent = '';
      return;
    }
    const matches = [];
    dohas.forEach((d, idx) => {
      const searchableText = normalizeSearchText(d.text + ' ' + (d.meaning || ''));
      if (searchableText.includes(query)){
        matches.push(idx);
      }
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
        '<p class="sr-line">' + firstLine(dohas[idx].text) + '</p>' +
        '<p class="sr-meaning">' + (dohas[idx].meaning || dohas[idx].source) + '</p>';
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
})();
