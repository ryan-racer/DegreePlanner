// University-wide graduation requirements (hours, upper-level hours, writing, activity, distribution, diversity).
// Configured per school under `school.degree`; course attributes (distribution group, diversity flag) come from the
// lazily loaded course details.

import { courseMatchesSpec } from './match.js';

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

  // Hours: activity courses count only up to a cap.
  let activityHours = 0, total = 0, upper = 0;
  for (const c of courses) {
    let h = c.hours;
    if (cfg.activity && matches(c, cfg.activity.from)) { const room = Math.max(0, (cfg.activity.maxHoursCounted ?? Infinity) - activityHours); h = Math.min(h, room); activityHours += h; }
    total += h;
    if (Number(c.code.slice(-3)) >= (cfg.upperLevel || 300)) upper += h;
  }
  const needHours = Math.max(cfg.hours || 120, ...programs.map((p) => p.degreeHours || 0));

  const items = [];
  const one = (id, name, pool, detail) => items.push({ id, name, have: Math.min(1, pool.length), need: 1, satisfied: pool.length >= 1, courses: pool, detail });
  if (cfg.writing) one('writing', cfg.writing.name, courses.filter((c) => matches(c, cfg.writing.from)));
  if (cfg.activity) one('activity', cfg.activity.name, courses.filter((c) => matches(c, cfg.activity.from)));
  const dist = {};
  if (cfg.distribution) {
    const d = cfg.distribution;
    for (const g of d.groups) {
      const pool = courses.filter((c) => (info.get(c.code)?.dist || '').replace('Distribution Group ', '') === g && c.hours >= (d.minHours || 0));
      const depts = new Set(pool.map((c) => c.code.split(' ')[0]));
      const countOk = pool.length >= d.courses, deptOk = depts.size >= Math.min(d.minDepartments || 1, d.courses);
      // Courses still needed: the count shortfall, or one more from another department when the count is met.
      const need = Math.max(d.courses - pool.length, countOk && !deptOk ? 1 : 0, 0);
      dist[g] = { have: Math.min(pool.length, d.courses), target: d.courses, need, satisfied: countOk && deptOk, departments: depts.size, courses: pool,
        detail: countOk && !deptOk ? `needs a second department (all from ${[...depts][0]})` : '' };
    }
  }
  if (cfg.diversity) one('diversity', cfg.diversity.name, courses.filter((c) => info.get(c.code)?.ad && c.hours >= (cfg.diversity.minHours || 0)));

  return {
    hours: { have: total, need: needHours, satisfied: total >= needHours },
    upper: { have: upper, need: cfg.upperLevelHours || 0, satisfied: upper >= (cfg.upperLevelHours || 0) },
    items, dist,
    distNeed: Object.fromEntries(Object.entries(dist).map(([g, v]) => [g, v.need])),
    // When the count is met but every course is from one department, the extra course must come from another.
    distAvoid: Object.fromEntries(Object.entries(dist).filter(([, v]) => v.detail).map(([g, v]) => [g, [...new Set(v.courses.map((c) => c.code.split(' ')[0]))]])),
    missing: items.filter((i) => !i.satisfied).map((i) => i.id),
  };
}
