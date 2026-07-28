import { Modal } from "./Modal.jsx";

export function ConfirmDialog({ taskTitle, onCancel, onConfirm }) {
  return (
    <Modal
      title="Delete task?"
      description="This action will remove the task from the board."
      onClose={onCancel}
    >
      <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        <span className="font-semibold">{taskTitle}</span> will be deleted
        permanently.
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Confirm delete
        </button>
      </div>
    </Modal>
  );
}
