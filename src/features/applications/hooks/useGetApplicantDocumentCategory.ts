import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IGetApplicantDocument } from "../types/types";

export const QUERY_KEY_FOR_APPLICANT_DOCUMENT = "applicantDocuments";

const getData = async (props: {
  token: string;
  id: number;
}): Promise<IGetApplicantDocument[]> => {
  const url = `${END_POINT.BASE_URL}/admin/get-applicant-category/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IGetApplicantDocument[] = res.data.data;
  return data;
};

export const useGetApplicantDocumentCategory = (id:number) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICANT_DOCUMENT,id],
    () => getData({ token, id }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
  return queryData;
};
