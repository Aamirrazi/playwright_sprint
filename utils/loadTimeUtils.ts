import { Page } from "@playwright/test";
import { logger } from "./logger";

export async function getPageLoadTime(page: Page) {
  await page.waitForLoadState("networkidle");

  const timingJson = await page.evaluate(() =>
    JSON.stringify(window.performance.timing),
  );
  const timing = JSON.parse(timingJson);

  const loadTimeMs = timing.loadEventEnd - timing.navigationStart;

  logger.info(`UI Load Time for ${page.url()} was ${loadTimeMs}ms`);

  return loadTimeMs;
}
