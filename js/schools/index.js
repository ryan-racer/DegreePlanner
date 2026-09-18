// Registry of supported schools. Add a school by creating js/schools/<id>/index.js and listing it here.
import rice from './rice/index.js';

export const schools = [rice];
export function getSchool(id) { return schools.find((s) => s.id === id) || schools[0]; }
