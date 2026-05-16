import { expect } from "@playwright/test";
import { ACCOUNTS } from "../../config/config";
import { test } from "../../fixtures/baseFixture";

test("tc_004 ,should prevent overDraft transfer", async ({
  transferPage,
  overviewPage,
}) => {
  test.fail(true, "KNOWN BUG: App allows excess balance transfers ");
  let balanceBefore: number;
  await test.step("Check initial balance", async () => {
    await overviewPage.goto();
    balanceBefore = await overviewPage.getBalance(ACCOUNTS.OVERDRAFT_FROM);
    console.log(`Starting balance: ${balanceBefore}`);
  });
  await test.step("Attempt overdraft transfer", async () => {
    await transferPage.goto();
    await transferPage.transfer(
      ACCOUNTS.OVERDRAFT_FROM,
      ACCOUNTS.OVERDRAFT_TO,
      "300.00",
    );
    await transferPage.page.screenshot({
      path: `test-results/screenshots/TC_004-result.png`,
      fullPage: true,
    });
  });
  await test.step("Verify failure messages", async () => {
    await overviewPage.goto();
    const balanceAfter = await overviewPage.getBalance(ACCOUNTS.OVERDRAFT_FROM);
    console.log(`After balance: ${balanceAfter}`);
    const bodyText = await transferPage.getBodyText();

    expect.soft(bodyText.includes("Transfer Complete")).toBe(false);
    expect.soft(bodyText.toLowerCase().includes("insufficient")).toBe(true);
    expect(
      balanceAfter,
      "Balance should NOT have changed after a blocked overdraft transfer",
    ).toBeCloseTo(balanceBefore, 2);
  });
});
