import axios from "axios";
import { END_POINT } from "src/config/environment";
import { IGetEligibleDependentDoc } from "../../types/types";
import { useGetToken } from "src/hooks/useGetToken";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_DEPENDENT_DOCUMENT = "dependentDocuments";

interface IDependentDocProp {
  applicantId: number;
  dependentId: number;
}

const getData = async (
  props: IDependentDocProp
): Promise<IGetEligibleDependentDoc[]> => {
  const url = `${END_POINT.BASE_URL}/admin/get-dependent-document?applicantID=${props.applicantId}&eligible_dependant_id=${props.dependentId}`;
  const { token } = useGetToken();
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IGetEligibleDependentDoc[] = res.data.data;
  return data;
};
export const useGetDependentDoc = ({
  applicantId,
  dependentId,
}: IDependentDocProp) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_DEPENDENT_DOCUMENT, applicantId, dependentId],
    () => getData({ applicantId, dependentId }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
  return queryData;
};
