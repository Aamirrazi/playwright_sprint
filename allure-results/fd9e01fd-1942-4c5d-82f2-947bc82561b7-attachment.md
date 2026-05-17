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
  6  | test("tc_002 ,should return 400 for negative amount", async ({
  7  |   apiRequest,
  8  | }) => {
  9  |   test.fail(true, "KNOWN BUG TC_002: Api Accept negative amount");
  10 | 
  11 |   let response: APIResponse;
  12 |   const accountData = TEST_DATA.tc004_overdraft;
  13 | 
  14 |   await test.step("Attempt negative transfer", async () => {
  15 |     const url = `${CONFIG.API_BASE}/transfer`;
  16 |     const params = {
  17 |       fromAccountId: accountData.from,
  18 |       toAccountId: accountData.to,
  19 |       amount: String(TRANSFER_DATA.negative),
  20 |     };
  21 | 
  22 |     logger.apiRequest("POST", url, params);
  23 | 
  24 |     response = await apiRequest.post(url, { params });
  25 |   });
  26 | 
  27 |   await test.step("Verify failure response", async () => {
  28 |     const bodyText = await response.text();
  29 |     logger.apiResponse(response.status(), response.url(), bodyText);
  30 | 
  31 |     expect(
  32 |       response.status(),
  33 |       "Expected 400 Bad Request for negative amount",
> 34 |     ).toBe(400);
     |       ^ Error: Expected 400 Bad Request for negative amount
  35 |   });
  36 | });
  37 | 
```