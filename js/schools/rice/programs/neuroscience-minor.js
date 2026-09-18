export default {
  id: 'neuroscience-minor',
  name: 'Neuroscience',
  degree: 'Minor',
  kind: 'minor',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/neuroscience/neuroscience-minor/',
  hours: 18,
  notes: [
    'At least 2 of the electives must be taken for the minor only (not double-counted with a major).',
    'No more than 3 credit hours of NEUR 310 may count toward the area of specialization; NEUR 310 may be taken twice (one instance as breadth).',
    'BIOS 128 must be taken for 3 semesters (3 hours) to count as an elective. BIOS 315 and BIOS 324 are 1-hour courses; electives must total 9 and 3 credit hours respectively.',
  ],
  requirements: [
    { type: 'course', name: 'Core Requirement', options: ['NEUR 380', 'PSYC 380'] },
    { type: 'any', name: 'Area of Specialization', options: [
      { type: 'group', name: 'Humanities and Social Sciences', requirements: [
        { type: 'course', name: 'Required Course', options: ['NEUR 362', 'PSYC 362'] },
        { type: 'choose', name: 'Humanities and Social Sciences Electives', count: 3, from: [
          'BIOS 128', 'CSCI 340', 'KINE 419', 'NEUR 411', 'PHIL 130', 'PHIL 230', 'PHIL 231', 'PHIL 330', 'PHIL 345', 'PHIL 431',
          'PSYC 308', 'PSYC 310', 'PSYC 311', 'PSYC 354', 'PSYC 366', 'PSYC 375', 'PSYC 432', 'PSYC 487',
        ]},
        { type: 'choose', name: 'Natural Sciences and Engineering Breadth', count: 1, from: [
          'BIOS 385', 'BIOS 315', 'BIOS 321', 'BIOS 324', 'BIOS 441', 'BIOS 442', 'BIOS 443', 'BIOS 449', 'BIOE 422', 'BIOE 492',
          'COMP 440', 'ELEC 384', 'ELEC 435', 'ELEC 475', 'NEUR 310', 'NEUR 383', 'NEUR 415', 'NEUR 416', 'PHIL 155', 'PSYC 430', 'PSYC 480',
        ]},
      ]},
      { type: 'group', name: 'Natural Sciences and Engineering', requirements: [
        { type: 'course', name: 'Required Course', options: ['BIOS 385'] },
        { type: 'choose', name: 'Natural Sciences and Engineering Electives', count: 3, from: [
          'BIOS 315', 'BIOS 321', 'BIOS 324', 'BIOS 441', 'BIOS 442', 'BIOS 443', 'BIOS 449', 'BIOE 422', 'BIOE 492',
          'COMP 440', 'ELEC 384', 'ELEC 435', 'ELEC 475', 'NEUR 310', 'NEUR 383', 'NEUR 415', 'NEUR 416', 'PHIL 155', 'PSYC 430', 'PSYC 480',
        ]},
        { type: 'choose', name: 'Humanities and Social Sciences Breadth', count: 1, from: [
          'NEUR 362', 'PSYC 362', 'BIOS 128', 'CSCI 340', 'KINE 419', 'NEUR 411', 'PHIL 130', 'PHIL 230', 'PHIL 231', 'PHIL 330', 'PHIL 345', 'PHIL 431',
          'PSYC 308', 'PSYC 310', 'PSYC 311', 'PSYC 354', 'PSYC 366', 'PSYC 375', 'PSYC 432', 'PSYC 487',
        ]},
      ]},
    ]},
  ],
};
