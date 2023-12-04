import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

export const QUERY_KEY_DOC_REQUIREMENT = "DocumentRequirement";

const getData = async (props: { token: string }):Promise<IDocumentRequirement[]> => {
  const url = `${END_POINT.BASE_URL}/admin/document-requirement`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data:IDocumentRequirement[] = res.data.data
  return data
};

export const useGetDocumentRequirement = () => {
    const { token } = useGetUserInfo();
    const queryData = useQuery(
      [QUERY_KEY_DOC_REQUIREMENT],
      () => getData({ token }),
      {
        onError: () => {},
        onSuccess: () => {},
      }
    );
    return queryData;
}
