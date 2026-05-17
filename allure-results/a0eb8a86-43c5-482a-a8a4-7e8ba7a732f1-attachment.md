# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\tc_001_nonNumeric.spec.ts >> tc_001 ,Non-numeric Input Validation
- Location: tests\ui\tc_001_nonNumeric.spec.ts:4:5

# Error details

```
Error: expect(locator).not.toHaveCount(expected) failed

Locator:  locator('#fromAccountId option')
Expected: not 0
Received: 0
Timeout:  5000ms

Call log:
  - Expect "not toHaveCount" with timeout 5000ms
  - waiting for locator('#fromAccountId option')
    13 × locator resolved to 0 elements
       - unexpected value "0"

```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | import { test } from "../../fixtures/baseFixture";
  3  | 
  4  | test("tc_001 ,Non-numeric Input Validation", async ({ transferPage }) => {
  5  |   test.fail(
  6  |     true,
  7  |     "KNOWN BUG: Server throws 500 internal error when there should be a UI warning",
  8  |   );
  9  |   console.log("TC_001 start");
  10 | 
  11 |   await test.step("Verify account options exist", async () => {
  12 |     const fromOptions = transferPage.page.locator("#fromAccountId option");
> 13 |     await expect(fromOptions).not.toHaveCount(0);
     |                                   ^ Error: expect(locator).not.toHaveCount(expected) failed
  14 |     const optionsArray = await fromOptions.all();
  15 |     console.log(optionsArray.length);
  16 |     expect(optionsArray.length).toBeGreaterThan(0);
  17 |   });
  18 | 
  19 |   await test.step("Attempt non-numeric transfer", async () => {
  20 |     await transferPage.enterAmount("0a");
  21 |     await transferPage.clickTransfer();
  22 |     await transferPage.page.screenshot({
  23 |       path: `test-results/screenshots/TC_001-result.png`,
  24 |       fullPage: true,
  25 |     });
  26 |   });
  27 | 
  28 |   await test.step("Verify failure messages", async () => {
  29 |     const bodyText = await transferPage.getBodyText();
  30 |     console.warn(`TC-001: ${bodyText.substring(0, 200)}`);
  31 | 
  32 |     const hasValidationError =
  33 |       bodyText.toLowerCase().includes("amount") ||
  34 |       bodyText.toLowerCase().includes("number") ||
  35 |       bodyText.toLowerCase().includes("valid");
  36 | 
  37 |     const hasServerError =
  38 |       bodyText.includes("500") ||
  39 |       bodyText.includes("Error!") ||
  40 |       bodyText.toLowerCase().includes("internal error") ||
  41 |       bodyText.toLowerCase().includes("error occurred");
  42 | 
  43 |     expect(
  44 |       hasValidationError,
  45 |       "Expected a validation error message for non-numeric input",
  46 |     ).toBe(true);
  47 | 
  48 |     expect(
  49 |       hasServerError,
  50 |       `KNOWN BUG: server error should not be for input mistakes`,
  51 |     ).toBe(false);
  52 | 
  53 |     console.log("TC_001: Completed");
  54 |   });
  55 | });
  56 | 
```