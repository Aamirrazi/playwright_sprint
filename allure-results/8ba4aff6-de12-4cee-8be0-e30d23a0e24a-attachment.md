# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\tc_001_nonNumeric.spec.ts >> tc_001 ,Non-numeric Input Validation
- Location: tests\ui\tc_001_nonNumeric.spec.ts:6:5

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
  3  | import { TEST_DATA, TRANSFER_DATA } from "../../config/config";
  4  | import { logger } from "../../utils/logger";
  5  | 
  6  | test("tc_001 ,Non-numeric Input Validation", async ({ transferPage }) => {
  7  |   test.fail(
  8  |     true,
  9  |     "KNOWN BUG: Server throws 500 internal error when there should be a UI warning",
  10 |   );
  11 |   
  12 |   logger.info("Starting TC_001: Non-numeric Input Validation test");
  13 | 
  14 |   await test.step("Verify account options exist", async () => {
  15 |     logger.info("Locating account dropdown options...");
  16 |     const fromOptions = transferPage.page.locator("#fromAccountId option");
> 17 |     await expect(fromOptions).not.toHaveCount(0);
     |                                   ^ Error: expect(locator).not.toHaveCount(expected) failed
  18 |     
  19 |     const optionsArray = await fromOptions.all();
  20 |     logger.info(`Found ${optionsArray.length} account options in dropdown`);
  21 |     expect(optionsArray.length).toBeGreaterThan(0);
  22 |   });
  23 | 
  24 |   await test.step("Attempt non-numeric transfer", async () => {
  25 |     logger.info(`Entering non-numeric amount: "${TRANSFER_DATA.nonNumeric}"`);
  26 |     await transferPage.enterAmount(TRANSFER_DATA.nonNumeric);
  27 |     
  28 |     logger.info("Clicking transfer button...");
  29 |     await transferPage.clickTransfer();
  30 |     
  31 |     await transferPage.page.screenshot({
  32 |       path: `test-results/screenshots/TC_001-result.png`,
  33 |       fullPage: true,
  34 |     });
  35 |   });
  36 | 
  37 |   await test.step("Verify failure messages", async () => {
  38 |     logger.info("Extracting body text to verify error messages...");
  39 |     const bodyText = await transferPage.getBodyText();
  40 | 
  41 |     const hasValidationError =
  42 |       bodyText.toLowerCase().includes("amount") ||
  43 |       bodyText.toLowerCase().includes("number") ||
  44 |       bodyText.toLowerCase().includes("valid");
  45 | 
  46 |     const hasServerError =
  47 |       bodyText.includes("500") ||
  48 |       bodyText.includes("Error!") ||
  49 |       bodyText.toLowerCase().includes("internal error") ||
  50 |       bodyText.toLowerCase().includes("error occurred");
  51 |       
  52 |     logger.info("Validation Checks", { hasValidationError, hasServerError });
  53 | 
  54 |     expect(
  55 |       hasValidationError,
  56 |       "Expected a validation error message for non-numeric input",
  57 |     ).toBe(true);
  58 | 
  59 |     expect(
  60 |       hasServerError,
  61 |       `KNOWN BUG: server error should not be for input mistakes`,
  62 |     ).toBe(false);
  63 | 
  64 |     logger.info("TC_001: Completed successfully");
  65 |   });
  66 | });
```