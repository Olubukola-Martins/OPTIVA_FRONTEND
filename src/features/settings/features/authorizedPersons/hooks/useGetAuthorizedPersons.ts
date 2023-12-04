import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IAuthorizedPerson } from "../types";

export const QUERY_KEY_FOR_AUTHORIZED_PERSON = "authorisedPerson";

const getData = async (props: { token: string }):Promise<IAuthorizedPerson[]> => {
  const url = `${END_POINT.BASE_URL}/admin/authorized-person`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IAuthorizedPerson[] = res.data.data
  return data
};

export const useGetAuthorizedPersons = () => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_AUTHORIZED_PERSON],
    () => getData({ token }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );
  return queryData;
};
