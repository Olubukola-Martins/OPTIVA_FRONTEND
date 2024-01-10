// POST APPLICATION
export interface ICreateApplication {
  country_id: number;
  investmentroute_id: number;
  programtype_id: number;
  email_address: string;
  full_name: string;
  branch_id: number;
  no_of_dependents: number;
}