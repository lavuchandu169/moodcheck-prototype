# Daily Check-in — Frontend Prototype

A small, self-contained prototype exploring the daily emotional check-in flow
described in the Project 031 brief (Frontend Report, GRAVITAD SYSTEMS, S.L.,
consultant code FF#057).

**This is a design/engineering exploration, not a product.** It is not
branded as, or presented as, MoodBoard AI or any GRAVITAD product — the
"AI" response is a simple client-side template picker, not a real model, and
there is no backend.

## What it demonstrates

Points raised in the Frontend report for Project 031, built rather than just
described:

- **Sub-one-minute capture flow**: emoji-based mood picker → submit → response,
  with an explicit loading state instead of a blocking spinner.
- **Mood never encoded by colour alone**: every option pairs an emoji with a
  text label and a checkmark badge when selected, not just a colour change.
- **Accessible chart fallback**: the evolution chart has a "View as table"
  toggle exposing the same data in an HTML table, for screen-reader and
  non-visual use — charts alone are not perceivable to screen readers.
- **`prefers-reduced-motion` respected** globally (see `src/index.css`).
- **Mobile-first, single-column layout** at a 420px design width.
- **Light/dark theme** via `prefers-color-scheme`.

## Stack

React + TypeScript + Vite + Tailwind CSS v4 + Chart.js — matching the stack
named in the project documentation.

## Running it

```bash
npm install
npm run dev
```

## Visual/regression smoke test

`screenshot.mjs` drives the app with Playwright (mood select → submit →
loading → response → table toggle → repeat-log same day → dark mode) and
fails loudly on any console error. It's what caught a real duplicate-React-key
bug in the sample history data during development — kept here as a lightweight
regression check, not a full test suite.

```bash
npm run dev &
node screenshot.mjs
```

## Not included (out of scope for a prototype)

Real backend/AI integration, authentication, i18n, offline queuing, and the
institutional/admin views — all called out as gaps or recommendations in the
accompanying Frontend report, not attempted here.
