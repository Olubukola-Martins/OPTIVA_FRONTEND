import { ISingleEligibleDependent } from "src/features/settings/types/settingsType";
import { QUERY_KEY_ELIGIBLE_DEPENDENTS, eligibleDependentURL } from "./useCreateEligibleDependents";
import axios from "axios";
import { useGetToken } from "src/hooks/useGetToken";
import { useQuery } from "react-query";

interface IDataProps {
  id: number;
}

const getData = async (
  id: number,
  token: string
): Promise<any> => {
  const url = `${eligibleDependentURL}/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: any = res.data;


  return data;
};

export const useFetchDependent = (id: number) => {
  const { token } = useGetToken();

  const queryData = useQuery(
    [QUERY_KEY_ELIGIBLE_DEPENDENTS, id], 
    () => getData(id, token), // Pass the id and token to getData
    {
      enabled: !!id, // Only run the query if id is truthy
      onError: (err: any) => {
        // Handle errors
      },
      onSuccess: (data) => {
        console.log("response", data);
      },
    }
  );

  return queryData;
};
