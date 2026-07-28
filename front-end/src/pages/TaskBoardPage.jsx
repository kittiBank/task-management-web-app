import { useState } from "react";
import { TASK_STATUS } from "../constants/task-status.js";
import { useTaskStore } from "../store/use-task-store.js";
import { Navbar } from "../components/layout/Navbar.jsx";
import { KanbanColumn } from "../components/tasks/KanbanColumn.jsx";
import { TaskForm } from "../components/tasks/TaskForm.jsx";
import { ConfirmDialog } from "../components/ui/ConfirmDialog.jsx";
import { Modal } from "../components/ui/Modal.jsx";
import { ToastViewport } from "../components/ui/ToastViewport.jsx";

// Board columns data
const boardColumns = [
  {
    title: "To-do",
    status: TASK_STATUS.TODO,
    accentClassName: "bg-slate-900",
    description: "Ideas and next tasks waiting to be picked up.",
  },
  {
    title: "Doing",
    status: TASK_STATUS.DOING,
    accentClassName: "bg-amber-500",
    description: "Work currently in progress by the team.",
  },
  {
    title: "Done",
    status: TASK_STATUS.DONE,
    accentClassName: "bg-emerald-500",
    description: "Completed work ready for review or handoff.",
  },
];

// State management
export function TaskBoardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const createTask = useTaskStore((state) => state.createTask);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);
  const [toasts, setToasts] = useState([]);

  const pushToast = ({ type, title, message }) => {
    const id = crypto.randomUUID();

    setToasts((current) => [...current, { id, type, title, message }]);

    return id;
  };

  const dismissToast = (toastId) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  };

  const handleCreateTask = (form) => {
    const wasCreated = createTask(form);

    if (!wasCreated) {
      pushToast({
        type: "error",
        title: "Task creation failed",
        message: "Please add a title before creating a task.",
      });
      return false;
    }

    pushToast({
      type: "success",
      title: "Task created",
      message: "The new task has been added to the To-do lane.",
    });
    setIsCreateModalOpen(false);
    return true;
  };

  // Handle status change
  const handleStatusChange = (taskId, status) => {
    const wasUpdated = updateTaskStatus(taskId, status);

    if (!wasUpdated) {
      pushToast({
        type: "error",
        title: "Update failed",
        message: "The task could not be moved. Please try again.",
      });
      return;
    }

    pushToast({
      type: "info",
      title: "Task updated",
      message: "The task status has been updated on the board.",
    });
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (!taskPendingDelete) {
      return;
    }

    const wasDeleted = deleteTask(taskPendingDelete.id);

    if (!wasDeleted) {
      pushToast({
        type: "error",
        title: "Delete failed",
        message: "The task could not be deleted. Please try again.",
      });
      setTaskPendingDelete(null);
      return;
    }

    pushToast({
      type: "delete",
      title: "Task deleted",
      message: "The selected task has been removed from the board.",
    });
    setTaskPendingDelete(null);
  };

  // Get tasks by status
  const tasksByStatus = boardColumns.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.status === column.status),
  }));

  return (
    <div className="min-h-screen">
      <Navbar
        taskCount={tasks.length}
        onCreateTask={() => setIsCreateModalOpen(true)}
      />

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 xl:grid-cols-3">
          {tasksByStatus.map((column) => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              description={column.description}
              accentClassName={column.accentClassName}
              tasks={column.tasks}
              onStatusChange={handleStatusChange}
              onDelete={setTaskPendingDelete}
            />
          ))}
        </div>
      </main>

      <ToastViewport toasts={toasts} onDismiss={dismissToast} />

      {isCreateModalOpen ? (
        <Modal
          title="Create task"
          description="Add a new card directly into your To-do lane."
          onClose={() => setIsCreateModalOpen(false)}
        >
          <TaskForm onSubmit={handleCreateTask} />
        </Modal>
      ) : null}

      {taskPendingDelete ? (
        <ConfirmDialog
          taskTitle={taskPendingDelete.title}
          onCancel={() => setTaskPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      ) : null}
    </div>
  );
}
