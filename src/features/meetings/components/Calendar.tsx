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
  const [currentEvetId, setCurrentEventId] = useState<number>();
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);


  ///////// meeting modal ///////////////
  // const queryClient = useQueryClient();
  const {  responseLoading } = useRespondToMeeting();
  const {  statusChangeLoading } = useChangeMeetingStatus();
  // const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  // const [meetingDeclineVisible, setDeclineModalVisible] =
  //   useState<boolean>(false);
  // const [meetingDetailVisible, setMeetingDetailModalVisible] =
  //   useState<boolean>(false);

  // // Schedule Modal
  // const [openAcceptModal, setOpenAcceptModal] = useState<boolean>(false);

    // console.log(
    //   changeMeetingStatus,
    //   editModalVisible,
    //   meetingDeclineVisible,
    //   meetingDetailVisible,
    //   openAcceptModal
    // );

  // const showAcceptModal = () => {
  //   setOpenAcceptModal(true);
  // };
  // const handleAcceptCancel = () => {
  //   setOpenAcceptModal(false);
  // };

  //Handle meeting response

  // const respondMeeting = (meetingId: number, newData: { response: string }) =>
  //   mutate(
  //     {
  //       url: `${meetingsURL}/${meetingId}/respond`,
  //       newData,
  //     },
  //     {
  //       onError: (error: any) => {
  //         openNotification({
  //           state: "error",
  //           title: "Error Occured",
  //           description: error.response.message,
  //           duration: 5,
  //         });
  //       },
  //       onSuccess: (response: any) => {
  //         openNotification({
  //           state: "success",
  //           title: "Success",
  //           description: response.data.message,
  //         });
  //         setDeclineModalVisible(false);
  //         showAcceptModal;
  //         queryClient.invalidateQueries([QUERY_KEY_MEETINGS, meetingId]);
  //       },
  //     }
  //   );

  // const handleMenuClick = (action: string) => {
  //   if (action === "editDetails") {
  //     setEditModalVisible(true);
  //   } else if (action === "viewDetails") {
  //     setMeetingDetailModalVisible(true);
  //   } else if (action === "declineMeeting") {
  //     setDeclineModalVisible(true);
  //   }
  // };

  // const handleCancelModals = (action: string) => {
  //   if (action === "viewDetails") {
  //     setMeetingDetailModalVisible(false);
  //   } else if (action === "editDetails") {
  //     setEditModalVisible(false);
  //   } else if (action === "declineMeeting") {
  //     setDeclineModalVisible(false);
  //   }
  // };

  // const handleAttendMeeting = (data?: any) => {
  //   console.log(data);
  // };
  // const handleDeclineMeeting = (data?: any) => {
  //   console.log(data);
  // };
  ////////// meeting modal end ////////////////

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


  // useEffect(() => {
  //   setActionModal(false);
  // }, [events, responseLoading, statusChangeLoading]);

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

      {/* <NewMeetingModal
        open={openNewMeetingModal}
        onCancel={handleNewMeetingCancel}
        onCreate={handleCreateMeeting}
      />*/}
      {/* {selectedEvent && <EditMeetingModal currentEvent={selectedEvent} />} */}
      {actionModal && selectedEvent && (
        <MeetingModalActions
          open={actionModal}
          onCancel={() => setActionModal(false)}
          currentEvent={selectedEvent as IEvent}
          userInfo={userInfo}
          // handleEditMeeting=
        />

        // NEW
        // <>
        //   <Modal
        //     open={actionModal}
        //     onCancel={() => setActionModal(false)}
        //     footer={null}
        //   >
        //     <Card size="small" className="my-3 border-0">
        //       <div className="p-1">
        //         <button onClick={() => handleMenuClick("viewDetails")}>
        //           View Meeting Details
        //         </button>
        //       </div>
        //       {selectedEvent?.organizer_id === userInfo.id &&
        //         selectedEvent?.status === 0 && (
        //           <div className="p-1">
        //             <button onClick={() => {handleMenuClick("editDetails")}}>
        //               Edit Meeting Details
        //             </button>
        //           </div>
        //         )}
        //       {selectedEvent?.organizer_id === userInfo.id &&
        //         selectedEvent?.status === 0 && (
        //           <Popconfirm
        //             title="Cancel Meeting"
        //             description="Are you sure you would like to cancel this meeting?"
        //             onConfirm={() => {
        //               changeMeetingStatus(selectedEvent.id, { response: 1 });
        //             }}
        //             okText="Yes"
        //             cancelText="No"
        //           >
        //             <div className="p-1">
        //               <button onClick={() => handleMenuClick("cancel")}>
        //                 Cancel Meeting
        //               </button>
        //             </div>
        //           </Popconfirm>
        //         )}

        //       {selectedEvent?.status === 0 && (
        //         <div className="p-1">
        //           <button
        //             onClick={() => {
        //               respondMeeting(selectedEvent?.id, {
        //                 response: "accepted",
        //               });
        //             }}
        //           >
        //             Accept Meeting
        //           </button>
        //         </div>
        //       )}
        //       {selectedEvent?.status === 0 && (
        //         <div className="p-1">
        //           <button
        //             onClick={() => {
        //               handleMenuClick("declineMeeting");
        //             }}
        //           >
        //             Decline Meeting
        //           </button>
        //         </div>
        //       )}
        //     </Card>
        //   </Modal>
        //   {/* Accept Meeting */}
        //   <Modal
        //     open={openAcceptModal}
        //     onCancel={handleAcceptCancel}
        //     footer={null}
        //   >
        //     <div className="p-3 flex flex-col items-center gap-5">
        //       <img src={SuccessIcon} alt="" />
        //       <h2 className="font-bold text-lg text-center">
        //         Meeting Scheduled
        //       </h2>
        //       <h2 className="font-bold text-lg text-center">Successfully</h2>
        //       <div className="flex gap-5">
        //         <AppButton label="Back" handleClick={handleAcceptCancel} />
        //       </div>
        //     </div>
        //   </Modal>

        //   {/* Cancel Meeting Modal */}
        //   <Modal
        //     open={cancelModalVisible}
        //     onCancel={() => {
        //       setCancelModalVisible(false);
        //     }}
        //     footer={null}
        //   >
        //     <div className="p-3 flex flex-col items-center gap-5">
        //       <img src={SuccessIcon} alt="" />
        //       <h2 className="font-bold text-lg text-center">
        //         Meeting Cancelled
        //       </h2>
        //       <h2 className="font-bold text-lg text-center">Successfully</h2>
        //       <div className="flex gap-5">
        //         <AppButton label="Back" handleClick={() => {}} />
        //       </div>
        //     </div>
        //   </Modal>

        //   {meetingDetailVisible && (
        //     <MeetingDetailsModal
        //       open={meetingDetailVisible}
        //       meetingData={selectedEvent as IEvent}
        //       onAttend={handleAttendMeeting}
        //       onDecline={handleDeclineMeeting}
        //       onCancel={() => handleCancelModals("viewDetails")}
        //     />
        //   )}
        //   {editModalVisible && (
        //     <EditMeetingModal
        //       currentEvent={selectedEvent as IEvent}
        //       open={editModalVisible}
        //       onCancel={() => {
        //         setEditModalVisible(false);
        //       }}
        //     />
        //   )}
        //   {meetingDeclineVisible && (
        //     <DeclineMeetingsModal
        //       open={meetingDeclineVisible}
        //       responseLoading={responseLoading}
        //       onCancel={() => handleCancelModals("declineMeeting")}
        //       handleResponse={() =>
        //         respondMeeting(selectedEvent?.id as number, {
        //           response: "rejected",
        //         })
        //       }
        //     />
        //   )}
        // </>
      )}
    </div>
  );
};
