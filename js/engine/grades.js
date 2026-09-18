// Grade points, shared by the engine and the UI. Grades without an entry (P, S, TR, W, ...) do not affect a GPA.
export const POINTS = { 'A+': 4.33, A: 4, 'A-': 3.67, 'B+': 3.33, B: 3, 'B-': 2.67, 'C+': 2.33, C: 2, 'C-': 1.67, 'D+': 1.33, D: 1, 'D-': 0.67, F: 0 };

/** Grade point average over graded, finished attempts (failed ones included); null when nothing is graded. */
export function gpaOf(courses) {
  let pts = 0, hrs = 0;
  for (const c of courses) {
    if (c.status === 'planned' || c.status === 'in-progress' || POINTS[c.grade] == null) continue;
    const h = c.hours || 0;
    pts += POINTS[c.grade] * h; hrs += h;
  }
  return hrs ? pts / hrs : null;
}
