import { IUserToken } from "src/types";

export interface changePasswordProps extends IUserToken {
  old: string;
  password: string;
  password_confirmation: string;
}