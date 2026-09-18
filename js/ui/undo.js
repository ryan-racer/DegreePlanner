// One-step undo for destructive actions, offered in a toast.
import { state, save, renderAll, $ } from '../core.js';
import { esc } from './render.js';

const UNDO_KEYS = ['courses', 'declared', 'plan', 'schedule', 'overrides', 'scheduleHidden'];
let undoTimer, undoSnapshot = null;
/** Forget the pending snapshot (used when a new snapshot is about to be taken for a follow-up change). */
export function clearUndo() { undoSnapshot = null; }
/** Run a destructive change with a one-step undo offered in a toast. */
export function undoable(label, fn) {
  undoSnapshot = JSON.stringify(Object.fromEntries(UNDO_KEYS.map((k) => [k, state[k]])));
  fn();
  let toast = $('#undo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'undo-toast';
    toast.setAttribute('role', 'status');
    toast.className = 'fixed bottom-4 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-3 rounded-lg bg-zinc-900 px-3.5 py-2 text-sm text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900';
    document.body.appendChild(toast);
    toast.addEventListener('click', (e) => {
      if (!e.target.closest('[data-undo]') || !undoSnapshot) return;
      Object.assign(state, JSON.parse(undoSnapshot)); undoSnapshot = null;
      state.expanded = new Set([...state.expanded, ...state.declared]);
      toast.classList.add('hidden'); toast.classList.remove('flex');
      save(); renderAll();
    });
  }
  toast.innerHTML = `<span>${esc(label)}</span><button type="button" data-undo class="font-semibold underline underline-offset-2">Undo</button>`;
  toast.classList.remove('hidden'); toast.classList.add('flex');
  clearTimeout(undoTimer);
  undoTimer = setTimeout(() => { toast.classList.add('hidden'); toast.classList.remove('flex'); }, 9000);
}
