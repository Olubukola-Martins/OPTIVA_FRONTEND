import { useState } from "react";
import { Calendar } from "../components/Calendar";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import {
  MeetingModalActions,
  NewMeetingModal,
} from "../components/MeetingModals";
import { IMeetingData } from "../components/MeetingModals";

const Meetings = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      meetingTitle: "Event 1",
      startTime: new Date(2023, 10, 8, 10, 0),
      endTime: new Date(2023, 10, 8, 12, 0),
      attendee: "",
      meetingType: "",
      meetingLink: "",
      detailsOfMeeting: "",
    },
  ]);

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
      attendee: meetingData.attendee,
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
