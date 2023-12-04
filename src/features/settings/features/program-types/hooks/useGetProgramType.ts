import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IProgram } from "../types";

export const QUERY_KEY_FOR_PROGRAM_TYPE = "programType";

const getData = async (props: { token: string }):Promise<IProgram[]> => {
  const url = `${END_POINT.BASE_URL}/admin/programtypes`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IProgram[] = res.data.data
  return data
};

export const useGetProgramType = () => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PROGRAM_TYPE],
    () => getData({ token }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
  return queryData;
};
