import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IMasterList } from "../types";

const QUERY_KEY_FOR_MASTERS_LIST = "mastersList";

const getData = async (): Promise<IMasterList[]> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/master-list/applicants`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);

  const data: IMasterList[] = res.data.data.map((item: IMasterList) => ({
    ...item,
  }));

  return data;
};

export const useFetchMastersList = () => {
  const queryData = useQuery([QUERY_KEY_FOR_MASTERS_LIST], () => getData(), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
