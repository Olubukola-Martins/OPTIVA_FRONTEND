// import axios from "axios";
// import { useQuery } from "react-query";
// import { END_POINT } from "src/config/environment";
// import { IActiveAndInactiveApplications } from "../../types/types";
// import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";
// import { paginationAndFilterProps } from "src/types";
// import { useGetToken } from "src/hooks/useGetToken";

// // interface IProps {
// //   section?: string;
// //   token: string;
// // }
// interface ExtendedProps extends paginationAndFilterProps {
//   token: string;
// }

// // interface IData {
// //   section: string;
// // }

// const getData = async (
//   props: paginationAndFilterProps & {
//     token: string;
//     status?: "active" | "inactive";
//   }
// ): Promise<{ data: IActiveAndInactiveApplications[]; total: number }> => {
//   const { pagination, search, status = "active", token } = props;
//   const url = `${END_POINT.BASE_URL}/admin/${status}/applicants`;

//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     params: {
//       name: search,
//       page: pagination?.current,
//       limit: pagination?.pageSize,
//     },
//   };

//   const res = await axios.get(url, config);

//   console.log("response", res.data);
//   const data: IActiveAndInactiveApplications[] = res.data.data.map(
//     (item: IActiveAndInactiveApplications) => ({
//       ...item,
//     })
//   );

//   const ans = {
//     data,
//     total: res.data.meta.total,
//   };

//   return ans;
// };

// export const useFetchActiveandInactiveApplicant = ({
//   pagination,
//   search,
//   status = "active",
//   token,
// }: paginationAndFilterProps & { status?: "active" | "inactive" } = {}) => {
//   const queryData = useQuery(
//     [QUERY_KEY_FOR_APPLICATIONS, pagination, search, status],
//     () => getData({ pagination, search, status, token }),
//     {
//       onError: () => {},
//       onSuccess: () => {},
//     }
//   );

//   return queryData;
// };


import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IActiveAndInactiveApplications } from "../../types/types";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";

interface IProps {
  section?: string;
  token: string;
}

interface IData {
  section: string;
}

const getData = async (props: IProps) => {
  const url = `${END_POINT.BASE_URL}/admin/${props.section}/applicants`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data.data;
  const data: IActiveAndInactiveApplications[] = item;
  return data;
};

export const useFetchActiveandInactiveApplicant = ({ section }: IData) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICATIONS, section],
    () => getData({ token, section }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};