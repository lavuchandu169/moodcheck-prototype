import { useId, useState, type ReactNode } from "react";

interface Props {
  title: string;
  summary: string;
  chart: ReactNode;
  table: ReactNode;
}

/**
 * Shared chart/table toggle used by every chart in the app, so a screen
 * reader or non-visual user always has a real alternative to the chart —
 * not just an aria-label on an opaque canvas.
 */
export function AccessibleFigure({ title, summary, chart, table }: Props) {
  const [showTable, setShowTable] = useState(false);
  const panelId = useId();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </h3>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          aria-pressed={showTable}
          aria-controls={panelId}
          className="text-xs font-medium text-violet-600 dark:text-violet-400 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
        >
          {showTable ? "View as chart" : "View as table"}
        </button>
      </div>

      {showTable ? (
        <div id={panelId}>{table}</div>
      ) : (
        <div id={panelId} role="img" aria-label={summary} className="h-48">
          {chart}
        </div>
      )}
    </div>
  );
}
