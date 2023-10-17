import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Table,
} from "antd";
import type { DatePickerProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useState } from "react";

type DataSourceItem = {
  key: React.Key;
  name: string;
  role: string;
  proposedEndDate: string;
  reasonForExtension: string;
  status: string;
};

const TimelineExtensions = () => {
  // Extension Modal
  const [openExtensionModal, setOpenExtensionModal] = useState(false);
  const showExtensionModal = () => {
    setOpenExtensionModal(true);
  };
  //   const handleOk = () => {
  //     setOpenModal(false);
  //   };
  const handleExtensionCancel = () => {
    setOpenExtensionModal(false);
  };

  //Request Modal
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const showRequestModal = () => {
    setOpenRequestModal(true);
  };
  const handleRequestCancel = () => {
    setOpenRequestModal(false);
  };

  //Reject Modal
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const showRejectModal = () => {
    setOpenRejectModal(true);
  };
  const handleRejectCancel = () => {
    setOpenRejectModal(false);
  };

  // DatePicker
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  // Columns
  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "1",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "2",
    },
    {
      title: "Proposed End Date",
      dataIndex: "proposedEndDate",
      key: "3",
    },
    {
      title: "Reason For Extension",
      dataIndex: "reasonForExtension",
      key: "4",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "5",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={showExtensionModal}>
                  View
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={""}>Approve</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={""} onClick={showRejectModal}>
                    Reject
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 8; i++) {
    dataSource.push({
      key: i,
      name: "Ruth Godwin",
      role: "DPO",
      proposedEndDate: "dd/mm/yy",
      reasonForExtension:
        "orem ipsum dolor sit amet consectetur. Euismod eget lacus volutpat nulla id at facilisis facilisis",
      status: "Pending",
    });
  }
  return (
    <>
      <Modal
        open={openExtensionModal}
        // onOk={handleOk}
        onCancel={handleExtensionCancel}
        footer={null}
      >
        <div>
          <h1 className="p-4 font-bold text-center text-lg">
            Extension Details
          </h1>
          <div>
            <div>
              <h2 className="my-2">Requested By</h2>
              <p className="applicantDetailsSinglePTag py-2 px-4">
                Ruth Godwin
              </p>
            </div>
            <div>
              <h2 className="my-2">Role</h2>
              <p className="applicantDetailsSinglePTag py-2 px-4">DPO</p>
            </div>
            <div>
              <h2 className="my-2">Reason For Extension</h2>
              <p className="applicantDetailsDiv py-2 px-4 h-20">DPO</p>
            </div>
            <div>
              <h2 className="my-2">Proposed End Date</h2>
              <p className="applicantDetailsSinglePTag py-2 px-4">dd/mm/yy</p>
            </div>
            <div>
              <h2 className="my-2">Status</h2>
              <p className="applicantDetailsSinglePTag py-2 px-4">Pending</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-4">
            <AppButton
              label="Reject"
              variant="transparent"
              containerStyle="border border-blue"
            />
            <AppButton label="Approve" />
          </div>
        </div>
      </Modal>
      <Modal
        open={openRequestModal}
        onCancel={handleRequestCancel}
        footer={null}
      >
        <div>
          <h1 className="p-4 font-bold text-center text-lg">
            Request Extension
          </h1>
          <Form layout="vertical">
            <Form.Item
              required
              label="Reason for Extension"
              name="extensionReason"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item required label="Select Proposed End Date" name="endDate">
              <DatePicker className="w-full" size="large" />
            </Form.Item>
          </Form>
          <div className="flex items-center justify-center gap-4 p-4">
            <AppButton
              label="Cancel"
              variant="transparent"
              containerStyle="border border-blue"
              handleClick={handleRequestCancel}
            />
            <AppButton label="Approve" />
          </div>
        </div>
      </Modal>
      <Modal open={openRejectModal} onCancel={handleRejectCancel} footer={null}>
        <div>
          <h1 className="p-4 font-bold text-center text-lg">
            Reason for Rejection
          </h1>
          <Form layout="vertical">
            <Form.Item label="Reject Extension" name="extensionReject">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
          <div className="flex items-center justify-center gap-4 p-4">
            <AppButton
              label="Cancel"
              variant="transparent"
              containerStyle="border border-blue"
              handleClick={handleRejectCancel}
            />
            <AppButton label="Submit" />
          </div>
        </div>
      </Modal>

      <div className="flex justify-between items-center">
        <PageIntro
          title="Timeline Extensions"
          description="Make timeline extensions on applicant's documents"
          linkBack={appRoute.applications}
        />

        <AppButton label="Request Extension" handleClick={showRequestModal} />
      </div>
      <div className="bg-white rounded-md shadow border mt-8 p-4">
        <div className="flex items-center gap-5 w-1/2 p-4">
          <Input.Search className="w-1/3" placeholder="Search" />
          <Select className="w-1/3" placeholder="Filter" />
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 600 }}
          rowSelection={{
            type: "checkbox",
            onChange: (
              selectedRowKeys: React.Key[],
              selectedRows: DataSourceItem[]
            ) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
              );
            },
          }}
        />
      </div>
    </>
  );
};

export default TimelineExtensions;
