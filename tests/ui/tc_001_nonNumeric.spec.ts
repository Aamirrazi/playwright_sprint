import { expect } from "@playwright/test";
import { test } from "../../fixtures/baseFixture";
import { TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { logger } from "../../utils/logger";

test(
  "tc_001 ,Non-numeric Input Validation",
  {
    tag: ["@ui", "@negative"],
  },
  async ({ transferPage }) => {
    logger.info("Starting TC_001: Non-numeric Input Validation test");

    await test.step("Verify account options exist", async () => {
      logger.info("Locating account dropdown options");
      await transferPage.goto();

      const loadTime = await transferPage.getLoadTime();
      logger.info(`Transfer Page in TC-001 loaded in ${loadTime}ms`);

      const optionsCount = await transferPage.getFromAccountOptionsCount();
      logger.info(`Found ${optionsCount} account options in dropdown`);

      expect(optionsCount).toBeGreaterThan(0);
    });

    await test.step("Attempt non-numeric transfer", async () => {
      logger.info(`Entering non-numeric amount: "${TRANSFER_DATA.nonNumeric}"`);
      await transferPage.enterAmount(TRANSFER_DATA.nonNumeric);

      logger.info("Clicking transfer button");
      await transferPage.clickTransfer();

      await transferPage.page.screenshot({
        path: `test-results/screenshots/TC_001-result.png`,
        fullPage: true,
      });
    });

    await test.step("Verify failure messages", async () => {
      logger.info("Extracting body text to verify error messages");
      const bodyText = await transferPage.getBodyText();

      const hasValidationError =
        bodyText.toLowerCase().includes("amount") ||
        bodyText.toLowerCase().includes("number") ||
        bodyText.toLowerCase().includes("valid");

      const hasServerError =
        bodyText.includes("500") ||
        bodyText.includes("Error!") ||
        bodyText.toLowerCase().includes("internal error") ||
        bodyText.toLowerCase().includes("error occurred");

      logger.info("Validation Checks", { hasValidationError, hasServerError });

      expect(
        hasValidationError,
        "Expected a validation error message for non-numeric input",
      ).toBe(true);

      expect(
        hasServerError,
        ` server error should not be for input mistakes`,
      ).toBe(false);

      logger.info("TC_001: Completed successfully");
    });
  },
);
