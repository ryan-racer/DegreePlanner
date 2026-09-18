// Shared application state and helpers. Everything the UI modules need in common lives here so they do not
// depend on each other. `school` is a live binding: call setSchool() to change it.
import { schools, getSchool } from './schools/index.js';
import { esc } from './ui/render.js';

export const $ = (sel) => document.querySelector(sel);
export let school = getSchool(localStorage.getItem('rf.school') || schools[0].id);
export function setSchool(s) { school = s; }

/** Values computed during a render that other modules read (prepared courses, declared audits, degree audit). */
export const runtime = { prepared: [], declaredResults: [], degree: null };
/** Callbacks registered by app.js so UI modules can trigger a re-render without importing it. */
export const hooks = { renderAll: () => {}, renderResults: () => {} };
export const renderAll = () => hooks.renderAll();

export const state = {
  courses: [],
  declared: [],
  includeInProgress: true,
  includePlanned: true,
  plan: [], // [{ term: 'Spring 2027', courses: [{ code, hours }] }]
  schedule: {}, // { [termCode]: [crn, ...] }
  overrides: {}, // { [programId]: [{ key, code }] } advisor-approved substitutions
  scheduleHidden: {}, // { [termCode]: [code] } transcript courses hidden from that term's schedule
  autoTarget: '',
  catalogYear: '', // '' = infer from the transcript
  scheduleTerm: '',
  editing: false,
  tab: localStorage.getItem('rf.tab') || (location.hash === '#planner' ? 'planner' : location.hash === '#schedule' ? 'schedule' : 'audit'),
  kind: 'all',
  query: '',
  sort: 'pct',
  expanded: new Set(),
  page: 1,
};

export function save() {
  try {
    localStorage.setItem(`rf.${school.id}`, JSON.stringify({ courses: state.courses, declared: state.declared, includeInProgress: state.includeInProgress, includePlanned: state.includePlanned, plan: state.plan, schedule: state.schedule, scheduleTerm: state.scheduleTerm, overrides: state.overrides, scheduleHidden: state.scheduleHidden, autoTarget: state.autoTarget, catalogYear: state.catalogYear }));
    localStorage.setItem('rf.school', school.id);
  } catch { /* storage unavailable */ }
}

export function load() {
  try {
    const d = JSON.parse(localStorage.getItem(`rf.${school.id}`) || 'null');
    if (d) { state.courses = d.courses || []; state.declared = d.declared || []; state.includeInProgress = d.includeInProgress !== false; state.includePlanned = d.includePlanned !== false; state.plan = Array.isArray(d.plan) ? d.plan : []; state.schedule = d.schedule && typeof d.schedule === 'object' ? d.schedule : {}; state.scheduleTerm = d.scheduleTerm || ''; state.overrides = d.overrides && typeof d.overrides === 'object' ? d.overrides : {}; state.scheduleHidden = d.scheduleHidden && typeof d.scheduleHidden === 'object' ? d.scheduleHidden : {}; state.autoTarget = d.autoTarget || ''; state.catalogYear = d.catalogYear || ''; }
    state.expanded = new Set(state.declared);
  } catch { /* ignore */ }
}

/** Academic year of the first term taken at the school: "Fall 2024" or "Spring 2025" -> "2024-2025". */
export function inferCatalogYear() {
  const years = school.catalogYears || [];
  if (!years.length) return '';
  const first = state.courses.filter((c) => c.source !== 'transfer' && /^(Fall|Spring|Summer) \d{4}$/.test(c.term || '')).map((c) => c.term).sort((a, b) => termKey(a) - termKey(b))[0];
  if (!first) return school.currentCatalogYear || years.at(-1);
  const [season, y] = first.split(' '); const start = season === 'Fall' ? Number(y) : Number(y) - 1;
  const wanted = `${start}-${start + 1}`;
  inferredExact = years.includes(wanted);
  if (inferredExact) return wanted;
  return wanted < years[0] ? years[0] : years.at(-1);
}

export let inferredExact = true; // false when the transcript's first year predates the archived catalogs

export function activeYear() { return (school.catalogYears || []).includes(state.catalogYear) ? state.catalogYear : inferCatalogYear(); }

export function activePrograms() { return school.programsFor ? school.programsFor(activeYear()) : school.programs; }

let statusTimer;

export function setStatus(msg, kind = 'info', list = [], { sticky = false } = {}) {
  clearTimeout(statusTimer);
  if (msg && kind === 'ok' && !sticky) statusTimer = setTimeout(() => { const side = $('#side-status'); side.innerHTML = ''; side.classList.add('hidden'); }, 12000);
  const color = { info: 'text-zinc-600 dark:text-zinc-400', ok: 'text-emerald-700 dark:text-emerald-400', error: 'text-red-600 dark:text-red-400' }[kind];
  const html = msg ? `<span class="${color}">${esc(msg)}</span>${list.length ? `<ul class="mt-1 list-disc pl-4 text-zinc-500">${list.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>` : ''}` : '';
  $('#intro-status').innerHTML = html;
  const side = $('#side-status');
  side.innerHTML = html;
  side.classList.toggle('hidden', !html);
}

export const POINTS = { 'A+': 4.33, A: 4, 'A-': 3.67, 'B+': 3.33, B: 3, 'B-': 2.67, 'C+': 2.33, C: 2, 'C-': 1.67, 'D+': 1.33, D: 1, 'D-': 0.67, F: 0 };

export function gradeClass(c) {
  if (c.status === 'planned') return 'border-dashed border-sky-300 text-sky-700 dark:border-sky-700 dark:text-sky-300';
  if (c.status === 'in-progress') return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300';
  if (c.status === 'failed') return 'bg-zinc-100 text-zinc-400 line-through dark:bg-zinc-800';
  const g = c.grade || '';
  if (/^A/.test(g)) return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300';
  if (/^B/.test(g)) return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300';
  if (/^C/.test(g)) return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300';
  if (/^[DF]/.test(g)) return 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300';
  return 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300';
}

export function hoursOf(c) { return Number.isFinite(c.hours) && c.hours >= 0 ? c.hours : (school.catalog?.[c.code]?.hours ?? school.defaultHours ?? 3); }

export function gpa(courses) {
  let pts = 0, hrs = 0;
  for (const c of courses) if (c.status === 'completed' && POINTS[c.grade] != null) { pts += POINTS[c.grade] * hoursOf(c); hrs += hoursOf(c); }
  return hrs ? (pts / hrs).toFixed(2) : null;
}

const SEASONS = { Spring: 1, Summer: 2, Fall: 3 };

export function termKey(t) { const m = (t || '').match(/(Spring|Summer|Fall)\s+(\d{4})/i); return m ? Number(m[2]) * 10 + SEASONS[m[1][0].toUpperCase() + m[1].slice(1).toLowerCase()] : 0; }

/** "Fall 2026" -> "202710" (Banner style: fall belongs to the next academic year). */
export function termCodeFor(name) {
  const m = (name || '').match(/(Spring|Summer|Fall)\s+(\d{4})/i); if (!m) return null;
  const season = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase(); const y = Number(m[2]);
  return season === 'Fall' ? `${y + 1}10` : season === 'Spring' ? `${y}20` : `${y}30`;
}
