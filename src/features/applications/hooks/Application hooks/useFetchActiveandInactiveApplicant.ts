import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { paginationAndFilterProps } from "src/types";
import { IActiveAndInactiveApplications } from "../../types/types";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";



const getData = async (
  props: paginationAndFilterProps
): Promise<{ data: IActiveAndInactiveApplications[]; total: number }> => {
  const { pagination, search, currentUrl } = props;
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/${currentUrl}/applicants`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      name: search,
      page: pagination?.current,
      limit: pagination?.pageSize,
    },
  };
  const res = await axios.get(url, config);


  const data: IActiveAndInactiveApplications[] =res.data.data.data.map((item: IActiveAndInactiveApplications) => ({
    ...item,
  }));

  const ans = {
    data,
    total: res.data.data.total,
  };
  return ans;
};

export const useFetchActiveandInactiveApplicant = ({
  pagination,
  search,
  currentUrl,
}: paginationAndFilterProps = {}) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICATIONS, pagination, search, currentUrl],
    () => getData({ pagination, search, currentUrl }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};


