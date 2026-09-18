// Generic transcript text parser. Turns pasted/extracted transcript text into course records.
// School modules can tune it through `school.transcript` (regexes for sections and declared programs).

import { normalizeCode } from '../engine/match.js';

const GRADES = 'A\\+|A-|A|B\\+|B-|B|C\\+|C-|C|D\\+|D-|D|F|P|S|U|W|I|NC|CR|TR|AU|IP|NG|NR|PS';
const FAILING = new Set(['F', 'U', 'W', 'NC', 'AU', 'NR']);
const INCOMPLETE = new Set(['I', 'IP', 'NG']);
const CODE_RE = /\b([A-Z]{2,5})\s?-?\s?(\d{3}[A-Z]?)\b/g;
const HOURS_RE = /(?:^|\s)(\d{1,2}(?:\.\d{1,3})?)(?=\s|$)/g;

const DEFAULT_HINTS = {
  inProgress: /\b(COURSES?\s+IN\s+PROGRESS|IN[- ]PROGRESS|CURRENT(LY)?\s+ENROLLED|REGISTERED\s+COURSES)\b/i,
  transfer: /\b(TRANSFER\s+CREDIT|ADVANCED\s+PLACEMENT|AP\s+CREDIT|TEST\s+CREDIT)\b/i,
  institution: /\b(INSTITUTION\s+CREDIT|INSTITUTIONAL\s+CREDIT|ACADEMIC\s+HISTORY)\b/i,
  // "Fall 2023", "Fall Semester 2023", "Spring Term 2024", "2023 Fall"; Banner codes like 202410 are handled separately.
  term: /\b(Fall|Spring|Summer|Winter|Autumn)\s+(?:Semester|Term|Session|Quarter)?\s*[',]?\s*(\d{4})\b|\b(\d{4})\s+(Fall|Spring|Summer|Winter|Autumn)\b/i,
  termCode: /\bTerm\s*:?\s*((?:19|20)\d{2})(10|20|30)\b/i,
  major: /\bMajors?\s*:\s*([^\n]+)/i,
  minor: /\bMinors?\s*:\s*([^\n]+)/i,
  skipLine: /\b(Still\s+needed|Not\s+yet\s+taken|Prerequisite)\b/i,
  ignore: null, // regex for codes to drop (e.g. placeholder transfer codes)
};

/**
 * @param {string} text raw transcript text
 * @param {object} school school module (uses school.transcript hints and school.catalog)
 * @returns {{ courses: Course[], declared: { majors: string[], minors: string[] }, warnings: string[] }}
 */
export function parseTranscript(text, school = {}) {
  const hints = { ...DEFAULT_HINTS, ...(school.transcript || {}) };
  const catalog = school.catalog || {};
  const lines = joinSplitRows(String(text || '').replace(/\r/g, '').split('\n'));
  const courses = [];
  const declared = { majors: [], minors: [], degreeHint: '' };
  parseSoughtBlock(lines, declared);
  const warnings = [];
  let section = 'institution';
  let term = '';
  let skippedStillNeeded = 0;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (hints.inProgress.test(line)) { section = 'in-progress'; continue; }
    if (hints.transfer.test(line)) { section = 'transfer'; continue; }
    if (hints.institution.test(line)) { section = 'institution'; continue; }
    const tm = line.match(hints.term);
    if (tm && /term|semester|session|^\s*(fall|spring|summer|winter|autumn|\d{4})/i.test(line)) term = `${cap(tm[1] || tm[4])} ${tm[2] || tm[3]}`;
    else if (hints.termCode) {
      const tc = line.match(hints.termCode);
      if (tc) term = termFromCode(tc[1], tc[2]);
    }
    const mj = line.match(hints.major); if (mj) pushUnique(declared.majors, mj[1]);
    const mn = line.match(hints.minor); if (mn) pushUnique(declared.minors, mn[1]);
    if (hints.skipLine.test(line)) { skippedStillNeeded++; continue; }

    const codes = [...line.toUpperCase().matchAll(CODE_RE)].map((m) => ({ code: `${m[1]} ${m[2]}`, index: m.index, end: m.index + m[0].length }))
      .filter((c) => !(hints.ignore && hints.ignore.test(c.code)));
    if (!codes.length) continue;

    if (codes.length === 1) {
      const c = codes[0];
      const rest = line.slice(c.end);
      courses.push(buildCourse(c.code, rest, section, term, catalog));
    } else {
      // Several codes on one line: either a comma-separated list or cross-listed codes. Treat each as a course
      // only if there is no per-course detail; otherwise attribute the trailing detail to the last code.
      const looksLikeList = /,|;|\band\b/i.test(line) || line.replace(CODE_RE, '').trim().length < 4;
      if (looksLikeList) {
        for (const c of codes) courses.push(buildCourse(c.code, '', section, term, catalog));
      } else {
        const last = codes[codes.length - 1];
        courses.push(buildCourse(codes[0].code, line.slice(last.end), section, term, catalog));
      }
    }
  }

  if (skippedStillNeeded) warnings.push(`Skipped ${skippedStillNeeded} "still needed" line(s) that list courses not yet taken.`);
  const deduped = dedupe(courses);
  if (deduped.length < courses.length) warnings.push(`Merged ${courses.length - deduped.length} duplicate course entr${courses.length - deduped.length === 1 ? 'y' : 'ies'}.`);
  return { courses: deduped, declared, warnings };
}

function buildCourse(code, rest, section, term, catalog) {
  const detail = rest.replace(/\s+/g, ' ').trim();
  // Grade immediately followed by credit hours: "A 4.000 16.000" / "TR 3.000"
  let gm = detail.match(new RegExp(`(?:^|\\s)(${GRADES})\\s+(\\d{1,2}(?:\\.\\d{1,3})?)(?=\\s|$)`));
  // Some PDFs glue the grade to the title ("CALCULUS IA+ 3.000 12.00"). Accept a glued grade only when
  // quality points follow the hours, which distinguishes graded rows from in-progress rows.
  if (!gm && section !== 'in-progress') gm = detail.match(new RegExp(`(${GRADES})\\s+(\\d{1,2}(?:\\.\\d{1,3})?)\\s+\\d{1,3}(?:\\.\\d{1,3})?(?=\\s|$)`));
  let grade = gm ? gm[1] : '';
  let hours = gm ? Number(gm[2]) : NaN;
  if (!gm) {
    // No grade: look for a standalone credit-hours number (e.g. in-progress rows)
    const nums = [...detail.matchAll(HOURS_RE)].map((m) => Number(m[1])).filter((n) => n > 0 && n <= 20);
    if (nums.length) hours = nums[0];
  }
  let title = detail;
  if (gm) title = detail.slice(0, gm.index);
  else if (Number.isFinite(hours)) title = detail.slice(0, detail.search(HOURS_RE) >= 0 ? detail.search(HOURS_RE) : undefined);
  title = title.replace(/^\s*(UG|GR|U|G)\b/, '').replace(/[|:]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!title && catalog[code]) title = catalog[code].title;
  if (!Number.isFinite(hours) && catalog[code]) hours = catalog[code].hours;

  let status = 'completed';
  if (section === 'in-progress' || INCOMPLETE.has(grade)) status = 'in-progress';
  else if (FAILING.has(grade)) status = 'failed';
  const source = section === 'transfer' ? 'transfer' : 'transcript';
  return { code, title, hours: Number.isFinite(hours) ? hours : undefined, grade, status, term, source };
}

const RANK = { completed: 2, 'in-progress': 1, failed: 0 };
// Merge entries that are clearly the same course taken once (same code and term, or a transfer credit duplicated by a
// Rice attempt). Repeats in different terms are kept, since ensembles, studios, and research courses legitimately repeat.
function dedupe(courses) {
  const out = [];
  for (const c of courses) {
    const i = out.findIndex((o) => o.code === c.code && (o.term === c.term || o.source === 'transfer' || c.source === 'transfer'));
    if (i < 0) { out.push(c); continue; }
    const prev = out[i];
    const better = RANK[c.status] > RANK[prev.status] || (RANK[c.status] === RANK[prev.status] && (c.hours || 0) > (prev.hours || 0));
    if (better) out[i] = c;
  }
  return out;
}

// Some PDF exports put a course's grade / credit hours on the line after its code and title.
// Fold such continuation lines (grade + numbers only) back onto the previous line.
const CONT_RE = new RegExp(`^(?:(?:${GRADES})\\s+)?\\d{1,2}(?:\\.\\d{1,3})?(?:\\s+\\d{1,3}(?:\\.\\d{1,3})?)?(?:\\s+\\d{2}\\/\\d{2}\\/\\d{4}.*)?$`);
function joinSplitRows(lines) {
  const out = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (out.length && line && CONT_RE.test(line) && CODE_RE.test(out[out.length - 1]) && !/\d\.\d{2,3}/.test(out[out.length - 1])) {
      out[out.length - 1] += ' ' + line;
    } else out.push(raw);
    CODE_RE.lastIndex = 0;
  }
  return out;
}

/**
 * Banner "Current Program / Sought" header: degree line, then "Major ..." and "Minor ..." labels each followed by
 * program names on their own lines. Fills declared.majors / declared.minors / declared.degreeHint.
 */
function parseSoughtBlock(lines, declared) {
  let i = lines.findIndex((l) => /^\s*Sought\s*$/i.test(l));
  if (i < 0) return;
  let kind = '';
  for (i += 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (/^(TRANSFER|INSTITUTION|Subject|Term\b|COURSE|Current Program|AWARDED)/i.test(line)) break;
    if (/^Majors?\b/i.test(line)) { kind = 'majors'; continue; }
    if (/^Minors?\b/i.test(line)) { kind = 'minors'; continue; }
    if (/^(Bachelor|Master|B\.?[SA]\.?\b|BS\b|BA\b|BSc|BArch|BMus)/i.test(line)) { declared.degreeHint += ' ' + line; continue; }
    if (kind) pushUnique(declared[kind], line);
  }
  declared.degreeHint = declared.degreeHint.trim();
}

// Banner-style term codes: YYYY10 = Fall of YYYY-1, YYYY20 = Spring YYYY, YYYY30 = Summer YYYY.
function termFromCode(year, code) {
  const y = Number(year);
  return code === '10' ? `Fall ${y - 1}` : code === '20' ? `Spring ${y}` : `Summer ${y}`;
}

function pushUnique(arr, v) { const s = v.trim().replace(/\s{2,}/g, ' '); if (s && !arr.includes(s)) arr.push(s); }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }
