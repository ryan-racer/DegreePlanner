// Planner tab: the term timeline (transcript + plan), editing, drag and drop, placeholders, and auto-plan.
import { $, state, school, runtime, save, renderAll, setStatus, activePrograms, gradeClass, hoursOf, gpa, termKey, termCodeFor } from '../core.js';
import { esc, titleCase } from './render.js';
import { undoable, clearUndo } from './undo.js';
import { prepareCourses, suggestCourses } from '../engine/audit.js';
import { normalizeCode } from '../engine/match.js';
import { autoPlan, seasonPattern, inferGraduation, upcomingTerms } from '../engine/autoplan.js';
import { auditDegree } from '../engine/degree.js';
import { courseDetails } from '../data/courseinfo.js';
import { suggestForPlaceholder } from './placeholder.js';
import { loadSections } from './schedule.js';

export const scheduleSectionsCache = new Map();

function nextTermDefault() {
  const all = [...state.courses.map((c) => c.term), ...state.plan.map((t) => t.term)].filter(Boolean);
  const latest = all.reduce((a, t) => Math.max(a, termKey(t)), 0);
  const now = new Date();
  const base = latest || now.getFullYear() * 10 + (now.getMonth() < 5 ? 1 : now.getMonth() < 8 ? 2 : 3);
  const year = Math.floor(base / 10), season = base % 10;
  return season === 3 ? { season: 'Spring', year: year + 1 } : { season: 'Fall', year };
}

/** Drop any scheduled section of `code` for the term named `termName`, so plan and schedule stay in step. */
export function unscheduleCourse(termName, code) {
  const tc = termCodeFor(termName); if (!tc || !state.schedule?.[tc]) return;
  const sections = scheduleSectionsCache.get(tc); if (!sections) return;
  state.schedule[tc] = state.schedule[tc].filter((crn) => sections.find((x) => x.crn === crn)?.code !== code);
}

function ensureTerm() {
  if (!state.plan.length) { const d = nextTermDefault(); state.plan.push({ term: `${d.season} ${d.year}`, courses: [] }); }
  return state.plan[state.plan.length - 1];
}

function addPlanned(termIndex, code, hours) {
  const t = state.plan[termIndex]; if (!t) return;
  for (const term of state.plan) term.courses = term.courses.filter((c) => c.code !== code);
  t.courses.push({ code, hours: hours > 0 ? hours : school.catalog?.[code]?.hours });
  save(); renderAll();
}

export function plannedCourses() {
  return state.plan.flatMap((t) => t.courses.filter((c) => c.code).map((c) => ({ code: c.code, hours: c.hours, title: school.catalog?.[c.code]?.title || '', grade: '', status: 'planned', term: t.term, source: 'plan' })));
}

export function prepared() {
  return prepareCourses([...state.courses, ...plannedCourses()], school, { includeInProgress: state.includeInProgress, includePlanned: state.includePlanned });
}

function chip(c, { index, planned, termIndex, idx }) {
  if (planned && !c.code) {
    return `<div class="flex h-6 items-center gap-1.5 rounded px-1 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/70" draggable="true" data-planned="${termIndex}" data-idx="${idx}" data-code="" title="${esc(c.why || 'Placeholder for a course you choose')}">
      <button type="button" data-f="suggest" class="min-w-0 flex-1 truncate text-left italic text-sky-700/80 hover:underline dark:text-sky-300/80" ${c.kind && c.kind !== 'free' ? '' : 'disabled'}>${esc(c.label || 'Elective')}<span class="ml-1 not-italic text-[11px] text-zinc-500">${hoursOf(c)}</span></button>
      <button type="button" class="btn-icon -my-1 size-6 rounded" data-f="remove" aria-label="Remove ${esc(c.label || 'placeholder')}"><svg class="size-3"><use href="#i-x"/></svg></button></div>`;
  }
  const title = c.why ? `${titleCase(c.title || school.catalog?.[c.code]?.title || '')} — ${c.why}` : titleCase(c.title || school.catalog?.[c.code]?.title || '');
  const badge = planned ? '' : c.status === 'in-progress' ? 'IP' : c.grade || (c.source === 'transfer' ? 'TR' : '');
  const editing = state.editing || planned;
  const h = hoursOf(c);
  return `<div class="flex h-6 items-center gap-1.5 rounded px-1 text-xs ${c.status === 'failed' ? 'opacity-50' : ''} hover:bg-zinc-100 dark:hover:bg-zinc-800/70" ${planned ? `data-planned="${termIndex}" data-idx="${idx}" data-code="${esc(c.code)}" draggable="true"` : `data-i="${index}"`} title="${esc(title)}">
    <span class="course-ref min-w-0 flex-1 cursor-help truncate font-mono text-[12px] ${planned ? 'text-sky-700 dark:text-sky-300' : ''}" data-course="${esc(c.code)}" tabindex="0">${esc(c.code)}${editing && !planned ? '' : `<span class="ml-1 font-sans text-[11px] text-zinc-500">${h % 1 ? h.toFixed(1) : h}</span>`}</span>
    ${editing && !planned ? `<select data-f="status" class="field h-5 w-14 px-1 text-[10px]" aria-label="Status" title="Done, in progress, or excluded from audits">
        <option value="completed" ${c.status === 'completed' ? 'selected' : ''}>Done</option>
        <option value="in-progress" ${c.status === 'in-progress' ? 'selected' : ''}>IP</option>
        <option value="failed" ${c.status === 'failed' ? 'selected' : ''}>Skip</option></select>`
      : badge ? `<span class="rounded px-1 font-mono text-[11px] font-medium leading-4 ${gradeClass(c)}">${esc(badge)}</span>` : ''}
    ${planned && state.editing && state.plan.length > 1 ? `<select data-f="move" class="field h-5 w-16 px-1 text-[10px]" aria-label="Move ${esc(c.code)} to term" title="Move to another term"><option value="">Move…</option>${state.plan.map((t, ti) => ti === termIndex ? '' : `<option value="${ti}">${esc(t.term)}</option>`).join('')}</select>` : ''}
    ${editing ? `<button type="button" class="btn-icon -my-1 size-6 rounded" data-f="remove" aria-label="Remove ${esc(c.code)}"><svg class="size-3"><use href="#i-x"/></svg></button>` : ''}
  </div>`;
}

export function renderTimeline() {
  const counted = state.courses.filter((c) => c.status !== 'failed' && (state.includeInProgress || c.status !== 'in-progress'));
  const hrs = counted.reduce((a, c) => a + hoursOf(c), 0);
  const planned = state.plan.reduce((a, t) => a + t.courses.length, 0);
  const g = gpa(state.courses);
  $('#tab-summary').textContent = [`${state.courses.length} courses`, `${hrs % 1 ? hrs.toFixed(1) : hrs} hrs`, g ? `GPA ${g}` : '', planned ? `${planned} planned` : ''].filter(Boolean).join(' · ');
  $('#include-ip').checked = state.includeInProgress;
  $('#include-planned').checked = state.includePlanned;
  $('#auto-clear').hidden = !state.plan.some((t) => t.courses.some((c) => c.auto));
  const latestTerm = state.courses.map((c) => c.term).filter(Boolean).sort((a, b) => termKey(b) - termKey(a))[0];
  const targets = upcomingTerms(latestTerm, 10), inferred = inferGraduation(state.courses);
  const chosen = targets.includes(state.autoTarget) ? state.autoTarget : inferred;
  $('#auto-target').innerHTML = targets.map((t) => `<option value="${esc(t)}" ${t === chosen ? 'selected' : ''}>Finish by ${esc(t)}</option>`).join('');
  const edit = $('#edit-btn'); edit.textContent = state.editing ? 'Done editing' : 'Edit'; edit.setAttribute('aria-pressed', String(state.editing));
  edit.classList.toggle('btn-primary', state.editing);
  edit.classList.toggle('btn-ghost', !state.editing);

  const groups = new Map();
  state.courses.forEach((c, i) => {
    const key = c.source === 'transfer' ? 'Transfer credit' : c.term || 'Other';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ c, i });
  });
  const order = (k) => (k === 'Transfer credit' ? -1 : k === 'Other' ? 1e9 : termKey(k));
  const past = [...groups.entries()].sort((a, b) => order(a[0]) - order(b[0]));

  const addForm = (cls, attrs) => `<form class="${cls} mt-0.5 flex gap-1" ${attrs} autocomplete="off"><input class="course-input field h-6 min-w-0 flex-1 px-1.5 font-mono text-[11px] uppercase placeholder:normal-case" placeholder="Add course" aria-label="Course code" required><button class="btn h-6 px-1.5 text-[11px]" type="submit">Add</button></form>`;
  const colWidth = state.editing ? 'w-[12.5rem] shrink-0' : 'min-w-[6.75rem] flex-1 basis-0';
  const col = (title, sub, body, cls, heavy = false, dropTerm = '') => `<div class="flex ${colWidth} flex-col rounded-md border ${cls}" ${dropTerm ? `data-drop-term="${esc(dropTerm)}"` : ''}>
      <div class="flex items-baseline justify-between gap-2 px-2 pt-1.5 pb-1"><span class="shrink-0 whitespace-nowrap text-xs font-medium">${title}</span><span class="min-w-0 truncate font-mono text-[11px] ${heavy ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-500'}" ${heavy ? `title="Over ${school.maxTermHours || 18} hours: needs overload approval"` : 'title="Credit hours · term GPA"'}>${sub}</span></div>
      <div class="flex flex-col px-1 pb-1">${body}</div></div>`;

  const pastCols = past.map(([term, items]) => {
    const h = items.filter(({ c }) => c.status !== 'failed').reduce((a, { c }) => a + hoursOf(c), 0) + (state.plan.find((t) => t.term === term)?.courses || []).reduce((a, c) => a + hoursOf(c), 0);
    const ip = items.every(({ c }) => c.status === 'in-progress');
    const tg = past.length + state.plan.length <= 7 ? gpa(items.map(({ c }) => c)) : null;
    const pIdx = state.plan.findIndex((t) => t.term === term);
    const plannedHere = pIdx >= 0 ? state.plan[pIdx].courses.map((c, k) => chip({ ...c, status: 'planned', title: school.catalog?.[c.code]?.title }, { planned: true, termIndex: pIdx, idx: k })).join('') : '';
    const body = items.sort((a, b) => a.c.code.localeCompare(b.c.code)).map(({ c, i }) => chip(c, { index: i })).join('') + plannedHere +
      (state.editing ? addForm('add-course', `data-term="${esc(term === 'Transfer credit' || term === 'Other' ? '' : term)}" data-source="${term === 'Transfer credit' ? 'transfer' : 'manual'}"`) : '');
    return col(esc(term), `${h % 1 ? h.toFixed(1) : h}h${ip ? '·IP' : tg && term !== 'Transfer credit' ? `<span class="hidden sm:inline">·${tg}</span>` : ''}`, body, 'border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40', h > (school.maxTermHours || 18), ip ? term : '');
  });

  const planCols = state.plan.map((t, i) => ({ t, i })).filter(({ t }) => !groups.has(t.term)).sort((a, b) => termKey(a.t.term) - termKey(b.t.term)).map(({ t, i }) => {
    const h = t.courses.reduce((a, c) => a + hoursOf(c), 0);
    const body = t.courses.map((c, k) => chip({ ...c, status: 'planned', title: school.catalog?.[c.code]?.title }, { planned: true, termIndex: i, idx: k })).join('') + addForm('add-planned', `data-term="${i}"`);
    const title = `${esc(t.term)}${state.editing ? ` <button type="button" class="btn-icon ml-0.5 size-5 rounded align-middle" data-f="remove-term" data-term="${i}" aria-label="Remove ${esc(t.term)}"><svg class="size-3"><use href="#i-x"/></svg></button>` : ''}`;
    return col(title, `${h}h`, body, 'border-dashed border-sky-300 dark:border-sky-800', h > (school.maxTermHours || 18), t.term);
  });

  const d = nextTermDefault();
  const addCol = `<form id="add-term" class="flex w-[7.5rem] shrink-0 flex-col gap-1 rounded-md border border-dashed border-zinc-300 p-2 dark:border-zinc-700" autocomplete="off">
      <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400">Plan a term</span>
      <select id="term-season" class="field h-7 px-1.5 text-xs" aria-label="Season"><option>Spring</option><option>Summer</option><option>Fall</option></select>
      <div class="flex gap-1"><input id="term-year" class="field h-7 min-w-0 flex-1 px-1.5 text-xs" type="number" min="2000" max="2100" value="${d.year}" aria-label="Year" required>
      <button class="btn h-7 px-2 text-xs" type="submit">Add</button></div>
    </form>`;
  $('#timeline').innerHTML = pastCols.join('') + planCols.join('') + addCol;
  annotatePlannedSeasons();
  $('#term-season').value = d.season;
}

/** Popover with concrete courses for a placeholder; choosing one replaces the placeholder. */
let phPanel;

async function openPlaceholderSuggestions(el) {
  const ti = Number(el.dataset.planned), idx = Number(el.dataset.idx);
  const term = state.plan[ti]; const ph = term?.courses[idx]; if (!ph) return;
  if (!phPanel) {
    phPanel = document.createElement('div');
    phPanel.className = 'fixed z-40 hidden w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-zinc-200 bg-white p-2 text-xs shadow-lg dark:border-zinc-700 dark:bg-zinc-900';
    document.body.appendChild(phPanel);
    document.addEventListener('click', (ev) => { if (!phPanel.contains(ev.target) && !ev.target.closest('[data-f="suggest"]')) phPanel.classList.add('hidden'); });
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') phPanel.classList.add('hidden'); });
  }
  const r = el.getBoundingClientRect();
  phPanel.style.left = `${Math.min(Math.max(8, r.left), innerWidth - 328)}px`; phPanel.style.top = `${Math.min(r.bottom + 4, innerHeight - 260)}px`;
  phPanel.innerHTML = `<div class="px-1.5 py-1 text-zinc-500">Finding courses for ${esc(term.term)}…</div>`;
  phPanel.classList.remove('hidden');
  const all = new Set(runtime.prepared.flatMap((c) => c.aliases));
  const before = new Set(prepareCourses([...state.courses, ...state.plan.filter((t) => termKey(t.term) < termKey(term.term)).flatMap((t) => t.courses.filter((c) => c.code).map((c) => ({ code: c.code, status: 'planned' })))], school, {}).flatMap((c) => c.aliases));
  const list = await suggestForPlaceholder({ school, placeholder: ph, termName: term.term, codesBefore: before, allCodes: all, loadSections });
  phPanel.innerHTML = `<div class="px-1.5 pb-1 pt-0.5 font-medium">${esc(ph.label)} · ${esc(term.term)}</div>` + (list.length
    ? list.map((sg) => `<button type="button" class="flex w-full items-baseline gap-2 rounded px-1.5 py-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800" data-use="${esc(sg.code)}"><span class="course-ref shrink-0 font-mono text-[12px] font-medium" data-course="${esc(sg.code)}">${esc(sg.code)}</span><span class="min-w-0 flex-1 truncate text-zinc-600 dark:text-zinc-400">${esc(titleCase(sg.title))}</span><span class="shrink-0 text-[10px] text-zinc-400">${esc(sg.note)}</span></button>`).join('')
    : '<div class="px-1.5 py-1 text-zinc-500">No confident suggestions for this term. Try the Schedule tab search.</div>');
  phPanel.querySelectorAll('[data-use]').forEach((b) => b.addEventListener('click', () => {
    const code = b.dataset.use;
    term.courses[idx] = { code, hours: school.catalog?.[code]?.hours, why: `You chose this for: ${ph.label}` };
    phPanel.classList.add('hidden'); save(); renderAll();
  }));
}

/** Mark planned courses whose term's season does not match when the course has historically run. */
let annotateToken = 0;

async function annotatePlannedSeasons() {
  const token = ++annotateToken;
  for (const el of document.querySelectorAll('#timeline [data-planned]')) {
    const term = state.plan[Number(el.dataset.planned)]?.term || '';
    const season = term.split(' ')[0];
    if ((season !== 'Fall' && season !== 'Spring') || !el.dataset.code) continue;
    const details = await courseDetails(school, el.dataset.code);
    if (token !== annotateToken) return;
    const pat = seasonPattern(details, school.scheduleTerms);
    if (pat[season] === false) {
      el.classList.add('bg-amber-50', 'dark:bg-amber-950/40');
      el.title = `${el.dataset.code} has been ${pat.label} recently, so it probably will not run in ${term}.`;
      const ref = el.querySelector('.course-ref');
      if (ref && !el.querySelector('[data-warn]')) ref.insertAdjacentHTML('afterend', `<span data-warn class="rounded bg-amber-100 px-1 font-mono text-[10px] font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">${pat.Fall ? 'fall' : pat.Spring ? 'spring' : 'n/a'}</span>`);
    }
  }
}

async function runAutoPlan() {
  const programs = state.declared.map((id) => activePrograms().find((p) => p.id === id)).filter(Boolean);
  if (!programs.length) { setStatus('Choose your major on the Audit tab first, then Auto-plan can fill in what it requires.', 'error'); return; }
  const btn = $('#auto-btn'); btn.disabled = true; btn.textContent = 'Planning…';
  try {
    // Distribution needs are measured against everything except earlier auto-planned courses, which get rebuilt.
    const keep = state.plan.flatMap((t) => t.courses.filter((c) => c.code && !c.auto).map((c) => ({ code: c.code, hours: c.hours, status: 'planned', term: t.term })));
    const deg = await auditDegree({ school, programs, courses: prepareCourses([...state.courses, ...keep], school, {}), loadDetails: (code) => courseDetails(school, code) });
    const result = await autoPlan({
      school, programs, courses: state.courses, plan: state.plan, overrides: state.overrides,
      hoursPerTerm: Number($('#auto-hours').value) || 16, graduateBy: $('#auto-target').value, includeSummers: $('#auto-summers').checked,
      distNeed: deg ? deg.distNeed : {}, distAvoid: deg ? deg.distAvoid : {}, degreeNeed: deg ? { missing: deg.missing, hoursNeed: deg.hours.need } : null,
      loadDetails: (code) => courseDetails(school, code), loadSections,
    });
    undoable('Plan rebuilt by Auto-plan.', () => { state.plan = result.plan; });
    state.autoTarget = $('#auto-target').value;
    const notes = [];
    for (const t of result.plan) {
      const auto = t.courses.filter((c) => c.auto); if (!auto.length) continue;
      const hrs = t.courses.reduce((a, c) => a + hoursOf(c), 0);
      notes.push(`${t.term} (${hrs} hrs): ${auto.map((c) => c.code || c.label).join(', ')}`);
    }
    const prereqs = result.placed.filter((p) => p.prereqFor).map((p) => `${p.code} (for ${p.prereqFor})`);
    if (prereqs.length) notes.push(`Added prerequisites: ${prereqs.join(', ')}.`);
    const unknown = result.placed.filter((p) => p.unknownOffering).map((p) => p.code);
    if (unknown.length) notes.push(`No offering history for ${unknown.join(', ')}; confirm when they run.`);
    const coreqs = result.placed.filter((p) => p.coreqOf).map((p) => `${p.code} (with ${p.coreqOf})`);
    if (coreqs.length) notes.push(`Added co-requisites: ${coreqs.join(', ')}.`);
    if (result.placeholders.length) notes.push(`${result.placeholders.length} placeholder${result.placeholders.length === 1 ? '' : 's'} mark courses only you can choose. Click one for suggestions that run that term; hover any planned course for the reasoning.`);
    for (const u of result.unplaced.slice(0, 6)) notes.push(`Could not place ${u.code}: ${u.reason}.`);
    if (result.beyondTarget) notes.push(`This runs past your target of ${result.target}; raise the hours cap or pick a later term.`);
    const gap = Math.ceil(result.degreeHours - result.totalHours);
    notes.push(gap > 0 ? `Reaches ${Math.floor(result.totalHours)} of ${result.degreeHours} degree hours: ${gap} short even with placeholders; raise the cap or extend the target.` : `Reaches ${Math.floor(result.totalHours)} of the ${result.degreeHours} hours your degree requires.`);
    const n = result.placed.length;
    setStatus(n || result.placeholders.length ? `Auto-planned ${n} course${n === 1 ? '' : 's'} through ${result.lastTerm}, balanced at about ${result.softLoad} hrs per term.` : 'Nothing to add: your plan already covers every requirement.', 'ok', notes, { sticky: true });
    save(); renderAll();
  } finally { btn.disabled = false; btn.textContent = 'Auto-plan'; }
}

/** Move a planned course (or placeholder) to another term by name, creating the plan term when needed. */
function movePlanned(fromIndex, idx, toTermName) {
  const from = state.plan[fromIndex]; const course = from?.courses[idx];
  if (!course || from.term === toTermName) return;
  let to = state.plan.find((t) => t.term === toTermName);
  if (!to) { to = { term: toTermName, courses: [] }; state.plan.push(to); }
  if (course.code && to.courses.some((c) => c.code === course.code)) return;
  from.courses = from.courses.filter((c) => c !== course);
  if (course.code) unscheduleCourse(from.term, course.code);
  to.courses.push({ ...course, fromSchedule: false, auto: false });
  state.plan = state.plan.filter((t) => t.courses.length);
  save(); renderAll();
}

function initDragAndDrop() {
  const tl = $('#timeline');
  let drag = null;
  tl.addEventListener('dragstart', (e) => {
    const el = e.target.closest('[data-planned]'); if (!el) return;
    drag = { from: Number(el.dataset.planned), idx: Number(el.dataset.idx) };
    e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', el.dataset.code || 'placeholder');
    el.classList.add('opacity-50');
  });
  tl.addEventListener('dragend', (e) => { e.target.closest?.('[data-planned]')?.classList.remove('opacity-50'); tl.querySelectorAll('.ring-2').forEach((c) => c.classList.remove('ring-2', 'ring-sky-400')); drag = null; });
  tl.addEventListener('dragover', (e) => { const col = e.target.closest('[data-drop-term]'); if (!drag || !col) return; e.preventDefault(); e.dataTransfer.dropEffect = 'move'; col.classList.add('ring-2', 'ring-sky-400'); });
  tl.addEventListener('dragleave', (e) => { const col = e.target.closest('[data-drop-term]'); if (col && !col.contains(e.relatedTarget)) col.classList.remove('ring-2', 'ring-sky-400'); });
  tl.addEventListener('drop', (e) => { const col = e.target.closest('[data-drop-term]'); if (!drag || !col) return; e.preventDefault(); e.stopPropagation(); const d = drag; drag = null; movePlanned(d.from, d.idx, col.dataset.dropTerm); });
}

export function initTimeline() {
  initDragAndDrop();
  $('#auto-btn').addEventListener('click', runAutoPlan);
  $('#auto-target').addEventListener('change', (e) => { state.autoTarget = e.target.value; save(); });
  $('#auto-clear').addEventListener('click', () => undoable('Auto-planned courses removed.', () => {
    for (const t of state.plan) t.courses = t.courses.filter((c) => !c.auto);
    state.plan = state.plan.filter((t) => t.courses.length);
    save(); renderAll();
  }));
  const tl = $('#timeline');
  tl.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.id === 'add-term') {
      const term = `${$('#term-season').value} ${$('#term-year').value}`;
      if (!state.plan.some((t) => t.term === term)) state.plan.push({ term, courses: [] });
      save(); renderAll(); return;
    }
    const input = form.querySelector('input');
    const code = normalizeCode(input.value);
    if (!code) { input.setCustomValidity('Use the form DEPT 123'); input.reportValidity(); return; }
    input.setCustomValidity('');
    if (form.classList.contains('add-planned')) { addPlanned(Number(form.dataset.term), code); return; }
    const info = school.catalog?.[code];
    state.courses = state.courses.filter((c) => !(c.code === code && (c.term || '') === form.dataset.term));
    state.courses.push({ code, title: info?.title || '', hours: info?.hours, grade: '', status: 'completed', term: form.dataset.term, source: form.dataset.source });
    save(); renderAll();
  });
  tl.addEventListener('change', (e) => {
    if (e.target.dataset.f === 'move') {
      const pl = e.target.closest('[data-planned]'); const from = state.plan[Number(pl.dataset.planned)]; const to = state.plan[Number(e.target.value)];
      if (!from || !to) return;
      const course = from.courses[Number(pl.dataset.idx)];
      from.courses = from.courses.filter((c) => c !== course);
      if (course?.code) unscheduleCourse(from.term, course.code);
      if (course && (!course.code || !to.courses.some((c) => c.code === course.code))) to.courses.push({ ...course, fromSchedule: false });
      save(); renderAll(); return;
    }
    if (e.target.dataset.f !== 'status') return;
    const c = state.courses[Number(e.target.closest('[data-i]').dataset.i)]; if (!c) return;
    c.status = e.target.value; save(); renderAll();
  });
  tl.addEventListener('click', async (e) => {
    const sug = e.target.closest('[data-f="suggest"]');
    if (sug) { openPlaceholderSuggestions(sug.closest('[data-planned]')); return; }
    const btn = e.target.closest('[data-f]'); if (!btn) return;
    if (btn.dataset.f === 'remove-term') { const gone = state.plan[Number(btn.dataset.term)]?.term; undoable(`${gone} removed from the plan.`, () => { state.plan.splice(Number(btn.dataset.term), 1); save(); renderAll(); }); return; }
    if (btn.dataset.f !== 'remove') return;
    const pl = btn.closest('[data-planned]');
    const label = pl ? (pl.dataset.code || 'Placeholder') : state.courses[Number(btn.closest('[data-i]').dataset.i)]?.code;
    clearUndo(); undoable(`${label} removed.`, () => {});
    if (pl) { const t = state.plan[Number(pl.dataset.planned)]; const c0 = t.courses[Number(pl.dataset.idx)]; t.courses = t.courses.filter((c) => c !== c0); if (c0?.code) unscheduleCourse(t.term, c0.code); if (!t.courses.length) state.plan = state.plan.filter((x) => x !== t); }
    else state.courses.splice(Number(btn.closest('[data-i]').dataset.i), 1);
    save(); renderAll();
  });
  $('#suggest-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-f="plan-suggest"]'); if (!btn) return;
    const t = ensureTerm();
    addPlanned(state.plan.indexOf(t), btn.dataset.code);
  });
}

export function renderSuggestions(declaredResults, courses) {
  const box = $('#suggest-box');
  if (!declaredResults.length) { box.hidden = true; return; }
  const { suggestions, patterns } = suggestCourses(declaredResults, courses, school, 12);
  box.hidden = !suggestions.length && !patterns.length;
  $('#suggest-list').innerHTML = suggestions.map((sg) => `<div class="flex items-center gap-1 rounded-md border border-zinc-200 py-1 pl-2 pr-1 text-xs dark:border-zinc-800">
      <span class="course-ref cursor-help font-mono text-[12px] font-medium" data-course="${esc(sg.code)}" tabindex="0">${esc(sg.code)}</span>
      <span class="max-w-40 truncate text-zinc-500">${esc(titleCase(sg.title))}</span>
      <span class="rounded bg-zinc-100 px-1 font-mono text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" title="${esc(sg.programs.join(', '))}">${sg.score}</span>
      <button type="button" class="btn-icon size-7 rounded" data-f="plan-suggest" data-code="${esc(sg.code)}" title="Add to plan" aria-label="Plan ${esc(sg.code)}"><svg class="size-3.5"><use href="#i-plus"/></svg></button>
    </div>`).join('');
  $('#suggest-patterns').textContent = patterns.length ? `Also open: ${patterns.map((pt) => `${pt.count > 1 ? `${pt.count} × ` : ''}${pt.label} for ${pt.program}`).join('; ')}.` : '';
}
