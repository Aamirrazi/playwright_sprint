import { expect } from "@playwright/test";
import { test } from "../../fixtures/baseFixture";

test("tc_001 ,Non-numeric Input Validation", async ({ transferPage }) => {
  test.fail(
    true,
    "KNOWN BUG: Server throws 500 internal error when there should be a UI warning",
  );
  console.log("TC_001 start");

  await test.step("Verify account options exist", async () => {
    const fromOptions = transferPage.page.locator("#fromAccountId option");
    await expect(fromOptions).not.toHaveCount(0);
    const optionsArray = await fromOptions.all();
    console.log(optionsArray.length);
    expect(optionsArray.length).toBeGreaterThan(0);
  });

  await test.step("Attempt non-numeric transfer", async () => {
    await transferPage.enterAmount("0a");
    await transferPage.clickTransfer();
    await transferPage.page.screenshot({
      path: `test-results/screenshots/TC_001-result.png`,
      fullPage: true,
    });
  });

  await test.step("Verify failure messages", async () => {
    const bodyText = await transferPage.getBodyText();
    console.warn(`TC-001: ${bodyText.substring(0, 200)}`);

    const hasValidationError =
      bodyText.toLowerCase().includes("amount") ||
      bodyText.toLowerCase().includes("number") ||
      bodyText.toLowerCase().includes("valid");

    const hasServerError =
      bodyText.includes("500") ||
      bodyText.includes("Error!") ||
      bodyText.toLowerCase().includes("internal error") ||
      bodyText.toLowerCase().includes("error occurred");

    expect(
      hasValidationError,
      "Expected a validation error message for non-numeric input",
    ).toBe(true);

    expect(
      hasServerError,
      `KNOWN BUG: server error should not be for input mistakes`,
    ).toBe(false);

    console.log("TC_001: Completed");
  });
});
