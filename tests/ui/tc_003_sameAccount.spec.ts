import { expect } from "@playwright/test";
import { ACCOUNTS } from "../../config/config";
import { test } from "../../fixtures/baseFixture";

test("tc_003 ,Same Account Transfer", async ({ transferPage }) => {
  test.fail(true, "KNOWN BUG: App allows same-account transfers ");

  await test.step("Attempt same-account transfer", async () => {
    await transferPage.goto();
    await transferPage.transfer(
      ACCOUNTS.SAME_ACCOUNT,
      ACCOUNTS.SAME_ACCOUNT,
      "10.00",
    );
    await transferPage.page.screenshot({
      path: `test-results/screenshots/TC_003-result.png`,
      fullPage: true,
    });
  });

  await test.step("Verify failure messages", async () => {
    const bodyText = await transferPage.getBodyText();
    const transferCompleted = bodyText.includes("Transfer Complete");
    const errorShown =
      bodyText.toLowerCase().includes("same") ||
      bodyText.toLowerCase().includes("error");

    expect
      .soft(
        transferCompleted,
        "Transfer should not be allowed onto same account",
      )
      .toBe(false);
    expect.soft(errorShown, "validation error should be visible").toBe(true);
    console.log("TC_003: Completed");
  });
});
