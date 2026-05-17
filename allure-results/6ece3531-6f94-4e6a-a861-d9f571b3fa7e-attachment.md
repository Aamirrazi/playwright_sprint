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

Expected: 5810
Received: 5800

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
  6  | test(
  7  |   "tc_008 ,Valid API Transfer & GET Account Sync",
  8  |   {
  9  |     tag: ["@api", "@smoke", "@regression"],
  10 |   },
  11 |   async ({ apiRequest }) => {
  12 |     let fromBalanceBefore: number;
  13 |     let toBalanceBefore: number;
  14 |     const accountData = TEST_DATA.tc008_apiValid;
  15 | 
  16 |     await test.step("Check initial balance", async () => {
  17 |       logger.info("Fetching initial balances for API transfer...");
  18 | 
  19 |       const fromBefore = await apiRequest.get(
  20 |         `${CONFIG.API_BASE}/accounts/${accountData.from}`,
  21 |       );
  22 |       const toBefore = await apiRequest.get(
  23 |         `${CONFIG.API_BASE}/accounts/${accountData.to}`,
  24 |       );
  25 | 
  26 |       expect(fromBefore.status(), "From Account API should return 200").toBe(
  27 |         200,
  28 |       );
  29 |       expect(toBefore.status(), "To Account API should return 200").toBe(200);
  30 | 
  31 |       const fromBody = await fromBefore.json();
  32 |       const toBody = await toBefore.json();
  33 | 
  34 |       fromBalanceBefore = fromBody.balance;
  35 |       toBalanceBefore = toBody.balance;
  36 | 
  37 |       logger.info("Initial Balances", {
  38 |         from: fromBalanceBefore,
  39 |         to: toBalanceBefore,
  40 |       });
  41 |     });
  42 | 
  43 |     await test.step("Perform API transfer", async () => {
  44 |       const url = `${CONFIG.API_BASE}/transfer`;
  45 |       const params = {
  46 |         fromAccountId: accountData.from,
  47 |         toAccountId: accountData.to,
  48 |         amount: String(TRANSFER_DATA.validTransferNum),
  49 |       };
  50 | 
  51 |       logger.apiRequest("POST", url, params);
  52 | 
  53 |       const transferResp = await apiRequest.post(url, { params });
  54 | 
  55 |       logger.apiResponse(
  56 |         transferResp.status(),
  57 |         transferResp.url(),
  58 |         await transferResp.text(),
  59 |       );
  60 | 
  61 |       expect(transferResp.status(), "Transfer API should return 200").toBe(200);
  62 |     });
  63 | 
  64 |     await test.step("Check balances after transfer", async () => {
  65 |       logger.info("Fetching balances after transfer...");
  66 | 
  67 |       const fromAfter = await apiRequest.get(
  68 |         `${CONFIG.API_BASE}/accounts/${accountData.from}`,
  69 |       );
  70 |       const toAfter = await apiRequest.get(
  71 |         `${CONFIG.API_BASE}/accounts/${accountData.to}`,
  72 |       );
  73 | 
  74 |       const fromBodyAfter = await fromAfter.json();
  75 |       const toBodyAfter = await toAfter.json();
  76 | 
  77 |       const fromBalanceAfter = fromBodyAfter.balance;
  78 |       const toBalanceAfter = toBodyAfter.balance;
  79 | 
  80 |       logger.info("Final Balances", {
  81 |         from: fromBalanceAfter,
  82 |         to: toBalanceAfter,
  83 |       });
  84 | 
  85 |       expect(fromBalanceAfter).toBeCloseTo(
  86 |         fromBalanceBefore - TRANSFER_DATA.validTransferNum,
  87 |         2,
  88 |       );
> 89 |       expect(toBalanceAfter).toBeCloseTo(
     |                              ^ Error: expect(received).toBeCloseTo(expected, precision)
  90 |         toBalanceBefore + TRANSFER_DATA.validTransferNum,
  91 |         2,
  92 |       );
  93 |     });
  94 |   },
  95 | );
  96 | 
```