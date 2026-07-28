import { TASK_STATUS_META } from '../../constants/task-status.js'

export function StatusBadge({ status }) {
  const meta = TASK_STATUS_META[status]

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${meta.badgeClassName}`}
    >
      {meta.label}
    </span>
  )
}
