import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IApplicantsByRole } from "../../types/types";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";
import { paginationAndFilterProps } from "src/types";

const getData = async (
  props: paginationAndFilterProps
): Promise<{ data: IApplicantsByRole[]; total: number }> => {
  const { pagination, search, role_id, status } = props;
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/application`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      name: search,
      page: pagination?.current,
      limit: pagination?.pageSize,
      role_id: role_id,
      status: status,
    },
  };
  const res = await axios.get(url, config);

  const data: IApplicantsByRole[] = res.data.data.map(
    (item: IApplicantsByRole) => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: res.data.meta.total,
  };

  return ans;
};

export const useFetchApplicantsByRole = ({
  pagination,
  search,
  role_id,
  status,
}: paginationAndFilterProps = {}) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICATIONS, pagination, search, role_id, status],
    () => getData({ pagination, search, role_id, status }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
