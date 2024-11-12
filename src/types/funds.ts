export interface MutualFund {
  name: string;
  secid: string;
  ticker: string | null;
  isIndexFund: boolean;
  fundSizeInUSD: number | null;
  managementFee: number;
  globalCategory: string;
  numberOfHoldings: number;
  managementCompany: string;
  morningstarRating: number | null;
  investmentStrategy: string;
  prospectusNetExpense: number;
  globalBroadCategoryGroup: string;
}