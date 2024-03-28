import { useQuery } from "react-query";
import { paginationAndFilterProps } from "src/types";
import axios from "axios";
import { END_POINT } from "src/config/environment";
import { IGetApplicationResponse } from "../../types/types";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";
import { useGetToken } from "src/hooks/useGetToken";

const getData = async (props: paginationAndFilterProps): Promise<{ data: IGetApplicationResponse[]; total: number }> => {
    const token = useGetToken();

    const {  currentUrl, pagination } = props;
    const url = `${END_POINT.BASE_URL}/admin/application/${currentUrl}`;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
          subsection_name:pagination?.subsection_name,
          page: pagination?.current,
          limit: pagination?.pageSize,
      }
    };
  
    const res = await axios.get(url, config);
    const data: IGetApplicationResponse[] = res.data.data.map((item: IGetApplicationResponse) => ({
      ...item,
    }));

    const ans = {
      data,
      total: res.data.meta.total,
    };

    return ans;
};

export const useGetSectionResponse = ({
    pagination,
    currentUrl,
  }: paginationAndFilterProps = {}) => {
    const queryData = useQuery(
      [QUERY_KEY_FOR_APPLICATIONS, pagination, currentUrl],
      () => getData({ pagination, currentUrl }),
      {
        onError: () => {},
        onSuccess: () => {},
      }
    );
  
    return queryData;
};
