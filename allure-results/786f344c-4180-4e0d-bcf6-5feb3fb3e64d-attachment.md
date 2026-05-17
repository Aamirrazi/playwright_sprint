# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\tc_004_overDraft.spec.ts >> tc_004 ,Exceed Available Balance (Overdraft)
- Location: tests\ui\tc_004_overDraft.spec.ts:7:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

```
Error: Balance should NOT have changed after a blocked overdraft transfer

expect(received).toBeCloseTo(expected, precision)

Expected: -869.55
Received: -1169.55

Expected precision:    2
Expected difference: < 0.005
Received difference:   300
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome John Smith
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Accounts Overview" [level=1] [ref=e51]
        - table [ref=e52]:
          - rowgroup [ref=e53]:
            - row "Account Balance* Available Amount" [ref=e54]:
              - columnheader "Account" [ref=e55]
              - columnheader "Balance*" [ref=e56]
              - columnheader "Available Amount" [ref=e57]
          - rowgroup [ref=e58]:
            - row "12345 -$2300.00 $0.00" [ref=e59]:
              - cell "12345" [ref=e60]:
                - link "12345" [ref=e61] [cursor=pointer]:
                  - /url: activity.htm?id=12345
              - cell "-$2300.00" [ref=e62]
              - cell "$0.00" [ref=e63]
            - row "12456 -$1169.55 $0.00" [ref=e64]:
              - cell "12456" [ref=e65]:
                - link "12456" [ref=e66] [cursor=pointer]:
                  - /url: activity.htm?id=12456
              - cell "-$1169.55" [ref=e67]
              - cell "$0.00" [ref=e68]
            - row "12567 -$3110.00 $0.00" [ref=e69]:
              - cell "12567" [ref=e70]:
                - link "12567" [ref=e71] [cursor=pointer]:
                  - /url: activity.htm?id=12567
              - cell "-$3110.00" [ref=e72]
              - cell "$0.00" [ref=e73]
            - row "12678 -$200.00 $0.00" [ref=e74]:
              - cell "12678" [ref=e75]:
                - link "12678" [ref=e76] [cursor=pointer]:
                  - /url: activity.htm?id=12678
              - cell "-$200.00" [ref=e77]
              - cell "$0.00" [ref=e78]
            - row "12789 -$350.00 $0.00" [ref=e79]:
              - cell "12789" [ref=e80]:
                - link "12789" [ref=e81] [cursor=pointer]:
                  - /url: activity.htm?id=12789
              - cell "-$350.00" [ref=e82]
              - cell "$0.00" [ref=e83]
            - row "12900 $0.00 $0.00" [ref=e84]:
              - cell "12900" [ref=e85]:
                - link "12900" [ref=e86] [cursor=pointer]:
                  - /url: activity.htm?id=12900
              - cell "$0.00" [ref=e87]
              - cell "$0.00" [ref=e88]
            - row "13011 $5040.00 $5040.00" [ref=e89]:
              - cell "13011" [ref=e90]:
                - link "13011" [ref=e91] [cursor=pointer]:
                  - /url: activity.htm?id=13011
              - cell "$5040.00" [ref=e92]
              - cell "$5040.00" [ref=e93]
            - row "13122 -$40.00 $0.00" [ref=e94]:
              - cell "13122" [ref=e95]:
                - link "13122" [ref=e96] [cursor=pointer]:
                  - /url: activity.htm?id=13122
              - cell "-$40.00" [ref=e97]
              - cell "$0.00" [ref=e98]
            - row "13233 $1240.00 $1240.00" [ref=e99]:
              - cell "13233" [ref=e100]:
                - link "13233" [ref=e101] [cursor=pointer]:
                  - /url: activity.htm?id=13233
              - cell "$1240.00" [ref=e102]
              - cell "$1240.00" [ref=e103]
            - row "13344 $1451.10 $1451.10" [ref=e104]:
              - cell "13344" [ref=e105]:
                - link "13344" [ref=e106] [cursor=pointer]:
                  - /url: activity.htm?id=13344
              - cell "$1451.10" [ref=e107]
              - cell "$1451.10" [ref=e108]
            - row "54321 $1131.12 $1131.12" [ref=e109]:
              - cell "54321" [ref=e110]:
                - link "54321" [ref=e111] [cursor=pointer]:
                  - /url: activity.htm?id=54321
              - cell "$1131.12" [ref=e112]
              - cell "$1131.12" [ref=e113]
            - row "Total $1692.67" [ref=e114]:
              - cell "Total" [ref=e115]
              - cell "$1692.67" [ref=e116]
              - cell [ref=e117]
          - rowgroup [ref=e118]:
            - row "*Balance includes deposits that may be subject to holds" [ref=e119]:
              - cell "*Balance includes deposits that may be subject to holds" [ref=e120]
  - generic [ref=e122]:
    - list [ref=e123]:
      - listitem [ref=e124]:
        - link "Home" [ref=e125] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e126]:
        - link "About Us" [ref=e127] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e128]:
        - link "Services" [ref=e129] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e130]:
        - link "Products" [ref=e131] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e132]:
        - link "Locations" [ref=e133] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e134]:
        - link "Forum" [ref=e135] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e136]:
        - link "Site Map" [ref=e137] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e138]:
        - link "Contact Us" [ref=e139] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e140]: © Parasoft. All rights reserved.
    - list [ref=e141]:
      - listitem [ref=e142]: "Visit us at:"
      - listitem [ref=e143]:
        - link "www.parasoft.com" [ref=e144] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | // import { ACCOUNTS } from "../../config/config";
  3  | import { TEST_DATA, TRANSFER_DATA } from "../../config/config";
  4  | 
  5  | import { test } from "../../fixtures/baseFixture";
  6  | 
  7  | test("tc_004 ,Exceed Available Balance (Overdraft)", async ({
  8  |   transferPage,
  9  |   overviewPage,
  10 | }) => {
  11 |   test.fail(true, "KNOWN BUG: App allows excess balance transfers ");
  12 |   let balanceBefore: number;
  13 |   const accountInfo = TEST_DATA.tc004_overdraft;
  14 |   await test.step("Check initial balance", async () => {
  15 |     await overviewPage.goto();
  16 |     balanceBefore = await overviewPage.getBalance(accountInfo.from);
  17 |     console.log(`Starting balance: ${balanceBefore}`);
  18 |   });
  19 |   await test.step("Attempt overdraft transfer", async () => {
  20 |     await transferPage.goto();
  21 |     await transferPage.transfer(
  22 |       accountInfo.from,
  23 |       accountInfo.to,
  24 |       TRANSFER_DATA.overdraft,
  25 |     );
  26 |     await transferPage.page.screenshot({
  27 |       path: `test-results/screenshots/TC_004-result.png`,
  28 |       fullPage: true,
  29 |     });
  30 |   });
  31 |   await test.step("Verify failure messages", async () => {
  32 |     await overviewPage.goto();
  33 |     const balanceAfter = await overviewPage.getBalance(accountInfo.from);
  34 |     console.log(`After balance: ${balanceAfter}`);
  35 |     const bodyText = await transferPage.getBodyText();
  36 | 
  37 |     expect.soft(bodyText.includes("Transfer Complete")).toBe(false);
  38 |     expect.soft(bodyText.toLowerCase().includes("insufficient")).toBe(true);
  39 |     expect(
  40 |       balanceAfter,
  41 |       "Balance should NOT have changed after a blocked overdraft transfer",
> 42 |     ).toBeCloseTo(balanceBefore, 2);
     |       ^ Error: Balance should NOT have changed after a blocked overdraft transfer
  43 |   });
  44 | });
  45 | 
```