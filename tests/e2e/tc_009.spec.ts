import { expect } from "@playwright/test";
// import { ACCOUNTS, CONFIG, TRANSFER_DATA } from "../../config/config";
import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { test } from "../../fixtures/baseFixture";
import { logger } from "../../utils/logger";

test(
  "tc_009 ,Balance updated on UI after an API-initiated transfer",
  {
    tag: ["@e2e"],
  },
  async ({ overviewPage, request }) => {
    let fromBalanceBefore: number;
    let toBalanceBefore: number;
    const accountInfo = TEST_DATA.tc009_e2e;

    await test.step("Capture balances on the UI BEFORE transfer", async () => {
      logger.info("Navigating to Overview Page ");
      await overviewPage.goto();
      const loadTime = await overviewPage.getLoadTime();
      logger.info(`Overview Page in TC-009 loaded in ${loadTime}ms`);

      fromBalanceBefore = await overviewPage.getBalance(accountInfo.from);
      toBalanceBefore = await overviewPage.getBalance(accountInfo.to);

      logger.info("Initial UI Balances", {
        from: fromBalanceBefore,
        to: toBalanceBefore,
      });

      await overviewPage.page.screenshot({
        path: `test-results/screenshots/TC_009-overview-before.png`,
        fullPage: true,
      });
    });

    await test.step("Execute transfer via API", async () => {
      const url = `${CONFIG.API_BASE}/transfer`;
      const params = {
        fromAccountId: accountInfo.from,
        toAccountId: accountInfo.to,
        amount: String(TRANSFER_DATA.e2eTransfer),
      };

      logger.apiRequest("POST", url, params);

      const transferResponse = await request.post(url, { params });

      logger.apiResponse(
        transferResponse.status(),
        transferResponse.url(),
        await transferResponse.text(),
      );

      expect(transferResponse.status()).toBe(200);
    });

    await test.step("Reload UI and verify balances updated", async () => {
      logger.info("Reloading Overview Page to check updated UI balances");
      await overviewPage.goto();
      const loadTime = await overviewPage.getLoadTime();
      logger.info(`Overview Page in TC-009 loaded in ${loadTime}ms`);

      await overviewPage.page.screenshot({
        path: `test-results/screenshots/TC_009-overview-after.png`,
        fullPage: true,
      });

      const fromBalanceAfter = await overviewPage.getBalance(accountInfo.from);
      const toBalanceAfter = await overviewPage.getBalance(accountInfo.to);

      logger.info("Updated UI Balances", {
        from: fromBalanceAfter,
        to: toBalanceAfter,
      });

      expect(fromBalanceAfter).toBeCloseTo(
        fromBalanceBefore - TRANSFER_DATA.e2eTransferNum,
        2,
      );
      expect(toBalanceAfter).toBeCloseTo(
        toBalanceBefore + TRANSFER_DATA.e2eTransferNum,
        2,
      );
    });
  },
);
