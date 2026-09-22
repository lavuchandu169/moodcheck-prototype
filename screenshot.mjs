import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto("http://localhost:5183/", { waitUntil: "networkidle" });

// --- Onboarding ---
await page.waitForSelector("text=A quiet place to check in");
await page.screenshot({ path: "screenshot-01-onboarding.png" });
await page.getByRole("checkbox").check();
await page.getByRole("button", { name: /get started/i }).click();

// --- Individual: Check-in tab ---
await page.waitForSelector("text=Log today's mood");
await page.screenshot({ path: "screenshot-02-individual.png" });

await page.getByRole("radio", { name: /good/i }).click();
await page.getByRole("button", { name: /log today's mood/i }).click();
await page.screenshot({ path: "screenshot-03-loading.png" });
await page.waitForSelector("text=Log again");
await page.screenshot({ path: "screenshot-04-response.png" });

await page.getByRole("button", { name: /view as table/i }).click();
await page.screenshot({ path: "screenshot-05-table.png" });
await page.getByRole("button", { name: /view as chart/i }).click();

// Trigger the daily interaction-limit safeguard (log 2 more times = 3 total).
// The 3rd submission hides "Log again" entirely, replacing it with the
// limit-reached message, so only wait for it after the 2nd.
await page.getByRole("button", { name: /log again/i }).click();
await page.getByRole("radio", { name: /great/i }).click();
await page.getByRole("button", { name: /log today's mood/i }).click();
await page.waitForSelector("text=Log again");

await page.getByRole("button", { name: /log again/i }).click();
await page.getByRole("radio", { name: /great/i }).click();
await page.getByRole("button", { name: /log today's mood/i }).click();
await page.waitForSelector("text=that's enough for now");
await page.screenshot({ path: "screenshot-06-limit-reached.png" });

// --- Institutional tab ---
await page.getByRole("tab", { name: /institutional view/i }).click();
await page.waitForSelector("text=Sample Organization");
await page.waitForTimeout(1200); // let Chart.js's entrance animation finish
await page.screenshot({ path: "screenshot-07-institutional.png" });

// Arrow-key navigation check (accessibility: roving tabindex)
await page.getByRole("tab", { name: /institutional view/i }).focus();
await page.keyboard.press("ArrowRight");
await page.waitForSelector("text=Wellbeing safeguards");
await page.screenshot({ path: "screenshot-08-settings-via-keyboard.png" });

// --- Settings: dark mode override ---
await page.getByRole("radio", { name: "dark", exact: true }).click();
await page.waitForTimeout(200); // let the CSS color transition settle before capturing
await page.screenshot({ path: "screenshot-09-settings-dark.png" });

await page.getByRole("button", { name: /export my data/i }).click();
await page.screenshot({ path: "screenshot-10-export-notice.png" });

// Back to check-in tab to confirm dark mode carried across tabs
await page.getByRole("tab", { name: /check-in/i }).click();
await page.waitForTimeout(1200); // let Chart.js's entrance animation finish
await page.screenshot({ path: "screenshot-11-individual-dark.png" });

console.log("ERRORS:", JSON.stringify(errors));
await browser.close();
