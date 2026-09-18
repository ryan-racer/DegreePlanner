export default {
  id: 'biochemistry-cell-biology-minor',
  name: 'Biochemistry and Cell Biology',
  degree: 'Minor',
  kind: 'minor',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/biosciences/biochemistry-cell-biology-minor/',
  hours: 41,
  notes: [
    'MATH 111 and MATH 112 may be substituted for MATH 101/105.',
    'Credit for PHYS 141 or PHYS 142 is not eligible for the minor.',
    'BIOS 212 may not be substituted for BIOS 211.',
    'Lecture electives must be catalog course type "lecture" (not "lecture/laboratory"). CHEM 313 must be taken with CHEM 314 (or CHEM 320 alone).',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'any', name: 'General Physics I', options: [
        { type: 'course', name: 'PHYS 125 or PHYS 111', options: ['PHYS 125', 'PHYS 111'] },
        { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
      ]},
      { type: 'all', name: 'General Chemistry', items: [['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114']] },
      { type: 'any', name: 'Organic Chemistry I', options: [
        { type: 'all', name: 'CHEM 211 and CHEM 213', items: ['CHEM 211', 'CHEM 213'] },
        { type: 'course', name: 'CHEM 219', options: ['CHEM 219'] },
      ]},
      { type: 'all', name: 'Biosciences Courses', items: [['BIOS 201', 'BIOS 101'], 'BIOS 301', 'BIOS 341'] },
    ]},
    { type: 'course', name: 'Lab Course Requirement', options: ['BIOS 211'] },
    { type: 'choose', name: 'Lecture Course Electives', count: 3, from: [
      'BIOS 300', 'BIOS 302', 'BIOS 334', 'BIOS 340', 'BIOS 344', 'BIOS 352', 'BIOS 353', 'BIOS 363', 'BIOS 368', 'BIOS 372',
      'BIOS 385', 'BIOS 390', 'BIOS 405', 'BIOS 410', 'BIOS 420', 'BIOS 424', 'BIOS 425', 'BIOS 441', 'BIOS 443', 'BIOS 444',
      'BIOS 447', 'BIOS 450', 'BIOS 460', 'BIOS 470', 'BIOS 481', 'BIOS 482', 'CHEM 313', 'CHEM 320', 'PHYS 126', 'PHYS 112',
    ]},
  ],
};
