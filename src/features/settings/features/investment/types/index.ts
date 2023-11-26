export interface IInvestmentRoute {
  id: number;
  investment_name: string;
  country_id: number;
  created_at: string;
  updated_at: string;
  country: ICountry;
}

interface ICountry {
  id: number;
  country_name: string;
  created_at?: any;
  updated_at?: any;
}