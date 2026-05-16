import { expect } from "@playwright/test";
import { ACCOUNTS, CONFIG, TRANSFER_DATA } from "../../config/config";
import { test } from "../../fixtures/baseFixture";

test("tc_009 ,Balance updated on UI after an API-initiated transfer", async ({
  overviewPage,
  request,
}) => {
  let fromBalanceBefore: number;
  let toBalanceBefore: number;

  await test.step("Capture balances on the UI BEFORE transfer", async () => {
    await overviewPage.goto();
    fromBalanceBefore = await overviewPage.getBalance(
      ACCOUNTS.E2E_TRANSFER_FROM,
    );
    toBalanceBefore = await overviewPage.getBalance(ACCOUNTS.E2E_TRANSFER_TO);

    await overviewPage.page.screenshot({
      path: `test-results/screenshots/TC_009-overview-before.png`,
      fullPage: true,
    });
  });

  await test.step("Execute transfer via API", async () => {
    const transferResponse = await request.post(`${CONFIG.API_BASE}/transfer`, {
      params: {
        fromAccountId: ACCOUNTS.E2E_TRANSFER_FROM,
        toAccountId: ACCOUNTS.E2E_TRANSFER_TO,
        amount: String(TRANSFER_DATA.e2eTransferAmount),
      },
    });

    expect(transferResponse.status()).toBe(200);
  });

  await test.step("Reload UI and verify balances updated", async () => {
    await overviewPage.goto();

    await overviewPage.page.screenshot({
      path: `test-results/screenshots/TC_009-overview-after.png`,
      fullPage: true,
    });

    const fromBalanceAfter = await overviewPage.getBalance(
      ACCOUNTS.E2E_TRANSFER_FROM,
    );
    const toBalanceAfter = await overviewPage.getBalance(
      ACCOUNTS.E2E_TRANSFER_TO,
    );

    expect(fromBalanceAfter).toBeCloseTo(
      fromBalanceBefore - TRANSFER_DATA.e2eTransferAmountNum,
      2,
    );
    expect(toBalanceAfter).toBeCloseTo(
      toBalanceBefore + TRANSFER_DATA.e2eTransferAmountNum,
      2,
    );
  });
});
