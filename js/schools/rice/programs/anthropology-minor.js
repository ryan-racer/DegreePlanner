export default {
  id: 'anthropology-minor',
  name: 'Anthropology',
  degree: 'Minor',
  kind: 'minor',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/anthropology/anthropology-minor/',
  hours: 18,
  notes: [
    'At least 3 of the 4 elective courses (9 credit hours) must be at the 300 level or above.',
  ],
  requirements: [
    { type: 'choose', name: 'Core Requirements', count: 2, from: ['ANTH 201', 'ANTH 203', 'ANTH 205'] },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Upper-Level Electives', count: 3, from: [{ dept: 'ANTH', min: 300 }],
        note: 'Departmental (ANTH) courses at the 300 level or above.' },
      { type: 'choose', name: 'Additional Elective', count: 1, from: [{ dept: 'ANTH' }],
        note: 'Any departmental (ANTH) course.' },
    ]},
  ],
};
