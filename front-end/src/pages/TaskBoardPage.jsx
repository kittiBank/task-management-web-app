import { useEffect, useState } from "react";
import { TASK_STATUS } from "../constants/task-status.js";
import { useTaskStore } from "../store/use-task-store.js";
import { Navbar } from "../components/layout/Navbar.jsx";
import { KanbanColumn } from "../components/tasks/KanbanColumn.jsx";
import { TaskForm } from "../components/tasks/TaskForm.jsx";
import { ConfirmDialog } from "../components/ui/ConfirmDialog.jsx";
import { Modal } from "../components/ui/Modal.jsx";
import { ToastViewport } from "../components/ui/ToastViewport.jsx";

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

export function TaskBoardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const isLoading = useTaskStore((state) => state.isLoading);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const createTask = useTaskStore((state) => state.createTask);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Push a new toast notification to the UI
  const pushToast = ({ type, title, message }) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, type, title, message }]);
    return id;
  };

  const dismissToast = (toastId) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  };

  // Call API on page load: GET /tasks via store.fetchTasks()
  useEffect(() => {
    const loadTasks = async () => {
      const result = await fetchTasks();

      if (!result.ok) {
        pushToast({
          type: "error",
          title: "Failed to load tasks",
          message: result.message,
        });
      }
    };

    void loadTasks();
  }, [fetchTasks]);

  // Call API: POST /tasks via store.createTask()
  const handleCreateTask = async (form) => {
    const result = await createTask(form);

    if (!result.ok) {
      pushToast({
        type: "error",
        title: "Task creation failed",
        message: result.message,
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

  // Call API: PUT /tasks/:id via store.updateTaskStatus() when card is dropped
  const handleStatusChange = async (taskId, status) => {
    const result = await updateTaskStatus(taskId, status);

    if (!result.ok) {
      pushToast({
        type: "error",
        title: "Update failed",
        message: result.message,
      });
      return;
    }

    pushToast({
      type: "info",
      title: "Task updated",
      message: "The task status has been updated on the board.",
    });
  };

  // Call API: DELETE /tasks/:id via store.deleteTask() after confirm dialog
  const handleConfirmDelete = async () => {
    if (!taskPendingDelete) {
      return;
    }

    const result = await deleteTask(taskPendingDelete.id);

    if (!result.ok) {
      pushToast({
        type: "error",
        title: "Delete failed",
        message: result.message,
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
        {isLoading ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 px-6 py-16 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-600">
              Loading tasks...
            </p>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-3">
            {tasksByStatus.map((column) => (
              <KanbanColumn
                key={column.status}
                title={column.title}
                description={column.description}
                status={column.status}
                accentClassName={column.accentClassName}
                tasks={column.tasks}
                onStatusChange={handleStatusChange}
                onDelete={setTaskPendingDelete}
              />
            ))}
          </div>
        )}
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
