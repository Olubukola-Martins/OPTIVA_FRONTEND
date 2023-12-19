import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { IGeneralProps } from "src/types";
import { useGetToken } from "src/hooks/useGetToken";
import { workflowProps } from "../types";

export const QUERY_KEY_FOR_SINGLE_WORKFLOW = "single-workflow";

const getSingleData = async (
  props: IGeneralProps
): Promise<workflowProps> => {
  const token = useGetToken();
  const id = props.id;
  const url = `${END_POINT.BASE_URL}/admin/workflow/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  console.log(res);

  const item = res.data.data;

  const data: workflowProps = { ...item };
  return data;
};

export const useGetSingleWorkflow = ({ id }: IGeneralProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_WORKFLOW, id],
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
