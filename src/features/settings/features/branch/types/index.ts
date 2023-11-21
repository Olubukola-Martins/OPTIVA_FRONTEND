import { IUserToken } from "src/types";

export interface branchProps extends IUserToken {
  name: string;
  email: string;
  address_details: string;
  id: number;
}