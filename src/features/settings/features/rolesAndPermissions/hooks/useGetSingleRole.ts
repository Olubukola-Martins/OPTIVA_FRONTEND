import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { IGeneralProps } from "src/types";
import { useGetToken } from "src/hooks/useGetToken";
import { rolesProps } from "../types";

export const QUERY_KEY_FOR_SINGLE_BRANCH = "single-branch";

const getSingleData = async (props: IGeneralProps): Promise<rolesProps> => {
  const token = useGetToken();
  const id = props.id;
  const url = `${END_POINT.BASE_URL}/admin/roles/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;
  const data: any = {
    name: item?.name,
    permissions: item?.permissions.map((val: any) => val.id),
    created_at: item?.created_at,
    updated_at: item?.updated_at,
  };
  return data;
};

export const useGetSingleRole = ({ id }: IGeneralProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_BRANCH, id],
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
