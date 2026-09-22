import { useState } from "react";
import { useTheme, type ThemePreference } from "../hooks/useTheme";
import { getLocal, setLocal } from "../lib/storage";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

const THEME_OPTIONS: ThemePreference[] = ["system", "light", "dark"];

export function SettingsScreen() {
  const { preference, setPreference } = useTheme();
  const [language, setLanguage] = useState(() =>
    getLocal("moodcheck.settings.language", "en")
  );
  const [limitEnabled, setLimitEnabled] = useState(() =>
    getLocal("moodcheck.settings.limitEnabled", true)
  );
  const [notice, setNotice] = useState<string | null>(null);

  const updateLanguage = (code: string) => {
    setLanguage(code);
    setLocal("moodcheck.settings.language", code);
  };

  const updateLimit = (enabled: boolean) => {
    setLimitEnabled(enabled);
    setLocal("moodcheck.settings.limitEnabled", enabled);
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
          Appearance
        </h2>
        <div
          role="radiogroup"
          aria-label="Theme preference"
          className="flex gap-2"
        >
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={preference === opt}
              onClick={() => setPreference(opt)}
              className={`flex-1 rounded-lg border-2 py-2 text-xs font-medium capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                preference === opt
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
          Language
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
          UI only in this prototype — a full build would wire this to an i18n
          library, as recommended in the Frontend report.
        </p>
        <label className="sr-only" htmlFor="language-select">
          Language
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => updateLanguage(e.target.value)}
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm px-3 py-2 text-slate-700 dark:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
          Wellbeing safeguards
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
          MoodBoard is a preventative self-reflection tool, not a substitute
          for professional psychological care. If you're in crisis, please
          contact a qualified professional or local emergency services.
        </p>
        <label className="flex items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-200">
          <span>Limit reflections to 3 per day</span>
          <input
            type="checkbox"
            checked={limitEnabled}
            onChange={(e) => updateLimit(e.target.checked)}
            className="h-4 w-4 accent-violet-600"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
          Your data
        </h2>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() =>
              setNotice(
                "Export queued — this is a prototype, no real export runs."
              )
            }
            className="rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            Export my data
          </button>
          <button
            type="button"
            onClick={() =>
              setNotice(
                "Delete requested — this is a prototype, no real data is stored server-side."
              )
            }
            className="rounded-lg border border-red-200 dark:border-red-900 text-sm font-medium py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            Delete my data
          </button>
        </div>
        {notice && (
          <p
            role="status"
            className="mt-3 text-xs text-slate-500 dark:text-slate-400"
          >
            {notice}
          </p>
        )}
      </section>
    </div>
  );
}
