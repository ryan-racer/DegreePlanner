// Degree audit engine: evaluates a program definition against a set of courses.
//
// Input courses: [{ code:'COMP 140', hours:4, status:'completed'|'in-progress'|'failed', ... }]
// Output: a result tree mirroring the requirement tree, plus summary numbers.

import { aliasesFor, courseMatchesSpec, isPatternSpec, collectExactCodes, countExactRefs } from './match.js';

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
export function auditProgram(program, courses, overrides = []) {
  const reserved = collectExactCodes(program.requirements);
  reserved.refs = countExactRefs(program.requirements);
  const used = new Set();
  // Manual substitutions approved by an advisor: { key, code }. `key` is a node path ("0.1") for choose/hours nodes
  // or "path#slot" for a slot of a course/all node. Claim those courses first so nothing else spends them.
  const ov = new Map();
  for (const o of overrides || []) {
    const c = courses.find((x) => !used.has(x.key) && x.aliases.includes(o.code));
    if (!c) continue;
    used.add(c.key);
    if (!ov.has(o.key)) ov.set(o.key, []);
    ov.get(o.key).push(c);
  }
  reserved.ov = ov;
  const tree = evalNodes(program.requirements, courses, used, reserved, '');
  const sum = summarize(tree);
  const usedCourses = courses.filter((c) => used.has(c.key));
  const constraints = evalConstraints(program.constraints, tree, sum.remaining);
  sum.remaining += constraints.reduce((a, c) => a + c.penalty, 0);
  sum.total += constraints.reduce((a, c) => a + c.penalty, 0);
  return {
    program,
    satisfied: sum.remaining === 0,
    remaining: sum.remaining,
    total: sum.total,
    pct: sum.total ? (sum.total - sum.remaining) / sum.total : 1,
    usedCourses,
    usedHours: usedCourses.reduce((a, c) => a + c.hours, 0),
    tree,
    constraints,
  };
}

/** Courses placed under the given node paths (or everywhere when `among` is omitted). */
function coursesUnder(tree, among) {
  const out = [];
  const inScope = (path) => !among || among.some((a) => path === a || path.startsWith(`${a}.`) || path.startsWith(`${a}#`));
  const walk = (n) => {
    if (inScope(n.path || '')) {
      for (const sl of n.slots || []) if (sl.course) out.push(sl.course);
      for (const c of n.filled || []) out.push(c);
    }
    for (const ch of n.children || []) walk(ch);
  };
  tree.forEach(walk);
  return [...new Map(out.map((c) => [c.key, c])).values()];
}

/**
 * Program-level rules that span sections:
 *   { type: 'atLeast', count | hours, from: [specs], among?: [paths], label }  e.g. "5 of these courses at 300+"
 *   { type: 'atMost',  count | hours, from: [specs], among?: [paths], label }  e.g. "no more than 2 at the 100 level"
 * A shortfall only costs extra courses once the open slots that could absorb it are used up.
 */
function evalConstraints(constraints, tree, openSlots) {
  return (constraints || []).map((k) => {
    const pool = coursesUnder(tree, k.among).filter((c) => (k.from || []).some((s) => courseMatchesSpec(c, s)));
    const byHours = k.hours != null;
    const have = byHours ? pool.reduce((a, c) => a + c.hours, 0) : pool.length;
    const need = byHours ? k.hours : k.count;
    let short = 0;
    if (k.type === 'atMost') short = Math.max(0, have - need);
    else short = Math.max(0, need - have);
    const shortCourses = byHours ? Math.ceil(short / DEFAULT_HOURS) : short;
    const penalty = k.type === 'atMost' ? shortCourses : Math.max(0, shortCourses - openSlots);
    return { constraint: k, have, need, satisfied: short === 0, penalty, courses: pool };
  });
}

/** Audit every program in a school; sorted by closeness. */
export function auditAll(programs, courses, overridesByProgram = {}) {
  return programs
    .map((p) => auditProgram(p, courses, overridesByProgram[p.id]))
    .sort((a, b) => b.pct - a.pct || a.remaining - b.remaining || a.program.name.localeCompare(b.program.name));
}

function summarize(nodes) {
  let remaining = 0, total = 0;
  for (const n of nodes) { remaining += n.remaining; total += n.total; }
  return { remaining, total };
}

function evalNodes(nodes, courses, used, reserved, prefix) {
  return (nodes || []).map((n, i) => evalNode(n, courses, used, reserved, prefix === '' ? String(i) : `${prefix}.${i}`));
}

function evalNode(node, courses, used, reserved, path) {
  switch (node.type) {
    case 'course': return evalAll({ ...node, items: [node.options || []] }, courses, used, reserved, true, path, node);
    case 'all': return evalAll(node, courses, used, reserved, false, path, node);
    case 'choose': return evalChoose(node, courses, used, reserved, path);
    case 'hours': return evalHours(node, courses, used, reserved, path);
    case 'any': return evalAny(node, courses, used, reserved, path);
    case 'group': {
      const children = evalNodes(node.requirements, courses, used, reserved, path);
      const s = summarize(children);
      return { node, kind: 'group', path, children, ...s, satisfied: s.remaining === 0 };
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
  // then courses that fewer other slots could use, then completed over in-progress over planned.
  const refs = reserved.refs || new Map();
  const score = (c) => {
    const exact = specList.some((s) => typeof s === 'string' && c.aliases.includes(s)) ? 0 : 1;
    const isReserved = c.aliases.some((a) => reserved.has(a)) ? 1 : 0;
    const demand = Math.max(0, ...c.aliases.map((a) => refs.get(a) || 0));
    const ip = c.status === 'planned' ? 2 : c.status === 'in-progress' ? 1 : 0;
    return [exact, isReserved, demand, ip];
  };
  const cmp = (a, b) => { const x = score(a), y = score(b); for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] - y[i]; return 0; };
  candidates.sort(cmp);
  return candidates[0];
}

function evalAll(node, courses, used, reserved, single, path, original) {
  const slots = (node.items || []).map((slot, i) => {
    const specs = Array.isArray(slot) ? slot : [slot];
    const key = `${path}#${i}`;
    const manual = reserved.ov?.get(key)?.[0];
    if (manual) return { specs, course: manual, manual: true, key };
    const c = pickFor(specs, courses, used, reserved);
    if (c) used.add(c.key);
    return { specs, course: c || null, key };
  });
  const remaining = slots.filter((s) => !s.course).length;
  return { node: original || node, kind: single ? 'course' : 'all', path, slots, remaining, total: slots.length, satisfied: remaining === 0 };
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

function evalChoose(node, courses, used, reserved, path) {
  const count = Math.max(0, node.count | 0);
  const filled = [];
  const missing = [];
  const manual = new Set();
  for (const c of (reserved.ov?.get(path) || []).slice(0, count)) { filled.push(c); manual.add(c.key); }
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
  return { node, kind: 'choose', path, filled, manual, missing, remaining, total: count, satisfied: remaining === 0 };
}

function evalHours(node, courses, used, reserved, path) {
  const need = Number(node.hours) || 0;
  const filled = [];
  let earned = 0;
  const manual = new Set();
  for (const c of reserved.ov?.get(path) || []) { filled.push(c); manual.add(c.key); earned += c.hours; }
  while (earned < need) {
    const c = pickFor(node.from || [], courses, used, reserved, exclusiveFilter(node, filled));
    if (!c) break;
    used.add(c.key);
    filled.push(c);
    earned += c.hours;
  }
  const total = Math.max(1, Math.ceil(need / DEFAULT_HOURS));
  const remaining = Math.max(0, Math.ceil((need - earned) / DEFAULT_HOURS));
  return { node, kind: 'hours', path, filled, manual, earned, need, remaining, total, satisfied: earned >= need };
}

function evalAny(node, courses, used, reserved, path) {
  let best = null;
  (node.options || []).forEach((opt, j) => {
    const trial = new Set(used);
    const res = evalNode(opt, courses, trial, reserved, `${path}.o${j}`);
    const pct = res.total ? (res.total - res.remaining) / res.total : 1;
    if (!best || pct > best.pct || (pct === best.pct && res.remaining < best.res.remaining)) best = { res, trial, pct };
  });
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
        else patterns.push({ label: s.label || specLabelSafe(s), program, spec: s });
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
  // Collapse cross-listed duplicates (COMP 460 / ARTS 460) onto the listing from the department that dominates
  // the open requirements, so a CS audit suggests COMP 460 rather than ARTS 460.
  const deptFreq = {};
  for (const code of score.keys()) { const d = code.split(' ')[0]; deptFreq[d] = (deptFreq[d] || 0) + 1; }
  const seen = new Set();
  for (const code of [...score.keys()].sort((a, b) => (deptFreq[b.split(' ')[0]] - deptFreq[a.split(' ')[0]]) || a.localeCompare(b))) {
    if (seen.has(code)) { score.delete(code); continue; }
    for (const alias of school.crosslist?.[code] || []) { seen.add(alias); if (score.has(alias)) { const a = score.get(alias); const e = score.get(code); e.score = Math.max(e.score, a.score); a.programs.forEach((pr) => e.programs.add(pr)); score.delete(alias); } }
  }
  const suggestions = [...score.entries()]
    .map(([code, e]) => ({ code, score: e.score, programs: [...e.programs], title: school.catalog?.[code]?.title || '', hours: school.catalog?.[code]?.hours }))
    .sort((a, b) => b.score - a.score || a.code.localeCompare(b.code))
    .slice(0, limit);
  // collapse duplicate pattern entries
  const pmap = new Map();
  for (const pt of patterns) { const k = `${pt.label}|${pt.program}`; pmap.set(k, { ...pt, count: (pmap.get(k)?.count || 0) + 1 }); }
  // Exclusion of courses already taken happens per-code in `have`; pattern matches are resolved by callers.
  return { suggestions, patterns: [...pmap.values()] };
}

function specLabelSafe(spec) {
  const depts = spec.dept == null || spec.dept === '*' ? 'Any' : Array.isArray(spec.dept) ? spec.dept.join('/') : spec.dept;
  const range = spec.min != null && spec.max != null ? ` ${spec.min}–${spec.max}` : spec.min != null ? ` ${spec.min}+` : spec.max != null ? ` ≤${spec.max}` : '';
  return `${depts}${range} course`;
}
