const LOCAL = "http://localhost:9090";
const GLOBAL = "https://parabank.parasoft.com";

const base = LOCAL;

export const CONFIG = {
  BASE_URL: base,
  API_BASE: `${base}/parabank/services/bank`,
  USERNAME: "john",
  PASSWORD: "demo",
};
export const PATH = {
  LOGIN: "/parabank/index.htm",
  TRANSFER: "/parabank/transfer.htm",
  OVERVIEW: "/parabank/overview.htm",
  REGISTER: "/parabank/register.htm",
};
export const ACCOUNTS = {
  SAME_ACCOUNT: "13344",
  OVERDRAFT_FROM: "12567",
  OVERDRAFT_TO: "13011",
  UI_TRANSFER_FROM: "13122",
  UI_TRANSFER_TO: "13233",
  API_TRANSFER_FROM: "12789",
  API_TRANSFER_TO: "13011",
  E2E_TRANSFER_FROM: "54321",
  E2E_TRANSFER_TO: "13344",
};
export const TRANSFER_DATA = {
  nonNumericAmount: "abc",
  negativeAmount: -10,

  sameAccountAmount: "10.00",

  overdraftAmount: "300.00",
  overdraftAccountBalance: 10.45,
  validTransferAmount: "50",
  validTransferAmountNum: 50,

  apiTransferAmount: 50,

  e2eTransferAmount: 20,
  e2eTransferAmountNum: 20,
};
