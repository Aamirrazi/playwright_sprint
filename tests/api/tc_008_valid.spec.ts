import { expect } from "@playwright/test";
import { ACCOUNTS, CONFIG, TRANSFER_DATA } from "../../config/config";
import { apiTest as test } from "../../fixtures/apiFixture";

test("tc_008 ,Valid API Transfer & GET Account Sync", async ({
  apiRequest,
}) => {
  let fromBalanceBefore: number;
  let toBalanceBefore: number;

  await test.step("Check initial balance", async () => {
    const fromBefore = await apiRequest.get(
      `${CONFIG.API_BASE}/accounts/${ACCOUNTS.API_TRANSFER_FROM}`,
    );
    const toBefore = await apiRequest.get(
      `${CONFIG.API_BASE}/accounts/${ACCOUNTS.API_TRANSFER_TO}`,
    );

    expect(fromBefore.status(), "From Account API should return 200").toBe(200);
    expect(toBefore.status(), "To Account API should return 200").toBe(200);

    const fromBody = await fromBefore.json();
    const toBody = await toBefore.json();

    fromBalanceBefore = fromBody.balance;
    toBalanceBefore = toBody.balance;
  });

  await test.step("Perform API transfer", async () => {
    const transferResp = await apiRequest.post(`${CONFIG.API_BASE}/transfer`, {
      params: {
        fromAccountId: ACCOUNTS.API_TRANSFER_FROM,
        toAccountId: ACCOUNTS.API_TRANSFER_TO,
        amount: String(TRANSFER_DATA.apiTransferAmount),
      },
    });

    expect(transferResp.status(), "Transfer API should return 200").toBe(200);
  });

  await test.step("Check balances after transfer", async () => {
    const fromAfter = await apiRequest.get(
      `${CONFIG.API_BASE}/accounts/${ACCOUNTS.API_TRANSFER_FROM}`,
    );
    const toAfter = await apiRequest.get(
      `${CONFIG.API_BASE}/accounts/${ACCOUNTS.API_TRANSFER_TO}`,
    );

    const fromBodyAfter = await fromAfter.json();
    const toBodyAfter = await toAfter.json();

    const fromBalanceAfter = fromBodyAfter.balance;
    const toBalanceAfter = toBodyAfter.balance;

    expect(fromBalanceAfter).toBeCloseTo(
      fromBalanceBefore - TRANSFER_DATA.apiTransferAmount,
      2,
    );
    expect(toBalanceAfter).toBeCloseTo(
      toBalanceBefore + TRANSFER_DATA.apiTransferAmount,
      2,
    );
  });
});
