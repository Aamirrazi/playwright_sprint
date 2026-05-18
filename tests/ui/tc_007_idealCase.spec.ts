import { expect } from "@playwright/test";
import { TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { test } from "../../fixtures/baseFixture";
import { logger } from "../../utils/logger";

test(
  "tc_007 ,Valid Transfer & Accounts Overview Update",
  {
    tag: ["@ui", "@smoke", "@regression"],
  },
  async ({ transferPage, overviewPage }) => {
    logger.info("Starting TC_007: Valid Transfer & Accounts Overview Update");
    let fromBefore: number;
    let toBefore: number;
    const accountData = TEST_DATA.tc007_uiValid;

    await test.step("Check initial balances", async () => {
      logger.info("Navigating to Overview Page");
      await overviewPage.goto();
      const loadTime = await overviewPage.getLoadTime();
      logger.info(`Overview Page in TC-007 loaded in ${loadTime}ms`);
      fromBefore = await overviewPage.getBalance(accountData.from);
      toBefore = await overviewPage.getBalance(accountData.to);
      // console.log(`TC_007: Before — From: ${fromBefore}, To: ${toBefore}`);
      logger.info(`Before — From: ${fromBefore}, To: ${toBefore}`);
    });

    await test.step("Perform valid transfer", async () => {
      logger.info("Navigating to Transfer Page");
      await transferPage.goto();
      const loadTime = await transferPage.getLoadTime();
      logger.info(`Transfer Page in TC-007 loaded in ${loadTime}ms`);
      logger.info(
        `Transferring ${TRANSFER_DATA.validTransfer} from ${accountData.from} to ${accountData.to}`,
      );
      await transferPage.transfer(
        accountData.from,
        accountData.to,
        TRANSFER_DATA.validTransfer,
      );
    });

    await test.step("Verify transfer success and balance updates", async () => {
      await transferPage.assertTransferSuccess();
      logger.info("Transfer Complete message confirmed");
      // console.log("TC_007: Transfer Complete message confirmed");

      logger.info("Navigating back to Overview Page to verify balances");
      await overviewPage.goto();
      const loadTime = await overviewPage.getLoadTime();
      logger.info(`Overview Page in TC-007 againloaded in ${loadTime}ms`);

      await transferPage.page.screenshot({
        path: `test-results/screenshots/TC_007-overview-after.png`,
        fullPage: true,
      });

      await overviewPage.assertBalanceDecreasedBy(
        accountData.from,
        fromBefore,
        TRANSFER_DATA.validTransferNum,
      );

      await overviewPage.assertBalanceIncreasedBy(
        accountData.to,
        toBefore,
        TRANSFER_DATA.validTransferNum,
      );
      logger.info("TC_007: Passed — balances correctly updated");
      // console.log("TC_007: Passed — balances correctly updated");
    });
  },
);
