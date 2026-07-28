import { create } from "zustand";
import * as tasksApi from "../api/tasks.api.js";
import { getApiErrorMessage } from "../api/client.js";
import { TASK_STATUS } from "../constants/task-status.js";

const normalizeTaskInput = ({ title, description }) => ({
  title: title.trim(),
  description: description.trim() || undefined,
});

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  // Call API: GET /tasks — load board data into store
  fetchTasks: async () => {
    set({ isLoading: true, error: null });

    try {
      const tasks = await tasksApi.fetchTasks();
      set({ tasks, isLoading: false });
      return { ok: true, tasks };
    } catch (error) {
      const message = getApiErrorMessage(error, "Failed to load tasks");
      set({ isLoading: false, error: message });
      return { ok: false, message };
    }
  },

  // Call API: POST /tasks — create task then prepend to local state
  createTask: async (input) => {
    const taskInput = normalizeTaskInput(input);

    if (!taskInput.title) {
      return {
        ok: false,
        message: "Please add a title before creating a task.",
      };
    }

    try {
      const task = await tasksApi.createTask({
        ...taskInput,
        status: TASK_STATUS.TODO,
      });

      set((state) => ({
        tasks: [task, ...state.tasks],
      }));

      return { ok: true, task };
    } catch (error) {
      return {
        ok: false,
        message: getApiErrorMessage(error, "Failed to create task"),
      };
    }
  },

  // Call API: PUT /tasks/:id — update status after drag-and-drop
  updateTaskStatus: async (taskId, status) => {
    const previousTasks = get().tasks;

    // Optimistic UI update before API responds
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      ),
    }));

    try {
      const task = await tasksApi.updateTask(taskId, { status });

      set((state) => ({
        tasks: state.tasks.map((item) => (item.id === taskId ? task : item)),
      }));

      return { ok: true, task };
    } catch (error) {
      // Roll back local state if API update fails
      set({ tasks: previousTasks });
      return {
        ok: false,
        message: getApiErrorMessage(error, "Failed to update task status"),
      };
    }
  },

  // Call API: DELETE /tasks/:id — remove task from board after soft-delete
  deleteTask: async (taskId) => {
    try {
      await tasksApi.deleteTask(taskId);

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));

      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: getApiErrorMessage(error, "Failed to delete task"),
      };
    }
  },
}));
