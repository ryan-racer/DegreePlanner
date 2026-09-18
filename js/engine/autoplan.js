// Auto-planner: fills future terms with the courses the declared programs still require.
// Each course goes in the earliest term where it is historically offered that season, its prerequisites are
// satisfied by earlier work, and the term stays under the hours cap. The audit is re-run after every placement,
// so "choose N", quotas, and exclusions are honoured exactly as in the audit itself.

import { prepareCourses, auditProgram, suggestCourses } from './audit.js';
import { prereqStatus } from '../data/courseinfo.js';

const SEASON_CODE = { Fall: '10', Spring: '20', Summer: '30' };

function termKey(name) { const m = (name || '').match(/(Spring|Summer|Fall)\s+(\d{4})/i); return m ? Number(m[2]) * 10 + { spring: 1, summer: 2, fall: 3 }[m[1].toLowerCase()] : 0; }

/** Fall/Spring term names following `afterName` (or today), `count` of them. */
export function upcomingTerms(afterName, count) {
  let key = termKey(afterName);
  if (!key) { const now = new Date(); key = now.getFullYear() * 10 + (now.getMonth() < 5 ? 1 : now.getMonth() < 8 ? 2 : 3); }
  let year = Math.floor(key / 10), season = key % 10; // 1 spring, 2 summer, 3 fall
  const out = [];
  while (out.length < count) {
    if (season === 3) { year += 1; season = 1; } else { season = 3; }
    out.push(`${season === 1 ? 'Spring' : 'Fall'} ${year}`);
  }
  return out;
}

/**
 * Predict offering seasons from history: a course seen only in fall terms is expected in fall again.
 * @returns {{ Fall: boolean|null, Spring: boolean|null, label: string }}
 */
export function seasonPattern(details, coveredTerms) {
  const Fall = offeredIn(details, 'Fall', coveredTerms), Spring = offeredIn(details, 'Spring', coveredTerms);
  const label = Fall === null && Spring === null ? 'no recent offerings' : Fall && Spring ? 'fall and spring' : Fall ? 'fall only' : Spring ? 'spring only' : 'not offered recently';
  return { Fall, Spring, label };
}

/** Is `code` usually offered in `season`? Returns true/false, or null when there is no offering data at all. */
function offeredIn(details, season, coveredTerms) {
  const offered = (details && details.o) || [];
  if (!offered.length) return null;
  const suffix = SEASON_CODE[season];
  const recentSeasonTerms = (coveredTerms || []).filter((t) => String(t).endsWith(suffix)).slice(-3);
  if (!recentSeasonTerms.length) return null;
  return recentSeasonTerms.some((t) => offered.includes(String(t)));
}

/**
 * @param {object} o
 * @param {object} o.school
 * @param {object[]} o.programs        declared program definitions
 * @param {object[]} o.courses         transcript courses (state.courses)
 * @param {object[]} o.plan            existing plan [{ term, courses:[{code,hours}] }] — kept as is
 * @param {number}  o.hoursPerTerm     cap per term
 * @param {number}  [o.maxTerms=10]
 * @param {(code:string)=>Promise<object|null>} o.loadDetails
 * @returns {Promise<{ plan, placed, unplaced, patterns, satisfied }>}
 */
export async function autoPlan({ school, programs, courses, plan, hoursPerTerm, maxTerms = 10, loadDetails, overrides = {} }) {
  hoursPerTerm = Math.min(Number(hoursPerTerm) || 16, school.maxTermHours || 18);
  const latest = [...courses.map((c) => c.term), ...[]].filter(Boolean).sort((a, b) => termKey(b) - termKey(a))[0];
  const termNames = upcomingTerms(latest, maxTerms);
  const work = plan.map((t) => ({ term: t.term, courses: t.courses.map((c) => ({ ...c })) }));
  const termOf = (name) => { let t = work.find((x) => x.term === name); if (!t) { t = { term: name, courses: [] }; work.push(t); } return t; };
  const hoursOf = (c) => (Number.isFinite(c.hours) && c.hours >= 0 ? c.hours : (school.catalog?.[c.code]?.hours ?? school.defaultHours ?? 3));
  const placed = [], unplaced = new Map();
  let patterns = [], satisfied = false;

  for (let guard = 0; guard < 80; guard++) {
    const planned = work.flatMap((t) => t.courses.map((c) => ({ code: c.code, hours: c.hours, status: 'planned', term: t.term })));
    const prepared = prepareCourses([...courses, ...planned], school, {});
    const results = programs.map((p) => auditProgram(p, prepared, overrides[p.id]));
    satisfied = results.every((r) => r.satisfied);
    const sug = suggestCourses(results, prepared, school, 200);
    patterns = sug.patterns;
    if (satisfied) break;
    const candidates = sug.suggestions.filter((s) => !unplaced.has(s.code)).slice(0, 30);
    if (!candidates.length) break;

    // Codes available before each future term: everything on the transcript plus earlier planned terms.
    const baseCodes = new Set(prepareCourses(courses, school, {}).flatMap((c) => c.aliases));
    const codesBefore = (termName) => {
      const set = new Set(baseCodes);
      for (const t of work) if (termKey(t.term) < termKey(termName)) for (const c of t.courses) { set.add(c.code); (school.crosslist?.[c.code] || []).forEach((a) => set.add(a)); }
      return set;
    };

    let best = null;
    for (const cand of candidates) {
      const details = await loadDetails(cand.code);
      const h = hoursOf({ code: cand.code });
      let reason = 'no term fits under the hours cap';
      let found = null;
      for (let i = 0; i < termNames.length; i++) {
        const name = termNames[i];
        const season = name.split(' ')[0];
        const off = offeredIn(details, season, school.scheduleTerms);
        if (off === false) { reason = `not offered in ${termNames.map((n) => n.split(' ')[0]).includes(season === 'Fall' ? 'Spring' : 'Fall') ? season : 'recent'} terms`; continue; }
        const pre = prereqStatus(details?.pre, codesBefore(name));
        if (pre.met === false) { reason = `prerequisites not yet satisfied (${pre.codes.filter((c) => !c.ok).map((c) => c.code).join(', ')})`; continue; }
        const t = work.find((x) => x.term === name);
        const used = t ? t.courses.reduce((a, c) => a + hoursOf(c), 0) : 0;
        if (used + h > hoursPerTerm) { reason = 'no term fits under the hours cap'; continue; }
        found = { i, name, unknownOffering: off === null };
        break;
      }
      if (!found) { cand.reason = reason; continue; }
      const rank = [found.i, -cand.score, Number(cand.code.slice(-3)) || 0];
      if (!best || rank[0] < best.rank[0] || (rank[0] === best.rank[0] && (rank[1] < best.rank[1] || (rank[1] === best.rank[1] && rank[2] < best.rank[2])))) best = { cand, found, rank, h };
    }
    if (!best) { for (const c of candidates) unplaced.set(c.code, c.reason || 'could not be placed'); break; }
    termOf(best.found.name).courses.push({ code: best.cand.code, hours: best.h, auto: true });
    placed.push({ code: best.cand.code, term: best.found.name, unknownOffering: best.found.unknownOffering, programs: best.cand.programs });
  }
  work.sort((a, b) => termKey(a.term) - termKey(b.term));
  return { plan: work.filter((t) => t.courses.length), placed, unplaced: [...unplaced.entries()].map(([code, reason]) => ({ code, reason })), patterns, satisfied };
}
