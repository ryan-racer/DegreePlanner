# Program definition format

Every major, minor, or certificate is one ES module under
`js/schools/<school>/programs/<slug>.js` that default-exports a plain object.
No code runs in these files; they are data. The audit engine
(`js/engine/audit.js`) interprets them.

```js
export default {
  id: 'computer-science-bscs',       // unique within the school; use the catalog slug
  name: 'Computer Science',          // program name without the degree
  degree: 'BSCS',                    // 'BA', 'BS', 'BSCS', 'BSME', 'BArch', 'BMus', 'Minor', ...
  kind: 'major',                     // 'major' | 'minor' | 'certificate'
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/...',    // source page
  hours: 68,                         // minimum credit hours for the program (lower bound if a range)
  notes: [                           // footnotes and rules the engine cannot model; shown to users
    'At most 1 elective may be a research or independent study course.',
  ],
  requirements: [ /* Requirement nodes; ALL must be satisfied */ ],
};
```

## Requirement nodes

| type     | fields                                   | meaning |
|----------|------------------------------------------|---------|
| `course` | `name?`, `options: CourseSpec[]`, `note?` | One slot. Any one of `options` fills it. Use for a required course and its alternatives (`MATH 101` or `MATH 105`). |
| `all`    | `name`, `items: Slot[]`, `note?`         | Every slot must be filled. A `Slot` is a `CourseSpec` or an array of `CourseSpec` (alternatives for that one slot). |
| `choose` | `name`, `count: N`, `from: CourseSpec[]`, `note?` | `N` distinct courses, each matching at least one spec in `from`. |
| `hours`  | `name`, `hours: H`, `from: CourseSpec[]`, `note?` | Enough matching courses to total `H` credit hours. |
| `any`    | `name`, `options: Requirement[]`         | Exactly one of the sub-requirements must be satisfied (alternative tracks / concentrations). The engine keeps whichever option is closest. |
| `group`  | `name`, `requirements: Requirement[]`, `note?` | A labelled section; all sub-requirements must be satisfied. |

### Sub-quotas and exclusions on `choose` / `hours`

* `atLeast: [{ count: 2, from: [{ dept: 'CMOR' }], label: 'CMOR elective' }]` — of the courses chosen, at least
  `count` must also match `from` ("at least 2 must be CMOR courses", "at least 2 at the 400 level"). Several quotas
  may overlap; each is filled only to its deficit. No single quota may exceed the node's `count`. `label` names
  the empty slot in the audit (defaults to a description of `from`).
* `exclusive: [['COMP 441', 'CMOR 438', 'ELEC 478']]` — at most one course from each inner list may count toward
  this node ("only one machine-learning course may count").

Prefer these over a note whenever the catalog states such a rule; the audit is wrong otherwise.

Rules of thumb:

* Use `all` for "Complete the following" lists. Use `course` when a section is one course.
* Use `choose` for "Select N from the following". Use `hours` only when the catalog counts credit hours rather than courses ("Select 9 credit hours from ...").
* "Select 1 from the following" lists inside a `choose`/`all` are fine as a nested `choose` with `count: 1` inside a `group`.
* Cross-listed courses (`STAT 310 / ECON 307`) are handled globally by the school's crosslist map; list only the first code. Listing both as alternatives in one slot is also fine.
* A course may satisfy only one slot within a program. Order requirements so specific courses come before broad patterns (the engine also prefers to spend courses that no other slot names).
* Anything you cannot express (GPA minimums, residency, approval-required substitutions, "max 3 hours of research") goes in `notes`. Keep the notes short and useful.

## CourseSpec

* `'COMP 140'` — an exact course. Format: `DEPT NNN` with one space, upper-case, optional trailing letter (`'HUMA 101A'`).
* `{ dept: 'COMP', min: 300, max: 499 }` — any course in the department(s) in the number range. `dept` may be an array. `min`/`max` optional. `exclude: ['COMP 490']` removes specific codes. `label` overrides the display text.
* `{ dept: '*' , min: 300 }` — any department.

## Example

```js
export default {
  id: 'mathematics-minor',
  name: 'Mathematics',
  degree: 'Minor',
  kind: 'minor',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/mathematics/mathematics-minor/',
  hours: 18,
  notes: [
    'All 6 courses must be MATH courses at the 200 level or above; at least 4 must be at the 300 level or above.',
    'At most 3 credit hours of MATH 479 or MATH 490-499 may count toward the electives.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Analysis', count: 1, from: ['MATH 302', 'MATH 321', 'MATH 331', 'MATH 381', 'MATH 382'] },
      { type: 'choose', name: 'Discrete Mathematics and Algebra', count: 1, from: ['MATH 306', 'MATH 356', 'MATH 365', 'MATH 368'] },
      { type: 'choose', name: 'Linear Algebra', count: 1, from: ['MATH 221', 'MATH 354', 'MATH 355'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [{ dept: 'MATH', min: 200 }],
      note: 'Additional MATH courses at the 200 level or above.' },
  ],
};
```

## Registering a program

Add the module to `js/schools/<school>/programs/index.js`. Add a new school by
creating `js/schools/<school>/index.js` (see `js/schools/rice/index.js`) and
listing it in `js/schools/index.js`.
