import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { IUserToken } from "src/types";

export interface IInvestment extends IUserToken {
  investment_name: string;
  country_id: number;
  programtype_id: number;
}
const postRequest = async (props: IInvestment) => {
  const url = `${END_POINT.BASE_URL}/admin/investment-route`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  const body = {
    investment_name: props.investment_name,
    country_id: props.country_id,
    programtype_id:props.programtype_id
  };

  const res = await axios.post(url, body, config);
  return res;
};

export const usePostInvestmentRoute = () => {
  return useMutation(postRequest);
};
