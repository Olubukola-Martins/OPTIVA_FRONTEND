import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IOutstandingDoc } from "../../types/types";
import { QUERY_KEY_FOR_APPLICANT_DOCUMENT } from "./useGetApplicantDocumentCategory";

const getData = async (id:number): Promise<IOutstandingDoc[]> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/fetch-applicant-document/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  console.log('res', res)
  const data: IOutstandingDoc[] = res.data.data;
  return data;
};

export const useFetchOutstandingDocuments = (id:number) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICANT_DOCUMENT],
    () => getData(id),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
