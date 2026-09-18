// Audits every program against the sample transcript and an "everything" transcript
// (every course in the catalog) to catch engine errors and unreachable requirements.
// Also warns about course codes that do not exist in the catalog. Usage: node tools/smoke.mjs
import school from '../js/schools/rice/index.js';
import { parseTranscript } from '../js/parser/transcript.js';
import { prepareCourses, auditProgram } from '../js/engine/audit.js';
import { collectExactCodes } from '../js/engine/match.js';

const { courses } = parseTranscript(school.sample, school);
const sample = prepareCourses(courses, school);
const catalogCourses = Object.keys(school.catalog).map((code) => ({ code, status: 'completed' }));
const REPEATS = 8; // some programs require a course several semesters in a row
let problems = 0;
for (const p of school.programs) {
  try {
    const r = auditProgram(p, sample);
    const exact = [...collectExactCodes(p.requirements)];
    const extra = exact.flatMap((code) => Array.from({ length: REPEATS - 1 }, () => ({ code, status: 'completed' })));
    const all = auditProgram(p, prepareCourses([...catalogCourses, ...extra], school));
    const unknown = exact.filter((c) => !school.catalog[c] && !school.crosslist[c]);
    const flags = [];
    if (!all.satisfied) flags.push(`not satisfiable even with every catalog course (${all.remaining} slots left)`);
    if (unknown.length) flags.push(`codes not in catalog: ${unknown.join(', ')}`);
    if (flags.length) { problems++; console.log(`! ${p.id}: ${flags.join('; ')}`); }
    if (process.argv.includes('-v')) console.log(`${p.id.padEnd(60)} ${Math.round(r.pct * 100)}% (${r.remaining} to go)`);
  } catch (e) { problems++; console.log(`✗ ${p.id}: ${e.stack}`); }
}
console.log(`${school.programs.length} programs audited, ${problems} with warnings`);
