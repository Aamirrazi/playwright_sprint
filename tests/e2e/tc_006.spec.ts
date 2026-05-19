import { expect } from "@playwright/test";
// import { ACCOUNTS, CONFIG, TRANSFER_DATA } from "../../config/config";
import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { test } from "../../fixtures/baseFixture";
import { logger } from "../../utils/logger";

test(
  "tc-006 ,E2E Transaction Logging Sync",
  {
    tag: ["@e2e"],
  },
  async ({ transferPage, overviewPage, request }) => {
    let uiFromBefore: number;
    let uiToBefore: number;
    let apiFromBalBefore: number;
    let apiToBalBefore: number;
    const accountInfo = TEST_DATA.tc006_e2e;

    await test.step("Read UI balances before", async () => {
      logger.info("Navigating to Overview Page to read initial UI balances");
      await overviewPage.goto();
      const loadTime = await overviewPage.getLoadTime();
      logger.info(`Overview Page in TC-006 loaded in ${loadTime}ms`);
      uiFromBefore = await overviewPage.getBalance(accountInfo.from);
      uiToBefore = await overviewPage.getBalance(accountInfo.to);

      logger.info("Initial UI Balances", {
        from: uiFromBefore,
        to: uiToBefore,
      });
    });

    await test.step("Read API balances before", async () => {
      const urlFrom = `${CONFIG.API_BASE}/accounts/${accountInfo.from}`;
      const urlTo = `${CONFIG.API_BASE}/accounts/${accountInfo.to}`;

      logger.apiRequest("GET", urlFrom);
      const apiFromBefore = await request.get(urlFrom, {
        headers: { Accept: "application/json" },
      });

      logger.apiRequest("GET", urlTo);
      const apiToBefore = await request.get(urlTo, {
        headers: { Accept: "application/json" },
      });

      const apiFromData = await apiFromBefore.json();
      const apiToData = await apiToBefore.json();

      logger.apiResponse(apiFromBefore.status(), urlFrom, apiFromData);
      logger.apiResponse(apiToBefore.status(), urlTo, apiToData);

      apiFromBalBefore = apiFromData.balance;
      apiToBalBefore = apiToData.balance;

      expect(uiFromBefore).toBeCloseTo(apiFromBalBefore, 2);
      expect(uiToBefore).toBeCloseTo(apiToBalBefore, 2);
    });

    await test.step("Perform the transfer via UI", async () => {
      logger.info("Navigating to Transfer Page to perform UI transfer");
      await transferPage.goto();
      const loadTime = await transferPage.getLoadTime();
      logger.info(`Transfer Page in TC-006 loaded in ${loadTime}ms`);
      const amount = String(TRANSFER_DATA.e2eTransferNum);
      logger.info(
        `Transferring ${amount} from ${accountInfo.from} to ${accountInfo.to} via UI`,
      );

      await transferPage.transfer(accountInfo.from, accountInfo.to, amount);
      await transferPage.assertTransferSuccess();

      await transferPage.page.screenshot({
        path: `test-results/screenshots/E2E-transfer-success.png`,
        fullPage: true,
      });
    });

    await test.step("Verify UI Overview updated", async () => {
      logger.info("Returning to Overview Page to verify updated UI balances");
      await overviewPage.goto();
      const loadTime = await overviewPage.getLoadTime();
      logger.info(`Overview Page in TC-006 loaded in ${loadTime}ms`);

      const uiFromAfter = await overviewPage.getBalance(accountInfo.from);
      const uiToAfter = await overviewPage.getBalance(accountInfo.to);

      logger.info("Updated UI Balances", { from: uiFromAfter, to: uiToAfter });

      expect(uiFromAfter).toBeCloseTo(
        uiFromBefore - TRANSFER_DATA.e2eTransferNum,
        2,
      );
      expect(uiToAfter).toBeCloseTo(
        uiToBefore + TRANSFER_DATA.e2eTransferNum,
        2,
      );

      await overviewPage.page.screenshot({
        path: `test-results/screenshots/E2E-overview-after.png`,
        fullPage: true,
      });
    });

    await test.step("Verify API reflects the change", async () => {
      const urlFrom = `${CONFIG.API_BASE}/accounts/${accountInfo.from}`;
      const urlTo = `${CONFIG.API_BASE}/accounts/${accountInfo.to}`;

      logger.apiRequest("GET", urlFrom);
      const apiFromAfter = await request.get(urlFrom, {
        headers: { Accept: "application/json" },
      });

      logger.apiRequest("GET", urlTo);
      const apiToAfter = await request.get(urlTo, {
        headers: { Accept: "application/json" },
      });

      const apiFromDataAfter = await apiFromAfter.json();
      const apiToDataAfter = await apiToAfter.json();

      logger.apiResponse(apiFromAfter.status(), urlFrom, apiFromDataAfter);
      logger.apiResponse(apiToAfter.status(), urlTo, apiToDataAfter);

      const apiFromBalAfter = apiFromDataAfter.balance;
      const apiToBalAfter = apiToDataAfter.balance;

      expect(apiFromBalAfter).toBeCloseTo(
        apiFromBalBefore - TRANSFER_DATA.e2eTransferNum,
        2,
      );
      expect(apiToBalAfter).toBeCloseTo(
        apiToBalBefore + TRANSFER_DATA.e2eTransferNum,
        2,
      );
    });
  },
);
