import { useState } from "react";
import { NavTabs, type ScreenKey } from "./components/NavTabs";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { IndividualScreen } from "./screens/IndividualScreen";
import { InstitutionalScreen } from "./screens/InstitutionalScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { useTheme } from "./hooks/useTheme";
import { getLocal, setLocal } from "./lib/storage";

const ONBOARDED_KEY = "moodcheck.onboarded";

function App() {
  useTheme(); // applies theme preference to <html> globally
  const [onboarded, setOnboarded] = useState(() =>
    getLocal(ONBOARDED_KEY, false)
  );
  const [screen, setScreen] = useState<ScreenKey>("individual");

  if (!onboarded) {
    return (
      <OnboardingScreen
        onComplete={() => {
          setLocal(ONBOARDED_KEY, true);
          setOnboarded(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-md px-4 py-8">
        <header className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
            Frontend prototype
          </p>
          <h1 className="text-xl font-semibold mt-1">Daily check-in</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            A design exploration of the flow briefed in Project 031 — the
            individual check-in, the institutional aggregate view, and the
            privacy/safeguard settings called out as gaps in the Frontend
            report. Not affiliated with, or presented as, any specific
            commercial product.
          </p>
        </header>

        <nav className="mb-5">
          <NavTabs active={screen} onChange={setScreen} />
        </nav>

        <main>
          <div
            role="tabpanel"
            id="panel-individual"
            aria-labelledby="tab-individual"
            hidden={screen !== "individual"}
          >
            {screen === "individual" && <IndividualScreen />}
          </div>
          <div
            role="tabpanel"
            id="panel-institutional"
            aria-labelledby="tab-institutional"
            hidden={screen !== "institutional"}
          >
            {screen === "institutional" && <InstitutionalScreen />}
          </div>
          <div
            role="tabpanel"
            id="panel-settings"
            aria-labelledby="tab-settings"
            hidden={screen !== "settings"}
          >
            {screen === "settings" && <SettingsScreen />}
          </div>
        </main>

        <footer className="mt-8 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          Prototype by Chandu Lavu, Frontend Consultant (FF#057) — built to
          demonstrate the interaction model, persona separation, accessibility
          approach and ethical safeguards described in the Frontend
          professional report for Project 031. Sample data only; no real AI
          or backend is connected.
        </footer>
      </div>
    </div>
  );
}

export default App;
