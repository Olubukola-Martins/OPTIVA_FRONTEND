import { useQuery } from "react-query";
import { paginationAndFilterProps } from "src/types";
import axios from "axios";
import { END_POINT } from "src/config/environment";
import { IGetApplicationResponse } from "../../types/types";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";
import { useGetToken } from "src/hooks/useGetToken";

const getData = async (props: paginationAndFilterProps): Promise<{ data: IGetApplicationResponse[]; total: number }> => {
    const token = useGetToken();

    const { subsection_name, currentUrl } = props;
    const url = `${END_POINT.BASE_URL}/admin/application/${currentUrl}`;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        subsection_name
      }
    };
  
    const res = await axios.get(url, config);
    const data: IGetApplicationResponse[] = res.data.data.data.map((item: IGetApplicationResponse) => ({
      ...item,
    }));

    const ans = {
      data,
      total: res.data.meta.total,
    };

    return ans;
};

export const useGetSectionResponse = ({
    subsection_name,
    currentUrl,
  }: paginationAndFilterProps = {}) => {
    const queryData = useQuery(
      [QUERY_KEY_FOR_APPLICATIONS, subsection_name, currentUrl],
      () => getData({ subsection_name, currentUrl }),
      {
        onError: () => {},
        onSuccess: () => {},
      }
    );
  
    return queryData;
};
