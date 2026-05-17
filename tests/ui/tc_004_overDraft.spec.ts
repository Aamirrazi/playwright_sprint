import { expect } from "@playwright/test";
// import { ACCOUNTS } from "../../config/config";
import { TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { test } from "../../fixtures/baseFixture";
import { logger } from "../../utils/logger";

test(
  "tc_004 ,Exceed Available Balance (Overdraft)",
  {
    tag: ["@ui", "@regression"],
  },
  async ({ transferPage, overviewPage }) => {
    test.fail(true, "KNOWN BUG: App allows excess balance transfers ");
    logger.info("Starting TC_004: Exceed Available Balance (Overdraft)");

    let balanceBefore: number;
    const accountInfo = TEST_DATA.tc004_overdraft;

    await test.step("Check initial balance", async () => {
      logger.info("Navigating to Overview Page...");
      await overviewPage.goto();
      balanceBefore = await overviewPage.getBalance(accountInfo.from);
      logger.info(`Starting balance: ${balanceBefore}`);
      // console.log(`Starting balance: ${balanceBefore}`);
    });

    await test.step("Attempt overdraft transfer", async () => {
      logger.info("Navigating to Transfer Page...");
      await transferPage.goto();
      logger.info(
        `Attempting overdraft transfer of ${TRANSFER_DATA.overdraft} from ${accountInfo.from} to ${accountInfo.to}`,
      );
      await transferPage.transfer(
        accountInfo.from,
        accountInfo.to,
        TRANSFER_DATA.overdraft,
      );
      await transferPage.page.screenshot({
        path: `test-results/screenshots/TC_004-result.png`,
        fullPage: true,
      });
    });

    await test.step("Verify failure messages", async () => {
      logger.info("Navigating back to Overview Page to verify balance...");
      await overviewPage.goto();
      const balanceAfter = await overviewPage.getBalance(accountInfo.from);
      logger.info(`After balance: ${balanceAfter}`);
      // console.log(`After balance: ${balanceAfter}`);

      logger.info("Extracting body text to verify error messages...");
      const bodyText = await transferPage.getBodyText();

      expect.soft(bodyText.includes("Transfer Complete")).toBe(false);
      expect.soft(bodyText.toLowerCase().includes("insufficient")).toBe(true);
      expect(
        balanceAfter,
        "Balance should NOT have changed after a blocked overdraft transfer",
      ).toBeCloseTo(balanceBefore, 2);

      logger.info("TC_004: Completed successfully");
    });
  },
);
