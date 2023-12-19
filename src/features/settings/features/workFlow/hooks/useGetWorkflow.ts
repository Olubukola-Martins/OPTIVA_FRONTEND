import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { workflowProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";
import { paginationAndFilterProps } from "src/types";

export const QUERY_KEY_FOR_WORKFLOW = "workflows";

const getData = async (
  props: paginationAndFilterProps
): Promise<{ data: workflowProps[]; total: number }> => {
  const { pagination, search } = props;
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/workflow`;
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
 
  console.log(res);
  

  const data: workflowProps[] = res.data.data.map((item: workflowProps) => ({
    ...item,
  }));

  const ans = {
    data,
    total: res.data.meta.total,
  };

  return ans;
};

export const useGetWorkflow = ({
  pagination,
  search,
}: paginationAndFilterProps = {}) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_WORKFLOW, pagination, search],
    () => getData({ pagination, search }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
