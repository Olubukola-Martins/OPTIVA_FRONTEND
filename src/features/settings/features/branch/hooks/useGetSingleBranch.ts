import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { IGeneralProps } from "src/types";
import { branchProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_SINGLE_BRANCH = "single-branch";

const getSingleData = async (props: IGeneralProps): Promise<branchProps> => {
  const token = useGetToken();
  const id = props.id;
  const url = `${END_POINT.BASE_URL}/admin/branches/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: branchProps = { ...item };
  return data;
};

export const useGetSingleBranch = ({ id }: IGeneralProps) => {
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
