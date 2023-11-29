import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { companyProfileProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_COMPANY_PROFILE = "companyProfile";

const getData = async (): Promise<companyProfileProps> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/company-profile`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
  const item: companyProfileProps = res.data.data;
  const data: companyProfileProps = {
    ...item,
  };

  return data;
};
export const useGetCompanyInfo = () => {
  const queryData = useQuery([QUERY_KEY_FOR_COMPANY_PROFILE], () => getData(), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
