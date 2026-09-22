import { useEffect, useState } from "react";
import { getLocal, setLocal } from "../lib/storage";

export type ThemePreference = "system" | "light" | "dark";
const KEY = "moodcheck.settings.theme";

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(() =>
    getLocal<ThemePreference>(KEY, "system")
  );

  useEffect(() => {
    setLocal(KEY, preference);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const effectiveDark =
        preference === "dark" || (preference === "system" && mq.matches);
      document.documentElement.classList.toggle("dark", effectiveDark);
    };

    apply();
    if (preference === "system") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [preference]);

  return { preference, setPreference };
}
