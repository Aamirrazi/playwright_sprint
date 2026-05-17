# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\tc_008_valid.spec.ts >> tc_008 ,Valid API Transfer & GET Account Sync
- Location: tests\api\tc_008_valid.spec.ts:6:5

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 5130
Received: 5120

Expected precision:    2
Expected difference: < 0.005
Received difference:   10
```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
  3  | import { apiTest as test } from "../../fixtures/apiFixture";
  4  | import { logger } from "../../utils/logger";
  5  | 
  6  | test("tc_008 ,Valid API Transfer & GET Account Sync", async ({
  7  |   apiRequest,
  8  | }) => {
  9  |   let fromBalanceBefore: number;
  10 |   let toBalanceBefore: number;
  11 |   const accountData = TEST_DATA.tc008_apiValid;
  12 | 
  13 |   await test.step("Check initial balance", async () => {
  14 |     logger.info("Fetching initial balances for API transfer...");
  15 | 
  16 |     const fromBefore = await apiRequest.get(
  17 |       `${CONFIG.API_BASE}/accounts/${accountData.from}`,
  18 |     );
  19 |     const toBefore = await apiRequest.get(
  20 |       `${CONFIG.API_BASE}/accounts/${accountData.to}`,
  21 |     );
  22 | 
  23 |     expect(fromBefore.status(), "From Account API should return 200").toBe(200);
  24 |     expect(toBefore.status(), "To Account API should return 200").toBe(200);
  25 | 
  26 |     const fromBody = await fromBefore.json();
  27 |     const toBody = await toBefore.json();
  28 | 
  29 |     fromBalanceBefore = fromBody.balance;
  30 |     toBalanceBefore = toBody.balance;
  31 | 
  32 |     logger.info("Initial Balances", {
  33 |       from: fromBalanceBefore,
  34 |       to: toBalanceBefore,
  35 |     });
  36 |   });
  37 | 
  38 |   await test.step("Perform API transfer", async () => {
  39 |     const url = `${CONFIG.API_BASE}/transfer`;
  40 |     const params = {
  41 |       fromAccountId: accountData.from,
  42 |       toAccountId: accountData.to,
  43 |       amount: String(TRANSFER_DATA.validTransferNum),
  44 |     };
  45 | 
  46 |     logger.apiRequest("POST", url, params);
  47 | 
  48 |     const transferResp = await apiRequest.post(url, { params });
  49 | 
  50 |     logger.apiResponse(
  51 |       transferResp.status(),
  52 |       transferResp.url(),
  53 |       await transferResp.text(),
  54 |     );
  55 | 
  56 |     expect(transferResp.status(), "Transfer API should return 200").toBe(200);
  57 |   });
  58 | 
  59 |   await test.step("Check balances after transfer", async () => {
  60 |     logger.info("Fetching balances after transfer...");
  61 | 
  62 |     const fromAfter = await apiRequest.get(
  63 |       `${CONFIG.API_BASE}/accounts/${accountData.from}`,
  64 |     );
  65 |     const toAfter = await apiRequest.get(
  66 |       `${CONFIG.API_BASE}/accounts/${accountData.to}`,
  67 |     );
  68 | 
  69 |     const fromBodyAfter = await fromAfter.json();
  70 |     const toBodyAfter = await toAfter.json();
  71 | 
  72 |     const fromBalanceAfter = fromBodyAfter.balance;
  73 |     const toBalanceAfter = toBodyAfter.balance;
  74 | 
  75 |     logger.info("Final Balances", {
  76 |       from: fromBalanceAfter,
  77 |       to: toBalanceAfter,
  78 |     });
  79 | 
  80 |     expect(fromBalanceAfter).toBeCloseTo(
  81 |       fromBalanceBefore - TRANSFER_DATA.validTransferNum,
  82 |       2,
  83 |     );
> 84 |     expect(toBalanceAfter).toBeCloseTo(
     |                            ^ Error: expect(received).toBeCloseTo(expected, precision)
  85 |       toBalanceBefore + TRANSFER_DATA.apiTransfer,
  86 |       2,
  87 |     );
  88 |   });
  89 | });
  90 | 
```