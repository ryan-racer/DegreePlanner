// Matches the program names printed on a transcript to program definitions.
// Match declared program names from the transcript header to program definitions. Transcripts abbreviate
// ("Electrical & Computer Eng.", "Health Sciences", "Asian Studies (Asian Language)"), so match on word prefixes
// and prefer the program whose name is covered best. A degree hint ("BS in ...", "Bachelor of Arts") breaks BA/BS ties.
const STOP = new Set(['and', 'of', 'the', 'in', 'for', 'concentration', 'major', 'minor', 'option']);
const tokens = (str) => str.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((t) => t && !STOP.has(t));
const tokMatch = (a, b) => a === b || (a.length >= 3 && b.length >= 3 && (a.startsWith(b) || b.startsWith(a)));
export function detectDeclared(declared, programs) {
  const found = [];
  const wantsBS = /\b(bs|b\.s\.|science)\b/i.test(declared.degreeHint || '');
  const wantsBA = /\b(ba|b\.a\.|arts)\b/i.test(declared.degreeHint || '');
  const pick = (name, kind) => {
    const tt = tokens(name);
    if (!tt.length) return;
    let best = null;
    for (const p of programs) {
      if (p.kind !== kind) continue;
      const pt = tokens(p.name);
      if (!tt.every((t) => pt.some((q) => tokMatch(t, q)))) continue;
      const covered = pt.filter((q) => tt.some((t) => tokMatch(t, q))).length / pt.length;
      if (covered < 0.5) continue;
      const degreeBonus = kind === 'major' ? ((wantsBS && p.degree !== 'BA') || (wantsBA && p.degree === 'BA') ? 0.05 : 0) : 0;
      const score = covered + degreeBonus;
      if (!best || score > best.score) best = { p, score };
    }
    if (best && !found.includes(best.p.id)) found.push(best.p.id);
  };
  const split = (m) => m.split(/,|;|\band\b|\//).map((x) => x.trim()).filter(Boolean);
  (declared.majors || []).forEach((m) => split(m).forEach((x) => pick(x, 'major')));
  (declared.minors || []).forEach((m) => split(m).forEach((x) => pick(x, 'minor')));
  return found;
}
