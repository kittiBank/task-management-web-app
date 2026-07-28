import { create } from "zustand";
import { mockTasks } from "../data/mock-tasks.js";
import { TASK_STATUS } from "../constants/task-status.js";

const normalizeTaskInput = ({ title, description }) => ({
  title: title.trim(),
  description: description.trim(),
});

export const useTaskStore = create((set, get) => ({
  tasks: mockTasks,
  createTask: (input) => {
    const task = normalizeTaskInput(input);

    if (!task.title) {
      return false;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description,
      status: TASK_STATUS.TODO,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      tasks: [newTask, ...state.tasks],
    }));

    return true;
  },
  updateTaskStatus: (taskId, status) => {
    const taskToUpdate = get().tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      return false;
    }

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      ),
    }));

    return true;
  },
  deleteTask: (taskId) => {
    const taskExists = get().tasks.some((task) => task.id === taskId);

    if (!taskExists) {
      return false;
    }

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));

    return true;
  },
}));
