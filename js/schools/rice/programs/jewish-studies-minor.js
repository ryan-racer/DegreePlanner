export default {
  id: 'jewish-studies-minor',
  name: 'Jewish Studies',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/jewish-studies/jewish-studies-minor/',
  hours: 18,
  notes: ['A course listed in more than one elective category may count toward only one category.'],
  requirements: [
    { type: 'choose', name: 'Core Requirement', count: 1, from: ['HIST 374', 'JWST 201', 'RELI 108', 'RELI 363'] },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Language and Literature', count: 1, from: [
        'GERM 352', 'HEBR 125', 'HEBR 126', 'HEBR 141', 'HEBR 142', 'JWST 201', 'JWST 318', 'JWST 351',
        'RELI 127', 'RELI 243', 'RELI 318', 'RELI 339', 'RELI 382', 'RELI 383', 'RELI 388',
      ]},
      { type: 'choose', name: 'History and Culture', count: 1, from: [
        'CLAS 285', 'FWIS 124', 'GERM 336', 'HART 435', 'HIST 205', 'HIST 316', 'HIST 324', 'HIST 357',
        'HIST 372', 'HIST 374', 'HIST 438', 'HIST 461', 'JWST 201', 'JWST 325', 'JWST 351', 'RELI 108',
        'RELI 122', 'RELI 203', 'RELI 215', 'RELI 383', 'RELI 392',
      ]},
      { type: 'choose', name: 'Thought, Philosophy, and Ethics', count: 1, from: [
        'CLAS 285', 'GERM 320', 'GERM 322', 'GERM 352', 'HART 435', 'JWST 401', 'RELI 120', 'RELI 122',
        'RELI 318', 'RELI 341', 'RELI 363',
      ]},
      { type: 'choose', name: 'Additional Electives', count: 2, from: [
        'GERM 352', 'HEBR 125', 'HEBR 126', 'HEBR 141', 'HEBR 142', 'JWST 201', 'JWST 318', 'JWST 351',
        'RELI 127', 'RELI 243', 'RELI 318', 'RELI 339', 'RELI 382', 'RELI 383', 'RELI 388', 'CLAS 285',
        'FWIS 124', 'GERM 336', 'HART 435', 'HIST 205', 'HIST 316', 'HIST 324', 'HIST 357', 'HIST 372',
        'HIST 374', 'HIST 438', 'HIST 461', 'JWST 325', 'RELI 108', 'RELI 122', 'RELI 203', 'RELI 215',
        'RELI 392', 'GERM 320', 'GERM 322', 'JWST 401', 'RELI 120', 'RELI 341', 'RELI 363',
      ]},
    ]},
  ],
};
