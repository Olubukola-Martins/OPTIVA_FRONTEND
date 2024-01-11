import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IApplications } from "../types/types";

export const QUERY_KEY_FOR_APPLICANTS = "applicants";

const getData = async (): Promise<IApplications[]> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/applicants`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IApplications[] = res.data.data;
  return data;
};

export const useFetchAllApplicants = () => {
  const queryData = useQuery([QUERY_KEY_FOR_APPLICANTS], () => getData(), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
