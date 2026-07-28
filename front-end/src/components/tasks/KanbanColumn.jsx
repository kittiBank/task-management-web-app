import { useState } from "react";
import { TaskCard } from "./TaskCard.jsx";

export function KanbanColumn({
  title,
  description,
  status,
  accentClassName,
  tasks,
  onStatusChange,
  onDelete,
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const taskId = event.dataTransfer.getData("text/task-id");
    const currentStatus = event.dataTransfer.getData("text/task-status");

    if (!taskId || currentStatus === status) {
      return;
    }

    onStatusChange(taskId, status);
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex min-h-[calc(100vh-12rem)] flex-col rounded-[2rem] border p-4 shadow-lg shadow-slate-200/60 backdrop-blur transition sm:p-5 ${
        isDragOver
          ? "border-slate-400 bg-slate-100/90 ring-2 ring-slate-300"
          : "border-white/70 bg-white/65"
      }`}
    >
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

      <div className="flex-1 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} />
          ))
        ) : (
          <div
            className={`rounded-3xl border border-dashed px-6 py-5 text-left ${
              isDragOver
                ? "border-slate-400 bg-white"
                : "border-slate-300 bg-slate-50/70"
            }`}
          >
            <p className="text-sm leading-6 text-slate-500">
              {isDragOver ? "Drop task here" : "No tasks in this lane yet."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
