import testData from "../test-data/transferData.json";

const LOCAL = "http://localhost:9090";
const GLOBAL = "https://parabank.parasoft.com";

export const CONFIG = {
  BASE_URL: LOCAL,
  API_BASE: `${LOCAL}/parabank/services/bank`,
  USERNAME: "john",
  PASSWORD: "demo",
};

export const PATH = {
  LOGIN: "/parabank/index.htm",
  TRANSFER: "/parabank/transfer.htm",
  OVERVIEW: "/parabank/overview.htm",
};

export const TEST_DATA = testData.accounts;
export const TRANSFER_DATA = testData.amounts;
