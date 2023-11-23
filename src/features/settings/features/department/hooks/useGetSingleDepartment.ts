import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { IGeneralProps } from "src/types";
import { departmentProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_SINGLE_DEPARTMENT = "single-department ";

const getSingleData = async (
  props: IGeneralProps
): Promise<departmentProps> => {
  const token = useGetToken();
  const id = props.id;
  const url = `${END_POINT.BASE_URL}/admin/departments/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  console.log(res);

  const item = res.data.data;

  const data: departmentProps = { ...item };
  return data;
};

export const useGetSingleDepartment = ({ id }: IGeneralProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_DEPARTMENT, id],
    () =>
      getSingleData({
        id,
      }),
    {
      enabled: !!id,
    }
  );

  return queryData;
};
