import { useState } from "react";

interface Props {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: Props) {
  const [consented, setConsented] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
            Welcome
          </p>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-1">
            A quiet place to check in
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Log how you're feeling in under a minute, with short reflections
            and a simple view of your evolution over time. No lengthy
            questionnaires, no clinical scoring.
          </p>
        </div>

        <label className="flex gap-3 items-start rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-violet-600"
          />
          <span>
            I understand this is a preventative self-reflection tool, not a
            substitute for professional psychological care, and I consent to
            my entries being processed to generate reflections and a personal
            evolution view.
          </span>
        </label>

        <button
          type="button"
          onClick={onComplete}
          disabled={!consented}
          className="w-full rounded-lg bg-violet-600 text-white text-sm font-medium py-2.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
