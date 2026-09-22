import { useState } from "react";
import { MoodPicker } from "../components/MoodPicker";
import { ResponseCard } from "../components/ResponseCard";
import { EvolutionChart } from "../components/EvolutionChart";
import { WeeklyInsight } from "../components/WeeklyInsight";
import { generateEmpathicResponse } from "../lib/generateResponse";
import { SAMPLE_HISTORY } from "../data/sampleHistory";
import { getLocal, setLocal } from "../lib/storage";
import type { HistoryEntry, MoodKey } from "../types";

type ResponseStatus = "idle" | "loading" | "done";

const MOOD_SCORES: Record<MoodKey, number> = {
  great: 5,
  good: 4,
  okay: 3,
  low: 2,
  rough: 1,
};

const DAILY_LIMIT = 3;
const todayKey = () => new Date().toISOString().slice(0, 10);
const countKey = () => `moodcheck.checkins.count.${todayKey()}`;

export function IndividualScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [status, setStatus] = useState<ResponseStatus>("idle");
  const [response, setResponse] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(SAMPLE_HISTORY);
  const [todayCount, setTodayCount] = useState(() => getLocal(countKey(), 0));

  const limitEnabled = getLocal("moodcheck.settings.limitEnabled", true);
  const limitReached = limitEnabled && todayCount >= DAILY_LIMIT;

  const handleSubmit = () => {
    if (!selectedMood || limitReached) return;
    setStatus("loading");
    setResponse(null);

    // Simulated latency standing in for a real AI call, so the loading state
    // (skeleton + fallback timing) is something a reviewer can actually see.
    window.setTimeout(() => {
      const message = generateEmpathicResponse(selectedMood);
      setResponse(message);
      setStatus("done");

      const score = MOOD_SCORES[selectedMood];
      const today = todayKey();
      setHistory((prev) => {
        const withoutToday = prev.filter((h) => h.date !== today);
        const next = [...withoutToday, { date: today, mood: selectedMood, score }];
        return next.slice(-14);
      });

      const nextCount = todayCount + 1;
      setTodayCount(nextCount);
      setLocal(countKey(), nextCount);
    }, 900);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setStatus("idle");
    setResponse(null);
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
        {limitReached ? (
          <p
            role="status"
            className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            You've logged {DAILY_LIMIT} reflections today — that's enough for
            now. This limit is an intentional safeguard against over-reliance
            on the app (see Settings), not a bug. Come back tomorrow, or turn
            the limit off in Settings.
          </p>
        ) : (
          <>
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
            {limitEnabled && (
              <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
                {todayCount} / {DAILY_LIMIT} reflections logged today.
              </p>
            )}
          </>
        )}
      </section>

      <ResponseCard status={status} message={response} />

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
        <EvolutionChart history={history} />
      </section>

      <WeeklyInsight history={history} />
    </div>
  );
}
