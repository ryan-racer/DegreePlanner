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
export function upcomingTerms(afterName, count, includeSummers = false) {
  let key = termKey(afterName);
  if (!key) { const now = new Date(); key = now.getFullYear() * 10 + (now.getMonth() < 5 ? 1 : now.getMonth() < 8 ? 2 : 3); }
  let year = Math.floor(key / 10), season = key % 10;
  const out = [];
  while (out.length < count) {
    if (season === 3) { year += 1; season = 1; } else if (season === 1 && includeSummers) { season = 2; } else { season = 3; }
    out.push(`${season === 1 ? 'Spring' : season === 2 ? 'Summer' : 'Fall'} ${year}`);
  }
  return out;
}

/** Class standing by credit hours earned before a term. */
export function standingFor(hours) { return hours >= 90 ? 'Senior' : hours >= 60 ? 'Junior' : hours >= 30 ? 'Sophomore' : 'Freshman'; }
/** Does a catalog restriction sentence allow a student of this standing? Unknown phrasing allows. */
export function standingAllows(restr, standing) {
  if (!restr) return true;
  const only = restr.match(/limited to[^.]*?class(?:es)? of ([^.]+)\./i);
  if (only && /(Freshman|Sophomore|Junior|Senior)/.test(only[1])) return new RegExp(standing, 'i').test(only[1]);
  const not = restr.match(/class(?:es)? of ([^.]+?) may not/i);
  if (not) return !new RegExp(standing, 'i').test(not[1]);
  return true;
}

/** Can one section per course be chosen with no time overlap? `options` is an array of section arrays. */
export function conflictFree(options) {
  const clash = (a, b) => a.meetings.some((x) => b.meetings.some((y) => x.start < y.end && y.start < x.end && [...x.days].some((d) => y.days.includes(d))));
  const pick = (i, chosen) => {
    if (i === options.length) return true;
    const timed = options[i].filter((s) => s.meetings?.length);
    if (!timed.length) return pick(i + 1, chosen); // untimed sections never clash
    return timed.some((s) => !chosen.some((c) => clash(s, c)) && pick(i + 1, [...chosen, s]));
  };
  return pick(0, []);
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
export async function autoPlan({ school, programs, courses, plan, hoursPerTerm, graduateBy, loadDetails, loadSections, overrides = {}, distNeed = {}, degreeNeed = null, includeSummers = false }) {
  const cap = Math.min(Number(hoursPerTerm) || 16, school.maxTermHours || 18);
  const latest = courses.map((c) => c.term).filter(Boolean).sort((a, b) => termKey(b) - termKey(a))[0];
  const termNames = upcomingTerms(latest, includeSummers ? 20 : 14, includeSummers);
  const capFor = (name) => (name.startsWith('Summer') ? Math.min(cap, school.maxSummerHours || 8) : cap);
  const target = graduateBy && termNames.includes(graduateBy) ? graduateBy : inferGraduation(courses);
  const horizon = Math.max(1, termNames.indexOf(target) + 1);

  // Start from the student's own plan; anything auto-planned earlier is rebuilt from scratch.
  const work = plan.map((t) => ({ term: t.term, courses: t.courses.filter((c) => !c.auto).map((c) => ({ ...c })) })).filter((t) => t.courses.length);
  const termOf = (name) => { let t = work.find((x) => x.term === name); if (!t) { t = { term: name, courses: [] }; work.push(t); } return t; };
  const hoursOf = (c) => (Number.isFinite(c.hours) && c.hours >= 0 ? c.hours : (school.catalog?.[c.code]?.hours ?? school.defaultHours ?? 3));
  const load = (name) => (work.find((x) => x.term === name)?.courses || []).reduce((a, c) => a + hoursOf(c), 0);

  const detailsCache = new Map();
  const details = async (code) => { if (!detailsCache.has(code)) detailsCache.set(code, await loadDetails(code)); return detailsCache.get(code); };
  const sectionMaps = new Map(); // term name -> Map(code -> sections[]) when the school has that term's real schedule
  const scheduledIn = async (name) => {
    if (sectionMaps.has(name)) return sectionMaps.get(name);
    const code = termCodeFor(name);
    let map = null;
    if (loadSections && code && (school.sectionTerms || []).includes(code)) {
      const secs = await loadSections(code);
      if (secs?.length) { map = new Map(); for (const sec of secs) { if (!map.has(sec.code)) map.set(sec.code, []); map.get(sec.code).push(sec); } }
    }
    sectionMaps.set(name, map);
    return map;
  };
  const earnedBase = prepareCourses(courses, school, {}).reduce((a, c) => a + c.hours, 0);
  const hoursBefore = (name) => earnedBase + work.filter((t) => termKey(t.term) < termKey(name)).reduce((a, t) => a + t.courses.reduce((x, c) => x + hoursOf(c), 0), 0);

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
          if (!standingAllows(d?.restr, standingFor(hoursBefore(name)))) { reason = 'restricted by class standing'; continue; }
          // Co-requisites travel with the course: anything not already taken or planned by then joins the same term.
          const sameTerm = new Set([...codesBefore(name), ...(work.find((x) => x.term === name)?.courses || []).map((c) => c.code)]);
          const coreqs = prereqNeeds(d?.co, sameTerm).filter((c) => school.catalog?.[c]);
          let coreqBlocked = false;
          for (const co of coreqs) { const r = reliability(await details(co), season, school.scheduleTerms); if (real ? !real.has(co) : r === 0) coreqBlocked = true; }
          if (coreqBlocked) { reason = `its co-requisite does not run in ${season.toLowerCase()} terms`; continue; }
          const bundleHours = h + coreqs.reduce((a, c) => a + hoursOf({ code: c }), 0);
          if (load(name) + bundleHours > Math.min(pass === 'soft' ? soft : cap, capFor(name))) { reason = reason || 'every term is at the hours cap'; continue; }
          if (real) {
            if (coreqs.some((c) => !real.has(c))) { reason = `co-requisite has no sections in ${name}`; continue; }
            const inTerm = (work.find((x) => x.term === name)?.courses || []).filter((c) => c.code && real.has(c.code)).map((c) => real.get(c.code));
            if (!conflictFree([...inTerm, real.get(cand.code), ...coreqs.map((c) => real.get(c))])) { reason = `every section clashes with your other ${name} courses`; continue; }
          }
          found = { i, name, rel, real: !!real, coreqs };
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
    for (const co of best.found.coreqs || []) {
      termOf(best.found.name).courses.push({ code: co, hours: hoursOf({ code: co }), auto: true, why: `co-requisite of ${best.cand.code}, taken in the same term` });
      placed.push({ code: co, term: best.found.name, coreqOf: best.cand.code, why: `co-requisite of ${best.cand.code}` });
    }
  }

  // Placeholders for what only the student can choose: pattern electives, then distribution groups.
  const placeholders = [];
  const addPlaceholder = (label, hours, why, extra = {}) => {
    const names = termNames.slice(0, Math.max(horizon, 1)).filter((n) => !n.startsWith('Summer'));
    let pick = names.filter((n) => load(n) + hours <= cap).sort((a, b) => load(a) - load(b) || termKey(a) - termKey(b))[0];
    if (!pick) pick = termNames.find((n) => !n.startsWith('Summer') && load(n) + hours <= cap) || termNames.at(-1);
    termOf(pick).courses.push({ code: '', label, hours, auto: true, why, ...extra });
    placeholders.push({ label, term: pick, ...extra });
  };
  for (const pt of patterns) for (let k = 0; k < (pt.count || 1); k++) addPlaceholder(pt.label.replace(/ course$/, ' elective'), 3, `Your choice: any ${pt.label} for ${pt.program.replace(/\s*\(.*\)$/, '')}`, { kind: 'pattern', spec: pt.spec });
  // Re-check distribution after the concrete courses, since some of them carry a distribution group.
  const distLeft = { ...distNeed };
  for (const p of placed) { const g = ((await details(p.code))?.dist || '').replace('Distribution Group ', ''); if (distLeft[g] > 0) distLeft[g]--; }
  for (const [g, n] of Object.entries(distLeft)) for (let k = 0; k < n; k++) addPlaceholder(`Distribution ${g} course`, 3, `Your choice: any Distribution Group ${g} course`, { kind: 'dist', dist: g });
  // Remaining university requirements, then free electives up to the degree's hour total.
  if (degreeNeed) {
    const cfg = school.degree || {};
    let adLeft = degreeNeed.missing?.includes('diversity') ? 1 : 0;
    for (const p of placed) if (adLeft && (await details(p.code))?.ad) adLeft = 0;
    if (degreeNeed.missing?.includes('writing')) addPlaceholder(`${cfg.writing?.short || 'Writing'} seminar`, 3, `Required: ${cfg.writing?.name || 'writing seminar'}`, { kind: 'pattern', spec: cfg.writing?.from?.[0] });
    if (degreeNeed.missing?.includes('activity')) addPlaceholder(`${cfg.activity?.short || 'Activity'} course`, 1, `Required: ${cfg.activity?.name || 'activity course'}`, { kind: 'pattern', spec: cfg.activity?.from?.[0] });
    if (adLeft) addPlaceholder('Analyzing Diversity course', 3, 'Required: one Analyzing Diversity course of 3+ hours', { kind: 'diversity' });
    const plannedSoFar = work.reduce((a, t) => a + t.courses.reduce((x, c) => x + hoursOf(c), 0), 0);
    let gap = (degreeNeed.hoursNeed || 0) - (earnedBase + plannedSoFar);
    for (let k = 0; gap > 0 && k < 16; k++) { const hrs = Math.min(3, Math.max(1, Math.ceil(gap))); addPlaceholder('Free elective', hrs, 'Any course: hours toward the degree total', { kind: 'free' }); gap -= hrs; }
  }

  work.sort((a, b) => termKey(a.term) - termKey(b.term));
  const finalPlan = work.filter((t) => t.courses.length);
  const lastTerm = finalPlan.at(-1)?.term || null;
  const plannedHours = finalPlan.reduce((a, t) => a + t.courses.reduce((x, c) => x + hoursOf(c), 0), 0);
  const earned = earnedBase;
  return {
    plan: finalPlan, placed, placeholders, satisfied, target, lastTerm,
    beyondTarget: lastTerm ? termKey(lastTerm) > termKey(target) : false,
    unplaced: satisfied ? [] : [...unplaced.entries()].map(([code, reason]) => ({ code, reason })),
    plannedHours, totalHours: earned + plannedHours, degreeHours: degreeNeed?.hoursNeed || school.degree?.hours || 120, softLoad: soft,
  };
}
