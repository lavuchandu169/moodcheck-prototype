import type { MoodKey } from "../types";

/**
 * Mocked, client-side stand-in for the "Empathic Response Generator" described
 * in the project brief. This is a deliberately simple template picker, not a
 * real language model — good enough to demonstrate the interaction and loading
 * states without wiring up a backend for a prototype.
 */
const RESPONSES: Record<MoodKey, string[]> = {
  great: [
    "That's a great note to log today — whatever's working, it's worth remembering.",
    "Good to hear. Small wins like this add up more than they feel like they do.",
  ],
  good: [
    "Sounds like a solid day. Nothing dramatic to fix here — just noted.",
    "Good — logging the steady days matters just as much as the big ones.",
  ],
  okay: [
    "An okay day, noted. Not every entry needs to be a high or a low.",
    "Fair enough — steady is a perfectly reasonable place to be today.",
  ],
  low: [
    "Thanks for logging it, even on a harder day. That takes more effort, not less.",
    "Noted. If today's heavier than usual, a short break might help more than pushing through.",
  ],
  rough: [
    "That sounds tough. Logging it is enough for today — no need to do anything else with it.",
    "Thanks for being honest about it. If this feeling sticks around, talking to someone you trust can help.",
  ],
};

export function generateEmpathicResponse(mood: MoodKey): string {
  const options = RESPONSES[mood];
  return options[Math.floor(Math.random() * options.length)];
}
