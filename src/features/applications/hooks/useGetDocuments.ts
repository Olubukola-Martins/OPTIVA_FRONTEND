import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IDocuments } from "../types/types";
import { QUERY_KEY_FOR_APPLICANT_DOCUMENT } from "./useGetApplicantDocumentCategory";
import { useQuery } from "react-query";

const getData = async (): Promise<IDocuments[]> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/document-requirement`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IDocuments[] = res.data.data;
  return data;
};

export const useGetDocuments = () => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICANT_DOCUMENT],
    () => getData(),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
  return queryData;
};
