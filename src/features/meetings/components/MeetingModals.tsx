import { Modal, Form, Input, DatePicker, Select, Card } from "antd";
import dayjs from "dayjs";
import { AppButton } from "src/components/button/AppButton";
import { IEvent } from "./Calendar";
import { useState } from "react";
import { Icon } from "@iconify/react";
import DeleteIcon from "../assets/img/warning.png";
import SuccessIcon from "../assets/img/success.png";

export interface IMeetingData {
  id: number;
  meetingTitle: string;
  startTime: Date;
  endTime: Date;
  attendee: string;
  meetingType: string;
  meetingLink: string;
  detailsOfMeeting: string;
}

export const NewMeetingModal: React.FC<{
  open: boolean;
  onCancel: () => void;
  onCreate: (meetingData: IMeetingData) => void;
}> = ({ open, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      const formData: IMeetingData = {
        id: Math.random(),
        meetingTitle: values.meetingTitle,
        startTime: values.startTime,
        endTime: values.endTime,
        attendee: values.attendee,
        meetingType: values.meetingType,
        meetingLink: values.meetingLink,
        detailsOfMeeting: values.detailsOfMeeting,
      };

      onCreate(formData);
      form.resetFields();
    });
  };

  return (
    <>
      <Modal open={open} title="New Meeting" footer={null} onCancel={onCancel}>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="meetingTitle"
            label="Meeting Title"
            rules={[{ required: true, message: "Please enter meeting title" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="attendee"
            label="Attendee(s)"
            rules={[
              { required: true, message: "Please enter meeting attendee(s)" },
            ]}
          >
            <Select
              size="large"
              mode="multiple"
              options={[
                {
                  value: "Ruth Godwin",
                  label: "Ruth Godwin",
                },
                {
                  value: "Godswill Omenuko",
                  label: "Godswill Omenuko",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="meetingType"
            label="Meeting Type"
            rules={[{ required: true, message: "Please enter meeting type" }]}
          >
            <Select
              size="large"
              options={[
                {
                  value: "Virtual",
                  label: "Virtual",
                },
                {
                  value: "Physical",
                  label: "Physical",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="meetingLink"
            label="Meeting Link"
            rules={[{ required: true, message: "Please enter meeting link" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Start Time" name="startTime">
            <DatePicker
              showTime
              size="large"
              className="w-full"
              format="YYYY-MM-DD HH:mm"
              defaultValue={dayjs().add(1, "hour")}
            />
          </Form.Item>
          <Form.Item label="End Time" name="endTime">
            <DatePicker
              showTime
              size="large"
              className="w-full"
              format="YYYY-MM-DD HH:mm"
              defaultValue={dayjs().add(1, "hour")}
            />
          </Form.Item>
          <Form.Item label="Details of Meeting" name="detailsOfMeeting">
            <Input.TextArea cols={5} />
          </Form.Item>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              variant="transparent"
              handleClick={onCancel}
              type="reset"
            />
            <AppButton label="Save" type="submit" />
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
    organizer,
    attendee,
    startTime,
    endTime,
    meetingPlatform,
    meetingTitle,
  } = meetingData;

  return (
    <Modal  open={open && (inActionsModal ? false : true)} onCancel={onCancel} footer={null}>
      <div className="flex gap-2 items-center my-2 py-2">
        <p className="bg-primary p-3 rounded-full">
          <Icon icon="bi:calendar-fill" color="white" />
        </p>
        <h2 className="font-semibold text-lg">
          {meetingTitle}
        </h2>
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
          {dayjs(startTime).format("dddd, MMMM D, YYYY")} |{" "}
          {dayjs(startTime).format("h:mma")}-{dayjs(endTime).format("h:mma")}
        </p>
      </div>
      <div className="flex gap-2 items-center my-2">
        <p>
          <Icon icon="mynaui:globe" color="#28a745" />
        </p>
        <p> {meetingPlatform}</p>
      </div>
      <div className="my-2 py-1">
        <p className="pb-2">Organizer </p>
        <div className="border rounded-lg h-[40px] p-2">
          <span>{organizer}</span>
        </div>
      </div>
      <div>
        <p className="pb-2">Attendees</p>
        <div className="border rounded-lg h-[45px] p-2">
          {/* <span>Ruth Godwin,</span> <span>Godswill Omenuko,</span>{" "} */}
          <span>{attendee}</span>
        </div>
      </div>
      <div className="my-4 py-3 flex items-center justify-center">

        {/* WILL BE SHOWN CONDITIONALLY */}
        {/* <div className="flex justify-center gap-3">
          <AppButton
            label="Decline"
            variant="transparent"
            handleClick={onDecline}
          />
          <AppButton label="Accept" handleClick={onAttend} />
        </div> */}

        <AppButton label="Back" handleClick={onCancel} />
      </div>
    </Modal>
  );
};

export const EditMeetingModal: React.FC<{
  open: boolean;
  onCancel: () => void;
}> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const handleFormSubmit = () => {};
  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <h2 className="text-center font-bold py-3">Edit Meeting</h2>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="meetingTitle"
          label="Meeting Title"
          rules={[{ required: true, message: "Please enter meeting title" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="attendee"
          label="Attendee(s)"
          rules={[
            { required: true, message: "Please enter meeting attendee(s)" },
          ]}
        >
          <Select
            size="large"
            mode="multiple"
            options={[
              {
                value: "Ruth Godwin",
                label: "Ruth Godwin",
              },
              {
                value: "Godswill Omenuko",
                label: "Godswill Omenuko",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="meetingType"
          label="Meeting Type"
          rules={[{ required: true, message: "Please enter meeting type" }]}
        >
          <Select
            size="large"
            options={[
              {
                value: "Virtual",
                label: "Virtual",
              },
              {
                value: "Physical",
                label: "Physical",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="meetingLink"
          label="Meeting Link"
          rules={[{ required: true, message: "Please enter meeting link" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Start Time" name="startTime">
          <DatePicker
            showTime
            size="large"
            className="w-full"
            format="YYYY-MM-DD HH:mm"
            defaultValue={dayjs().add(1, "hour")}
          />
        </Form.Item>
        <Form.Item label="End Time" name="endTime">
          <DatePicker
            showTime
            size="large"
            className="w-full"
            format="YYYY-MM-DD HH:mm"
            defaultValue={dayjs().add(1, "hour")}
          />
        </Form.Item>
        <Form.Item label="Details of Meeting" name="detailsOfMeeting">
          <Input.TextArea cols={5} />
        </Form.Item>
        <div className="flex items-center justify-center gap-5">
          <AppButton
            label="Cancel"
            variant="transparent"
            handleClick={onCancel}
            type="reset"
          />
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
};

export const MeetingModalActions: React.FC<{
  open: boolean;
  onCancel: () => void;
}> = ({ open, onCancel }) => {
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

  const sampleMeetingData = {
    id: 1,
    meetingTitle: "Meeting with CMA",
    startTime: new Date("2023-10-18T08:00:00"),
    endTime: new Date("2023-10-18T12:00:00"),
    organizer: "Ruth Godwin",
    attendee: "Godswill Omenuko",
    meetingPlatform: "Zoom",
    meetingType: "Physical",
    meetingLink: "Test",
    detailsOfMeeting: "Lorem ipsum...",
  };

  const handleAttendMeeting = () => {};
  const handleDeclineMeeting = () => {};

  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null}>
        <Card size="small" className="my-3 border-0">
          
          <div className="p-1">
            <button onClick={() => handleMenuClick("viewDetails")}>View Meeting Details</button>
          </div>
          <div className="p-1">
            <button onClick={() => handleMenuClick("editDetails")}>Edit Meeting Details</button>
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
          meetingData={sampleMeetingData}
          onAttend={handleAttendMeeting}
          onDecline={handleDeclineMeeting}
          onCancel={() => handleCancelModals("viewDetails")}
        />
      )}
      {editModalVisible && (
        <EditMeetingModal
          open={editModalVisible}
          onCancel={() => handleCancelModals("editDetails")}
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
