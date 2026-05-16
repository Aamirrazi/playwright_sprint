import { expect } from "@playwright/test";
import { ACCOUNTS, CONFIG, TRANSFER_DATA } from "../../config/config";
import { test } from "../../fixtures/baseFixture";

test("tc-006 ,E2E Transaction Logging Sync", async ({
  transferPage,
  overviewPage,
  request,
}) => {
  let uiFromBefore: number;
  let uiToBefore: number;
  let apiFromBalBefore: number;
  let apiToBalBefore: number;

  await test.step("Read UI balances before", async () => {
    await overviewPage.goto();
    uiFromBefore = await overviewPage.getBalance(ACCOUNTS.UI_TRANSFER_FROM);
    uiToBefore = await overviewPage.getBalance(ACCOUNTS.UI_TRANSFER_TO);
  });

  await test.step("Read API balances before", async () => {
    const apiFromBefore = await request.get(
      `${CONFIG.API_BASE}/accounts/${ACCOUNTS.UI_TRANSFER_FROM}`,
      { headers: { Accept: "application/json" } },
    );
    const apiToBefore = await request.get(
      `${CONFIG.API_BASE}/accounts/${ACCOUNTS.UI_TRANSFER_TO}`,
      { headers: { Accept: "application/json" } },
    );

    const apiFromData = await apiFromBefore.json();
    const apiToData = await apiToBefore.json();

    apiFromBalBefore = apiFromData.balance;
    apiToBalBefore = apiToData.balance;

    expect(uiFromBefore).toBeCloseTo(apiFromBalBefore, 2);
    expect(uiToBefore).toBeCloseTo(apiToBalBefore, 2);
  });

  await test.step("Perform the transfer via UI", async () => {
    await transferPage.goto();
    await transferPage.transfer(
      ACCOUNTS.UI_TRANSFER_FROM,
      ACCOUNTS.UI_TRANSFER_TO,
      TRANSFER_DATA.validTransferAmount,
    );
    await transferPage.assertTransferSuccess();

    await transferPage.page.screenshot({
      path: `test-results/screenshots/E2E-transfer-success.png`,
      fullPage: true,
    });
  });

  await test.step("Verify UI Overview updated", async () => {
    await overviewPage.goto();
    const uiFromAfter = await overviewPage.getBalance(
      ACCOUNTS.UI_TRANSFER_FROM,
    );
    const uiToAfter = await overviewPage.getBalance(ACCOUNTS.UI_TRANSFER_TO);

    expect(uiFromAfter).toBeCloseTo(
      uiFromBefore - TRANSFER_DATA.validTransferAmountNum,
      2,
    );
    expect(uiToAfter).toBeCloseTo(
      uiToBefore + TRANSFER_DATA.validTransferAmountNum,
      2,
    );

    await overviewPage.page.screenshot({
      path: `test-results/screenshots/E2E-overview-after.png`,
      fullPage: true,
    });
  });

  await test.step("Verify API reflects the change", async () => {
    const apiFromAfter = await request.get(
      `${CONFIG.API_BASE}/accounts/${ACCOUNTS.UI_TRANSFER_FROM}`,
      { headers: { Accept: "application/json" } },
    );
    const apiToAfter = await request.get(
      `${CONFIG.API_BASE}/accounts/${ACCOUNTS.UI_TRANSFER_TO}`,
      { headers: { Accept: "application/json" } },
    );

    const apiFromDataAfter = await apiFromAfter.json();
    const apiToDataAfter = await apiToAfter.json();

    const apiFromBalAfter = apiFromDataAfter.balance;
    const apiToBalAfter = apiToDataAfter.balance;

    expect(apiFromBalAfter).toBeCloseTo(
      apiFromBalBefore - TRANSFER_DATA.validTransferAmountNum,
      2,
    );
    expect(apiToBalAfter).toBeCloseTo(
      apiToBalBefore + TRANSFER_DATA.validTransferAmountNum,
      2,
    );
  });
});
