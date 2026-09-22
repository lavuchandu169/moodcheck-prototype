import { Bar } from "react-chartjs-2";
import { ORG_DISTRIBUTION } from "../data/institutionalSample";
import { AccessibleFigure } from "./AccessibleFigure";

export function MoodDistributionChart() {
  const total = ORG_DISTRIBUTION.reduce((s, d) => s + d.count, 0);
  const summary = `Distribution of ${total} check-ins this week by mood category: ${ORG_DISTRIBUTION.map(
    (d) => `${d.mood} ${d.count}`
  ).join(", ")}.`;

  return (
    <AccessibleFigure
      title="This week's mood distribution"
      summary={summary}
      chart={
        <Bar
          data={{
            labels: ORG_DISTRIBUTION.map((d) => d.mood),
            datasets: [
              {
                label: "Check-ins",
                data: ORG_DISTRIBUTION.map((d) => d.count),
                backgroundColor: "#7c3aed",
                borderRadius: 4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 10 } } },
          }}
        />
      }
      table={
        <table className="w-full text-sm border-collapse">
          <caption className="sr-only">{summary}</caption>
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400">
              <th scope="col" className="py-1 pr-2 font-medium">
                Mood
              </th>
              <th scope="col" className="py-1 font-medium">
                Check-ins
              </th>
            </tr>
          </thead>
          <tbody>
            {ORG_DISTRIBUTION.map((d) => (
              <tr
                key={d.mood}
                className="border-t border-slate-100 dark:border-slate-800"
              >
                <td className="py-1 pr-2 text-slate-600 dark:text-slate-300">
                  {d.mood}
                </td>
                <td className="py-1 text-slate-600 dark:text-slate-300">
                  {d.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
}
