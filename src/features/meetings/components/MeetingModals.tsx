import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  TimePicker,
  FormInstance,
  Tooltip,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";
import "../assets/style.css";
import { AppButton } from "src/components/button/AppButton";
import { IEvent } from "./Calendar";
import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import DeleteIcon from "../assets/img/warning.png";
import SuccessIcon from "../assets/img/success.png";
import { FormEmployeeInput } from "src/features/settings/features/employees/components/FormEmployeeInput";
import { useForm } from "antd/es/form/Form";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import {
  MeetingContext,
  QUERY_KEY_MEETINGS,
  meetingsURL,
} from "../pages/Meetings";
import useEditMeeting from "../hooks/useEditMeeting";
import { INewMeeting } from "../types/types";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import useRespondToMeeting from "../hooks/useRespondToMeeting";
import useChangeMeetingStatus from "../hooks/useChangeMeetingStatus";
import { FormItemMeetingCategory } from "../pages/MeetingCategories";

export interface IMeetingData {
  // id: number;
  title: string;
  start_time: Date;
  end_time: Date;
  date: Date;
  attendees: number[];
  meetingType: string;
  link?: string;
  location?: string;
  description: string;
  category_id: number;
}

export const NewMeetingModal: React.FC<{
  open: boolean;
  onCancel: () => void;
  onCreate: (meetingData: IMeetingData) => void;
  newForm: FormInstance<any>;
  newMeetingsLoading: boolean;
}> = ({ open, onCancel, onCreate, newForm, newMeetingsLoading }) => {
  const [typeMeeting, setTypeMeeting] = useState<string>("physical");
  // const handleFormSubmit = (values: IMeetingData) => {
  //   console.log(values);
  // };

  return (
    <>
      <Modal open={open} title="New Meeting" footer={null} onCancel={onCancel}>
        <Form form={newForm} layout="vertical" onFinish={onCreate}>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              name="title"
              label="Meeting Title"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>
            <FormItemMeetingCategory
              extraStyles="w-full"
              optionalField={false}
              name="category_id"
              restSelectProps={{ allowClear: true }}
            />
          </div>
          <FormEmployeeInput
            control={{ name: "attendees", label: "Attendee(s)" }}
            showLabel={true}
            Form={Form}
            mode="multiple"
          />

          <Form.Item
            name="meetingType"
            label="Meeting Type"
            initialValue="physical"
            rules={[{ required: true, message: "Please enter meeting type" }]}
          >
            <Select
              defaultValue="Physical"
              onChange={(val) => {
                setTypeMeeting(val);
              }}
              options={[
                {
                  value: "virtual",
                  label: "Virtual",
                },
                {
                  value: "Physical",
                  label: "Physical",
                },
              ]}
            />
          </Form.Item>
          {typeMeeting === "virtual" ? (
            <Form.Item
              name="link"
              label="Meeting Link"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              name="location"
              label="Meeting Location"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item label="Date" name="date" rules={generalValidationRules}>
            <DatePicker className="w-full" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              label="Start Time"
              name="start_time"
              rules={generalValidationRules}
            >
              <TimePicker
                defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="end_time"
              rules={generalValidationRules}
            >
              <TimePicker
                defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                className="w-full"
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Details of Meeting"
            name="description"
            rules={textInputValidationRules}
          >
            <Input.TextArea cols={5} />
          </Form.Item>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              variant="transparent"
              handleClick={onCancel}
              type="reset"
            />
            <AppButton
              label="Save"
              type="submit"
              isLoading={newMeetingsLoading}
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};

export const MeetingDetailsModal: React.FC<{
  open: boolean;
  meetingData: IEvent;
  onCancel: () => void;
  onAttend?: () => void;
  onDecline?: () => void;
  inActionsModal?: boolean;
}> = ({ open, meetingData, onCancel, inActionsModal }) => {
  const {
    attendees,
    end,
    organizer_name,
    start,
    title,
    // description,
    link,
    location,
  } = meetingData;

  const formattedStartTime = dayjs(start).format("dddd, MMMM D, YYYY hh:mm A");
  const formattedEndTime = dayjs(end).format("hh:mm A");
  return (
    <Modal
      open={open && (inActionsModal ? false : true)}
      onCancel={onCancel}
      footer={null}
    >
      <div className="flex gap-2 items-center my-2 py-2">
        <p className="bg-primary p-3 rounded-full">
          <Icon icon="bi:calendar-fill" color="white" />
        </p>
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
      <div className="flex gap-2 items-center my-2">
        <p>
          <Icon
            icon="mdi:envelope-outline"
            color="#28a745"
            className="text-lg"
          />
        </p>
        <p>
          {formattedStartTime} ~ {formattedEndTime}
        </p>
      </div>
      <div className="flex gap-2 items-center my-2 ">
        <p className="text-lg">
          <Icon icon="mynaui:globe" color="#28a745" />
        </p>
        {!link ? (
          <p> {location}</p>
        ) : (
          <Tooltip title="Click to access link" color="rgba(1, 33, 104, 1)">
            <a className="text-primary" href={link} target="_blank">
              {link}
            </a>
          </Tooltip>
        )}
      </div>
      <div className="my-2 py-1">
        <p className="pb-2">Organizer </p>
        <div className="border rounded-lg h-[40px] p-2">
          <span>{organizer_name}</span>
        </div>
      </div>
      <div>
        <p className="pb-2">Attendees</p>
        <div className="grid grid-cols-4 gap-4">
          {attendees
            ?.filter((attendee) => attendee.name !== organizer_name)
            .map((attendee) => {
              return (
                <div className="border rounded-lg p-2  ">
                  <span>{attendee.name}</span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="my-4 py-3 flex items-center justify-center">
        <AppButton label="Back" handleClick={onCancel} />
      </div>
    </Modal>
  );
};

export const EditMeetingModal: React.FC<{
  currentEvent?: IEvent;
  open?: boolean;
  onCancel: () => void;
}> = ({ currentEvent, open, onCancel }) => {
  const { setEditLoading, newfetch } = useContext(MeetingContext);
  const [typeMeeting, setTypeMeeting] = useState<string>("physical");
  const [meetingId, setMeetingId] = useState<number>(0);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(true);

  console.log(editModalVisible);

  const [editForm] = useForm();
  const queryClient = useQueryClient();
  const { mutate: editMutate, isLoading: editMeetingLoading } =
    useEditMeeting();
  const editNewMeeting = (newData: INewMeeting, id: number) => {
    editMutate(
      { newData, url: meetingsURL, id },
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
          newfetch();
          setEditModalVisible(false);
          editForm.resetFields();
          queryClient.invalidateQueries([QUERY_KEY_MEETINGS, id]);
        },
      }
    );
  };
  useEffect(() => {
    if (currentEvent) {
      const {
        attendees,
        end,
        id,
        organizer_id,
        start,
        title,
        description,
        link,
        location,
      } = currentEvent;
      setMeetingId(id);
      setTypeMeeting(link ? "virtual" : "physical");
      editForm.setFieldsValue({
        title,
        attendees: attendees
          .map((attendee) => attendee.id)
          .filter((id) => id !== organizer_id),
        meetingType: link ? "virtual" : "physical",
        link,
        date: dayjs(start),
        start_time: dayjs(`${dayjs(start).format("HH:mm:ss")}`, "HH:mm:ss"),
        end_time: dayjs(`${dayjs(end).format("HH:mm:ss")}`, "HH:mm:ss"),
        location,
        description,
      });
    }
    return;
  }, [currentEvent, meetingId]);

  useEffect(() => {
    onCancel();
    setEditLoading(editMeetingLoading);
  }, [editMeetingLoading]);

  const handleEdit = (meetingData: IMeetingData) => {
    console.log("edit");
    if (currentEvent) {
      const { id, organizer_id } = currentEvent;
      const {
        attendees,
        date,
        description,
        end_time,
        start_time,
        title,
        link,
        location,
        category_id,
      } = meetingData;
      editNewMeeting(
        {
          attendees: [...attendees, organizer_id],
          date: dayjs(date).format("YYYY-MM-DD"),
          description,
          end_time: dayjs(end_time).format("HH:mm:ss"),
          start_time: dayjs(start_time).format("HH:mm:ss"),
          title,
          link,
          location,
          category_id,
          _method: "PUT",
        },
        id
      );
    }
  };

  return (
    <>
      <Modal
        // open={open && editModalVisible}
        open={open}
        title="Edit Meeting"
        footer={null}
        onCancel={onCancel}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEdit}>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              name="title"
              label="Meeting Title"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>
            <FormItemMeetingCategory
              extraStyles="w-full"
              optionalField={false}
              name="category_id"
              restSelectProps={{ allowClear: true }}
            />
          </div>
          <FormEmployeeInput
            control={{ name: "attendees", label: "Attendee(s)" }}
            showLabel={true}
            Form={Form}
            mode="multiple"
          />

          <Form.Item
            name="meetingType"
            label="Meeting Type"
            initialValue="physical"
            rules={[{ required: true, message: "Please enter meeting type" }]}
          >
            <Select
              defaultValue="Physical"
              onChange={(val) => {
                setTypeMeeting(val);
              }}
              options={[
                {
                  value: "virtual",
                  label: "Virtual",
                },
                {
                  value: "Physical",
                  label: "Physical",
                },
              ]}
            />
          </Form.Item>
          {typeMeeting === "virtual" ? (
            <Form.Item
              name="link"
              label="Meeting Link"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              name="location"
              label="Meeting Location"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item label="Date" name="date" rules={generalValidationRules}>
            <DatePicker className="w-full" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              label="Start Time"
              name="start_time"
              rules={generalValidationRules}
            >
              <TimePicker className="w-full" />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="end_time"
              rules={generalValidationRules}
            >
              <TimePicker className="w-full" />
            </Form.Item>
          </div>
          <Form.Item
            label="Details of Meeting"
            name="description"
            rules={textInputValidationRules}
          >
            <Input.TextArea cols={5} />
          </Form.Item>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              variant="transparent"
              handleClick={() => {
                setEditModalVisible(false);
              }}
              type="reset"
            />
            <AppButton
              label="Save"
              type="submit"
              isLoading={editMeetingLoading}
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};

export const MeetingModalActions: React.FC<{
  open: boolean;
  onCancel: () => void;
  userInfo: any;
  currentEvent: IEvent;
}> = ({ open, onCancel, currentEvent, userInfo }) => {
  // console.log("useerInfo", userInfo);
  // console.log("currentEvent", currentEvent);
  // const { newfetch } = useContext(MeetingContext);
  const queryClient = useQueryClient();
  const { mutate, responseLoading } = useRespondToMeeting();
  const { changeMeetingStatus } = useChangeMeetingStatus();
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [cancelModalVisible, setCancelModalVisible] = useState<boolean>(false);
  const [meetingDeclineVisible, setDeclineModalVisible] =
    useState<boolean>(false);
  const [meetingDetailVisible, setMeetingDetailModalVisible] =
    useState<boolean>(false);

  // Schedule Modal
  const [openAcceptModal, setOpenAcceptModal] = useState<boolean>(false);
  const showAcceptModal = () => {
    setOpenAcceptModal(true);
  };
  const handleAcceptCancel = () => {
    setOpenAcceptModal(false);
  };

  //Handle meeting response
  const respondMeeting = (meetingId: number, newData: { response: string }) =>
    mutate(
      {
        url: `${meetingsURL}/${meetingId}/respond`,
        newData,
      },
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
            description: response.data.message,
          });
          setDeclineModalVisible(false);
          onCancel();
          showAcceptModal;
          queryClient.invalidateQueries([QUERY_KEY_MEETINGS, meetingId]);
        },
      }
    );

  const handleMenuClick = (action: string) => {
    if (action === "editDetails") {
      setEditModalVisible(true);
    } else if (action === "viewDetails") {
      setMeetingDetailModalVisible(true);
    } else if (action === "declineMeeting") {
      setDeclineModalVisible(true);
    }
  };

  const handleCancelModals = (action: string) => {
    if (action === "viewDetails") {
      setMeetingDetailModalVisible(false);
    } else if (action === "editDetails") {
      setEditModalVisible(false);
    } else if (action === "declineMeeting") {
      setDeclineModalVisible(false);
    }
  };

  const handleAttendMeeting = (data?: any) => {
    console.log(data);
  };
  const handleDeclineMeeting = (data?: any) => {
    console.log(data);
  };

  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null}>
        <Card size="small" className="my-3 border-0" title="Meeting Actions">
          <div className="p-1">
            <button onClick={() => handleMenuClick("viewDetails")}>
              View Meeting Details
            </button>
          </div>
          {currentEvent.organizer_id === userInfo.id &&
            currentEvent.status === 0 && (
              <div className="p-1">
                <button
                  onClick={() => {
                    setEditModalVisible(true);
                  }}
                >
                  Edit Meeting Details
                </button>
              </div>
            )}
          {currentEvent.organizer_id === userInfo.id &&
            currentEvent.status === 0 && (
              <Popconfirm
                title="Cancel Meeting"
                description="Are you sure you would like to cancel this meeting?"
                onConfirm={() => {
                  changeMeetingStatus(currentEvent.id, { response: 1 });
                }}
                okText="Yes"
                cancelText="No"
              >
                <div className="p-1">
                  <button onClick={() => handleMenuClick("cancel")}>
                    Cancel Meeting
                  </button>
                </div>
              </Popconfirm>
            )}

          {currentEvent.status === 0 && (
            <div className="p-1">
              <button
                onClick={() => {
                  respondMeeting(currentEvent.id, { response: "accepted" });
                }}
              >
                Accept Meeting
              </button>
            </div>
          )}
          {currentEvent.status === 0 && (
            <div className="p-1">
              <button
                onClick={() => {
                  handleMenuClick("declineMeeting");
                }}
              >
                Decline Meeting
              </button>
            </div>
          )}
        </Card>
      </Modal>
      {/* Accept Meeting */}
      <Modal open={openAcceptModal} onCancel={handleAcceptCancel} footer={null}>
        <div className="p-3 flex flex-col items-center gap-5">
          <img src={SuccessIcon} alt="" />
          <h2 className="font-bold text-lg text-center">Meeting Scheduled</h2>
          <h2 className="font-bold text-lg text-center">Successfully</h2>
          <div className="flex gap-5">
            <AppButton label="Back" handleClick={handleAcceptCancel} />
          </div>
        </div>
      </Modal>

      {/* Cancel Meeting Modal */}
      <Modal
        open={cancelModalVisible}
        onCancel={() => {
          setCancelModalVisible(false);
        }}
        footer={null}
      >
        <div className="p-3 flex flex-col items-center gap-5">
          <img src={SuccessIcon} alt="" />
          <h2 className="font-bold text-lg text-center">Meeting Cancelled</h2>
          <h2 className="font-bold text-lg text-center">Successfully</h2>
          <div className="flex gap-5">
            <AppButton label="Back" handleClick={() => {}} />
          </div>
        </div>
      </Modal>

      {meetingDetailVisible && (
        <MeetingDetailsModal
          open={meetingDetailVisible}
          meetingData={currentEvent}
          onAttend={handleAttendMeeting}
          onDecline={handleDeclineMeeting}
          onCancel={() => handleCancelModals("viewDetails")}
        />
      )}
      {/* {editModalVisible && ( */}
      <EditMeetingModal
        currentEvent={currentEvent}
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
        }}
      />
      {/* )} */}
      {meetingDeclineVisible && (
        <DeclineMeetingsModal
          open={meetingDeclineVisible}
          responseLoading={responseLoading}
          onCancel={() => handleCancelModals("declineMeeting")}
          handleResponse={() =>
            respondMeeting(currentEvent.id, { response: "rejected" })
          }
        />
      )}
    </>
  );
};

export const DeclineMeetingsModal: React.FC<{
  open: boolean;
  responseLoading: boolean;
  onCancel: () => void;
  handleResponse: () => void;
}> = ({ open, onCancel, handleResponse, responseLoading }) => {
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log(val);
  };
  // Decline Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const showDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null}>
        <h2 className="text-center font-bold py-3">Decline Meeting</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Reason">
            <Input.TextArea rows={5} />
          </Form.Item>
          <div className="flex items-center justify-center gap-4">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={onCancel}
              variant="transparent"
            />
            <AppButton
              label="Send"
              type="submit"
              handleClick={showDeleteModal}
            />
          </div>
        </Form>
      </Modal>
      {/* Decline Modal */}
      <Modal open={openDeleteModal} onCancel={handleDeleteCancel} footer={null}>
        <div className="p-3 flex flex-col items-center gap-5">
          <img src={DeleteIcon} alt="" />
          <h2 className="font-bold text-lg">Decline Meeting</h2>
          <p>Are you sure you would like to decline this meeting?</p>
          <div className="flex gap-5">
            <AppButton
              variant="transparent"
              label="Cancel"
              handleClick={handleDeleteCancel}
            />
            <AppButton
              type="button"
              label="Decline"
              isLoading={responseLoading}
              handleClick={handleResponse}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
