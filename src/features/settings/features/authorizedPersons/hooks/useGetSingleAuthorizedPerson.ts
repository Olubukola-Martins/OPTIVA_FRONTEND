import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { QUERY_KEY_FOR_AUTHORIZED_PERSON } from "./useGetAuthorizedPersons";
import { useQuery } from "react-query";

const getData = async (props: { token: string; authorizedId: number }) => {
  const url = `${END_POINT.BASE_URL}/admin/authorized-person/${props.authorizedId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  console.log("authorized persons:", res);
  return res;
};

export const useGetSingleAuthorizedPerson = (authorizedId: number) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_AUTHORIZED_PERSON],
    () =>
      getData({
        token,
        authorizedId,
      }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
  return queryData;
};
