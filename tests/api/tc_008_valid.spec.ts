import { expect } from "@playwright/test";
import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { apiTest as test } from "../../fixtures/apiFixture";
import { logger } from "../../utils/logger";

test("tc_008 ,Valid API Transfer & GET Account Sync", async ({
  apiRequest,
}) => {
  let fromBalanceBefore: number;
  let toBalanceBefore: number;
  const accountData = TEST_DATA.tc008_apiValid;

  await test.step("Check initial balance", async () => {
    logger.info("Fetching initial balances for API transfer...");

    const fromBefore = await apiRequest.get(
      `${CONFIG.API_BASE}/accounts/${accountData.from}`,
    );
    const toBefore = await apiRequest.get(
      `${CONFIG.API_BASE}/accounts/${accountData.to}`,
    );

    expect(fromBefore.status(), "From Account API should return 200").toBe(200);
    expect(toBefore.status(), "To Account API should return 200").toBe(200);

    const fromBody = await fromBefore.json();
    const toBody = await toBefore.json();

    fromBalanceBefore = fromBody.balance;
    toBalanceBefore = toBody.balance;

    logger.info("Initial Balances", {
      from: fromBalanceBefore,
      to: toBalanceBefore,
    });
  });

  await test.step("Perform API transfer", async () => {
    const url = `${CONFIG.API_BASE}/transfer`;
    const params = {
      fromAccountId: accountData.from,
      toAccountId: accountData.to,
      amount: String(TRANSFER_DATA.validTransferNum),
    };

    logger.apiRequest("POST", url, params);

    const transferResp = await apiRequest.post(url, { params });

    logger.apiResponse(
      transferResp.status(),
      transferResp.url(),
      await transferResp.text(),
    );

    expect(transferResp.status(), "Transfer API should return 200").toBe(200);
  });

  await test.step("Check balances after transfer", async () => {
    logger.info("Fetching balances after transfer...");

    const fromAfter = await apiRequest.get(
      `${CONFIG.API_BASE}/accounts/${accountData.from}`,
    );
    const toAfter = await apiRequest.get(
      `${CONFIG.API_BASE}/accounts/${accountData.to}`,
    );

    const fromBodyAfter = await fromAfter.json();
    const toBodyAfter = await toAfter.json();

    const fromBalanceAfter = fromBodyAfter.balance;
    const toBalanceAfter = toBodyAfter.balance;

    logger.info("Final Balances", {
      from: fromBalanceAfter,
      to: toBalanceAfter,
    });

    expect(fromBalanceAfter).toBeCloseTo(
      fromBalanceBefore - TRANSFER_DATA.validTransferNum,
      2,
    );
    expect(toBalanceAfter).toBeCloseTo(
      toBalanceBefore + TRANSFER_DATA.validTransferNum,
      2,
    );
  });
});
