import type { HistoryEntry, MoodKey } from "../types";
import { MOOD_OPTIONS } from "./moods";

const scoreToMood = (score: number): MoodKey =>
  MOOD_OPTIONS.reduce((closest, m) =>
    Math.abs(m.score - score) < Math.abs(closest.score - score) ? m : closest
  ).key;

// 14 days of illustrative sample data (not a real user's records) so the
// evolution chart and weekly insight have something to render on first load.
const RAW_SCORES = [3, 4, 4, 3, 2, 3, 4, 5, 4, 3, 3, 4, 5, 4];

// Ends yesterday, not today — so a fresh log for "today" in the app never
// collides with the seeded sample data.
export const SAMPLE_HISTORY: HistoryEntry[] = RAW_SCORES.map((score, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (RAW_SCORES.length - i));
  return {
    date: date.toISOString().slice(0, 10),
    score,
    mood: scoreToMood(score),
  };
});
