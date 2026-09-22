interface Props {
  status: "idle" | "loading" | "done";
  message: string | null;
}

export function ResponseCard({ status, message }: Props) {
  if (status === "idle") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4"
    >
      <p className="text-[11px] uppercase tracking-wide font-semibold text-violet-600 dark:text-violet-400 mb-2">
        Reflection
      </p>
      {status === "loading" ? (
        <div className="space-y-2" aria-hidden="true">
          <div className="h-3 w-11/12 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
        </div>
      ) : (
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
          {message}
        </p>
      )}
      <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
        Sample response for this prototype — not a live AI call.
      </p>
    </div>
  );
}
