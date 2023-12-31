import { QUERY_KEY_ELIGIBLE_DEPENDENTS, eligibleDependentURL } from "./useCreateEligibleDependents";
import axios from "axios";
import { useGetToken } from "src/hooks/useGetToken";
import { useQuery } from "react-query";


const getData = async (
  id: number,
): Promise<any> => {
  const url = `${eligibleDependentURL}/${id}`;
  const token = useGetToken();

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

export const useFetchDependent = ({id}:{id: number}) => {

  const queryData = useQuery(
    [QUERY_KEY_ELIGIBLE_DEPENDENTS, id], 
    () => getData(id), // Pass the id and token to getData
    {
      enabled: !!id, // Only run the query if id is truthy
      onError: (err: any) => {
        // Handle errors
        console.log("err",err)
      },
      onSuccess: () => {
      },
    }
  );

  return queryData;
};
