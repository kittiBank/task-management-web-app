export const TASK_STATUS = {
  TODO: "To Do",
  DOING: "In Progress",
  DONE: "Done",
};

export const TASK_STATUS_META = {
  [TASK_STATUS.TODO]: {
    label: "To-do",
    badgeClassName: "bg-slate-100 text-slate-700 ring-slate-200",
  },
  [TASK_STATUS.DOING]: {
    label: "Doing",
    badgeClassName: "bg-amber-100 text-amber-700 ring-amber-200",
  },
  [TASK_STATUS.DONE]: {
    label: "Done",
    badgeClassName: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  },
};
