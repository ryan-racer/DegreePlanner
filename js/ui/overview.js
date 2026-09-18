// "University requirements" strip on the Audit tab.
import { $, school, runtime } from '../core.js';
import { esc } from './render.js';
import { auditDegree } from '../engine/degree.js';
import { courseDetails } from '../data/courseinfo.js';

let overviewToken = 0;
export function renderOverview(courses, declaredResults) {
  const el = $('#overview'); if (!el) return;
  const used = new Set(declaredResults.flatMap((r) => r.usedCourses.map((c) => c.key)));
  const unused = courses.filter((c) => !used.has(c.key));
  const num = (n) => (n % 1 ? n.toFixed(1) : n);
  const tile = (label, body, sub = '') => `<div class="min-w-0"><div class="text-[11px] text-zinc-500">${label}</div><div class="text-base font-semibold tabular-nums leading-tight">${body}</div>${sub ? `<div class="text-[11px] text-zinc-500">${sub}</div>` : ''}</div>`;
  const frame = (inner) => `<div class="mb-2 flex items-baseline justify-between gap-3"><h2 class="text-sm font-semibold">University requirements</h2><span class="text-[11px] text-zinc-500">counts completed, in-progress, and planned courses</span></div><div class="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">${inner}</div><div id="unused-list" class="mt-3 hidden flex-wrap gap-1.5"></div><ul id="degree-notes" class="mt-3 hidden space-y-1 border-t border-zinc-100 pt-2 text-xs leading-5 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"></ul>`;
  const unusedTile = `<div class="min-w-0"><div class="text-[11px] text-zinc-500">Not used by your programs</div><div class="text-base font-semibold tabular-nums leading-tight">${unused.length}<span class="text-sm font-normal text-zinc-400"> course${unused.length === 1 ? '' : 's'}</span></div>${unused.length ? `<button type="button" id="unused-toggle" class="text-[11px] font-medium text-blue-700 hover:underline dark:text-blue-400">Show</button>` : ''}</div>`;
  const wire = () => {
    if (!unused.length) return;
    $('#unused-list').innerHTML = [...unused].sort((a, b) => a.code.localeCompare(b.code)).map((c) => `<span class="rounded border border-zinc-200 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-800"><span class="course-ref cursor-help" data-course="${esc(c.code)}" tabindex="0">${esc(c.code)}</span><span class="ml-1 font-sans text-zinc-500">${c.hours}</span></span>`).join('');
    $('#unused-toggle').addEventListener('click', (e) => { const l = $('#unused-list'); const closed = l.classList.toggle('hidden'); l.classList.toggle('flex', !closed); e.target.textContent = closed ? 'Show' : 'Hide'; });
  };
  el.innerHTML = frame(tile('Hours', '<span class="text-zinc-400">…</span>') + unusedTile); wire();
  const token = ++overviewToken;
  const programs = declaredResults.map((r) => r.program);
  auditDegree({ school, courses, programs, loadDetails: (code) => courseDetails(school, code) }).then((d) => {
    if (token !== overviewToken || !d) return;
    runtime.degree = d;
    const warn = 'text-amber-600 dark:text-amber-400', ok = 'text-emerald-600 dark:text-emerald-400';
    // Hours earned in residence matter only to students with transfer credit; show them once they differ.
    const inRes = (r) => (r && courses.some((c) => c.source === 'transfer') ? `<span class="${r.satisfied ? '' : warn}">${num(r.have)} at ${esc(school.shortName || school.name)}</span>, ${r.need} required` : '');
    const hoursTile = tile('Hours', `<span class="${d.hours.satisfied ? '' : ''}">${num(d.hours.have)}</span><span class="text-sm font-normal text-zinc-400"> / ${d.hours.need}</span>`, inRes(d.residency?.hours) || (d.hours.need > (school.degree.hours || 120) ? 'your degree requires more than 120' : 'toward the degree'));
    const upperTile = tile('Upper-level hours', `<span>${num(d.upper.have)}</span><span class="text-sm font-normal text-zinc-400"> / ${d.upper.need}</span>`, inRes(d.residency?.upper) || '300 level and above');
    const distTile = `<div class="min-w-0"><div class="text-[11px] text-zinc-500">Distribution</div><div class="flex gap-2 text-base font-semibold tabular-nums leading-tight">${Object.entries(d.dist).map(([g, v], i) => `<span title="${esc((v.courses.map((c) => c.code).join(', ') || 'none yet') + (v.detail ? ' — ' + v.detail : ''))}"><span class="text-[11px] font-normal text-zinc-500">D${i + 1} </span><span class="${v.satisfied ? '' : warn}">${v.have}/${v.target}</span></span>`).join('')}</div><div class="text-[11px] text-zinc-500">${Object.values(d.dist).some((v) => v.detail) ? Object.entries(d.dist).filter(([, v]) => v.detail).map(([g]) => `Group ${g} needs a second department`).join('; ') : '3 courses per group, 2+ departments'}</div></div>`;
    const checks = `<div class="min-w-0"><div class="text-[11px] text-zinc-500">Also required</div><div class="flex flex-wrap gap-x-3 gap-y-0.5 text-sm font-medium leading-tight">${d.items.map((it) => `<span class="${it.satisfied ? ok : warn}" title="${esc(it.name)}${it.courses.length ? ': ' + esc(it.courses.map((c) => c.code).join(', ')) : ''}">${it.satisfied ? '✓' : '○'} ${esc(school.degree[it.id]?.short || it.name)}</span>`).join('')}</div><div class="text-[11px] text-zinc-500">writing, activity, diversity</div></div>`;
    el.innerHTML = frame(hoursTile + upperTile + distTile + checks + unusedTile); wire();
    if (d.notes.length) { const n = $('#degree-notes'); n.classList.remove('hidden'); n.innerHTML = d.notes.map((t) => `<li>${esc(t)}</li>`).join(''); }
  });
}
