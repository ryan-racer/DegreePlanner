export default {
  id: 'molecular-cellular-neuroscience-bs',
  name: 'Neuroscience (Molecular and Cellular Neuroscience Concentration)',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/neuroscience/molecular-cellular-neuroscience-bs/',
  hours: 73,
  notes: [
    'MATH 111 and MATH 112 may substitute for MATH 101/105. Credit for PHYS 141/142 is not eligible.',
    'NEUR 310 must be taken for 3 or 4 credit hours; it may count twice (once as core lab, once as an elective).',
    'ELEC 435, PSYC 366, or PSYC 487 may instead count as an elective on request, but not both.',
    'BIOS 128 must be taken at least 3 times (3 hours) to count as an elective. Not all PSYC 480 sections qualify.',
    'The capstone course is in addition to the 2 electives; no course may satisfy more than one requirement.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Non-Neuroscience Courses', requirements: [
        { type: 'course', name: 'Introductory Biology I', options: ['BIOS 201', 'BIOS 101'] },
        { type: 'course', name: 'General Chemistry I', options: ['CHEM 121', 'CHEM 111'] },
        { type: 'course', name: 'General Chemistry Lab I', options: ['CHEM 123', 'CHEM 113'] },
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
      ]},
      { type: 'course', name: 'Core Programming Experience Course', options: ['CMOR 220', 'COMP 140'] },
      { type: 'choose', name: 'Core Statistics Course', count: 1, from: ['STAT 305', 'STAT 310', 'STAT 315'] },
      { type: 'all', name: 'Core Neuroscience Lecture Courses', items: ['BIOS 385', ['NEUR 362', 'PSYC 362'], 'NEUR 380', ['NEUR 383', 'BIOE 380', 'ELEC 380']] },
      { type: 'all', name: 'Core Neuroscience Laboratory Courses', items: ['BIOS 212', 'NEUR 310'] },
      { type: 'choose', name: 'Core Laboratory Elective', count: 1, from: ['BIOS 315', 'BIOS 324', 'ELEC 435', 'PSYC 366', 'PSYC 487'] },
    ]},
    { type: 'group', name: 'Major Concentration in Molecular and Cellular Neuroscience', requirements: [
      { type: 'all', name: 'Lecture Courses', items: ['BIOS 301', 'BIOS 341', 'BIOS 344', ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114']] },
      { type: 'any', name: 'Organic Chemistry I', options: [
        { type: 'all', name: 'CHEM 211 and CHEM 213', items: ['CHEM 211', 'CHEM 213'] },
        { type: 'course', name: 'CHEM 219', options: ['CHEM 219'] },
      ]},
      { type: 'choose', name: 'Capstone Requirement', count: 1, from: ['BIOS 442', 'BIOS 443', 'BIOS 449'] },
      { type: 'choose', name: 'Elective Requirements', count: 2, from: [
        'BIOE 422', 'BIOE 492', 'BIOS 128', 'BIOS 302', 'BIOS 321', 'BIOS 441', 'BIOS 442', 'BIOS 443', 'BIOS 449', 'BIOS 481',
        'COMP 440', 'CSCI 340', 'ELEC 384', 'KINE 419', 'NEUR 310', 'NEUR 415', 'NEUR 416', 'PHIL 130', 'PHIL 155', 'PHIL 230',
        'PHIL 231', 'PHIL 431', 'PSYC 308', 'PSYC 310', 'PSYC 311', 'PSYC 354', 'PSYC 375', 'PSYC 430', 'PSYC 480',
      ]},
    ]},
  ],
};
