# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\tc_005_verifyBalance.spec.ts >> tc_005 ,Verify Balance State
- Location: tests\api\tc_005_verifyBalance.spec.ts:7:5

# Error details

```
Error: KNOWN BUG: Expected balance >= 0, but got -3110

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 0
Received:    -3110
```

# Test source

```ts
  1  | import { APIResponse, expect } from "@playwright/test";
  2  | // import { ACCOUNTS, CONFIG } from "../../config/config";
  3  | import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
  4  | 
  5  | import { apiTest as test } from "../../fixtures/apiFixture";
  6  | 
  7  | test("tc_005 ,Verify Balance State", async ({ apiRequest }) => {
  8  |   test.fail(
  9  |     true,
  10 |     "KNOWN BUG TC_005: Account balance becomes negative after overdraft",
  11 |   );
  12 | 
  13 |   let response: APIResponse;
  14 |   const accountData = TEST_DATA.tc005_balanceCheck;
  15 |   await test.step("Get account details", async () => {
  16 |     response = await apiRequest.get(
  17 |       `${CONFIG.API_BASE}/accounts/${accountData.account}`,
  18 |     );
  19 |   });
  20 | 
  21 |   await test.step("Verify balance state", async () => {
  22 |     console.log(`Status: ${response.status()}`);
  23 |     expect(response.status(), "Expected 200 OK").toBe(200);
  24 | 
  25 |     const body = await response.json();
  26 |     console.log(`Body: ${JSON.stringify(body)}`);
  27 | 
  28 |     expect(body).toHaveProperty("balance");
  29 | 
  30 |     expect(
  31 |       body.balance,
  32 |       `KNOWN BUG: Expected balance >= 0, but got ${body.balance}`,
> 33 |     ).toBeGreaterThanOrEqual(0);
     |       ^ Error: KNOWN BUG: Expected balance >= 0, but got -3110
  34 |   });
  35 | });
  36 | 
```