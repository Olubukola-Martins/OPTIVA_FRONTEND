import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { IUserToken } from "src/types";

interface ICountry extends IUserToken {
  country_name: string;
  program_types: any[];
}
const postRequest = async (props: ICountry) => {
  const url = `${END_POINT.BASE_URL}/admin/countries`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  const body = {
    country_name: props.country_name,
    program_types: props.program_types,
  };

  const res = await axios.post(url, body, config);
  return res;
};

export const usePostCountry = () => {
    return useMutation(postRequest);
};
