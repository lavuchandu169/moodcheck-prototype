import { Line } from "react-chartjs-2";
import type { OrgTrendPoint } from "../data/institutionalSample";
import { AccessibleFigure } from "./AccessibleFigure";

interface Props {
  trend: OrgTrendPoint[];
}

export function InstitutionalTrendChart({ trend }: Props) {
  const labels = trend.map((t) =>
    new Date(t.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })
  );

  const avg = trend.reduce((s, t) => s + t.avgScore, 0) / trend.length;
  const summary = `Organization-wide average mood over the last ${trend.length} days, averaging ${avg.toFixed(
    1
  )} out of 5. Aggregated and anonymized — no individual records shown.`;

  return (
    <AccessibleFigure
      title="Organization mood trend — last 14 days"
      summary={summary}
      chart={
        <Line
          data={{
            labels,
            datasets: [
              {
                label: "Average mood",
                data: trend.map((t) => t.avgScore),
                borderColor: "#0f766e",
                backgroundColor: "rgba(15, 118, 110, 0.12)",
                fill: true,
                tension: 0.35,
                pointRadius: 3,
                pointBackgroundColor: "#0f766e",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { min: 1, max: 5, ticks: { stepSize: 1 } } },
          }}
        />
      }
      table={
        <table className="w-full text-sm border-collapse">
          <caption className="sr-only">{summary}</caption>
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400">
              <th scope="col" className="py-1 pr-2 font-medium">
                Date
              </th>
              <th scope="col" className="py-1 font-medium">
                Average mood (1–5)
              </th>
            </tr>
          </thead>
          <tbody>
            {trend.map((t) => (
              <tr
                key={t.date}
                className="border-t border-slate-100 dark:border-slate-800"
              >
                <td className="py-1 pr-2 text-slate-600 dark:text-slate-300">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td className="py-1 text-slate-600 dark:text-slate-300">
                  {t.avgScore.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
}
