// University-wide graduation requirements (hours, upper-level hours, writing, activity, distribution, diversity).
// Configured per school under `school.degree`; course attributes (distribution group, diversity flag) come from the
// lazily loaded course details.

import { courseMatchesSpec } from './match.js';
import { gpaOf } from './grades.js';

/**
 * @param {object} o
 * @param {object} o.school
 * @param {object[]} o.courses     prepared courses (completed, in progress, planned)
 * @param {object[]} o.programs    declared program definitions (a degree may require more than the minimum hours)
 * @param {(code:string)=>Promise<object|null>} o.loadDetails
 */
export async function auditDegree({ school, courses, programs = [], loadDetails }) {
  const cfg = school.degree;
  if (!cfg) return null;
  const info = new Map();
  await Promise.all([...new Set(courses.map((c) => c.code))].map(async (code) => info.set(code, await loadDetails(code))));
  const matches = (c, specs) => (specs || []).some((s) => courseMatchesSpec(c, s));
  const notes = [];
  const list = (cs) => [...new Set(cs.map((c) => c.code))].join(', ');
  const isTransfer = (c) => c.source === 'transfer';
  const level = (c) => Number((c.code.match(/(\d{3})[A-Z]?$/) || [])[1] || 0);
  // A course must carry a minimum number of hours to meet a general education requirement. Transfer credit is
  // held to its own (usually lower) minimum, because converted quarter or ECTS units rarely come out whole.
  const bigEnough = (c, min) => c.hours >= (isTransfer(c) ? Math.min(min, cfg.transferMinHours ?? min) : min);

  // Hours. A course passed twice earns credit once unless it is repeatable; some departments count only up to a cap.
  const caps = (cfg.hourCaps || []).map((cap) => ({ ...cap, counted: 0, dropped: [] }));
  const seen = new Map(), repeated = [];
  let total = 0, upper = 0, inResidence = 0, upperInResidence = 0;
  for (const c of [...courses].sort((a, b) => (b.hours || 0) - (a.hours || 0))) {
    let h = c.hours || 0;
    if (!c.generic && !/repeatable for credit/i.test(info.get(c.code)?.d || '')) {
      if (seen.has(c.code)) { repeated.push(c); continue; }
      seen.set(c.code, c);
    }
    const cap = caps.find((k) => matches(c, k.from));
    if (cap) { const room = Math.max(0, cap.max - cap.counted); if (h > room) cap.dropped.push(c); h = Math.min(h, room); cap.counted += h; }
    total += h;
    if (level(c) >= (cfg.upperLevel || 300)) upper += h;
    if (!isTransfer(c)) { inResidence += h; if (level(c) >= (cfg.upperLevel || 300)) upperInResidence += h; }
  }
  if (repeated.length) notes.push(`${list(repeated)} appear${repeated.length === 1 && new Set(repeated.map((c) => c.code)).size === 1 ? 's' : ''} more than once. A repeated course earns credit once unless it is repeatable for credit.`);
  for (const cap of caps) if (cap.dropped.length) notes.push(`Only ${cap.max} hours of ${cap.label} count toward the degree.`);
  const round = (n) => Math.round(n * 1000) / 1000;
  total = round(total); upper = round(upper); inResidence = round(inResidence); upperInResidence = round(upperInResidence);
  const needHours = Math.max(cfg.hours || 120, ...programs.map((p) => p.degreeHours || 0));

  const items = [];
  const one = (id, name, pool, detail) => items.push({ id, name, have: Math.min(1, pool.length), need: 1, satisfied: pool.length >= 1, courses: pool, detail });
  if (cfg.writing) one('writing', cfg.writing.name, courses.filter((c) => matches(c, cfg.writing.from) && bigEnough(c, cfg.writing.minHours || 0)));
  if (cfg.activity) one('activity', cfg.activity.name, courses.filter((c) => matches(c, cfg.activity.from) && bigEnough(c, cfg.activity.minHours || 0)));
  const dist = {};
  if (cfg.distribution) {
    const d = cfg.distribution;
    for (const g of d.groups) {
      const pool = courses.filter((c) => (info.get(c.code)?.dist || '').replace('Distribution Group ', '') === g && bigEnough(c, d.minHours || 0) && !(d.excludeDepts || []).includes(c.code.split(' ')[0]));
      const small = courses.filter((c) => (info.get(c.code)?.dist || '').replace('Distribution Group ', '') === g && !pool.includes(c) && !(d.excludeDepts || []).includes(c.code.split(' ')[0]));
      if (small.length) notes.push(`${list(small)} ${small.length === 1 ? 'is a' : 'are'} Group ${g} course${small.length === 1 ? '' : 's'} but ${small.length === 1 ? 'carries' : 'carry'} too few hours to count toward distribution (${d.minHours} required, ${cfg.transferMinHours ?? d.minHours} for transfer credit).`);
      const depts = new Set(pool.map((c) => c.code.split(' ')[0]));
      const countOk = pool.length >= d.courses, deptOk = depts.size >= Math.min(d.minDepartments || 1, d.courses);
      // Courses still needed: the count shortfall, or one more from another department when the count is met.
      const need = Math.max(d.courses - pool.length, countOk && !deptOk ? 1 : 0, 0);
      dist[g] = { have: Math.min(pool.length, d.courses), target: d.courses, need, satisfied: countOk && deptOk, departments: depts.size, courses: pool,
        detail: countOk && !deptOk ? `needs a second department (all from ${[...depts][0]})` : '' };
    }
  }
  if (cfg.diversity) one('diversity', cfg.diversity.name, courses.filter((c) => info.get(c.code)?.ad && bigEnough(c, cfg.diversity.minHours || 0)));

  const residency = cfg.residency && {
    hours: { have: inResidence, need: cfg.residency.hours || 0, satisfied: inResidence >= (cfg.residency.hours || 0) },
    upper: { have: upperInResidence, need: cfg.residency.upperLevelHours || 0, satisfied: upperInResidence >= (cfg.residency.upperLevelHours || 0) },
  };
  const gpa = gpaOf(courses.filter((c) => !isTransfer(c)), school.defaultHours);
  if (cfg.minGpa && gpa != null && gpa < cfg.minGpa) notes.push(`Cumulative GPA is ${gpa.toFixed(2)}; graduation requires at least ${cfg.minGpa.toFixed(2)}.`);

  return {
    residency, gpa, notes,
    hours: { have: total, need: needHours, satisfied: total >= needHours },
    upper: { have: upper, need: cfg.upperLevelHours || 0, satisfied: upper >= (cfg.upperLevelHours || 0) },
    items, dist,
    distNeed: Object.fromEntries(Object.entries(dist).map(([g, v]) => [g, v.need])),
    // When the count is met but every course is from one department, the extra course must come from another.
    distAvoid: Object.fromEntries(Object.entries(dist).filter(([, v]) => v.detail).map(([g, v]) => [g, [...new Set(v.courses.map((c) => c.code.split(' ')[0]))]])),
    missing: items.filter((i) => !i.satisfied).map((i) => i.id),
  };
}
