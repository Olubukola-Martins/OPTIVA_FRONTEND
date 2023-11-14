import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState } from "react";
import {
  MeetingDetailsModal,
  MeetingModalActions,
  NewMeetingModal,
} from "./MeetingModals";
import { IMeetingData } from "./MeetingModals";

export interface IEvent {
  id: number;
  meetingTitle: string;
  startTime: Date;
  endTime: Date;
  attendee: string;
  meetingType: string;
  meetingLink: string;
  detailsOfMeeting: string;
  organizer?: string;
  meetingPlatform?: string;
}
interface ICalendarProps {
  events: IEvent[];
}

const localizer = momentLocalizer(moment);

export const Calendar: React.FC<ICalendarProps> = ({ events }) => {
  const [openNewMeetingModal, setOpenNewMeetingModal] =
    useState<boolean>(false);
  //   const [selectedEvent, setSelectedEvent] = useState<boolean>(false);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  //   const handleEventClick = () => {
  //     // setSelectedEvent(true);
  //     setActionModal(true);
  //   };

  const handleEventClick = (eventId: number) => {
    const event = events.find((event) => event.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setActionModal(true);
    }
  };

  //   const handleNewMeetingCancel = () => {
  //     setOpenNewMeetingModal(false);
  //   };
  //   const handleCreateMeeting = (meetingData: IMeetingData) => {
  //     const updatedEvents = [...events, meetingData];

  //     setOpenNewMeetingModal(false);
  //   };

  const handleNewMeetingCancel = () => {
    setOpenNewMeetingModal(false);
  };

  const handleCreateMeeting = (meetingData: IMeetingData) => {
    const updatedEvents = [...events, meetingData];
    setOpenNewMeetingModal(false);
  };
  return (
    <div className="h-[500px]">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="startTime"
        endAccessor="endTime"
        // onSelectEvent={handleEventClick}
        onSelectEvent={(event) => handleEventClick(event.id)}
        //   onSelectEvent={}
      />
      <NewMeetingModal
        open={openNewMeetingModal}
        onCancel={handleNewMeetingCancel}
        onCreate={handleCreateMeeting}
      />
      {selectedEvent && (
        <MeetingDetailsModal
        open={actionModal}
        meetingData={selectedEvent}
        onCancel={() => {
          setSelectedEvent(null);
          setActionModal(false);
          }}
          inActionsModal={true}
          // open={selectedEvent}
          // meetingData={events}
          // onCancel={() => setSelectedEvent(false)}
        />
      )}
     
      {/* <NewMeetingModal
        open={openNewMeetingModal}
        onCancel={handleNewMeetingCancel}
        onCreate={handleCreateMeeting}
      />
      {selectedEvent && (
        <MeetingDetailsModal
          open={actionModal}
          meetingData={selectedEvent}
          onCancel={() => {
            setSelectedEvent(null);
            setActionModal(false);
          }}
        />
      )} */}
      {actionModal && (
        <MeetingModalActions
          open={actionModal}
          onCancel={() => setActionModal(false)}
        />
      )}
    </div>
  );
};
