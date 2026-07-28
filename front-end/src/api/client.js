import axios from "axios";

// Shared Axios instance for all backend API requests
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Read error message from API response body
export function getApiErrorMessage(error, fallback = "Something went wrong") {
  return error?.response?.data?.message || error?.message || fallback;
}
