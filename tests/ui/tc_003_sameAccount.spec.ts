import { expect } from "@playwright/test";
import { TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { test } from "../../fixtures/baseFixture";
import { logger } from "../../utils/logger";

test(
  "tc_003 ,Same Account Transfer",
  {
    tag: ["@ui", "@regression"],
  },
  async ({ transferPage }) => {
    test.fail(true, "KNOWN BUG: App allows same-account transfers");

    const accountInfo = TEST_DATA.tc003_same;
    logger.info("Starting TC_003: Same Account Transfer test");

    await test.step("Attempt same-account transfer", async () => {
      logger.info("Navigating to Transfer Page...");
      await transferPage.goto();

      logger.info(
        `Attempting to transfer ${TRANSFER_DATA.sameAccount} from ${accountInfo.from} to ${accountInfo.to}`,
      );
      await transferPage.transfer(
        accountInfo.from,
        accountInfo.to,
        TRANSFER_DATA.sameAccount,
      );

      await transferPage.page.screenshot({
        path: `test-results/screenshots/TC_003-result.png`,
        fullPage: true,
      });
    });

    await test.step("Verify failure messages", async () => {
      logger.info("Extracting body text to verify error messages...");
      const bodyText = await transferPage.getBodyText();

      const transferCompleted = bodyText.includes("Transfer Complete");
      const errorShown =
        bodyText.toLowerCase().includes("same") ||
        bodyText.toLowerCase().includes("error");

      logger.info("Validation Checks", { transferCompleted, errorShown });

      expect
        .soft(
          transferCompleted,
          "Transfer should not be allowed onto same account",
        )
        .toBe(false);

      expect.soft(errorShown, "validation error should be visible").toBe(true);

      logger.info("TC_003: Completed successfully");
    });
  },
);
