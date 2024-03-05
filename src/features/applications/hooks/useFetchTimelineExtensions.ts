import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { ITimelineExtension } from "../types/types";

export interface IAcceptProps{
    id:number
}

export const QUERY_KEY_FOR_TIMELINE_EXTENSIONS = "timelineExtensions";

const getData = async (props: { id: number }): Promise<ITimelineExtension[]> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/application/${props.id}/extension`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: ITimelineExtension[] = res.data.data;
  return data;
};

export const useFetchTimelineExtensions = ({id}:IAcceptProps) => {
    const queryData = useQuery([QUERY_KEY_FOR_TIMELINE_EXTENSIONS], () => getData({id}), {
      onError: () => {},
      onSuccess: () => {},
    });
  
    return queryData;
  };
  