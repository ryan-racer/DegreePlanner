// Compares each program file with a raw catalog extraction (tools/extract-ga-requirements.py output).
// Flags course codes the catalog tables list that the program file never references, and vice versa.
// Usage: node tools/diff-catalog.mjs <workdir-with-raw/>  [--json]
import { readFileSync, existsSync } from 'node:fs';
import school from '../js/schools/rice/index.js';

const work = process.argv[2];
const CODE = /\b([A-Z]{2,5}) (\d{3}[A-Z]?)\b/g;
const codesIn = (text) => new Set([...String(text || '').matchAll(CODE)].map((m) => `${m[1]} ${m[2]}`));
const programCodes = (p) => codesIn(JSON.stringify([p.requirements, p.constraints || []]));
const patterns = (p) => { const out = []; JSON.stringify(p.requirements, (k, v) => { if (v && typeof v === 'object' && !Array.isArray(v) && v.dept) out.push(v); return v; }); return out; };
const matchesPattern = (code, specs) => { const [d, n] = code.split(' '); const num = parseInt(n, 10); return specs.some((s) => { const ds = [].concat(s.dept); return (ds.includes('*') || ds.includes(d)) && (s.min == null || num >= s.min) && (s.max == null || num <= s.max) && !(s.exclude || []).includes(code); }); };

const report = [];
for (const p of school.programs) {
  const f = `${work}/raw/${p.id}.json`;
  if (!existsSync(f)) { report.push({ id: p.id, missing: [], extra: [], note: 'no raw extraction' }); continue; }
  const raw = JSON.parse(readFileSync(f, 'utf8'));
  const tableCodes = new Set(raw.tables.flat().flatMap((r) => r.codes || []));
  const textCodes = codesIn([...(raw.footnotes || []).map((x) => x.text), ...(raw.text || []), ...raw.tables.flat().map((r) => `${r.text} ${r.title}`)].join(' '));
  const mine = programCodes(p), specs = patterns(p);
  const alias = (c) => [c, ...(school.crosslist[c] || [])];
  const missing = [...tableCodes].filter((c) => !alias(c).some((a) => mine.has(a)) && !matchesPattern(c, specs));
  const extra = [...mine].filter((c) => !alias(c).some((a) => tableCodes.has(a) || textCodes.has(a)));
  if (missing.length || extra.length) report.push({ id: p.id, missing, extra });
}
if (process.argv.includes('--json')) console.log(JSON.stringify(report));
else {
  for (const r of report) console.log(`${r.id}\n   catalog lists, file lacks (${r.missing.length}): ${r.missing.slice(0, 14).join(', ')}${r.missing.length > 14 ? ' …' : ''}\n   file has, catalog lacks (${r.extra.length}): ${r.extra.slice(0, 14).join(', ')}${r.extra.length > 14 ? ' …' : ''}${r.note ? `\n   ${r.note}` : ''}`);
  console.log(`\n${report.length} of ${school.programs.length} programs differ from the catalog tables`);
}
