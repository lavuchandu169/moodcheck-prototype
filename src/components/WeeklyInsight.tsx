import type { HistoryEntry } from "../types";

interface Props {
  history: HistoryEntry[];
}

export function WeeklyInsight({ history }: Props) {
  const last7 = history.slice(-7);
  const avg = last7.reduce((sum, h) => sum + h.score, 0) / last7.length;
  const trendUp = last7[last7.length - 1].score >= last7[0].score;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400 mb-2">
        Weekly summary
      </p>
      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
        Average mood this week: <strong>{avg.toFixed(1)} / 5</strong>. Overall
        trend looks {trendUp ? "steady to improving" : "a little lower than the start of the week"} —
        nothing that needs action, just a pattern worth noticing.
      </p>
      <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
        Based on sample data for this prototype.
      </p>
    </div>
  );
}
