import type { MoodOption } from "../types";

export const MOOD_OPTIONS: MoodOption[] = [
  { key: "great", emoji: "😄", label: "Great", score: 5 },
  { key: "good", emoji: "🙂", label: "Good", score: 4 },
  { key: "okay", emoji: "😐", label: "Okay", score: 3 },
  { key: "low", emoji: "😔", label: "Low", score: 2 },
  { key: "rough", emoji: "😣", label: "Rough", score: 1 },
];
