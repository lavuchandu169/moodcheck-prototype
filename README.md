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
described — now covering all three personas the report called out as needing
separate route trees, not shared components with conditional branches:

- **Individual — Check-in**: sub-one-minute capture flow (emoji picker →
  submit → response) with an explicit loading state instead of a blocking
  spinner, a 14-day evolution chart, and a weekly summary.
- **Institutional — aggregate dashboard**: org-wide trend and mood
  distribution, built from separate aggregate sample data — never derived
  from or exposing any individual's entries.
- **Settings**: working light/system/dark theme override, a language
  selector (UI-only, labeled as such — real i18n was out of scope for a
  prototype), and the two safeguards called out in the project's own ethical
  guidelines: a permanent non-therapeutic disclaimer, and a togglable
  3-per-day reflection limit that the Check-in screen actually enforces.
- **Onboarding**: a consent step gating first use, matching the ethical/
  privacy-by-design framing in the brief.
- **Mood never encoded by colour alone**: every option pairs an emoji with a
  text label and a checkmark badge when selected, not just a colour change.
- **Accessible chart fallback**: every chart (evolution, org trend,
  distribution) shares one `AccessibleFigure` component with a "View as
  table" toggle exposing the same data in an HTML table — charts alone are
  not perceivable to screen readers.
- **Accessible tabs**: the persona switcher uses the ARIA tabs pattern with
  roving tabindex and arrow-key navigation, not styled `<div>`s.
- **`prefers-reduced-motion` respected** globally (see `src/index.css`).
- **Mobile-first, single-column layout** at a 420px design width.

## Stack

React + TypeScript + Vite + Tailwind CSS v4 + Chart.js — matching the stack
named in the project documentation.

## Running it

```bash
npm install
npm run dev
```

## Visual/regression smoke test

`screenshot.mjs` drives the app with Playwright end-to-end — onboarding,
mood select → submit → loading → response → table toggle, triggering the
daily reflection limit, the institutional dashboard, keyboard tab navigation,
the theme override, and a data-action notice — and fails loudly on any
console error. It's what caught a real duplicate-React-key bug in the sample
history data during development — kept here as a lightweight regression
check, not a full test suite.

```bash
npm run dev &
node screenshot.mjs
```

## Not included (out of scope for a prototype)

Real backend/AI integration, authentication, real i18n wiring (the language
selector is UI-only), and offline queuing — all called out as gaps or
recommendations in the accompanying Frontend report, not attempted here.
