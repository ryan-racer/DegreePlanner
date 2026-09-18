export default {
  id: 'ecology-evolutionary-biology-minor',
  name: 'Ecology and Evolutionary Biology',
  degree: 'Minor',
  kind: 'minor',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/biosciences/ecology-evolutionary-biology-minor/',
  hours: 20,
  requirements: [
    { type: 'all', name: 'Core Requirements', items: [['BIOS 201', 'BIOS 101'], ['BIOS 202', 'BIOS 102'], 'BIOS 213'] },
    { type: 'choose', name: 'Elective Requirements', count: 4, from: [
      'BIOS 321', 'BIOS 326', 'BIOS 329', 'BIOS 332', 'BIOS 334', 'BIOS 336', 'BIOS 340', 'BIOS 363', 'BIOS 374', 'BIOS 391', 'BIOS 423', 'BIOS 431',
    ]},
  ],
};
