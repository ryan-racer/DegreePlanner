// Shared loader for per-department course details, plus prerequisite evaluation against a set of course codes.

const cache = new Map(); // `${schoolId}/${dept}` -> Promise<object>

export function loadDept(school, dept) {
  const key = `${school.id}/${dept}`;
  if (!cache.has(key)) cache.set(key, fetch(`${school.courseDataPath || ''}${dept}.json`).then((r) => (r.ok ? r.json() : {})).catch(() => ({})));
  return cache.get(key);
}
export function clearCourseInfoCache() { cache.clear(); }

export async function courseDetails(school, code) {
  if (school.transcript?.generic?.test(code)) return null; // placeholder credit has no catalog entry
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

/**
 * Which courses would have to be added to satisfy a prerequisite sentence? Picks the cheapest branch of each "or".
 * Returns [] when already satisfied or when the sentence names no courses.
 */
export function prereqNeeds(text, takenCodes) {
  if (!text) return [];
  const tokens = [];
  const re = /\b([A-Z]{2,5}) (\d{3}[A-Z]?)\b|\band\b|\bor\b|[()]/gi;
  let m;
  while ((m = re.exec(text))) {
    if (m[1]) tokens.push({ code: `${m[1].toUpperCase()} ${m[2].toUpperCase()}` });
    else tokens.push({ op: m[0].toLowerCase() });
  }
  if (!tokens.some((t) => t.code)) return [];
  let i = 0;
  const primary = () => {
    const t = tokens[i];
    if (!t) return null;
    if (t.op === '(') { i++; const v = orExpr(); if (tokens[i]?.op === ')') i++; return v; }
    if (t.code) { i++; return { code: t.code }; }
    i++; return primary();
  };
  const andExpr = () => { const kids = []; let k = primary(); if (k) kids.push(k); while (i < tokens.length && tokens[i].op !== 'or' && tokens[i].op !== ')') { if (tokens[i].op === 'and') i++; k = primary(); if (k) kids.push(k); } return { and: kids }; };
  const orExpr = () => { const kids = [andExpr()]; while (tokens[i]?.op === 'or') { i++; kids.push(andExpr()); } return { or: kids }; };
  const need = (n) => {
    if (!n) return [];
    if (n.code) return takenCodes.has(n.code) ? [] : [n.code];
    if (n.and) return [...new Set(n.and.flatMap(need))];
    const options = n.or.map(need);
    return options.reduce((best, o) => (o.length < best.length ? o : best), options[0] || []);
  };
  try { return need(orExpr()); } catch { return []; }
}
