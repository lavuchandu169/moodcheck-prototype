import { useRef, type KeyboardEvent } from "react";

export type ScreenKey = "individual" | "institutional" | "settings";

const TABS: { key: ScreenKey; label: string }[] = [
  { key: "individual", label: "Check-in" },
  { key: "institutional", label: "Institutional view" },
  { key: "settings", label: "Settings" },
];

interface Props {
  active: ScreenKey;
  onChange: (key: ScreenKey) => void;
}

export function NavTabs({ active, onChange }: Props) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = TABS[(index + dir + TABS.length) % TABS.length];
    onChange(next.key);
    refs.current[next.key]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="App sections"
      className="flex gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 p-1"
    >
      {TABS.map((tab, i) => (
        <button
          key={tab.key}
          ref={(el) => {
            refs.current[tab.key] = el;
          }}
          role="tab"
          id={`tab-${tab.key}`}
          aria-selected={active === tab.key}
          aria-controls={`panel-${tab.key}`}
          tabIndex={active === tab.key ? 0 : -1}
          onClick={() => onChange(tab.key)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
            active === tab.key
              ? "bg-white dark:bg-slate-900 text-violet-700 dark:text-violet-300 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
