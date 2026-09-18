export default {
  id: 'psychology-ba',
  name: 'Psychology',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/psychological-sciences/psychology-ba/',
  hours: 47,
  notes: [
    'No substitutions or transfer credit for PSYC 339, SOSC 302, or PSYC 340; complete them preferably by the end of sophomore year.',
    'Up to 12 credit hours combined of PSYC 485 and/or PSYC 488 may count toward the major, with at most 3 credit hours from PSYC 488.',
    'Once enrolled at Rice, departmental approval is required to transfer courses from another institution.',
  ],
  requirements: [
    { type: 'all', name: 'Core Requirements', items: [
      ['PSYC 101', 'PSYC 100'], 'PSYC 202', 'PSYC 203', ['PSYC 339', 'SOSC 302'], 'PSYC 340',
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 10, from: [{ dept: 'PSYC' }],
      note: '10 additional departmental (PSYC) courses.' },
  ],
};
