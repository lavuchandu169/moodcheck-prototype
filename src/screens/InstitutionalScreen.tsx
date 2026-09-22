import { ORG_STATS, ORG_TREND } from "../data/institutionalSample";
import { InstitutionalTrendChart } from "../components/InstitutionalTrendChart";
import { MoodDistributionChart } from "../components/MoodDistributionChart";

export function InstitutionalScreen() {
  const participationRate = Math.round(
    (ORG_STATS.activeThisWeek / ORG_STATS.totalParticipants) * 100
  );

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
        <p className="text-[11px] uppercase tracking-wide font-semibold text-teal-600 dark:text-teal-400 mb-1">
          Institutional mode
        </p>
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          {ORG_STATS.organizationName}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Aggregated and anonymized indicators only — this view never exposes
          any individual's entries, consistent with the institutional mode
          requirement in the project brief.
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3">
            <dt className="text-[11px] text-slate-500 dark:text-slate-400">
              Participants
            </dt>
            <dd className="text-lg font-semibold text-slate-800 dark:text-slate-100 tabular-nums">
              {ORG_STATS.totalParticipants}
            </dd>
          </div>
          <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3">
            <dt className="text-[11px] text-slate-500 dark:text-slate-400">
              Active this week
            </dt>
            <dd className="text-lg font-semibold text-slate-800 dark:text-slate-100 tabular-nums">
              {participationRate}%
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
        <InstitutionalTrendChart trend={ORG_TREND} />
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
        <MoodDistributionChart />
      </section>
    </div>
  );
}
