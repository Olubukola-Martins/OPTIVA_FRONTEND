// import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";
import axios from "axios";
// import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
// import { IGetJobDataType, IJobOpeningData, IGetSingleJobData } from "../types";
// import { openNotification } from "utils/notifications";

// export const QUERY_KEY_FOR_JOB_OPENINGS = "JobOpenings";

const getData = async (props: {
  token: string;
  companyId: number;
  urlEndPoint:string;
}): Promise<IGetJobDataType[]> => {
//   const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/jobs`;
  const url = `${props.urlEndPoint}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: IGetSingleJobData = res.data.data.result;

  return item;
};

export const useFetchAllItems = ({
  QUERY_KEY,
  urlEndPoint,
}: {
  QUERY_KEY: string;
  urlEndPoint: string;
}) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY],
    () => getData({ token, companyId, urlEndPoint }),
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
