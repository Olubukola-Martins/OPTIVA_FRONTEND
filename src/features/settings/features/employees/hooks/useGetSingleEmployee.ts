import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { IGeneralProps } from "src/types";
import { employeesProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_SINGLE_EMPLOYEE = "single-employee";

const getSingleData = async (
  props: IGeneralProps
): Promise<employeesProps> => {
  const token = useGetToken();
  const id = props.id;
  const url = `${END_POINT.BASE_URL}/admin/employees/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);

  const item = res.data.data;

  const data: employeesProps = { ...item };
  return data;
};

export const useGetSingleEmployee = ({ id }: IGeneralProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_EMPLOYEE, id],
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
