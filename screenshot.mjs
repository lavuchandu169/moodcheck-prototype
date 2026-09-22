import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 420, height: 850 } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto("http://localhost:5183/", { waitUntil: "networkidle" });
await page.waitForSelector("text=Log today's mood");
await page.screenshot({ path: "screenshot-1-initial.png" });

// Select a mood and submit
await page.getByRole("radio", { name: /good/i }).click();
await page.getByRole("button", { name: /log today's mood/i }).click();
await page.screenshot({ path: "screenshot-2-loading.png" });
await page.waitForSelector("text=Log again");
await page.screenshot({ path: "screenshot-3-response.png" });

// Toggle table view for accessibility check
await page.getByRole("button", { name: /view as table/i }).click();
await page.screenshot({ path: "screenshot-4-table.png" });

// Log again same day (regression check for the duplicate-key bug)
await page.getByRole("button", { name: /view as chart/i }).click();
await page.getByRole("button", { name: /log again/i }).click();
await page.getByRole("radio", { name: /great/i }).click();
await page.getByRole("button", { name: /log today's mood/i }).click();
await page.waitForSelector("text=Log again");

// Dark mode
await page.emulateMedia({ colorScheme: "dark" });
await page.screenshot({ path: "screenshot-5-dark.png" });

console.log("ERRORS:", JSON.stringify(errors));
await browser.close();
