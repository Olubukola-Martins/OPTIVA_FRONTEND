import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState } from "react";
import {
  EditMeetingModal,
  IMeetingData,
  MeetingDetailsModal,
  MeetingModalActions,
  NewMeetingModal,
} from "./MeetingModals";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
// import { IMeetingData } from "./MeetingModals";

export interface IEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  organizer_name: string;
  organizer_id: number;
  allDay?: boolean;
  description?: string;
  location?: string;
  link?: string;
  attendees: Attendee[];
  color?: string;
  editable?: boolean;
}

interface Attendee {
  id: number;
  name: string;
  email: string;
}

// export interface  {
//   id: number;
//   meetingTitle: string;
//   startTime: Date;
//   endTime: Date;
//   // date: Date;
//   attendee: string;
//   meetingType: string;
//   meetingLink?: string;
//   meetingPlatform?: string;
//   detailsOfMeeting: string;
//   organizer?: string;
//   meetingLocation?: string;
// }

interface ICalendarProps {
  events: IEvent[];
}

const localizer = momentLocalizer(moment);

export const Calendar: React.FC<ICalendarProps> = ({ events }) => {
    const { userInfo } = useGetUserInfo();
  const [openNewMeetingModal, setOpenNewMeetingModal] =
    useState<boolean>(false);
  // const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
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
const eventStyleGetter = (event: any) => {
  if (event.status === 1) {
    return {
      style: {
        backgroundColor: "lightgray", 
        color: "red", 
      },
    };
  }
  return {}; // Return empty object for default event style
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
    // const updatedEvents = [...events, meetingData];

    setOpenNewMeetingModal(false);
  };

  return (
    <div className="h-[500px]">
      <BigCalendar
        localizer={localizer}
        events={events}
        eventPropGetter={eventStyleGetter}
        // eventPropGetter={(event) => ({
        //   style: {},
        //   onClick: () => {
        //     if (event.link) {
        //       window.open(event.link, "_blank");
        //     }
        //   },
        // })}
        startAccessor="start"
        endAccessor="end"
        // onSelectEvent={handleEventClick}
        onSelectEvent={(event) => handleEventClick(event.id)}
        //   onSelectEvent={}
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
        />
      )}

      {/* <NewMeetingModal
        open={openNewMeetingModal}
        onCancel={handleNewMeetingCancel}
        onCreate={handleCreateMeeting}
      />*/}
      {/* {selectedEvent && <EditMeetingModal currentEvent={selectedEvent} />} */}
      {actionModal && (
        <MeetingModalActions
          open={actionModal}
          onCancel={() => setActionModal(false)}
          currentEvent={selectedEvent as IEvent}
          userInfo={userInfo}
          // handleEditMeeting=
        />
      )}
    </div>
  );
};
