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
  6  | test(
  7  |   "tc_001 ,Non-numeric Input Validation",
  8  |   {
  9  |     tag: ["@ui", "@regression"],
  10 |   },
  11 |   async ({ transferPage }) => {
  12 |     test.fail(
  13 |       true,
  14 |       "KNOWN BUG: Server throws 500 internal error when there should be a UI warning",
  15 |     );
  16 | 
  17 |     logger.info("Starting TC_001: Non-numeric Input Validation test");
  18 | 
  19 |     await test.step("Verify account options exist", async () => {
  20 |       logger.info("Locating account dropdown options...");
  21 |       const fromOptions = transferPage.page.locator("#fromAccountId option");
> 22 |       await expect(fromOptions).not.toHaveCount(0);
     |                                     ^ Error: expect(locator).not.toHaveCount(expected) failed
  23 | 
  24 |       const optionsArray = await fromOptions.all();
  25 |       logger.info(`Found ${optionsArray.length} account options in dropdown`);
  26 |       expect(optionsArray.length).toBeGreaterThan(0);
  27 |     });
  28 | 
  29 |     await test.step("Attempt non-numeric transfer", async () => {
  30 |       logger.info(`Entering non-numeric amount: "${TRANSFER_DATA.nonNumeric}"`);
  31 |       await transferPage.enterAmount(TRANSFER_DATA.nonNumeric);
  32 | 
  33 |       logger.info("Clicking transfer button");
  34 |       await transferPage.clickTransfer();
  35 | 
  36 |       await transferPage.page.screenshot({
  37 |         path: `test-results/screenshots/TC_001-result.png`,
  38 |         fullPage: true,
  39 |       });
  40 |     });
  41 | 
  42 |     await test.step("Verify failure messages", async () => {
  43 |       logger.info("Extracting body text to verify error messages...");
  44 |       const bodyText = await transferPage.getBodyText();
  45 | 
  46 |       const hasValidationError =
  47 |         bodyText.toLowerCase().includes("amount") ||
  48 |         bodyText.toLowerCase().includes("number") ||
  49 |         bodyText.toLowerCase().includes("valid");
  50 | 
  51 |       const hasServerError =
  52 |         bodyText.includes("500") ||
  53 |         bodyText.includes("Error!") ||
  54 |         bodyText.toLowerCase().includes("internal error") ||
  55 |         bodyText.toLowerCase().includes("error occurred");
  56 | 
  57 |       logger.info("Validation Checks", { hasValidationError, hasServerError });
  58 | 
  59 |       expect(
  60 |         hasValidationError,
  61 |         "Expected a validation error message for non-numeric input",
  62 |       ).toBe(true);
  63 | 
  64 |       expect(
  65 |         hasServerError,
  66 |         `KNOWN BUG: server error should not be for input mistakes`,
  67 |       ).toBe(false);
  68 | 
  69 |       logger.info("TC_001: Completed successfully");
  70 |     });
  71 |   },
  72 | );
  73 | 
```