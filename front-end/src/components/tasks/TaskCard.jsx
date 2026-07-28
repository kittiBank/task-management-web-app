import { TASK_STATUS_META } from '../../constants/task-status.js'
import { formatThaiDateTime } from '../../utils/format-thai-datetime.js'
import { StatusBadge } from './StatusBadge.jsx'

export function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    // Task card
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between gap-4">
        <StatusBadge status={task.status} />
        <span className="max-w-[11rem] text-right text-xs font-medium leading-5 text-slate-400">
          {formatThaiDateTime(task.createdAt)}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-slate-950">{task.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {task.description || "No description provided for this task yet."}
        </p>
      </div>

      {/* Task actions */}
      <div className="mt-5 flex flex-col gap-3">
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
        >
          {Object.entries(TASK_STATUS_META).map(([value, meta]) => (
            <option key={value} value={value}>
              Move to {meta.label}
            </option>
          ))}
        </select>

        {/* Delete task button */}
        <button
          type="button"
          onClick={() => onDelete(task)}
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
        >
          Delete task
        </button>
      </div>
    </article>
  );
}
