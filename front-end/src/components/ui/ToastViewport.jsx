const TOAST_DURATION_MS = 3000;

const toastToneClassName = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-800",
  delete: "border-rose-200 bg-rose-50 text-rose-800",
  info: "border-blue-200 bg-blue-50 text-blue-900",
};

const progressClassName = {
  success: "bg-emerald-500",
  error: "bg-rose-300",
  delete: "bg-rose-300",
  info: "bg-blue-500",
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.333a1 1 0 0 1-1.432.012L3.29 9.79a1 1 0 1 1 1.42-1.408l3.58 3.61 6.54-6.616a1 1 0 0 1 1.414-.006Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

function ToastIcon({ type }) {
  const isNegative = type === "error" || type === "delete";
  const wrapperClassName = isNegative
    ? "bg-rose-100 text-rose-600"
    : type === "success"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-blue-100 text-blue-700";

  return (
    <span
      className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${wrapperClassName}`}
    >
      {isNegative ? <CloseIcon /> : <CheckIcon />}
    </span>
  );
}

function ToastItem({ toast, onDismiss }) {
  return (
    <div
      className={`pointer-events-auto overflow-hidden rounded-2xl border shadow-lg shadow-slate-900/10 ${toastToneClassName[toast.type]}`}
    >
      <div className="flex items-start justify-between gap-4 px-4 py-3">
        <div className="flex items-start gap-3">
          <ToastIcon type={toast.type} />
          <div>
            <p className="text-sm font-semibold">{toast.title}</p>
            {toast.message ? (
              <p className="mt-1 text-sm opacity-90">{toast.message}</p>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="rounded-full p-1 text-sm opacity-70 transition hover:opacity-100"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>

      <div className="h-1 w-full bg-black/10">
        <div
          className={`h-full origin-left ${progressClassName[toast.type]}`}
          style={{
            animation: `toast-progress ${TOAST_DURATION_MS}ms linear forwards`,
          }}
          onAnimationEnd={() => onDismiss(toast.id)}
        />
      </div>
    </div>
  );
}

export function ToastViewport({ toasts, onDismiss }) {
  return (
    <>
      <style>
        {`
          @keyframes toast-progress {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
          }
        `}
      </style>

      <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </div>
    </>
  );
}

export { TOAST_DURATION_MS };
