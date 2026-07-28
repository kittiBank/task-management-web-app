import { TaskCard } from "./TaskCard.jsx";

export function KanbanColumn({
  title,
  description,
  accentClassName,
  tasks,
  onStatusChange,
  onDelete,
}) {
  return (
    <section className="flex min-h-[calc(100vh-12rem)] flex-col rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-lg shadow-slate-200/60 backdrop-blur sm:p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${accentClassName}`}></span>
            <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
          </div>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>

        <div className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-slate-900 px-3 text-sm font-semibold text-white">
          {tasks.length}
        </div>
      </div>

      {/* Tasks list */}
      <div className="flex-1 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="flex h-full min-h-48 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 px-6 text-center">
            <p className="text-sm leading-6 text-slate-500">
              No tasks in this lane yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
