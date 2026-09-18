// Shared loader for per-department course details, plus prerequisite evaluation against a set of course codes.

const cache = new Map(); // `${schoolId}/${dept}` -> Promise<object>

export function loadDept(school, dept) {
  const key = `${school.id}/${dept}`;
  if (!cache.has(key)) cache.set(key, fetch(`${school.courseDataPath || ''}${dept}.json`).then((r) => (r.ok ? r.json() : {})).catch(() => ({})));
  return cache.get(key);
}
export function clearCourseInfoCache() { cache.clear(); }

export async function courseDetails(school, code) {
  const d = await loadDept(school, code.split(' ')[0]);
  return d[code] || null;
}

const CODE = /\b([A-Z]{2,5}) (\d{3}[A-Z]?)\b/g;

/**
 * Evaluate a catalog prerequisite sentence ("(COMP 215 or COMP 310) and MATH 101") against taken course codes.
 * @returns {{ met: boolean|null, codes: {code:string, ok:boolean}[] }} met is null when there are no course codes.
 */
export function prereqStatus(text, takenCodes) {
  if (!text) return { met: null, codes: [] };
  const codes = [];
  const expr = text.replace(CODE, (m, d, n) => { const c = `${d} ${n}`; if (!codes.some((x) => x.code === c)) codes.push({ code: c, ok: takenCodes.has(c) }); return takenCodes.has(c) ? ' T ' : ' F '; })
    .replace(/\band\b/gi, ' & ').replace(/\bor\b/gi, ' | ').replace(/[^TF&|()]/g, '');
  if (!codes.length) return { met: null, codes };
  try {
    const met = evaluate(expr);
    return { met, codes };
  } catch {
    return { met: codes.every((c) => c.ok) ? true : codes.some((c) => c.ok) ? null : false, codes };
  }
}

// Tiny recursive-descent evaluator for T/F with & | and parentheses. Adjacent terms without an operator count as "and".
function evaluate(src) {
  let i = 0;
  const peek = () => src[i];
  const parsePrimary = () => {
    const ch = peek();
    if (ch === '(') { i++; const v = parseOr(); if (peek() === ')') i++; return v; }
    if (ch === 'T' || ch === 'F') { i++; return ch === 'T'; }
    throw new Error('bad');
  };
  const parseAnd = () => { let v = parsePrimary(); while (i < src.length && (peek() === '&' || peek() === 'T' || peek() === 'F' || peek() === '(')) { if (peek() === '&') i++; v = parsePrimary() && v; } return v; };
  const parseOr = () => { let v = parseAnd(); while (peek() === '|') { i++; v = parseAnd() || v; } return v; };
  const v = parseOr();
  if (i < src.length) throw new Error('trailing');
  return v;
}
