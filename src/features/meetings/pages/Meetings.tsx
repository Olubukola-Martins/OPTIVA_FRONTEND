import {  useState } from "react";
import { Calendar } from "../components/Calendar";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import {
  MeetingModalActions,
  NewMeetingModal,
} from "../components/MeetingModals";
import { IMeetingData } from "../components/MeetingModals";
import { END_POINT } from "src/config/environment";
// import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
// import { IFetchAllMeetings } from "../types/types";

export const QUERY_KEY_MEETINGS = "Meetings";
export const meetingsURL = `${END_POINT.BASE_URL}/admin/meetings`;

// interface IQueryDataType<TPageData> {
//   data: TPageData | undefined;
//   isLoading: boolean;
// }

const Meetings = () => {
  // const {
  //   data: allMeetingsData,
  //   isLoading: allMeetingsLoading,
  // }: IQueryDataType<IFetchAllMeetings> = useFetchAllItems({
  //   queryKey: QUERY_KEY_MEETINGS,
  //   urlEndPoint: meetingsURL,
  // });

  const [events, setEvents] = useState<any>([]);
  //   useState([
  //   {
  //     id: 1,
  //     meetingTitle: "Event 1",
  //     startTime: new Date(2023, 10, 8, 10, 0),
  //     endTime: new Date(2023, 10, 8, 12, 0),
  // //     attendee: "",
  // //    meetingType: "",
  //  //   meetingLink: "",
  //     detailsOfMeeting: "",
  //   },
  // ]);

  // useEffect(() => {
  //   if (allMeetingsData?.data) {
  //     const allMeetings = allMeetingsData.data;
  //     const allEvents:IEvent[] = allMeetings.map((meeting) => {
  //       const { id, title, start_time, end_time, description, location,date } =
  //         meeting;
  //       let [year, month, day] = date.split("-");
  //       let [hours, minutes, seconds] = start_time.split(":");
  //       let [hoursEnd, minutesEnd, secondsEnd] = end_time.split(":");
  //       let startTime = new Date(
  //         +year,
  //         +month - 1,
  //         +day,
  //         +hours,
  //         +minutes,
  //         +seconds
  //       );
  //       let endTime = new Date(
  //         +year,
  //         +month - 1,
  //         +day,
  //         +hoursEnd,
  //         +minutesEnd,
  //         +secondsEnd
  //       );

  //       return {
  //         id,
  //         startTime,
  //         endTime,
  //         meetingTitle: title,
  //         detailsOfMeeting: description,
  //         date
  //       };
  //     });
  //   }
  // }, [allMeetingsData, allMeetingsLoading]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isCreateMeetingModalVisible, setCreateMeetingModalVisible] =
  //   useState(false);
  const [meetingActionsModal, setMeetingActionsModal] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const showModalActions = () => {
  //   setMeetingActionsModal(true);
  // };
  const handleCancelModalActions = () => {
    setMeetingActionsModal(false);
  };

  const handleCreateMeeting = (meetingData: IMeetingData) => {
    const newEvent = {
      id: events.length + 1,
      meetingTitle: meetingData.meetingTitle,
      startTime: meetingData.startTime,
      endTime: meetingData.endTime,
      attendee: meetingData.attendees,
      meetingType: meetingData.meetingType,
      meetingLink: meetingData.meetingLink,
      detailsOfMeeting: meetingData.detailsOfMeeting,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    setIsModalVisible(false);
  };

  return (
    <>
      <div className="flex justify-between items-center py-4">
        <PageIntro
          arrowBack={false}
          title="Meetings"
          description="View  & Create New Bookings"
        />
        <AppButton label="New Meeting" handleClick={showModal} />
      </div>
      <Calendar events={events} />
      <NewMeetingModal
        open={isModalVisible}
        onCancel={handleCancel}
        onCreate={handleCreateMeeting}
      />
      <MeetingModalActions
        onCancel={handleCancelModalActions}
        open={meetingActionsModal}
      />
    </>
  );
};

export default Meetings;
