import { apiClient } from "./client.js";

// GET /tasks — list all tasks
export async function fetchTasks(status) {
  const response = await apiClient.get("/tasks", {
    params: status ? { status } : undefined,
  });

  return response.data.data.tasks;
}

// POST /tasks — create a new task
export async function createTask(payload) {
  const response = await apiClient.post("/tasks", payload);
  return response.data.data.task;
}

// PUT /tasks/:id — update a task (e.g. status)
export async function updateTask(taskId, payload) {
  const response = await apiClient.put(`/tasks/${taskId}`, payload);
  return response.data.data.task;
}

// DELETE /tasks/:id — soft-delete a task on the backend
export async function deleteTask(taskId) {
  const response = await apiClient.delete(`/tasks/${taskId}`);
  return response.data;
}
