import { useQuery } from "react-query";
import axios from "axios";
// import { useApiAuth } from "hooks/useApiAuth";
// import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
// import { IGetJobDataType, IJobOpeningData, IGetSingleJobData } from "../types";
// import { openNotification } from "utils/notifications";

// export const QUERY_KEY_FOR_JOB_OPENINGS = "JobOpenings";

const getData = async (props: {
  token: string;
  companyId: number;
    itemId: number;
  urlEndPoint: string
}): Promise<IGetSingleJobData> => {
  // const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/jobs/${props.itemId}`;
  const url = `${props.urlEndPoint}/${props.itemId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: IGetSingleJobData = res.data.data;

  return item;
};

export const useFetchSingleItem = ({
  itemId,
  QUERY_KEY,
  urlEndPoint,
}: {
  itemId: number;
  QUERY_KEY: string;
  urlEndPoint: string;
}) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY],
    () => getData({ token, companyId, itemId,urlEndPoint }),
    {
      onError: (error: any) => {
        openNotification({
          state: "error",
          title: "Error Occured",
          description: "",
          // description: error.response.data.message,
          duration: 5,
        });
      },
      onSuccess: (response) => {},
    }
  );

  return queryData;
};
