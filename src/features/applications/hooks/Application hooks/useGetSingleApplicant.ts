import { useGetToken } from "src/hooks/useGetToken";
import { IGetSingleApplicant } from "../../types/types";
import axios from "axios";
import { END_POINT } from "src/config/environment";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";
import { useQuery } from "react-query";

const getData = async (props: { id: number }): Promise<IGetSingleApplicant> => {
  const url = `${END_POINT.BASE_URL}/admin/applicants/${props.id}`;
  const { token } = useGetToken();
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;
  const data: IGetSingleApplicant = { ...item };
  console.log("applicant data", data);
  return data;
};

export const useGetSingleApplicant = (props: { id: number }) => {
  const queryData = useQuery([QUERY_KEY_FOR_APPLICATIONS], () => getData(props), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
