import programs from './programs/index.js';
import crosslist from './crosslist.js';
import catalog from './catalog.js';
import sample from './sample.js';
import scheduleTerms from './schedule.js';

export default {
  id: 'rice',
  name: 'Rice University',
  shortName: 'Rice',
  catalogYear: '2026–2027',
  catalogUrl: 'https://ga.rice.edu/',
  defaultHours: 3,
  // Hints for the transcript parser (see js/parser/transcript.js for defaults).
  transcript: {
    inProgress: /\b(COURSES?\s+IN\s+PROGRESS|IN[- ]PROGRESS)\b/i,
    transfer: /\b(TRANSFER\s+CREDIT|ADVANCED\s+PLACEMENT|AP\s+CREDIT|TEST\s+CREDIT)\b/i,
    institution: /\b(INSTITUTION\s+CREDIT)\b/i,
    ignore: /^TRAN \d/, // unarticulated transfer credit placeholders
  },
  sample,
  // Per-department course details (descriptions, prerequisites, offerings), fetched lazily by js/ui/coursecard.js.
  courseDataPath: 'data/rice/courses/',
  scheduleTerms,
  programs,
  crosslist,
  catalog,
};
