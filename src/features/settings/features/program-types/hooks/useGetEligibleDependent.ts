import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useQuery } from "react-query";

export const QUERY_KEY_ELIGIBLE_DEPENDENTS = "EligibleDependents";

const getData = async (props: { token: string }):Promise<IDependent[]> => {
  const url = `${END_POINT.BASE_URL}/admin/eligible-dependant`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IDependent[] = res.data.data
  return data
};

export const useGetEligibleDependent = () => {
    const { token } = useGetUserInfo();
    const queryData = useQuery(
      [QUERY_KEY_ELIGIBLE_DEPENDENTS],
      () => getData({ token }),
      {
        onError: () => {},
        onSuccess: () => {},
      }
    );
    return queryData;
}
