import { useEffect, useState } from "react";
import { Calendar, IEvent } from "../components/Calendar";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import {
  // EditMeetingModal,
  NewMeetingModal,
} from "../components/MeetingModals";
import { IMeetingData } from "../components/MeetingModals";
import { END_POINT } from "src/config/environment";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from "react-query";
import useAddMeeting from "../hooks/useAddMeeting";
import { INewMeeting, ISingleMeeting } from "../types/types";
import { openNotification } from "src/utils/notification";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import { useFetchSingleItem } from "src/features/settings/hooks/useFetchSingleItem";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { Spin } from "antd";
import React from "react";

export const QUERY_KEY_MEETINGS = "Meetings";
export const meetingsURL = `${END_POINT.BASE_URL}/admin/meetings`;

export const MeetingContext = React.createContext<{
  editLoading: boolean;
  setEditLoading: React.Dispatch<React.SetStateAction<boolean>>;
  newfetch: any;
  setNewFetch: React.Dispatch<React.SetStateAction<any>>;
}>({
  editLoading: false,
  setEditLoading: () => {},
  setNewFetch: function (
    _value: React.SetStateAction<
      <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
      ) => Promise<QueryObserverResult<any, unknown>>
    >
  ): void {
    throw new Error("Function not implemented.");
  },
  newfetch: () => {},
});

const Meetings = () => {
  const [editLoading, setEditLoading] = useState(false);
  const queryClient = useQueryClient();
  const [newForm] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userInfo } = useGetUserInfo();
  const {
    data: userEvents,
    isLoading: userEventsLoading,
    isFetching: userEventsFetching,
    refetch,
  } = useFetchSingleItem({
    itemId: userInfo?.id,
    queryKey: QUERY_KEY_MEETINGS,
    urlEndPoint: `${meetingsURL}/user`,
  });
  const { mutate, isLoading: newMeetingLoading } = useAddMeeting();
  const [newfetch, setNewFetch] = useState(refetch);

  const addNewMeeting = (newData: INewMeeting) => {
    mutate(
      { newData, url: meetingsURL },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.message,
            duration: 5,
          });
        },
        onSuccess: (response: any) => {
          openNotification({
            state: "success",
            title: "Success",
            duration: 5,
            description: response.message,
          });
          setIsModalVisible(false);
          newForm.resetFields();
          queryClient.invalidateQueries([QUERY_KEY_MEETINGS]);
        },
      }
    );
  };
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    if (userEvents && userEvents.data) {
      const userEventsData = userEvents.data;
      const userEventsList: IEvent[] = userEventsData.map(
        (event: ISingleMeeting) => {
          const {
            attendees,
            date,
            description,
            end_time,
            id,
            location,
            link,
            start_time,
            title,
            organizer_id,
            status,
          } = event;

          // Splitting the date string to extract year, month, and day
          const [year, month, day] = date.split("-").map(Number);
          // Splitting the time string to extract hour and minute
          const [starthour, startminute] = start_time.split(":").map(Number);
          const [endhour, endminute] = end_time.split(":").map(Number);
          const filteredAttendees = attendees
            .map((attendee) => ({
              id: attendee.id,
              name: attendee.name,
              email: attendee.email,
            }))
            .filter((attendee) => attendee.id !== organizer_id);

          const organizerExists = filteredAttendees.some(
            (attendee) => attendee.id === organizer_id
          );

          const allAttendees = [...filteredAttendees];

          if (!organizerExists) {
            allAttendees.push({
              id: organizer_id,
              name: userInfo.name,
              email: userInfo.email,
            });
          }
          return {
            id,
            title,
            description,
            location,
            start: new Date(year, month - 1, day, starthour, startminute),
            end: new Date(year, month - 1, day, endhour, endminute),
            link,
            organizer_name: userInfo.name,
            attendees: allAttendees,
            organizer_id,
            status,
          };
        }
      );
      setEvents(userEventsList);
    }
  }, [userEvents?.data, userInfo, userInfo?.id]);

  useEffect(() => {
    setNewFetch(refetch());
  }, [editLoading]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateMeeting = (meetingData: IMeetingData) => {
    console.log("data", meetingData);
    const {
      attendees,
      date,
      description,
      end_time,
      start_time,
      title,
      link,
      location,
    } = meetingData;
    addNewMeeting({
      attendees: [...attendees, userInfo.id],
      date: dayjs(date).format("YYYY-MM-DD"),
      description,
      end_time: dayjs(end_time).format("HH:mm:ss"),
      start_time: dayjs(start_time).format("HH:mm:ss"),
      title,
      link,
      location,
    });
    // setIsModalVisible(false);
  };

  return (
    <>
      <MeetingContext.Provider
        value={{ editLoading, setEditLoading, newfetch, setNewFetch }}
      >
        <Spin spinning={userEventsLoading || userEventsFetching} size="large">
          <div className="flex justify-between items-center py-4">
            <PageIntro
              arrowBack={false}
              title="Meetings"
              description="View  & Create New Bookings"
            />
            <div className="flex gap-4">
              <AppButton label="Meeting Category" variant="transparent" />
              <AppButton label="New Meeting" handleClick={showModal} />
            </div>
          </div>
          <Calendar events={events} />
          <NewMeetingModal
            open={isModalVisible}
            onCancel={handleCancel}
            onCreate={handleCreateMeeting}
            newForm={newForm}
            newMeetingsLoading={newMeetingLoading}
          />
        </Spin>
      </MeetingContext.Provider>
    </>
  );
};

export default Meetings;
