import { useState } from "react";
import { formatThaiDateTime } from "../../utils/format-thai-datetime.js";
import { StatusBadge } from "./StatusBadge.jsx";

export function TaskCard({ task, onDelete }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/task-id", task.id);
    event.dataTransfer.setData("text/task-status", task.status);
    event.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`cursor-grab rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 transition active:cursor-grabbing ${
        isDragging ? "scale-[0.98] opacity-50 ring-2 ring-slate-300" : ""
      }`}
    >
      {/* Task card header */}
      <div className="flex items-start justify-between gap-4">
        <StatusBadge status={task.status} />
        <span className="max-w-[11rem] text-right text-xs font-medium leading-5 text-slate-400">
          {formatThaiDateTime(task.created_at)}
        </span>
      </div>

      {/* Task card content */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-slate-950">{task.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {task.description || "No description provided for this task yet."}
        </p>
      </div>

      {/* Task card footer */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => onDelete(task)}
          onMouseDown={(event) => event.stopPropagation()}
          className="w-full rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
        >
          Delete task
        </button>
      </div>
    </article>
  );
}
