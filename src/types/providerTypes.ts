import { AllData, Page } from "./objectTypes";

export type TUserProvider = {
  page: Page;
  setPage: (page: Page) => void;
  allData: AllData;
  setAllData: (allData: AllData) => void;
};

export type TLogInProvider = {};
