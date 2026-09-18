export default {
  id: 'anthropology-ba',
  name: 'Anthropology',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/anthropology/anthropology-ba/',
  hours: 30,
  notes: [
    'ANTH 362 may be repeated up to three times, but only two count toward the major (one as the Method course, one as an elective).',
    'Up to 2 courses (6 credit hours) of relevant coursework outside the department may be applied to the electives by petition.',
    'Courses taken for the Research Sequence (Capstone or Honors) may also be applied toward the Elective Requirements.',
    'Two optional areas of specialization (Anthropological Archaeology, Social-Cultural Anthropology) guide elective selection; consult the department.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Introductory Courses', count: 2, from: ['ANTH 201', 'ANTH 203', 'ANTH 205'] },
      { type: 'choose', name: 'Method Course', count: 1, from: ['ANTH 315', 'ANTH 362', 'ANTH 398'] },
      { type: 'course', name: 'Theory Course', options: ['ANTH 302', 'ANTH 460'] },
    ]},
    { type: 'any', name: 'Research Sequence: Capstone or Honors', options: [
      { type: 'all', name: 'Capstone', items: ['ANTH 493', 'ANTH 495'] },
      { type: 'all', name: 'Honors', items: ['ANTH 490', 'ANTH 491', 'ANTH 493'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Upper-Level Electives', count: 4, from: [{ dept: 'ANTH', min: 300 }],
        note: 'Departmental (ANTH) courses at the 300 level or above.' },
      { type: 'choose', name: 'Electives at Any Level', count: 2, from: [{ dept: 'ANTH' }],
        note: 'Departmental (ANTH) courses at any level.' },
    ]},
  ],
};
