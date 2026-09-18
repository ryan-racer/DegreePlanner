// Turns an auto-plan placeholder ("ELEC 300+ elective", "Distribution I course") into concrete suggestions:
// courses that match, that have run in that term's season, and whose prerequisites will be met by then.

import { loadDept, prereqStatus } from '../data/courseinfo.js';
import { courseMatchesSpec } from '../engine/match.js';
import { seasonPattern, termCodeFor } from '../engine/autoplan.js';

let attrsPromise = null;
function loadAttributes(school) {
  if (!attrsPromise) attrsPromise = fetch(`${(school.courseDataPath || '').replace(/courses\/$/, '')}attributes.json`).then((r) => (r.ok ? r.json() : { dist: {}, ad: [] })).catch(() => ({ dist: {}, ad: [] }));
  return attrsPromise;
}

/**
 * @returns {Promise<{ code, title, hours, note }[]>} up to `limit` suggestions, best first
 */
export async function suggestForPlaceholder({ school, placeholder, termName, codesBefore, allCodes, loadSections, limit = 8 }) {
  const season = termName.split(' ')[0];
  let pool = [];
  if (placeholder.kind === 'pattern' && placeholder.spec) {
    const depts = [].concat(placeholder.spec.dept || []).filter((d) => d && d !== '*');
    const data = Object.assign({}, ...(await Promise.all(depts.map((d) => loadDept(school, d)))));
    pool = Object.keys(data).filter((code) => courseMatchesSpec({ aliases: [code] }, placeholder.spec));
  } else if (placeholder.kind === 'dist') {
    pool = (await loadAttributes(school)).dist?.[placeholder.dist] || [];
  } else if (placeholder.kind === 'diversity') {
    pool = (await loadAttributes(school)).ad || [];
  } else return [];
  pool = pool.filter((code) => !allCodes.has(code) && Number(code.slice(-3)) < 500 && !(placeholder.avoidDepts || []).includes(code.split(' ')[0]));

  // Offering evidence: real sections for that term when published, otherwise the latest term of the same season.
  const suffix = { Fall: '10', Spring: '20', Summer: '30' }[season];
  const exact = termCodeFor(termName);
  const terms = school.sectionTerms || [];
  const proxy = terms.includes(exact) ? exact : [...terms].reverse().find((t) => t.endsWith(suffix));
  let running = null;
  if (proxy && loadSections) { const secs = await loadSections(proxy); running = new Set(secs.filter((s) => s.meetings?.length).map((s) => s.code)); }
  if (running) pool = pool.filter((code) => running.has(code));

  // Details for the shortlist only (prerequisites, reliability).
  const short = pool.slice(0, 120);
  const byDept = Object.assign({}, ...(await Promise.all([...new Set(short.map((c) => c.split(' ')[0]))].map((d) => loadDept(school, d)))));
  const out = [];
  for (const code of short) {
    const d = byDept[code];
    if (prereqStatus(d?.pre, codesBefore).met === false) continue;
    const pat = seasonPattern(d, school.scheduleTerms);
    if (!running && pat[season] === false) continue;
    const hours = school.catalog?.[code]?.hours ?? 3;
    if (placeholder.kind !== 'pattern' && hours < 3) continue;
    out.push({ code, title: school.catalog?.[code]?.title || '', hours, note: proxy === exact ? `has sections in ${termName}` : pat.label, rank: (pat[season] ? 0 : 1) * 1000 + Number(code.slice(-3)) });
  }
  return out.sort((a, b) => a.rank - b.rank || a.code.localeCompare(b.code)).slice(0, limit);
}
