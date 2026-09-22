import { Line } from "react-chartjs-2";
import type { HistoryEntry } from "../types";
import { MOOD_OPTIONS } from "../data/moods";
import { AccessibleFigure } from "./AccessibleFigure";

interface Props {
  history: HistoryEntry[];
}

const moodLabel = (score: number) =>
  MOOD_OPTIONS.reduce((closest, m) =>
    Math.abs(m.score - score) < Math.abs(closest.score - score) ? m : closest
  ).label;

export function EvolutionChart({ history }: Props) {
  const labels = history.map((h) =>
    new Date(h.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Mood",
        data: history.map((h) => h.score),
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.15)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: "#7c3aed",
      },
    ],
  };

  const summary = `Mood evolution over the last ${history.length} days, ranging from ${moodLabel(
    Math.min(...history.map((h) => h.score))
  )} to ${moodLabel(Math.max(...history.map((h) => h.score)))}.`;

  return (
    <AccessibleFigure
      title="Evolution — last 14 days"
      summary={summary}
      chart={
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                min: 1,
                max: 5,
                ticks: {
                  stepSize: 1,
                  callback: (value) => moodLabel(Number(value)),
                },
              },
            },
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
                Mood
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr
                key={h.date}
                className="border-t border-slate-100 dark:border-slate-800"
              >
                <td className="py-1 pr-2 text-slate-600 dark:text-slate-300">
                  {new Date(h.date).toLocaleDateString()}
                </td>
                <td className="py-1 text-slate-600 dark:text-slate-300">
                  {moodLabel(h.score)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
}
