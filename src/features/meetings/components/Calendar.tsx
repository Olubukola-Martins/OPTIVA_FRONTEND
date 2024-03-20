import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  MeetingDetailsModal,
  MeetingModalActions,
} from "./MeetingModals";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
// import { QUERY_KEY_MEETINGS, meetingsURL } from "../pages/Meetings";
// import { openNotification } from "src/utils/notification";
// import { useQueryClient } from "react-query";
import useRespondToMeeting from "../hooks/useRespondToMeeting";
import useChangeMeetingStatus from "../hooks/useChangeMeetingStatus";

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
  status: number;
}

interface Attendee {
  id: number;
  name: string;
  email: string;
}


interface ICalendarProps {
  events: IEvent[];
}

const localizer = momentLocalizer(moment);

export const Calendar: React.FC<ICalendarProps> = ({ events }) => {
  const { userInfo } = useGetUserInfo();
  const [currentEvetId, setCurrentEventId] = useState<number>();
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);


  ///////// meeting modal ///////////////
  // const queryClient = useQueryClient();
  const {  responseLoading } = useRespondToMeeting();
  const {  statusChangeLoading } = useChangeMeetingStatus();

  useEffect(() => {
    console.log("allEvents", events);
    const event = events.find((event) => event.id === currentEvetId);
    if (event) {
      setSelectedEvent(event);
    }
  }, [events, currentEvetId, selectedEvent]);

    useEffect(() => {
      setActionModal(false);
    }, [ responseLoading, statusChangeLoading]);


  const handleEventClick = (eventId: number) => {
   if(eventId !== currentEvetId) {setCurrentEventId(eventId)};
    const event = events.find((event) => event.id === eventId);
    if (event) {
      setSelectedEvent(event );
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
    return {}; 
  };


  return (
    <div className="h-[500px]">
      <BigCalendar
        localizer={localizer}
        events={events}
        eventPropGetter={eventStyleGetter}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => handleEventClick(event.id)}
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

      {actionModal && selectedEvent && (
        <MeetingModalActions
          open={actionModal}
          onCancel={() => setActionModal(false)}
          currentEvent={selectedEvent as IEvent}
          userInfo={userInfo}
        />

      )}
    </div>
  );
};
