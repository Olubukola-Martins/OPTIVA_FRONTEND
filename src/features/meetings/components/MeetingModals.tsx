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
} from "antd";
import dayjs from "dayjs";
import { AppButton } from "src/components/button/AppButton";
import { IEvent } from "./Calendar";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import DeleteIcon from "../assets/img/warning.png";
import SuccessIcon from "../assets/img/success.png";
import { FormEmployeeInput } from "src/features/settings/features/employees/components/FormEmployeeInput";
import { useForm } from "antd/es/form/Form";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";

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
}

export const NewMeetingModal: React.FC<{
  open: boolean;
  onCancel: () => void;
  onCreate: (meetingData: IMeetingData) => void;
  newForm: FormInstance<any>;
  newMeetingsLoading: boolean;
}> = ({ open, onCancel, onCreate, newForm, newMeetingsLoading }) => {
  const [typeMeeting, setTypeMeeting] = useState<string>("physical");
  const handleFormSubmit = (values: IMeetingData) => {
    console.log(values);
  };

  return (
    <>
      <Modal open={open} title="New Meeting" footer={null} onCancel={onCancel}>
        <Form form={newForm} layout="vertical" onFinish={onCreate}>
          <Form.Item
            name="title"
            label="Meeting Title"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="attendees"
            label="Attendee(s)"
            rules={[
              { required: true, message: "Please enter meeting attendee(s)" },
            ]}
          >
            <Select
              mode="multiple"
              options={[
                {
                  value: 1,
                  label: "Ruth Godwin",
                },
                {
                  value: 2,
                  label: "Godswill Omenuko",
                },
              ]}
            />
          </Form.Item> */}
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
    description,
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
                <div className="border rounded-lg h-[45px] p-2 ">
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
  open: boolean;
  onCancel: () => void;
  // onCreate: (meetingData: IMeetingData) => void;
  currentEvent: IEvent;
  editMeetingsLoading: boolean;
}> = ({ open, onCancel, currentEvent, editMeetingsLoading }) => {
  const [typeMeeting, setTypeMeeting] = useState<string>("physical");
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editForm] = useForm();
  const handleFormSubmit = (values: IMeetingData) => {
    console.log(values);
    //     const {attendees,detailsOfMeeting,endTime,meetingLink,meetingTitle,meetingType,startTime,date } = values;
    // addNewMeeting({
    //   attendees,
    //   date: moment(date).format("YYYY-MM-DD"),
    //   title: meetingTitle,
    //   description: detailsOfMeeting,
    //   end_time: moment(endTime).format("HH:mm:ss"),
    //   start_time: moment(startTime).format("HH:mm:ss"),
    //   location,
    // });
    // newForm.validateFields().then((values) => {
    //   const formData: IMeetingData = {
    //     meetingTitle: values.meetingTitle,
    //     date: values.date,
    //     startTime: values.startTime,
    //     endTime: values.endTime,
    //     attendees: values.attendee,
    //     meetingType: values.meetingType,
    //     meetingLink: values.meetingLink,
    //     detailsOfMeeting: values.detailsOfMeeting,
    //   };

    //   onCreate(formData);
    //   form.resetFields();
    // });
  };

  useEffect(() => {
    if (currentEvent) {
      const {
        attendees,
        end,
        id,
        organizer_id,
        organizer_name,
        start,
        title,
        description,
        link,
        location,
      } = currentEvent;
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
  }, [currentEvent]);

  const handleEdit = (meetingData: IMeetingData) => {
    // const {
    //   attendees,
    //   date,
    //   description,
    //   end_time,
    //   start_time,
    //   title,
    //   link,
    //   location,
    // } = meetingData;
    // addNewMeeting({
    //   attendees: [...attendees, userInfo.id],
    //   date: dayjs(date).format("YYYY-MM-DD"),
    //   description,
    //   end_time: dayjs(end_time).format("HH:mm:ss"),
    //   start_time: dayjs(start_time).format("HH:mm:ss"),
    //   title,
    //   link,
    //   location,
    // });
  };
  return (
    <>
      <Modal open={open} title="New Meeting" footer={null} onCancel={onCancel}>
        <Form form={editForm} layout="vertical" onFinish={handleEdit}>
          <Form.Item
            name="title"
            label="Meeting Title"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
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
              handleClick={onCancel}
              type="reset"
            />
            <AppButton
              label="Save"
              type="submit"
              isLoading={editMeetingsLoading}
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
  // handleEditMeeting: (values: any) => void;
  currentEvent: IEvent;
}> = ({ open, onCancel, currentEvent }) => {
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
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
        <Card size="small" className="my-3 border-0">
          <div className="p-1">
            <button onClick={() => handleMenuClick("viewDetails")}>
              View Meeting Details
            </button>
          </div>
          <div className="p-1">
            <button onClick={() => handleMenuClick("editDetails")}>
              Edit Meeting Details
            </button>
          </div>
          <div className="p-1">
            <button onClick={showAcceptModal}>Accept Meeting</button>
          </div>
          <div className="p-1">
            <button onClick={() => handleMenuClick("declineMeeting")}>
              Decline Meeting
            </button>
          </div>
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

      {meetingDetailVisible && (
        <MeetingDetailsModal
          open={meetingDetailVisible}
          meetingData={currentEvent}
          onAttend={handleAttendMeeting}
          onDecline={handleDeclineMeeting}
          onCancel={() => handleCancelModals("viewDetails")}
        />
      )}
      {editModalVisible && (
        <EditMeetingModal
          open={editModalVisible}
          onCancel={() => {
            setEditModalVisible(false);
          }}
          currentEvent={currentEvent}
          // onCreate={handleEditMeeting}
          editMeetingsLoading={false}
        />
      )}
      {meetingDeclineVisible && (
        <DeclineMeetingsModal
          open={meetingDeclineVisible}
          onCancel={() => handleCancelModals("declineMeeting")}
        />
      )}
    </>
  );
};

export const DeclineMeetingsModal: React.FC<{
  open: boolean;
  onCancel: () => void;
}> = ({ open, onCancel }) => {
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
            <AppButton type="button" label="Decline" />
          </div>
        </div>
      </Modal>
    </>
  );
};
