# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\tc_007_idealCase.spec.ts >> tc_007 ,Valid Transfer & Accounts Overview Update
- Location: tests\ui\tc_007_idealCase.spec.ts:6:5

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: -210
Received: -230

Expected precision:    2
Expected difference: < 0.005
Received difference:   20
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
            - row "12456 -$1749.55 $0.00" [ref=e64]:
              - cell "12456" [ref=e65]:
                - link "12456" [ref=e66] [cursor=pointer]:
                  - /url: activity.htm?id=12456
              - cell "-$1749.55" [ref=e67]
              - cell "$0.00" [ref=e68]
            - row "12567 -$3100.00 $0.00" [ref=e69]:
              - cell "12567" [ref=e70]:
                - link "12567" [ref=e71] [cursor=pointer]:
                  - /url: activity.htm?id=12567
              - cell "-$3100.00" [ref=e72]
              - cell "$0.00" [ref=e73]
            - row "12678 -$350.00 $0.00" [ref=e74]:
              - cell "12678" [ref=e75]:
                - link "12678" [ref=e76] [cursor=pointer]:
                  - /url: activity.htm?id=12678
              - cell "-$350.00" [ref=e77]
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
            - row "13011 $5760.00 $5760.00" [ref=e89]:
              - cell "13011" [ref=e90]:
                - link "13011" [ref=e91] [cursor=pointer]:
                  - /url: activity.htm?id=13011
              - cell "$5760.00" [ref=e92]
              - cell "$5760.00" [ref=e93]
            - row "13122 -$230.00 $0.00" [ref=e94]:
              - cell "13122" [ref=e95]:
                - link "13122" [ref=e96] [cursor=pointer]:
                  - /url: activity.htm?id=13122
              - cell "-$230.00" [ref=e97]
              - cell "$0.00" [ref=e98]
            - row "13233 $1430.00 $1430.00" [ref=e99]:
              - cell "13233" [ref=e100]:
                - link "13233" [ref=e101] [cursor=pointer]:
                  - /url: activity.htm?id=13233
              - cell "$1430.00" [ref=e102]
              - cell "$1430.00" [ref=e103]
            - row "13344 $1491.10 $1491.10" [ref=e104]:
              - cell "13344" [ref=e105]:
                - link "13344" [ref=e106] [cursor=pointer]:
                  - /url: activity.htm?id=13344
              - cell "$1491.10" [ref=e107]
              - cell "$1491.10" [ref=e108]
            - row "54321 $1091.12 $1091.12" [ref=e109]:
              - cell "54321" [ref=e110]:
                - link "54321" [ref=e111] [cursor=pointer]:
                  - /url: activity.htm?id=54321
              - cell "$1091.12" [ref=e112]
              - cell "$1091.12" [ref=e113]
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
  1  | import { Page, expect } from "@playwright/test";
  2  | import { PATH } from "../config/config";
  3  | 
  4  | export class AccountsOverviewPage {
  5  |   readonly page: Page;
  6  | 
  7  |   private readonly overviewTable = "#accountTable";
  8  |   private readonly accountRows = "#accountTable tbody tr";
  9  | 
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |   }
  13 |   async goto(): Promise<void> {
  14 |     await this.page.goto(PATH.OVERVIEW);
  15 |     await this.page.waitForSelector(this.overviewTable);
  16 |   }
  17 | 
  18 |   async getBalance(accountId: string): Promise<number> {
  19 |     const row = this.page.locator(
  20 |       `#accountTable tbody tr:has(a:text("${accountId}"))`,
  21 |     );
  22 |     await expect(row).toBeVisible();
  23 | 
  24 |     const balanceText = await row.locator("td").nth(1).textContent();
  25 |     const cleaned = (balanceText ?? "").replace(/[$,]/g, "").trim();
  26 |     const balance = parseFloat(cleaned);
  27 |     return balance;
  28 |   }
  29 | 
  30 |   async getAvailableAmount(accountId: string): Promise<number> {
  31 |     const row = this.page.locator(
  32 |       `#accountTable tbody tr:has(a:text("${accountId}"))`,
  33 |     );
  34 |     await expect(row).toBeVisible();
  35 | 
  36 |     const amountText = await row.locator("td").nth(2).textContent();
  37 |     const cleaned = (amountText ?? "").replace(/[$,]/g, "").trim();
  38 |     const amount = parseFloat(cleaned);
  39 |     return amount;
  40 |   }
  41 | 
  42 |   async assertBalance(
  43 |     accountId: string,
  44 |     expectedBalance: number,
  45 |   ): Promise<void> {
  46 |     const actual = await this.getBalance(accountId);
  47 |     expect(actual).toBeCloseTo(expectedBalance, 2);
  48 |   }
  49 | 
  50 |   async assertBalanceDecreasedBy(
  51 |     accountId: string,
  52 |     balanceBefore: number,
  53 |     decreaseAmount: number,
  54 |   ): Promise<void> {
  55 |     const balanceAfter = await this.getBalance(accountId);
  56 |     const expected = balanceBefore - decreaseAmount;
> 57 |     expect(balanceAfter).toBeCloseTo(expected, 2);
     |                          ^ Error: expect(received).toBeCloseTo(expected, precision)
  58 |   }
  59 | 
  60 |   async assertBalanceIncreasedBy(
  61 |     accountId: string,
  62 |     balanceBefore: number,
  63 |     increaseAmount: number,
  64 |   ): Promise<void> {
  65 |     const balanceAfter = await this.getBalance(accountId);
  66 |     const expected = balanceBefore + increaseAmount;
  67 |     expect(balanceAfter).toBeCloseTo(expected, 2);
  68 |   }
  69 | 
  70 |   async assertOnPage(): Promise<void> {
  71 |     await expect(this.page).toHaveURL(/overview\.htm/);
  72 |     await expect(this.page.locator(this.overviewTable)).toBeVisible();
  73 |   }
  74 | }
  75 | 
```