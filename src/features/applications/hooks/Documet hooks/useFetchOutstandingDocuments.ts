import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IOutstandingDoc } from "../../types/types";
import { IAcceptProps } from "../Application hooks/useFetchTimelineExtensions";
import { QUERY_KEY_FOR_APPLICANT_DOCUMENT } from "./useGetApplicantDocumentCategory";

const getData = async (props: { id: number }): Promise<IOutstandingDoc[]> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/fetch-applicant-document/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IOutstandingDoc[] = res.data.data;
  return data;
};

export const useFetchOutstandingDocuments = ({ id }: IAcceptProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICANT_DOCUMENT],
    () => getData({ id }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
