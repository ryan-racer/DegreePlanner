// Degree audit engine: evaluates a program definition against a set of courses.
//
// Input courses: [{ code:'COMP 140', hours:4, status:'completed'|'in-progress'|'failed', ... }]
// Output: a result tree mirroring the requirement tree, plus summary numbers.

import { aliasesFor, courseMatchesSpec, isPatternSpec, collectExactCodes } from './match.js';

const DEFAULT_HOURS = 3;

/** Prepare transcript courses for auditing (aliases, usable flag). */
export function prepareCourses(courses, school, opts = {}) {
  const includeInProgress = opts.includeInProgress !== false;
  const includePlanned = opts.includePlanned !== false;
  return courses
    .filter((c) => c.code)
    .filter((c) => c.status !== 'failed')
    .filter((c) => includeInProgress || c.status !== 'in-progress')
    .filter((c) => includePlanned || c.status !== 'planned')
    .map((c, i) => ({
      ...c,
      key: `${c.code}#${i}`,
      hours: Number.isFinite(c.hours) && c.hours >= 0 ? c.hours : (school.catalog?.[c.code]?.hours ?? school.defaultHours ?? DEFAULT_HOURS),
      aliases: aliasesFor(c.code, school.crosslist),
    }));
}

/**
 * Audit one program.
 * @returns {{ program, satisfied, remaining, total, pct, used: Course[], tree: ResultNode[] }}
 */
export function auditProgram(program, courses) {
  const reserved = collectExactCodes(program.requirements);
  const used = new Set();
  const tree = evalNodes(program.requirements, courses, used, reserved);
  const sum = summarize(tree);
  const usedCourses = courses.filter((c) => used.has(c.key));
  return {
    program,
    satisfied: sum.remaining === 0,
    remaining: sum.remaining,
    total: sum.total,
    pct: sum.total ? (sum.total - sum.remaining) / sum.total : 1,
    usedCourses,
    usedHours: usedCourses.reduce((a, c) => a + c.hours, 0),
    tree,
  };
}

/** Audit every program in a school; sorted by closeness. */
export function auditAll(programs, courses) {
  return programs
    .map((p) => auditProgram(p, courses))
    .sort((a, b) => b.pct - a.pct || a.remaining - b.remaining || a.program.name.localeCompare(b.program.name));
}

function summarize(nodes) {
  let remaining = 0, total = 0;
  for (const n of nodes) { remaining += n.remaining; total += n.total; }
  return { remaining, total };
}

function evalNodes(nodes, courses, used, reserved) {
  return (nodes || []).map((n) => evalNode(n, courses, used, reserved));
}

function evalNode(node, courses, used, reserved) {
  switch (node.type) {
    case 'course': return evalAll({ ...node, items: [node.options || []] }, courses, used, reserved, true);
    case 'all': return evalAll(node, courses, used, reserved, false);
    case 'choose': return evalChoose(node, courses, used, reserved);
    case 'hours': return evalHours(node, courses, used, reserved);
    case 'any': return evalAny(node, courses, used, reserved);
    case 'group': {
      const children = evalNodes(node.requirements, courses, used, reserved);
      const s = summarize(children);
      return { node, kind: 'group', children, ...s, satisfied: s.remaining === 0 };
    }
    default: return { node, kind: 'unknown', children: [], remaining: 0, total: 0, satisfied: true };
  }
}

/** Pick the best unused course for a list of alternative specs. `allow` optionally filters candidates further. */
function pickFor(specs, courses, used, reserved, allow) {
  const specList = Array.isArray(specs) ? specs : [specs];
  const candidates = courses.filter((c) => !used.has(c.key) && specList.some((s) => courseMatchesSpec(c, s)) && (!allow || allow(c)));
  if (!candidates.length) return null;
  // Prefer courses that exactly match a string spec, then non-reserved courses (leave named courses for their own slots),
  // then completed over in-progress.
  const score = (c) => {
    const exact = specList.some((s) => typeof s === 'string' && c.aliases.includes(s)) ? 0 : 1;
    const isReserved = c.aliases.some((a) => reserved.has(a)) ? 1 : 0;
    const ip = c.status === 'planned' ? 2 : c.status === 'in-progress' ? 1 : 0;
    return exact * 8 + isReserved * 4 + ip;
  };
  candidates.sort((a, b) => score(a) - score(b));
  return candidates[0];
}

function evalAll(node, courses, used, reserved, single) {
  const slots = (node.items || []).map((slot) => {
    const specs = Array.isArray(slot) ? slot : [slot];
    const c = pickFor(specs, courses, used, reserved);
    if (c) used.add(c.key);
    return { specs, course: c || null };
  });
  const remaining = slots.filter((s) => !s.course).length;
  return { node, kind: single ? 'course' : 'all', slots, remaining, total: slots.length, satisfied: remaining === 0 };
}

/**
 * "Only one of these may count": a candidate is blocked when a course already filled in this node shares an
 * exclusive group with it.
 */
function exclusiveFilter(node, filled) {
  const groups = node.exclusive || [];
  if (!groups.length) return null;
  return (c) => !groups.some((g) => c.aliases.some((a) => g.includes(a)) && filled.some((f) => f.aliases.some((a) => g.includes(a))));
}

function evalChoose(node, courses, used, reserved) {
  const count = Math.max(0, node.count | 0);
  const filled = [];
  const missing = [];
  const take = (c) => { used.add(c.key); filled.push(c); };
  // Sub-quotas first ("at least 2 must be CMOR courses"): only the deficit after courses already filled.
  for (const q of node.atLeast || []) {
    const have = filled.filter((c) => (q.from || []).some((s) => courseMatchesSpec(c, s))).length;
    for (let i = have; i < (q.count | 0) && filled.length < count; i++) {
      const c = pickFor(q.from || [], courses, used, reserved, (x) => {
        const ok = (node.from || []).some((s) => courseMatchesSpec(x, s));
        const ex = exclusiveFilter(node, filled);
        return ok && (!ex || ex(x));
      });
      if (c) take(c); else missing.push({ specs: q.from || [], label: q.label });
    }
  }
  while (filled.length + missing.length < count) {
    const c = pickFor(node.from || [], courses, used, reserved, exclusiveFilter(node, filled));
    if (!c) break;
    take(c);
  }
  const remaining = count - filled.length;
  while (missing.length < remaining) missing.push({ specs: node.from || [] });
  return { node, kind: 'choose', filled, missing, remaining, total: count, satisfied: remaining === 0 };
}

function evalHours(node, courses, used, reserved) {
  const need = Number(node.hours) || 0;
  const filled = [];
  let earned = 0;
  while (earned < need) {
    const c = pickFor(node.from || [], courses, used, reserved, exclusiveFilter(node, filled));
    if (!c) break;
    used.add(c.key);
    filled.push(c);
    earned += c.hours;
  }
  const total = Math.max(1, Math.ceil(need / DEFAULT_HOURS));
  const remaining = Math.max(0, Math.ceil((need - earned) / DEFAULT_HOURS));
  return { node, kind: 'hours', filled, earned, need, remaining, total, satisfied: earned >= need };
}

function evalAny(node, courses, used, reserved) {
  let best = null;
  for (const opt of node.options || []) {
    const trial = new Set(used);
    const res = evalNode(opt, courses, trial, reserved);
    const pct = res.total ? (res.total - res.remaining) / res.total : 1;
    if (!best || pct > best.pct || (pct === best.pct && res.remaining < best.res.remaining)) best = { res, trial, pct };
  }
  if (!best) return { node, kind: 'any', children: [], chosen: null, remaining: 0, total: 0, satisfied: true };
  for (const k of best.trial) used.add(k);
  const others = (node.options || []).filter((o) => o !== best.res.node).map((o) => ({ node: o }));
  return { node, kind: 'any', children: [best.res], chosen: best.res, alternatives: others,
    remaining: best.res.remaining, total: best.res.total, satisfied: best.res.satisfied };
}

/**
 * Rank catalog courses by how many open slots they would fill across the given audit results.
 * Only explicit course codes in requirement specs are considered (patterns like "any COMP 300+" are reported separately).
 * @returns {{ suggestions: {code, score, programs: string[]}[], patterns: {label, count, program}[] }}
 */
export function suggestCourses(results, courses, school, limit = 12) {
  const have = new Set();
  for (const c of courses) for (const a of c.aliases) have.add(a);
  const score = new Map(); // code -> { score, programs:Set }
  const patterns = [];
  const bump = (code, program) => {
    if (have.has(code)) return;
    const e = score.get(code) || { score: 0, programs: new Set() };
    e.score += 1; e.programs.add(program); score.set(code, e);
  };
  const walk = (n, program) => {
    const blocked = new Set();
    for (const g of n.node?.exclusive || []) if ((n.filled || []).some((f) => f.aliases.some((a) => g.includes(a)))) g.forEach((c) => blocked.add(c));
    const specsOf = (specs) => {
      const codes = new Set();
      for (const s of specs) {
        if (typeof s === 'string') { if (!blocked.has(s)) codes.add(s); }
        else if (s.courses) s.courses.forEach((c) => !blocked.has(c) && codes.add(c));
        else patterns.push({ label: s.label || specLabelSafe(s), program });
      }
      return codes;
    };
    if (n.kind === 'course' || n.kind === 'all') for (const sl of n.slots) if (!sl.course) specsOf(sl.specs).forEach((c) => bump(c, program));
    if (n.kind === 'choose' || n.kind === 'hours') {
      const seen = new Set();
      for (const m of n.missing || (n.remaining > 0 ? [{ specs: n.node.from || [] }] : [])) for (const c of specsOf(m.specs)) if (!seen.has(c)) { seen.add(c); bump(c, program); }
    }
    for (const ch of n.children || []) walk(ch, program);
  };
  for (const r of results) for (const n of r.tree) walk(n, `${r.program.name} (${r.program.degree})`);
  const suggestions = [...score.entries()]
    .map(([code, e]) => ({ code, score: e.score, programs: [...e.programs], title: school.catalog?.[code]?.title || '', hours: school.catalog?.[code]?.hours }))
    .sort((a, b) => b.score - a.score || a.code.localeCompare(b.code))
    .slice(0, limit);
  // collapse duplicate pattern entries
  const pmap = new Map();
  for (const pt of patterns) { const k = `${pt.label}|${pt.program}`; pmap.set(k, { ...pt, count: (pmap.get(k)?.count || 0) + 1 }); }
  return { suggestions, patterns: [...pmap.values()] };
}

function specLabelSafe(spec) {
  const depts = spec.dept == null || spec.dept === '*' ? 'Any' : Array.isArray(spec.dept) ? spec.dept.join('/') : spec.dept;
  const range = spec.min != null && spec.max != null ? ` ${spec.min}–${spec.max}` : spec.min != null ? ` ${spec.min}+` : spec.max != null ? ` ≤${spec.max}` : '';
  return `${depts}${range} course`;
}
