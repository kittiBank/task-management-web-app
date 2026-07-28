import { useState } from "react";

const initialFormState = {
  title: "",
  description: "",
};

// Task form component
export function TaskForm({ onSubmit }) {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const wasCreated = await onSubmit(form);

    if (wasCreated) {
      setForm(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Create a new task
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Add a task to the board and start tracking progress instantly.
        </p>
      </div>

      {/* Task form fields */}
      <div className="space-y-4">
        {/* Title field */}
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Title
          </span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        {/* Description field */}
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </span>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            placeholder="Add a short note for the task..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          />
        </label>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Create task
      </button>
    </form>
  );
}
