# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\tc_005_verifyBalance.spec.ts >> tc_005 ,Verify Balance State
- Location: tests\api\tc_005_verifyBalance.spec.ts:6:5

# Error details

```
Error: KNOWN BUG: Expected balance >= 0, but got -3100

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 0
Received:    -3100
```

# Test source

```ts
  1  | import { APIResponse, expect } from "@playwright/test";
  2  | import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
  3  | import { apiTest as test } from "../../fixtures/apiFixture";
  4  | import { logger } from "../../utils/logger";
  5  | 
  6  | test(
  7  |   "tc_005 ,Verify Balance State",
  8  |   {
  9  |     tag: ["@api", "@regression"],
  10 |   },
  11 |   async ({ apiRequest }) => {
  12 |     test.fail(
  13 |       true,
  14 |       "KNOWN BUG TC_005: Account balance becomes negative after overdraft",
  15 |     );
  16 | 
  17 |     let response: APIResponse;
  18 |     const accountData = TEST_DATA.tc005_balanceCheck;
  19 |     const url = `${CONFIG.API_BASE}/accounts/${accountData.account}`;
  20 | 
  21 |     await test.step("Get account details", async () => {
  22 |       logger.apiRequest("GET", url);
  23 |       response = await apiRequest.get(url);
  24 |     });
  25 | 
  26 |     await test.step("Verify balance state", async () => {
  27 |       const body = await response.json();
  28 |       logger.apiResponse(response.status(), response.url(), body);
  29 | 
  30 |       expect(response.status(), "Expected 200 OK").toBe(200);
  31 |       expect(body).toHaveProperty("balance");
  32 | 
  33 |       expect(
  34 |         body.balance,
  35 |         `KNOWN BUG: Expected balance >= 0, but got ${body.balance}`,
> 36 |       ).toBeGreaterThanOrEqual(0);
     |         ^ Error: KNOWN BUG: Expected balance >= 0, but got -3100
  37 |     });
  38 |   },
  39 | );
  40 | 
```