# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\tc_002_negativeAmount.spec.ts >> tc_002 ,should return 400 for negative amount
- Location: tests\api\tc_002_negativeAmount.spec.ts:7:5

# Error details

```
Error: Expected 400 Bad Request for negative amount

expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 200
```

# Test source

```ts
  1  | import { APIResponse, expect } from "@playwright/test";
  2  | // import { ACCOUNTS, CONFIG, TRANSFER_DATA } from "../../config/config";
  3  | import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
  4  | 
  5  | import { apiTest as test } from "../../fixtures/apiFixture";
  6  | 
  7  | test("tc_002 ,should return 400 for negative amount", async ({
  8  |   apiRequest,
  9  | }) => {
  10 |   test.fail(true, "KNOWN BUG TC_002: Api Accept negative amount");
  11 | 
  12 |   let response: APIResponse;
  13 |   const accountData = TEST_DATA.tc004_overdraft;
  14 |   await test.step("Attempt negative transfer", async () => {
  15 |     response = await apiRequest.post(`${CONFIG.API_BASE}/transfer`, {
  16 |       params: {
  17 |         fromAccountId: accountData.from,
  18 |         toAccountId: accountData.to,
  19 |         amount: String(TRANSFER_DATA.negative),
  20 |       },
  21 |     });
  22 |   });
  23 | 
  24 |   await test.step("Verify failure response", async () => {
  25 |     console.log(`Status: ${response.status()}`);
  26 |     console.log(`Body: ${await response.text()}`);
  27 | 
  28 |     expect(
  29 |       response.status(),
  30 |       "Expected 400 Bad Request for negative amount",
> 31 |     ).toBe(400);
     |       ^ Error: Expected 400 Bad Request for negative amount
  32 |   });
  33 | });
  34 | 
```