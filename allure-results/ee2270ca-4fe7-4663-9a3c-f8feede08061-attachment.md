# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\tc_002_negativeAmount.spec.ts >> tc_002 ,should return 400 for negative amount
- Location: tests\api\tc_002_negativeAmount.spec.ts:6:5

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
  2  | import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
  3  | import { apiTest as test } from "../../fixtures/apiFixture";
  4  | import { logger } from "../../utils/logger";
  5  | 
  6  | test(
  7  |   "tc_002 ,should return 400 for negative amount",
  8  |   {
  9  |     tag: ["@api", "@regression"],
  10 |   },
  11 |   async ({ apiRequest }) => {
  12 |     test.fail(true, "KNOWN BUG TC_002: Api Accept negative amount");
  13 | 
  14 |     let response: APIResponse;
  15 |     const accountData = TEST_DATA.tc004_overdraft;
  16 | 
  17 |     await test.step("Attempt negative transfer", async () => {
  18 |       const url = `${CONFIG.API_BASE}/transfer`;
  19 |       const params = {
  20 |         fromAccountId: accountData.from,
  21 |         toAccountId: accountData.to,
  22 |         amount: String(TRANSFER_DATA.negative),
  23 |       };
  24 | 
  25 |       logger.apiRequest("POST", url, params);
  26 | 
  27 |       response = await apiRequest.post(url, { params });
  28 |     });
  29 | 
  30 |     await test.step("Verify failure response", async () => {
  31 |       const bodyText = await response.text();
  32 |       logger.apiResponse(response.status(), response.url(), bodyText);
  33 | 
  34 |       expect(
  35 |         response.status(),
  36 |         "Expected 400 Bad Request for negative amount",
> 37 |       ).toBe(400);
     |         ^ Error: Expected 400 Bad Request for negative amount
  38 |     });
  39 |   },
  40 | );
  41 | 
```