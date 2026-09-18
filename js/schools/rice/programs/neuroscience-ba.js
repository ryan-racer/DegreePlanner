export default {
  id: 'neuroscience-ba',
  name: 'Neuroscience',
  degree: 'BA',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/neuroscience/neuroscience-ba/',
  hours: 62,
  notes: [
    'MATH 111 and MATH 112 may substitute for MATH 101/105. Credit for PHYS 141/142 is not eligible.',
    'NEUR 310 must be taken for at least 3 credit hours; it may count once as a lab course and once as an elective.',
    'ELEC 435, PSYC 366, or PSYC 487 may instead count as an elective on request, but not both.',
    'BIOS 128 must be taken for 3 semesters (3 hours) to count as an elective. PSYC 480 counts only when the topic is neuroscience-related.',
    'Electives must total at least 12 credit hours.',
  ],
  requirements: [
    { type: 'group', name: 'Foundation Courses', requirements: [
      { type: 'course', name: 'Introductory Biology I', options: ['BIOS 201', 'BIOS 101'] },
      { type: 'all', name: 'General Chemistry', items: [['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114']] },
      { type: 'course', name: 'Programming', options: ['CMOR 220', 'COMP 140'] },
      { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'any', name: 'General Physics I', options: [
        { type: 'course', name: 'PHYS 125 or PHYS 111', options: ['PHYS 125', 'PHYS 111'] },
        { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
      ]},
      { type: 'any', name: 'General Physics II', options: [
        { type: 'course', name: 'PHYS 126 or PHYS 112', options: ['PHYS 126', 'PHYS 112'] },
        { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
      ]},
      { type: 'course', name: 'Cognitive Psychology', options: ['PSYC 203'] },
      { type: 'choose', name: 'Statistics', count: 1, from: ['STAT 305', 'STAT 310', 'STAT 315'] },
    ]},
    { type: 'all', name: 'Core Requirements', items: ['BIOS 385', ['NEUR 362', 'PSYC 362'], ['NEUR 380', 'PSYC 380'], ['NEUR 383', 'BIOE 380', 'ELEC 380']] },
    { type: 'group', name: 'Project-Based Laboratory Courses', requirements: [
      { type: 'course', name: 'Intermediate Neuroscience Lab', options: ['BIOS 212'] },
      { type: 'choose', name: 'Laboratory Courses', count: 2, from: ['BIOS 315', 'BIOS 324', 'ELEC 435', 'NEUR 310', 'PSYC 366', 'PSYC 487'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 4, from: [
      'BIOE 422', 'BIOE 492', 'BIOS 128', 'BIOS 321', 'BIOS 442', 'BIOS 443', 'BIOS 449', 'COMP 440', 'CSCI 340', 'ELEC 384',
      'ELEC 475', 'KINE 419', 'NEUR 310', 'NEUR 411', 'NEUR 415', 'NEUR 416', 'NEUR 441', 'PHIL 130', 'PHIL 155', 'PHIL 230',
      'PHIL 231', 'PHIL 330', 'PHIL 345', 'PHIL 431', 'PSYC 308', 'PSYC 310', 'PSYC 311', 'PSYC 354', 'PSYC 375', 'PSYC 430',
      'PSYC 432', 'PSYC 480',
    ]},
  ],
};
