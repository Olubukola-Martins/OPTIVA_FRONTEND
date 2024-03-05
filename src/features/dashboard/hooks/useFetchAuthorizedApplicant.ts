// import axios from "axios";
// import { END_POINT } from "src/config/environment";
// import { useGetToken } from "src/hooks/useGetToken";
// import { IGetAuthorizedApplicant } from "../types/types";
// import { useQuery } from "react-query";
// import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";

// const getData = async (): Promise<IGetAuthorizedApplicant[]> => {
//     const token = useGetToken();
  
//     const url = `${END_POINT.BASE_URL}/admin/application`;
//     const config = {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
  
//     const res = await axios.get(url, config);
//     const data: IGetAuthorizedApplicant[] = res.data.data;
//     return data;
// };
  

// export const useFetchAuthorizedApplicant = () => {
//     const queryData = useQuery([QUERY_KEY_FOR_APPLICATIONS], () => getData(), {
//         onError: () => {},
//         onSuccess: () => {},
//       });
    
//       return queryData;
// }


import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { paginationAndFilterProps } from "src/types";
import { IGetAuthorizedApplicant } from "../../applications/types/types";
 
export const QUERY_KEY_FOR_AUTHORIZED_APPLICATION_LIST = "dashboardAuthorisedApplicationList";
 
const getData = async (
  props: paginationAndFilterProps
): Promise<{ data: IGetAuthorizedApplicant[]; total: number }> => {
  const { pagination, search, } = props;
  const token = useGetToken();
 
  const url = `${END_POINT.BASE_URL}/admin/authorized/applications`;
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
 
  const data: IGetAuthorizedApplicant[] = res.data.data.map(
    (item: IGetAuthorizedApplicant) => ({
      ...item,
    })
  );
 
  const ans = {
    data,
    total: res.data.meta.total,
  };
 
  return ans;
};
 
export const useFetchAuthorizedApplicant = ({
  pagination,
  search,
}: paginationAndFilterProps = {}) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_AUTHORIZED_APPLICATION_LIST, pagination, search],
    () => getData({ pagination, search }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
 
  return queryData;
};