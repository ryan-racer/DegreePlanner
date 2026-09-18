// Auto-planner. Builds a term-by-term plan for everything the declared programs still require.
//
//  * Offering seasons are predicted from history: a course seen only in fall terms is expected in fall again, and
//    consistent offerings are preferred over sporadic ones. When real section data exists for a term it wins.
//  * Prerequisites are honoured, and a missing prerequisite is planned first rather than blocking the course.
//    Courses that unlock others are scheduled earliest (they sit on the critical path).
//  * Load is balanced across the terms left before the graduation target instead of packed into the next term,
//    and never exceeds the hours cap.
//  * Requirements it cannot choose for you (pattern electives, distribution groups) become placeholders so the
//    plan still shows a realistic load and whether the degree's hour total is reached.
//  * The audit is re-run after every placement, so "choose N", quotas, exclusions, and manual substitutions hold.

import { prepareCourses, auditProgram, suggestCourses } from './audit.js';
import { prereqStatus, prereqNeeds } from '../data/courseinfo.js';

const SEASON_CODE = { Fall: '10', Spring: '20', Summer: '30' };

export function termKey(name) { const m = (name || '').match(/(Spring|Summer|Fall)\s+(\d{4})/i); return m ? Number(m[2]) * 10 + { spring: 1, summer: 2, fall: 3 }[m[1].toLowerCase()] : 0; }
/** "Fall 2026" -> "202710" (Banner style). */
export function termCodeFor(name) { const m = (name || '').match(/(Spring|Summer|Fall)\s+(\d{4})/i); if (!m) return null; const y = Number(m[2]); const s = m[1].toLowerCase(); return s === 'fall' ? `${y + 1}10` : s === 'spring' ? `${y}20` : `${y}30`; }

/** Fall/Spring term names following `afterName` (or today), `count` of them. */
export function upcomingTerms(afterName, count) {
  let key = termKey(afterName);
  if (!key) { const now = new Date(); key = now.getFullYear() * 10 + (now.getMonth() < 5 ? 1 : now.getMonth() < 8 ? 2 : 3); }
  let year = Math.floor(key / 10), season = key % 10;
  const out = [];
  while (out.length < count) { if (season === 3) { year += 1; season = 1; } else { season = 3; } out.push(`${season === 1 ? 'Spring' : 'Fall'} ${year}`); }
  return out;
}

/** Share of the last three `season` terms in which the course ran: 0..1, or null with no data. */
function reliability(details, season, coveredTerms) {
  const offered = (details && details.o) || [];
  if (!offered.length) return null;
  const recent = (coveredTerms || []).filter((t) => String(t).endsWith(SEASON_CODE[season])).slice(-3);
  if (!recent.length) return null;
  return recent.filter((t) => offered.includes(String(t))).length / recent.length;
}
function offeredIn(details, season, coveredTerms) { const r = reliability(details, season, coveredTerms); return r === null ? null : r > 0; }

/** Predict offering seasons from history. */
export function seasonPattern(details, coveredTerms) {
  const Fall = offeredIn(details, 'Fall', coveredTerms), Spring = offeredIn(details, 'Spring', coveredTerms);
  const label = Fall === null && Spring === null ? 'no recent offerings' : Fall && Spring ? 'fall and spring' : Fall ? 'fall only' : Spring ? 'spring only' : 'not offered recently';
  return { Fall, Spring, label };
}

/** Default graduation target: eight fall/spring semesters, counting those already on the transcript. */
export function inferGraduation(courses) {
  const done = new Set(courses.filter((c) => c.source !== 'transfer' && /^(Fall|Spring) \d{4}$/.test(c.term || '')).map((c) => c.term));
  const latest = [...done].sort((a, b) => termKey(b) - termKey(a))[0];
  const left = Math.max(1, 8 - done.size);
  return upcomingTerms(latest, left).at(-1);
}

/**
 * @returns {Promise<{ plan, placed, placeholders, unplaced, satisfied, target, lastTerm, beyondTarget, plannedHours, totalHours, degreeHours }>}
 */
export async function autoPlan({ school, programs, courses, plan, hoursPerTerm, graduateBy, loadDetails, loadSections, overrides = {}, distNeed = {} }) {
  const cap = Math.min(Number(hoursPerTerm) || 16, school.maxTermHours || 18);
  const latest = courses.map((c) => c.term).filter(Boolean).sort((a, b) => termKey(b) - termKey(a))[0];
  const termNames = upcomingTerms(latest, 14);
  const target = graduateBy && termNames.includes(graduateBy) ? graduateBy : inferGraduation(courses);
  const horizon = Math.max(1, termNames.indexOf(target) + 1);

  // Start from the student's own plan; anything auto-planned earlier is rebuilt from scratch.
  const work = plan.map((t) => ({ term: t.term, courses: t.courses.filter((c) => !c.auto).map((c) => ({ ...c })) })).filter((t) => t.courses.length);
  const termOf = (name) => { let t = work.find((x) => x.term === name); if (!t) { t = { term: name, courses: [] }; work.push(t); } return t; };
  const hoursOf = (c) => (Number.isFinite(c.hours) && c.hours >= 0 ? c.hours : (school.catalog?.[c.code]?.hours ?? school.defaultHours ?? 3));
  const load = (name) => (work.find((x) => x.term === name)?.courses || []).reduce((a, c) => a + hoursOf(c), 0);

  const detailsCache = new Map();
  const details = async (code) => { if (!detailsCache.has(code)) detailsCache.set(code, await loadDetails(code)); return detailsCache.get(code); };
  const sectionCodes = new Map(); // term name -> Set of codes actually scheduled, when the school has that term's data
  const scheduledIn = async (name) => {
    if (sectionCodes.has(name)) return sectionCodes.get(name);
    const code = termCodeFor(name);
    let set = null;
    if (loadSections && code && (school.sectionTerms || []).includes(code)) { const secs = await loadSections(code); if (secs?.length) set = new Set(secs.map((s) => s.code)); }
    sectionCodes.set(name, set);
    return set;
  };

  const audit = () => {
    const planned = work.flatMap((t) => t.courses.filter((c) => c.code).map((c) => ({ code: c.code, hours: c.hours, status: 'planned', term: t.term })));
    const prepared = prepareCourses([...courses, ...planned], school, {});
    const results = programs.map((p) => auditProgram(p, prepared, overrides[p.id]));
    return { prepared, results };
  };

  // Balance: aim for an even load across the terms that remain before the target.
  const first = audit();
  const estimate = first.results.reduce((a, r) => a + r.remaining * 3.3, 0) + Object.values(distNeed).reduce((a, n) => a + n * 3, 0);
  const already = termNames.slice(0, horizon).reduce((a, n) => a + load(n), 0);
  const soft = Math.max(6, Math.min(cap, Math.ceil((estimate + already) / horizon) + 1));

  const baseCodes = new Set(prepareCourses(courses, school, {}).flatMap((c) => c.aliases));
  const codesBefore = (name) => {
    const set = new Set(baseCodes);
    for (const t of work) if (termKey(t.term) < termKey(name)) for (const c of t.courses) if (c.code) { set.add(c.code); (school.crosslist?.[c.code] || []).forEach((a) => set.add(a)); }
    return set;
  };
  const everPlanned = () => { const set = new Set(baseCodes); for (const t of work) for (const c of t.courses) if (c.code) set.add(c.code); return set; };

  const placed = [], unplaced = new Map(), prereqQueue = []; // prereqQueue: [{ code, forCode }]
  let patterns = [], satisfied = false;

  for (let guard = 0; guard < 120; guard++) {
    const { prepared, results } = audit();
    satisfied = results.every((r) => r.satisfied);
    const sug = suggestCourses(results, prepared, school, 200);
    patterns = sug.patterns;
    const have = everPlanned();
    const queue = prereqQueue.filter((q) => !have.has(q.code) && !unplaced.has(q.code));
    if (satisfied && !queue.length) break;
    const candidates = [
      ...queue.map((q) => ({ code: q.code, score: 0, programs: [], prereqFor: q.forCode })),
      ...sug.suggestions.filter((s) => !unplaced.has(s.code)).slice(0, 40),
    ];
    if (!candidates.length) break;

    // Critical path: how many other candidates list this course as a prerequisite.
    const detailList = await Promise.all(candidates.map((c) => details(c.code)));
    const unlocks = (code) => detailList.filter((d, j) => candidates[j].code !== code && d?.pre && new RegExp(`\\b${code}\\b`).test(d.pre)).length + prereqQueue.filter((q) => q.code === code).length;

    let best = null;
    for (let ci = 0; ci < candidates.length; ci++) {
      const cand = candidates[ci], d = detailList[ci];
      const h = hoursOf({ code: cand.code });
      const critical = unlocks(cand.code) > 0 || cand.prereqFor;
      let found = null, reason = '';
      // Senior design and capstone courses belong in the final year, however early their prerequisites clear.
      const senior = /\b(senior|capstone)\b/i.test(school.catalog?.[cand.code]?.title || '');
      const firstIdx = senior ? Math.max(0, horizon - 2) : 0;
      for (const pass of critical ? ['hard'] : ['soft', 'hard']) {
        for (let i = firstIdx; i < termNames.length && !found; i++) {
          const name = termNames[i], season = name.split(' ')[0];
          const real = await scheduledIn(name);
          const rel = reliability(d, season, school.scheduleTerms);
          if (real ? !real.has(cand.code) : rel === 0) { const lab = seasonPattern(d, school.scheduleTerms).label; reason = real ? `no sections in ${name}` : /only/.test(lab) ? `has only run in ${lab.replace(' only', '')} terms` : 'has not been offered recently'; continue; }
          const pre = prereqStatus(d?.pre, codesBefore(name));
          if (pre.met === false) { reason = `needs ${pre.codes.filter((c) => !c.ok).map((c) => c.code).join(', ')} first`; continue; }
          if (load(name) + h > (pass === 'soft' ? soft : cap)) { reason = reason || 'every term is at the hours cap'; continue; }
          found = { i, name, rel, real: !!real };
        }
        if (found) break;
      }
      if (!found) { cand.reason = reason; cand.needs = prereqNeeds(d?.pre, everPlanned()).filter((c) => school.catalog?.[c]); continue; }
      const rank = [found.i, -unlocks(cand.code), -(cand.score || 0), -(found.rel ?? 0.5), Number(cand.code.slice(-3)) || 0];
      const better = !best || rank.some((v, k) => v !== best.rank[k] && rank.slice(0, k).every((x, j) => x === best.rank[j]) && v < best.rank[k]);
      if (better) best = { cand, found, rank, h, d };
    }
    if (!best) {
      // Nothing can be placed as things stand. Unblock the cheapest blocked course by planning its missing
      // prerequisites (only now, so options that merely sit in a list never drag extra courses in).
      const blocked = candidates.filter((c) => c.needs?.length && !c.prereqFor).sort((a, b) => a.needs.length - b.needs.length || (b.score || 0) - (a.score || 0))[0];
      let queued = false;
      if (blocked) for (const n of blocked.needs) if (!prereqQueue.some((q) => q.code === n)) { prereqQueue.push({ code: n, forCode: blocked.code }); queued = true; }
      if (queued) continue;
      for (const c of candidates) unplaced.set(c.code, c.reason || 'could not be placed');
      break;
    }
    const season = best.found.name.split(' ')[0];
    const why = [
      best.cand.prereqFor ? `prerequisite for ${best.cand.prereqFor}` : `fills ${best.cand.score} open requirement${best.cand.score === 1 ? '' : 's'}${best.cand.programs?.length ? ` in ${best.cand.programs.map((p) => p.replace(/\s*\(.*\)$/, '')).join(', ')}` : ''}`,
      best.found.real ? `has sections in ${best.found.name}` : best.found.rel === null ? 'no offering history, confirm the term' : `${seasonPattern(best.d, school.scheduleTerms).label} historically`,
      unlocks(best.cand.code) ? 'unlocks later courses' : '',
    ].filter(Boolean).join(' · ');
    termOf(best.found.name).courses.push({ code: best.cand.code, hours: best.h, auto: true, why });
    placed.push({ code: best.cand.code, term: best.found.name, unknownOffering: best.found.rel === null && !best.found.real, prereqFor: best.cand.prereqFor || null, why, season });
  }

  // Placeholders for what only the student can choose: pattern electives, then distribution groups.
  const placeholders = [];
  const addPlaceholder = (label, hours, why) => {
    const names = termNames.slice(0, Math.max(horizon, 1));
    let pick = names.filter((n) => load(n) + hours <= cap).sort((a, b) => load(a) - load(b) || termKey(a) - termKey(b))[0];
    if (!pick) pick = termNames.find((n) => load(n) + hours <= cap) || termNames.at(-1);
    termOf(pick).courses.push({ code: '', label, hours, auto: true, why });
    placeholders.push({ label, term: pick });
  };
  for (const pt of patterns) for (let k = 0; k < (pt.count || 1); k++) addPlaceholder(pt.label.replace(/ course$/, ' elective'), 3, `Your choice: any ${pt.label} for ${pt.program.replace(/\s*\(.*\)$/, '')}`);
  // Re-check distribution after the concrete courses, since some of them carry a distribution group.
  const distLeft = { ...distNeed };
  for (const p of placed) { const g = ((await details(p.code))?.dist || '').replace('Distribution Group ', ''); if (distLeft[g] > 0) distLeft[g]--; }
  for (const [g, n] of Object.entries(distLeft)) for (let k = 0; k < n; k++) addPlaceholder(`Distribution ${g} course`, 3, `Your choice: any Distribution Group ${g} course`);

  work.sort((a, b) => termKey(a.term) - termKey(b.term));
  const finalPlan = work.filter((t) => t.courses.length);
  const lastTerm = finalPlan.at(-1)?.term || null;
  const plannedHours = finalPlan.reduce((a, t) => a + t.courses.reduce((x, c) => x + hoursOf(c), 0), 0);
  const earned = prepareCourses(courses, school, {}).reduce((a, c) => a + c.hours, 0);
  return {
    plan: finalPlan, placed, placeholders, satisfied, target, lastTerm,
    beyondTarget: lastTerm ? termKey(lastTerm) > termKey(target) : false,
    unplaced: satisfied ? [] : [...unplaced.entries()].map(([code, reason]) => ({ code, reason })),
    plannedHours, totalHours: earned + plannedHours, degreeHours: school.degreeHours || 120, softLoad: soft,
  };
}
