import { expect } from "@playwright/test";
import { ACCOUNTS, CONFIG, TRANSFER_DATA } from "../../config/config";
import { apiTest as test } from "../../fixtures/apiFixture";

test("tc_008 ,should reflect exactly 50 change", async ({ apiRequest }) => {
  let fromBalanceBefore: number;
  let toBalanceBefore: number;

  await test.step("Check initial balance", async () => {
    const fromBefore = await apiRequest.get(
      `/accounts/${ACCOUNTS.API_TRANSFER_FROM}`,
    );
    const toBefore = await apiRequest.get(
      `/accounts/${ACCOUNTS.API_TRANSFER_TO}`,
    );

    expect(fromBefore.status()).toBe(200);
    expect(toBefore.status()).toBe(200);

    const fromBody = await fromBefore.json();
    const toBody = await toBefore.json();

    fromBalanceBefore = fromBody.balance;
    toBalanceBefore = toBody.balance;
  });

  await test.step("Perform API transfer", async () => {
    const transferResp = await apiRequest.post("/transfer", {
      params: {
        fromAccountId: ACCOUNTS.API_TRANSFER_FROM,
        toAccountId: ACCOUNTS.API_TRANSFER_TO,
        amount: String(TRANSFER_DATA.apiTransferAmount),
      },
    });

    expect(transferResp.status()).toBe(200);
  });

  await test.step("Check balances after transfer", async () => {
    const fromAfter = await apiRequest.get(
      `/accounts/${ACCOUNTS.API_TRANSFER_FROM}`,
    );
    const toAfter = await apiRequest.get(
      `/accounts/${ACCOUNTS.API_TRANSFER_TO}`,
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
