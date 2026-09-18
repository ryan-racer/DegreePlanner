import { schools, getSchool } from './schools/index.js';
import { parseTranscript } from './parser/transcript.js';
import { pdfToText } from './parser/pdf.js';
import { prepareCourses, auditProgram, auditAll, suggestCourses } from './engine/audit.js';
import { normalizeCode } from './engine/match.js';
import { programCard, esc, titleCase } from './ui/render.js';
import { initCourseCards, setCourseCardSchool, setTakenCodes } from './ui/coursecard.js';
import { initCourseAutocomplete, setAutocompleteSchool } from './ui/autocomplete.js';
import { initSchedule, render as renderSchedule, findSections, distributionSummary, loadSections } from './ui/schedule.js';
import { autoPlan, seasonPattern, inferGraduation, upcomingTerms } from './engine/autoplan.js';
import { courseDetails } from './data/courseinfo.js';
import { auditDegree } from './engine/degree.js';
import { suggestForPlaceholder } from './ui/placeholder.js';

const $ = (sel) => document.querySelector(sel);
const PAGE = 15;

const state = {
  courses: [],
  declared: [],
  includeInProgress: true,
  includePlanned: true,
  plan: [], // [{ term: 'Spring 2027', courses: [{ code, hours }] }]
  schedule: {}, // { [termCode]: [crn, ...] }
  overrides: {}, // { [programId]: [{ key, code }] } advisor-approved substitutions
  scheduleHidden: {}, // { [termCode]: [code] } transcript courses hidden from that term's schedule
  autoTarget: '',
  scheduleTerm: '',
  editing: false,
  tab: localStorage.getItem('rf.tab') || (location.hash === '#planner' ? 'planner' : location.hash === '#schedule' ? 'schedule' : 'audit'),
  kind: 'all',
  query: '',
  sort: 'pct',
  expanded: new Set(),
  page: 1,
};
let school = getSchool(localStorage.getItem('rf.school') || schools[0].id);

// ---------- persistence ----------
function save() {
  try {
    localStorage.setItem(`rf.${school.id}`, JSON.stringify({ courses: state.courses, declared: state.declared, includeInProgress: state.includeInProgress, includePlanned: state.includePlanned, plan: state.plan, schedule: state.schedule, scheduleTerm: state.scheduleTerm, overrides: state.overrides, scheduleHidden: state.scheduleHidden, autoTarget: state.autoTarget }));
    localStorage.setItem('rf.school', school.id);
  } catch { /* storage unavailable */ }
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(`rf.${school.id}`) || 'null');
    if (d) { state.courses = d.courses || []; state.declared = d.declared || []; state.includeInProgress = d.includeInProgress !== false; state.includePlanned = d.includePlanned !== false; state.plan = Array.isArray(d.plan) ? d.plan : []; state.schedule = d.schedule && typeof d.schedule === 'object' ? d.schedule : {}; state.scheduleTerm = d.scheduleTerm || ''; state.overrides = d.overrides && typeof d.overrides === 'object' ? d.overrides : {}; state.scheduleHidden = d.scheduleHidden && typeof d.scheduleHidden === 'object' ? d.scheduleHidden : {}; state.autoTarget = d.autoTarget || ''; }
    state.expanded = new Set(state.declared);
  } catch { /* ignore */ }
}

// ---------- undo ----------
const UNDO_KEYS = ['courses', 'declared', 'plan', 'schedule', 'overrides', 'scheduleHidden'];
let undoTimer, undoSnapshot = null;
/** Run a destructive change with a one-step undo offered in a toast. */
function undoable(label, fn) {
  undoSnapshot = JSON.stringify(Object.fromEntries(UNDO_KEYS.map((k) => [k, state[k]])));
  fn();
  let toast = $('#undo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'undo-toast';
    toast.setAttribute('role', 'status');
    toast.className = 'fixed bottom-4 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-3 rounded-lg bg-zinc-900 px-3.5 py-2 text-sm text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900';
    document.body.appendChild(toast);
    toast.addEventListener('click', (e) => {
      if (!e.target.closest('[data-undo]') || !undoSnapshot) return;
      Object.assign(state, JSON.parse(undoSnapshot)); undoSnapshot = null;
      state.expanded = new Set([...state.expanded, ...state.declared]);
      toast.classList.add('hidden'); toast.classList.remove('flex');
      save(); renderAll();
    });
  }
  toast.innerHTML = `<span>${esc(label)}</span><button type="button" data-undo class="font-semibold underline underline-offset-2">Undo</button>`;
  toast.classList.remove('hidden'); toast.classList.add('flex');
  clearTimeout(undoTimer);
  undoTimer = setTimeout(() => { toast.classList.add('hidden'); toast.classList.remove('flex'); }, 9000);
}

// ---------- chrome ----------
function initChrome() {
  $('#theme-toggle').addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('rf.theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
  });
  const sel = $('#school-select');
  sel.innerHTML = schools.map((s) => `<option value="${esc(s.id)}">${esc(s.name)}</option>`).join('');
  sel.value = school.id;
  sel.addEventListener('change', () => {
    school = getSchool(sel.value);
    setCourseCardSchool(school);
    setAutocompleteSchool(school);
    scheduleCtx.school = school;
    state.courses = []; state.declared = []; state.plan = []; state.expanded.clear();
    load(); renderAll(); save();
  });
  const label = `${school.name}${school.catalogYear ? ` · ${school.catalogYear} catalog` : ''}`;
  $('#foot-school').textContent = label;
  $('#intro-school').textContent = label;
}

// ---------- import ----------
let statusTimer;
function setStatus(msg, kind = 'info', list = []) {
  clearTimeout(statusTimer);
  if (msg && kind === 'ok') statusTimer = setTimeout(() => { const side = $('#side-status'); side.innerHTML = ''; side.classList.add('hidden'); }, 12000);
  const color = { info: 'text-zinc-600 dark:text-zinc-400', ok: 'text-emerald-700 dark:text-emerald-400', error: 'text-red-600 dark:text-red-400' }[kind];
  const html = msg ? `<span class="${color}">${esc(msg)}</span>${list.length ? `<ul class="mt-1 list-disc pl-4 text-zinc-500">${list.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>` : ''}` : '';
  $('#intro-status').innerHTML = html;
  const side = $('#side-status');
  side.innerHTML = html;
  side.classList.toggle('hidden', !html);
}

async function handleFile(file) {
  if (!file) return;
  try {
    let text;
    if (file.type === 'application/pdf' || /\.pdf$/i.test(file.name)) {
      setStatus('Reading PDF…');
      text = await pdfToText(await file.arrayBuffer(), (p, n) => setStatus(`Reading PDF, page ${p} of ${n}…`));
    } else {
      text = await file.text();
      if (/\.json$/i.test(file.name) || text.trimStart().startsWith('{')) {
        let data = null;
        try { data = JSON.parse(text); } catch { /* not JSON after all */ }
        if (data && data.app === 'DegreePlanner') { restore(data, file.name); return; }
      }
    }
    ingest(text, file.name);
  } catch (e) {
    console.error(e);
    setStatus(`Could not read ${file.name}: ${e.message || e}`, 'error');
    $('#workspace').hidden = true; $('#intro').hidden = false;
  }
}

function ingest(text, label = 'text') {
  const { courses, declared, warnings } = parseTranscript(text, school);
  if (!courses.length) {
    setStatus(`No course codes (like "COMP 140") were found in ${label}. The text we read is shown below so you can check or edit it, then import again.`, 'error');
    $('#paste-text').value = text || '';
    $('#paste-box').hidden = false;
    $('#workspace').hidden = true; $('#intro').hidden = false;
    return;
  }
  const previous = state.courses;
  state.courses = courses.map((c) => ({ ...c }));
  const detected = detectDeclared(declared);
  if (detected.length || !state.declared.length) state.declared = detected;
  state.expanded = new Set(state.declared);
  state.page = 1;
  const notes = [...warnings];
  if (previous.length) {
    const before = new Map(previous.map((c) => [c.code, c]));
    const after = new Map(state.courses.map((c) => [c.code, c]));
    const added = [...after.keys()].filter((k) => !before.has(k));
    const removed = [...before.keys()].filter((k) => !after.has(k));
    const finished = [...after.values()].filter((c) => c.status === 'completed' && before.get(c.code)?.status === 'in-progress').map((c) => `${c.code}${c.grade ? ` (${c.grade})` : ''}`);
    if (added.length) notes.push(`New: ${added.join(', ')}.`);
    if (finished.length) notes.push(`Now completed: ${finished.join(', ')}.`);
    if (removed.length) notes.push(`No longer listed: ${removed.join(', ')}.`);
    // Planned courses that are now on the transcript have happened; drop them from the plan.
    let dropped = 0;
    for (const t of state.plan) { const keep = t.courses.filter((c) => !after.has(c.code)); dropped += t.courses.length - keep.length; t.courses = keep; }
    state.plan = state.plan.filter((t) => t.courses.length);
    if (dropped) notes.push(`${dropped} planned course${dropped === 1 ? ' that is' : 's that are'} now on your transcript ${dropped === 1 ? 'was' : 'were'} removed from the plan.`);
  }
  setStatus(`${previous.length ? 'Replaced with' : 'Imported'} ${courses.length} courses from ${label}.`, 'ok', notes);
  $('#paste-box').hidden = true;
  save(); renderAll();
  window.scrollTo({ top: 0 });
}

// Match declared program names from the transcript header to program definitions. Transcripts abbreviate
// ("Electrical & Computer Eng.", "Health Sciences", "Asian Studies (Asian Language)"), so match on word prefixes
// and prefer the program whose name is covered best. A degree hint ("BS in ...", "Bachelor of Arts") breaks BA/BS ties.
const STOP = new Set(['and', 'of', 'the', 'in', 'for', 'concentration', 'major', 'minor', 'option']);
const tokens = (str) => str.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((t) => t && !STOP.has(t));
const tokMatch = (a, b) => a === b || (a.length >= 3 && b.length >= 3 && (a.startsWith(b) || b.startsWith(a)));

/** Restore a backup produced by the Export button. */
function restore(data, label) {
  if (data.school && data.school !== school.id) { setStatus(`This backup is for a different school (${data.school}).`, 'error'); return; }
  state.courses = Array.isArray(data.courses) ? data.courses : [];
  state.declared = Array.isArray(data.declared) ? data.declared.filter((id) => school.programs.some((p) => p.id === id)) : [];
  state.plan = Array.isArray(data.plan) ? data.plan : [];
  state.schedule = data.schedule && typeof data.schedule === 'object' ? data.schedule : {};
  state.overrides = data.overrides && typeof data.overrides === 'object' ? data.overrides : {};
  state.includeInProgress = data.includeInProgress !== false;
  state.includePlanned = data.includePlanned !== false;
  state.expanded = new Set(state.declared);
  setStatus(`Restored ${state.courses.length} courses, ${state.declared.length} program${state.declared.length === 1 ? '' : 's'}, and ${state.plan.length} planned term${state.plan.length === 1 ? '' : 's'} from ${label}.`, 'ok');
  save(); renderAll();
  window.scrollTo({ top: 0 });
}

function detectDeclared(declared) {
  const found = [];
  const wantsBS = /\b(bs|b\.s\.|science)\b/i.test(declared.degreeHint || '');
  const wantsBA = /\b(ba|b\.a\.|arts)\b/i.test(declared.degreeHint || '');
  const pick = (name, kind) => {
    const tt = tokens(name);
    if (!tt.length) return;
    let best = null;
    for (const p of school.programs) {
      if (p.kind !== kind) continue;
      const pt = tokens(p.name);
      if (!tt.every((t) => pt.some((q) => tokMatch(t, q)))) continue;
      const covered = pt.filter((q) => tt.some((t) => tokMatch(t, q))).length / pt.length;
      if (covered < 0.5) continue;
      const degreeBonus = kind === 'major' ? ((wantsBS && p.degree !== 'BA') || (wantsBA && p.degree === 'BA') ? 0.05 : 0) : 0;
      const score = covered + degreeBonus;
      if (!best || score > best.score) best = { p, score };
    }
    if (best && !found.includes(best.p.id)) found.push(best.p.id);
  };
  const split = (m) => m.split(/,|;|\band\b|\//).map((x) => x.trim()).filter(Boolean);
  (declared.majors || []).forEach((m) => split(m).forEach((x) => pick(x, 'major')));
  (declared.minors || []).forEach((m) => split(m).forEach((x) => pick(x, 'minor')));
  return found;
}

function initImport() {
  const fi = $('#file-input');
  const dz = $('#dropzone');
  const openPicker = () => fi.click();
  dz.addEventListener('click', openPicker);
  dz.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker(); } });
  $('#replace-btn').addEventListener('click', openPicker);
  fi.addEventListener('change', () => { handleFile(fi.files[0]); fi.value = ''; });

  const overlay = $('#drop-overlay');
  let depth = 0;
  document.addEventListener('dragenter', (e) => { if (!e.dataTransfer?.types.includes('Files')) return; e.preventDefault(); depth++; overlay.classList.remove('hidden'); overlay.classList.add('flex'); dz.classList.add('over'); });
  document.addEventListener('dragover', (e) => { if (e.dataTransfer?.types.includes('Files')) e.preventDefault(); });
  const hide = () => { depth = 0; overlay.classList.add('hidden'); overlay.classList.remove('flex'); dz.classList.remove('over'); };
  document.addEventListener('dragleave', () => { if (--depth <= 0) hide(); });
  document.addEventListener('drop', (e) => { if (!e.dataTransfer?.files?.length) { hide(); return; } e.preventDefault(); hide(); handleFile(e.dataTransfer.files[0]); });

  $('#paste-toggle').addEventListener('click', () => { $('#paste-box').hidden = false; $('#paste-text').focus(); });
  $('#paste-cancel').addEventListener('click', () => { $('#paste-box').hidden = true; });
  $('#parse-btn').addEventListener('click', () => ingest($('#paste-text').value, 'pasted text'));
  $('#sample-btn').addEventListener('click', () => ingest(school.sample || '', 'the sample transcript'));
  document.addEventListener('paste', (e) => {
    if (['TEXTAREA', 'INPUT', 'SELECT'].includes(document.activeElement?.tagName)) return;
    const t = e.clipboardData?.getData('text');
    if (t && t.length > 40) { $('#paste-text').value = t; ingest(t, 'pasted text'); }
  });

  $('#print-btn').addEventListener('click', () => window.print());
  $('#export-btn').addEventListener('click', () => {
    const payload = { app: 'DegreePlanner', version: 1, school: school.id, exported: new Date().toISOString(), courses: state.courses, declared: state.declared, plan: state.plan, schedule: state.schedule, overrides: state.overrides, includeInProgress: state.includeInProgress, includePlanned: state.includePlanned };
    const blob = new Blob([JSON.stringify(payload, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `degreeplanner-${school.id}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $('#reset-btn').addEventListener('click', () => undoable('Everything was cleared.', resetAll));
  $('#include-ip').addEventListener('change', (e) => { state.includeInProgress = e.target.checked; save(); renderAll(); });
  $('#include-planned').addEventListener('change', (e) => { state.includePlanned = e.target.checked; save(); renderAll(); });
  $('#edit-btn').addEventListener('click', () => { state.editing = !state.editing; renderTimeline(); });
}

// ---------- grades ----------
const POINTS = { 'A+': 4.33, A: 4, 'A-': 3.67, 'B+': 3.33, B: 3, 'B-': 2.67, 'C+': 2.33, C: 2, 'C-': 1.67, 'D+': 1.33, D: 1, 'D-': 0.67, F: 0 };
function gradeClass(c) {
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
function hoursOf(c) { return Number.isFinite(c.hours) && c.hours >= 0 ? c.hours : (school.catalog?.[c.code]?.hours ?? school.defaultHours ?? 3); }
function gpa(courses) {
  let pts = 0, hrs = 0;
  for (const c of courses) if (c.status === 'completed' && POINTS[c.grade] != null) { pts += POINTS[c.grade] * hoursOf(c); hrs += hoursOf(c); }
  return hrs ? (pts / hrs).toFixed(2) : null;
}

// ---------- timeline ----------
const SEASONS = { Spring: 1, Summer: 2, Fall: 3 };
function termKey(t) { const m = (t || '').match(/(Spring|Summer|Fall)\s+(\d{4})/i); return m ? Number(m[2]) * 10 + SEASONS[m[1][0].toUpperCase() + m[1].slice(1).toLowerCase()] : 0; }
function nextTermDefault() {
  const all = [...state.courses.map((c) => c.term), ...state.plan.map((t) => t.term)].filter(Boolean);
  const latest = all.reduce((a, t) => Math.max(a, termKey(t)), 0);
  const now = new Date();
  const base = latest || now.getFullYear() * 10 + (now.getMonth() < 5 ? 1 : now.getMonth() < 8 ? 2 : 3);
  const year = Math.floor(base / 10), season = base % 10;
  return season === 3 ? { season: 'Spring', year: year + 1 } : { season: 'Fall', year };
}
/** "Fall 2026" -> "202710" (Banner style: fall belongs to the next academic year). */
function termCodeFor(name) {
  const m = (name || '').match(/(Spring|Summer|Fall)\s+(\d{4})/i); if (!m) return null;
  const season = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase(); const y = Number(m[2]);
  return season === 'Fall' ? `${y + 1}10` : season === 'Spring' ? `${y}20` : `${y}30`;
}
/** Drop any scheduled section of `code` for the term named `termName`, so plan and schedule stay in step. */
function unscheduleCourse(termName, code) {
  const tc = termCodeFor(termName); if (!tc || !state.schedule?.[tc]) return;
  const sections = scheduleSectionsCache.get(tc); if (!sections) return;
  state.schedule[tc] = state.schedule[tc].filter((crn) => sections.find((x) => x.crn === crn)?.code !== code);
}
const scheduleSectionsCache = new Map();

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
function plannedCourses() {
  return state.plan.flatMap((t) => t.courses.filter((c) => c.code).map((c) => ({ code: c.code, hours: c.hours, title: school.catalog?.[c.code]?.title || '', grade: '', status: 'planned', term: t.term, source: 'plan' })));
}
function prepared() {
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

function renderTimeline() {
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
  const all = new Set(lastPrepared.flatMap((c) => c.aliases));
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
  const programs = state.declared.map((id) => school.programs.find((p) => p.id === id)).filter(Boolean);
  if (!programs.length) { setStatus('Choose your major on the Audit tab first, then Auto-plan can fill in what it requires.', 'error'); return; }
  const btn = $('#auto-btn'); btn.disabled = true; btn.textContent = 'Planning…';
  try {
    // Distribution needs are measured against everything except earlier auto-planned courses, which get rebuilt.
    const keep = state.plan.flatMap((t) => t.courses.filter((c) => c.code && !c.auto).map((c) => ({ code: c.code, hours: c.hours, status: 'planned', term: t.term })));
    const deg = await auditDegree({ school, programs, courses: prepareCourses([...state.courses, ...keep], school, {}), loadDetails: (code) => courseDetails(school, code) });
    const result = await autoPlan({
      school, programs, courses: state.courses, plan: state.plan, overrides: state.overrides,
      hoursPerTerm: Number($('#auto-hours').value) || 16, graduateBy: $('#auto-target').value, includeSummers: $('#auto-summers').checked,
      distNeed: deg ? deg.distNeed : {}, degreeNeed: deg ? { missing: deg.missing, hoursNeed: deg.hours.need } : null,
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
    setStatus(n || result.placeholders.length ? `Auto-planned ${n} course${n === 1 ? '' : 's'} through ${result.lastTerm}, balanced at about ${result.softLoad} hrs per term.` : 'Nothing to add: your plan already covers every requirement.', 'ok', notes);
    clearTimeout(statusTimer);
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

function initTimeline() {
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
    undoSnapshot = null; undoable(`${label} removed.`, () => {});
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

function renderSuggestions(declaredResults, courses) {
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

let lastPrepared = [], lastDeclaredResults = [], lastDegree = null;

// ---------- results ----------
function renderDeclareSelect() {
  const sel = $('#declare-select');
  const grp = (kind, label) => `<optgroup label="${label}">${school.programs.filter((p) => p.kind === kind && !state.declared.includes(p.id))
    .sort((a, b) => a.name.localeCompare(b.name) || a.degree.localeCompare(b.degree))
    .map((p) => `<option value="${esc(p.id)}">${esc(p.name)} (${esc(p.degree)})</option>`).join('')}</optgroup>`;
  sel.innerHTML = `<option value="">Add a program…</option>${grp('major', 'Majors')}${grp('minor', 'Minors')}`;
}

function renderResults() {
  const has = state.courses.length > 0;
  $('#intro').hidden = has;
  $('#workspace').hidden = !has;
  if (!has) return;
  const courses = prepared();
  renderDeclareSelect();

  const declaredPrograms = state.declared.map((id) => school.programs.find((p) => p.id === id)).filter(Boolean);
  const declaredResults = declaredPrograms.map((p) => auditProgram(p, courses, state.overrides[p.id]));
  lastPrepared = courses; lastDeclaredResults = declaredResults;
  setTakenCodes(courses.flatMap((c) => c.aliases));
  renderOverview(courses, declaredResults);
  $('#declared-audits').innerHTML = declaredResults.length
    ? declaredResults.map((r) => programCard(r, { expanded: state.expanded.has(r.program.id), declared: true, school, variant: 'card' })).join('')
    : `<div class="panel px-4 py-6 text-center text-sm text-zinc-500">No declared programs yet. Choose your major from the menu, or add one from the list below.</div>`;
  renderSuggestions(declaredResults, courses);

  // Hide other degrees of a major you have already declared (BA vs BS of the same field cannot both be earned).
  const declaredMajorNames = new Set(declaredPrograms.filter((p) => p.kind === 'major').map((p) => p.name));
  let results = auditAll(school.programs.filter((p) => !state.declared.includes(p.id) && !(p.kind === 'major' && declaredMajorNames.has(p.name))), courses, state.overrides);
  if (state.kind !== 'all') results = results.filter((r) => r.program.kind === state.kind);
  if (state.query) {
    const q = state.query.toLowerCase();
    results = results.filter((r) => `${r.program.name} ${r.program.degree} ${r.program.school}`.toLowerCase().includes(q));
  }
  if (state.sort === 'remaining') results.sort((a, b) => a.remaining - b.remaining || b.pct - a.pct || a.program.name.localeCompare(b.program.name));
  if (state.sort === 'name') results.sort((a, b) => a.program.name.localeCompare(b.program.name) || a.program.degree.localeCompare(b.program.degree));
  const shown = results.slice(0, PAGE * state.page);
  $('#explore-list').innerHTML = shown.length
    ? shown.map((r) => programCard(r, { expanded: state.expanded.has(r.program.id), declared: false, school })).join('')
    : `<p class="px-4 py-6 text-center text-sm text-zinc-500">No programs match.</p>`;
  const more = $('#show-more');
  more.hidden = results.length <= shown.length;
  more.textContent = `Show ${Math.min(PAGE, results.length - shown.length)} more of ${results.length - shown.length}`;
}

let overviewToken = 0;
function renderOverview(courses, declaredResults) {
  const el = $('#overview'); if (!el) return;
  const used = new Set(declaredResults.flatMap((r) => r.usedCourses.map((c) => c.key)));
  const unused = courses.filter((c) => !used.has(c.key));
  const num = (n) => (n % 1 ? n.toFixed(1) : n);
  const tile = (label, body, sub = '') => `<div class="min-w-0"><div class="text-[11px] text-zinc-500">${label}</div><div class="text-base font-semibold tabular-nums leading-tight">${body}</div>${sub ? `<div class="text-[11px] text-zinc-500">${sub}</div>` : ''}</div>`;
  const frame = (inner) => `<div class="mb-2 flex items-baseline justify-between gap-3"><h2 class="text-sm font-semibold">University requirements</h2><span class="text-[11px] text-zinc-500">counts completed, in-progress, and planned courses</span></div><div class="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">${inner}</div><div id="unused-list" class="mt-3 hidden flex-wrap gap-1.5"></div>`;
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
    lastDegree = d;
    const warn = 'text-amber-600 dark:text-amber-400', ok = 'text-emerald-600 dark:text-emerald-400';
    const hoursTile = tile('Hours', `<span class="${d.hours.satisfied ? '' : ''}">${num(d.hours.have)}</span><span class="text-sm font-normal text-zinc-400"> / ${d.hours.need}</span>`, d.hours.need > (school.degree.hours || 120) ? 'your degree requires more than 120' : 'toward the degree');
    const upperTile = tile('Upper-level hours', `<span class="${d.upper.satisfied ? '' : warn}">${num(d.upper.have)}</span><span class="text-sm font-normal text-zinc-400"> / ${d.upper.need}</span>`, '300 level and above');
    const distTile = `<div class="min-w-0"><div class="text-[11px] text-zinc-500">Distribution</div><div class="flex gap-2 text-base font-semibold tabular-nums leading-tight">${Object.entries(d.dist).map(([g, v], i) => `<span title="${esc((v.courses.map((c) => c.code).join(', ') || 'none yet') + (v.detail ? ' — ' + v.detail : ''))}"><span class="text-[11px] font-normal text-zinc-500">D${i + 1} </span><span class="${v.satisfied ? '' : warn}">${v.have}/${v.target}</span></span>`).join('')}</div><div class="text-[11px] text-zinc-500">${Object.values(d.dist).some((v) => v.detail) ? Object.entries(d.dist).filter(([, v]) => v.detail).map(([g]) => `Group ${g} needs a second department`).join('; ') : '3 courses per group, 2+ departments'}</div></div>`;
    const checks = `<div class="min-w-0"><div class="text-[11px] text-zinc-500">Also required</div><div class="flex flex-wrap gap-x-3 gap-y-0.5 text-sm font-medium leading-tight">${d.items.map((it) => `<span class="${it.satisfied ? ok : warn}" title="${esc(it.name)}${it.courses.length ? ': ' + esc(it.courses.map((c) => c.code).join(', ')) : ''}">${it.satisfied ? '✓' : '○'} ${esc(school.degree[it.id]?.short || it.name)}</span>`).join('')}</div><div class="text-[11px] text-zinc-500">writing, activity, diversity</div></div>`;
    el.innerHTML = frame(hoursTile + upperTile + distTile + checks + unusedTile); wire();
  });
}

function initResults() {
  window.addEventListener('dp:find-sections', (e) => {
    state.tab = 'schedule';
    try { localStorage.setItem('rf.tab', state.tab); } catch { /* ignore */ }
    history.replaceState(null, '', '#schedule');
    renderTabs();
    findSections(e.detail.code);
    window.scrollTo({ top: 0 });
  });
  $('#declare-select').addEventListener('change', (e) => {
    const id = e.target.value; if (!id) return;
    if (!state.declared.includes(id)) state.declared.push(id);
    state.expanded.add(id);
    save(); renderResults();
  });
  document.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('.seg button').forEach((x) => x.classList.toggle('active', x === b));
    state.kind = b.dataset.kind; state.page = 1; renderResults();
  }));
  $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; state.page = 1; renderResults(); });
  $('#search').addEventListener('input', (e) => { state.query = e.target.value.trim(); state.page = 1; renderResults(); });
  $('#show-more').addEventListener('click', () => { state.page++; renderResults(); });

  $('#workspace').addEventListener('click', (e) => {
    const act = e.target.closest('[data-action]');
    if (act) {
      e.preventDefault();
      const id = act.dataset.id;
      if (act.dataset.action === 'declare' && !state.declared.includes(id)) state.declared.push(id);
      if (act.dataset.action === 'undeclare') { undoable('Program removed from your list.', () => { state.declared = state.declared.filter((x) => x !== id); save(); renderAll(); }); return; }
      save(); renderResults(); return;
    }
    const ovAdd = e.target.closest('[data-ov-add]');
    if (ovAdd) {
      // Swap the button for a picker of the student's own courses that this program is not already using.
      const prog = ovAdd.dataset.prog, key = ovAdd.dataset.ovAdd;
      const result = lastDeclaredResults.find((r) => r.program.id === prog);
      const usedKeys = new Set((result?.usedCourses || []).map((c) => c.key));
      const options = lastPrepared.filter((c) => !usedKeys.has(c.key)).sort((a, b) => a.code.localeCompare(b.code));
      const sel = document.createElement('select');
      sel.className = 'field h-7 max-w-[15rem] px-1 text-xs';
      sel.setAttribute('aria-label', 'Course to count here');
      sel.innerHTML = `<option value="">Count which course?</option>${options.map((c) => `<option value="${esc(c.code)}">${esc(c.code)} · ${esc(titleCase(c.title || school.catalog?.[c.code]?.title || ''))}${c.status === 'planned' ? ' (planned)' : c.status === 'in-progress' ? ' (in progress)' : ''}</option>`).join('')}`;
      sel.addEventListener('change', () => {
        if (!sel.value) return;
        state.overrides[prog] = [...(state.overrides[prog] || []), { key, code: sel.value }];
        save(); renderAll();
      });
      sel.addEventListener('blur', () => { if (!sel.value) renderResults(); });
      ovAdd.replaceWith(sel); sel.focus();
      return;
    }
    const ovRemove = e.target.closest('[data-ov-remove]');
    if (ovRemove) {
      const prog = ovRemove.dataset.prog;
      const list = state.overrides[prog] || [];
      const i = list.findIndex((o) => o.key === ovRemove.dataset.ovRemove && o.code === ovRemove.dataset.code);
      if (i >= 0) list.splice(i, 1);
      save(); renderAll(); return;
    }
    const more = e.target.closest('.more-opts');
    if (more) { more.replaceWith(document.createTextNode(', ' + more.dataset.more)); return; }
    const head = e.target.closest('.prog-head');
    if (head) {
      const id = head.closest('[data-id]').dataset.id;
      if (state.expanded.has(id)) state.expanded.delete(id); else state.expanded.add(id);
      renderResults();
    }
  });
}

function resetAll() {
  state.courses = []; state.declared = []; state.plan = []; state.schedule = {}; state.overrides = {}; state.expanded.clear(); state.editing = false;
  state.tab = 'audit'; state.page = 1; state.query = ''; $('#search').value = '';
  $('#paste-text').value = ''; $('#paste-box').hidden = true; setStatus('');
  try { localStorage.removeItem(`rf.${school.id}`); localStorage.removeItem('rf.tab'); } catch { /* ignore */ }
  history.replaceState(null, '', location.pathname);
  renderAll();
  window.scrollTo({ top: 0 });
}

function renderTabs() {
  document.querySelectorAll('[role="tab"]').forEach((b) => { const on = b.dataset.tab === state.tab; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== state.tab; });
  const planned = state.plan.reduce((a, t) => a + t.courses.length, 0);
  const badge = $('#tab-planner-count'); badge.hidden = !planned; badge.textContent = String(planned);
}
function initTabs() {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  document.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement); if (i < 0) return;
    const next = e.key === 'ArrowRight' ? tabs[(i + 1) % tabs.length] : e.key === 'ArrowLeft' ? tabs[(i - 1 + tabs.length) % tabs.length] : e.key === 'Home' ? tabs[0] : e.key === 'End' ? tabs[tabs.length - 1] : null;
    if (next) { e.preventDefault(); next.focus(); next.click(); }
  });
  document.querySelectorAll('[role="tab"]').forEach((b) => b.addEventListener('click', () => {
    state.tab = b.dataset.tab;
    try { localStorage.setItem('rf.tab', state.tab); } catch { /* ignore */ }
    history.replaceState(null, '', state.tab === 'audit' ? location.pathname : `#${state.tab}`);
    renderTabs();
    if (state.tab === 'schedule') renderSchedule();
  }));
}

function renderAll() { renderTimeline(); renderResults(); renderTabs(); if (state.courses.length && state.tab === 'schedule') renderSchedule(); }

// ---------- offline ----------
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ }));
}

// ---------- boot ----------
initChrome();
initCourseCards(school);
initCourseAutocomplete(school);
initImport();
initTimeline();
initTabs();
const scheduleCtx = { state, school, $, save, rerender: () => { renderTimeline(); renderResults(); renderTabs(); }, getCourses: () => lastPrepared, getDeclaredResults: () => lastDeclaredResults, sectionsCache: scheduleSectionsCache };
initSchedule(scheduleCtx);
initResults();
load();
renderAll();
