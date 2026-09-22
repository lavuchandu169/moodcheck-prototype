import { MOOD_OPTIONS } from "../data/moods";
import type { MoodKey } from "../types";

interface Props {
  selected: MoodKey | null;
  onSelect: (mood: MoodKey) => void;
  disabled?: boolean;
}

export function MoodPicker({ selected, onSelect, disabled }: Props) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
        How are you feeling right now?
      </legend>
      <div
        role="radiogroup"
        aria-label="Select your current mood"
        className="grid grid-cols-5 gap-2"
      >
        {MOOD_OPTIONS.map((option) => {
          const isSelected = selected === option.key;
          return (
            <button
              key={option.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onSelect(option.key)}
              className={`relative flex flex-col items-center gap-1 rounded-xl border-2 py-3 px-1 min-h-[64px] transition-colors
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  isSelected
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
            >
              {isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-white text-[10px] leading-none"
                >
                  ✓
                </span>
              )}
              <span className="text-2xl" aria-hidden="true">
                {option.emoji}
              </span>
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
