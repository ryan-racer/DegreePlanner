// Lightweight course autocomplete for every "Add course" input (class="course-input").
// Matches on code prefix ("comp 4") or title words ("machine learn"); Enter or click fills the input and submits.

import { esc, titleCase } from './render.js';

let list, index = [], active = null, cursor = -1, school;

export function initCourseAutocomplete(activeSchool) {
  setAutocompleteSchool(activeSchool);
  list = document.createElement('div');
  list.id = 'course-ac';
  list.setAttribute('role', 'listbox');
  list.className = 'fixed z-40 hidden max-h-64 w-72 overflow-y-auto rounded-md border border-zinc-200 bg-white py-1 text-xs shadow-lg dark:border-zinc-700 dark:bg-zinc-900';
  document.body.appendChild(list);

  document.addEventListener('input', (e) => { if (e.target.classList?.contains('course-input')) update(e.target); });
  document.addEventListener('focusin', (e) => { if (e.target.classList?.contains('course-input')) update(e.target); else if (!list.contains(e.target)) hide(); });
  document.addEventListener('keydown', (e) => {
    if (!active || list.classList.contains('hidden')) return;
    const items = list.querySelectorAll('[data-code]');
    if (e.key === 'ArrowDown') { e.preventDefault(); cursor = Math.min(cursor + 1, items.length - 1); highlight(items); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); cursor = Math.max(cursor - 1, 0); highlight(items); }
    else if (e.key === 'Enter' && cursor >= 0 && items[cursor]) { e.preventDefault(); choose(items[cursor].dataset.code); }
    else if (e.key === 'Escape') hide();
  });
  list.addEventListener('mousedown', (e) => { const it = e.target.closest('[data-code]'); if (it) { e.preventDefault(); choose(it.dataset.code); } });
  document.addEventListener('click', (e) => { if (!list.contains(e.target) && e.target !== active) hide(); });
  window.addEventListener('scroll', hide, { passive: true });
}

export function setAutocompleteSchool(s) {
  school = s;
  index = Object.entries(s.catalog || {}).map(([code, v]) => ({ code, title: v.title || '', lower: `${code} ${v.title || ''}`.toLowerCase(), hours: v.hours }));
  hide();
}

function update(input) {
  active = input; cursor = -1;
  const q = input.value.trim().toLowerCase().replace(/\s+/g, ' ');
  if (q.length < 2) { hide(); return; }
  const codeQ = q.replace(/^([a-z]+)\s?(\d)/, '$1 $2');
  let hits = index.filter((c) => c.code.toLowerCase().startsWith(codeQ));
  if (hits.length < 8) {
    const words = q.split(' ').filter(Boolean);
    const byTitle = index.filter((c) => !hits.includes(c) && words.every((w) => c.lower.includes(w)));
    // Undergraduate courses first, then by code.
    byTitle.sort((a, b) => (Number(a.code.slice(-3)) >= 500) - (Number(b.code.slice(-3)) >= 500) || a.code.localeCompare(b.code));
    hits = hits.concat(byTitle);
  }
  hits = hits.slice(0, 8);
  if (!hits.length) { hide(); return; }
  list.innerHTML = hits.map((c) => `<div role="option" data-code="${esc(c.code)}" class="flex cursor-pointer items-baseline gap-2 px-2.5 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800">
      <span class="shrink-0 font-mono text-[12px] font-medium">${esc(c.code)}</span>
      <span class="min-w-0 flex-1 truncate text-zinc-500">${esc(titleCase(c.title))}</span>
      <span class="shrink-0 text-[10px] text-zinc-400">${c.hours ?? ''}</span></div>`).join('');
  list.classList.remove('hidden');
  const r = input.getBoundingClientRect();
  list.style.left = `${Math.min(r.left, window.innerWidth - list.offsetWidth - 8)}px`;
  list.style.top = `${r.bottom + 4}px`;
}

function highlight(items) {
  items.forEach((it, i) => it.classList.toggle('bg-zinc-100', i === cursor));
  items.forEach((it, i) => it.classList.toggle('dark:bg-zinc-800', i === cursor));
  items[cursor]?.scrollIntoView({ block: 'nearest' });
}

function choose(code) {
  if (!active) return;
  active.value = code;
  hide();
  active.form?.requestSubmit();
}

function hide() { list?.classList.add('hidden'); cursor = -1; }
