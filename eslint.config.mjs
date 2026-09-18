// Catches undefined identifiers and dead imports. Run with `npm run lint`.
const browser = Object.fromEntries(['window', 'document', 'localStorage', 'sessionStorage', 'navigator', 'location', 'history', 'fetch', 'console', 'setTimeout', 'clearTimeout', 'URL', 'Blob', 'File', 'Event', 'CustomEvent', 'DataTransfer', 'DragEvent', 'MouseEvent', 'KeyboardEvent', 'matchMedia', 'innerWidth', 'innerHeight', 'caches', 'self', 'Response', 'process', 'performance'].map((g) => [g, 'readonly']));
export default [
  { ignores: ['node_modules/**', 'js/schools/*/programs.bundle.js', 'js/schools/*/variants.bundle.js', 'js/schools/*/catalog.js', 'js/schools/*/crosslist.js', 'js/schools/*/catalog-years.js', 'css/**', 'data/**'] },
  { files: ['**/*.js', '**/*.mjs'], languageOptions: { ecmaVersion: 2024, sourceType: 'module', globals: browser }, rules: { 'no-undef': 'error', 'no-unused-vars': ['warn', { args: 'none' }] } },
];
