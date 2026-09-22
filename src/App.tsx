import { useState } from "react";
import { MoodPicker } from "./components/MoodPicker";
import { ResponseCard } from "./components/ResponseCard";
import { EvolutionChart } from "./components/EvolutionChart";
import { WeeklyInsight } from "./components/WeeklyInsight";
import { generateEmpathicResponse } from "./lib/generateResponse";
import { SAMPLE_HISTORY } from "./data/sampleHistory";
import type { HistoryEntry, MoodKey } from "./types";

type ResponseStatus = "idle" | "loading" | "done";

function App() {
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [status, setStatus] = useState<ResponseStatus>("idle");
  const [response, setResponse] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(SAMPLE_HISTORY);

  const handleSubmit = () => {
    if (!selectedMood) return;
    setStatus("loading");
    setResponse(null);

    // Simulated latency standing in for a real AI call, so the loading state
    // (skeleton + fallback timing) is something a reviewer can actually see.
    window.setTimeout(() => {
      const message = generateEmpathicResponse(selectedMood);
      setResponse(message);
      setStatus("done");

      const score = { great: 5, good: 4, okay: 3, low: 2, rough: 1 }[
        selectedMood
      ];
      const today = new Date().toISOString().slice(0, 10);
      setHistory((prev) => {
        const withoutToday = prev.filter((h) => h.date !== today);
        const next = [...withoutToday, { date: today, mood: selectedMood, score }];
        return next.slice(-14);
      });
    }, 900);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setStatus("idle");
    setResponse(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-md px-4 py-8">
        <header className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
            Frontend prototype
          </p>
          <h1 className="text-xl font-semibold mt-1">Daily check-in</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            A design exploration of the daily emotional check-in flow briefed
            in Project 031 — micro-interaction capture, an empathic response,
            and a simple evolution view. Not affiliated with, or presented as,
            any specific commercial product.
          </p>
        </header>

        <main className="space-y-5">
          <section
            aria-labelledby="capture-heading"
            className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4"
          >
            <h2 id="capture-heading" className="sr-only">
              Log today's mood
            </h2>
            <MoodPicker
              selected={selectedMood}
              onSelect={setSelectedMood}
              disabled={status === "loading"}
            />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedMood || status === "loading"}
                className="flex-1 rounded-lg bg-violet-600 text-white text-sm font-medium py-2.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              >
                {status === "loading" ? "Logging…" : "Log today's mood"}
              </button>
              {status === "done" && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium px-3 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                >
                  Log again
                </button>
              )}
            </div>
          </section>

          <ResponseCard status={status} message={response} />

          <section
            aria-labelledby="evolution-heading"
            className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4"
          >
            <h2 id="evolution-heading" className="sr-only">
              Mood evolution
            </h2>
            <EvolutionChart history={history} />
          </section>

          <WeeklyInsight history={history} />
        </main>

        <footer className="mt-8 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          Prototype by Chandu Lavu, Frontend Consultant (FF#057) — built to
          demonstrate the interaction model, loading states and accessibility
          approach described in the Frontend professional report for Project
          031. Sample data only; no real AI or backend is connected.
        </footer>
      </div>
    </div>
  );
}

export default App;
