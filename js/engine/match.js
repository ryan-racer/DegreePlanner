// Course code normalisation and CourseSpec matching.

const CODE_RE = /^([A-Z]{2,5})\s*-?\s*(\d{3}[A-Z]?)$/;

/** Normalise "comp140", "COMP-140", "COMP 140" to "COMP 140". Returns null if not a course code. */
export function normalizeCode(raw) {
  if (!raw) return null;
  const m = String(raw).trim().toUpperCase().match(CODE_RE);
  return m ? `${m[1]} ${m[2]}` : null;
}

export function splitCode(code) {
  const m = code.match(/^([A-Z]+) (\d{3})([A-Z]?)$/);
  return m ? { dept: m[1], num: Number(m[2]), suffix: m[3] } : null;
}

/** All codes a course counts as: its own code plus any cross-listings. */
export function aliasesFor(code, crosslist) {
  const out = new Set([code]);
  const x = crosslist && crosslist[code];
  if (x) for (const c of x) out.add(c);
  return [...out];
}

/** Does a single alias code match a CourseSpec? */
function codeMatchesSpec(code, spec) {
  if (typeof spec === 'string') return code === spec;
  if (!spec || typeof spec !== 'object') return false;
  const parts = splitCode(code);
  if (!parts) return false;
  if (spec.exclude && spec.exclude.includes(code)) return false;
  if (spec.courses && spec.courses.includes(code)) return true;
  const depts = spec.dept == null ? ['*'] : Array.isArray(spec.dept) ? spec.dept : [spec.dept];
  if (!depts.includes('*') && !depts.includes(parts.dept)) return false;
  if (spec.min != null && parts.num < spec.min) return false;
  if (spec.max != null && parts.num > spec.max) return false;
  return true;
}

/** Does a transcript course (with alias list) match a spec? */
export function courseMatchesSpec(course, spec) {
  return course.aliases.some((a) => codeMatchesSpec(a, spec));
}

export function isPatternSpec(spec) {
  return spec && typeof spec === 'object';
}

/** Human-readable label for a spec. */
export function specLabel(spec, catalog) {
  if (typeof spec === 'string') {
    const info = catalog && catalog[spec];
    return info ? `${spec} · ${info.title}` : spec;
  }
  if (spec.label) return spec.label;
  const depts = spec.dept == null || spec.dept === '*' ? 'Any' : Array.isArray(spec.dept) ? spec.dept.join('/') : spec.dept;
  let range = '';
  if (spec.min != null && spec.max != null) range = ` ${spec.min}–${spec.max}`;
  else if (spec.min != null) range = ` ${spec.min}+`;
  else if (spec.max != null) range = ` ≤${spec.max}`;
  return `${depts}${range} course`;
}

/** Collect every exact code referenced anywhere in a requirement tree. */
export function collectExactCodes(nodes, out = new Set()) {
  for (const n of nodes || []) {
    const specs = [];
    if (n.type === 'course') specs.push(...(n.options || []));
    if (n.type === 'all') for (const slot of n.items || []) specs.push(...(Array.isArray(slot) ? slot : [slot]));
    if (n.type === 'choose' || n.type === 'hours') specs.push(...(n.from || []));
    for (const s of specs) {
      if (typeof s === 'string') out.add(s);
      else if (s && s.courses) s.courses.forEach((c) => out.add(c));
    }
    if (n.type === 'any') collectExactCodes(n.options, out);
    if (n.type === 'group') collectExactCodes(n.requirements, out);
  }
  return out;
}
