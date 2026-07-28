export function Navbar({ taskCount, onCreateTask }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-300 bg-slate-200 shadow-md shadow-slate-300/50">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Task Management
          </h1>
          <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
            Manage your tasks with a clean kanban board.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-right sm:block">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Total tasks
            </p>
            <p className="text-lg font-semibold text-slate-900">{taskCount}</p>
          </div>

          <button
            type="button"
            onClick={onCreateTask}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Create task
          </button>
        </div>
      </div>
    </header>
  );
}
