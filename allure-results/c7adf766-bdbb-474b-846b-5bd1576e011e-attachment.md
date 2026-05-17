# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\tc_003_sameAccount.spec.ts >> tc_003 ,Same Account Transfer
- Location: tests\ui\tc_003_sameAccount.spec.ts:6:5

# Error details

```
Error: Transfer should not be allowed onto same account

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
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
        - heading "Transfer Complete!" [level=1] [ref=e51]
        - paragraph [ref=e52]: "$10.00 has been transferred from account #13344 to account #13344."
        - paragraph [ref=e53]: See Account Activity for more details.
  - generic [ref=e55]:
    - list [ref=e56]:
      - listitem [ref=e57]:
        - link "Home" [ref=e58] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e59]:
        - link "About Us" [ref=e60] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e61]:
        - link "Services" [ref=e62] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e63]:
        - link "Products" [ref=e64] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e65]:
        - link "Locations" [ref=e66] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e67]:
        - link "Forum" [ref=e68] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e69]:
        - link "Site Map" [ref=e70] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e71]:
        - link "Contact Us" [ref=e72] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e73]: © Parasoft. All rights reserved.
    - list [ref=e74]:
      - listitem [ref=e75]: "Visit us at:"
      - listitem [ref=e76]:
        - link "www.parasoft.com" [ref=e77] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | import { TEST_DATA, TRANSFER_DATA } from "../../config/config";
  3  | import { test } from "../../fixtures/baseFixture";
  4  | import { logger } from "../../utils/logger";
  5  | 
  6  | test(
  7  |   "tc_003 ,Same Account Transfer",
  8  |   {
  9  |     tag: ["@ui", "@regression"],
  10 |   },
  11 |   async ({ transferPage }) => {
  12 |     test.fail(true, "KNOWN BUG: App allows same-account transfers");
  13 | 
  14 |     const accountInfo = TEST_DATA.tc003_same;
  15 |     logger.info("Starting TC_003: Same Account Transfer test");
  16 | 
  17 |     await test.step("Attempt same-account transfer", async () => {
  18 |       logger.info("Navigating to Transfer Page...");
  19 |       await transferPage.goto();
  20 | 
  21 |       logger.info(
  22 |         `Attempting to transfer ${TRANSFER_DATA.sameAccount} from ${accountInfo.from} to ${accountInfo.to}`,
  23 |       );
  24 |       await transferPage.transfer(
  25 |         accountInfo.from,
  26 |         accountInfo.to,
  27 |         TRANSFER_DATA.sameAccount,
  28 |       );
  29 | 
  30 |       await transferPage.page.screenshot({
  31 |         path: `test-results/screenshots/TC_003-result.png`,
  32 |         fullPage: true,
  33 |       });
  34 |     });
  35 | 
  36 |     await test.step("Verify failure messages", async () => {
  37 |       logger.info("Extracting body text to verify error messages...");
  38 |       const bodyText = await transferPage.getBodyText();
  39 | 
  40 |       const transferCompleted = bodyText.includes("Transfer Complete");
  41 |       const errorShown =
  42 |         bodyText.toLowerCase().includes("same") ||
  43 |         bodyText.toLowerCase().includes("error");
  44 | 
  45 |       logger.info("Validation Checks", { transferCompleted, errorShown });
  46 | 
  47 |       expect
  48 |         .soft(
  49 |           transferCompleted,
  50 |           "Transfer should not be allowed onto same account",
  51 |         )
> 52 |         .toBe(false);
     |          ^ Error: Transfer should not be allowed onto same account
  53 | 
  54 |       expect.soft(errorShown, "validation error should be visible").toBe(true);
  55 | 
  56 |       logger.info("TC_003: Completed successfully");
  57 |     });
  58 |   },
  59 | );
  60 | 
```