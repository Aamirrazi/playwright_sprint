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
  6  | test("tc_005 ,Verify Balance State", async ({ apiRequest }) => {
  7  |   test.fail(
  8  |     true,
  9  |     "KNOWN BUG TC_005: Account balance becomes negative after overdraft",
  10 |   );
  11 | 
  12 |   let response: APIResponse;
  13 |   const accountData = TEST_DATA.tc005_balanceCheck;
  14 |   const url = `${CONFIG.API_BASE}/accounts/${accountData.account}`;
  15 | 
  16 |   await test.step("Get account details", async () => {
  17 |     logger.apiRequest("GET", url);
  18 |     response = await apiRequest.get(url);
  19 |   });
  20 | 
  21 |   await test.step("Verify balance state", async () => {
  22 |     const body = await response.json();
  23 |     logger.apiResponse(response.status(), response.url(), body);
  24 | 
  25 |     expect(response.status(), "Expected 200 OK").toBe(200);
  26 |     expect(body).toHaveProperty("balance");
  27 | 
  28 |     expect(
  29 |       body.balance,
  30 |       `KNOWN BUG: Expected balance >= 0, but got ${body.balance}`,
> 31 |     ).toBeGreaterThanOrEqual(0);
     |       ^ Error: KNOWN BUG: Expected balance >= 0, but got -3100
  32 |   });
  33 | });
  34 | 
```