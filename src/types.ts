export type MoodKey = "great" | "good" | "okay" | "low" | "rough";

export interface MoodOption {
  key: MoodKey;
  emoji: string;
  label: string;
  /** 1 (rough) to 5 (great) — used for charting, never for color-only meaning */
  score: number;
}

export interface HistoryEntry {
  date: string; // ISO date
  mood: MoodKey;
  score: number;
}
