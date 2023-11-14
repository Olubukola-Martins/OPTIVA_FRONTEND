import { Dropdown, Form, Input, Menu, Modal, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";

export type DataSourceItem = {
  key: React.Key;
  sn: number;
  applicantId: string;
  applicantName: string;
  country: string;
  programType: string;
  numberOfDependents: number;
  assignedTo: string;
  comment?: string;
};

export const ActiveApplications = () => {
  const params = useParams();
  const itemId = params.id;
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Applicant ID",
      dataIndex: "applicantId",
      key: "2",
    },
    {
      title: " Applicant Name",
      dataIndex: "applicantName",
      key: "3",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "4",
    },
    {
      title: "Program Type",
      dataIndex: "programType",
      key: "5",
    },
    {
      title: "Number Of Dependents",
      dataIndex: "numberOfDependents",
      key: "6",
    },
    {
      title: " Assigned To",
      dataIndex: "assignedTo",
      key: "7",
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
                <Menu.Item key="1">Accept Applicant</Menu.Item>
                <Menu.Item key="2">
                  <Link to={appRoute.applicant_details().path}>
                    View Applicant Details
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={appRoute.processing_strategy_steps().path}>
                    Processing Strategy/Steps
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to={appRoute.applicant_documents().path}>
                    View Uploaded Documents
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to={appRoute.timeline_extensions().path}>
                    Timeline Extensions
                  </Link>
                </Menu.Item>
                <Menu.Item key="6" onClick={showReassignModal}>
                  Reassign Applicants
                </Menu.Item>
                <Menu.Item key="7" onClick={showInactiveModal}>
                  Move to Inactive
                </Menu.Item>
                <Menu.Item key="8">Mark as Completed</Menu.Item>
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
      sn: i + 1,
      applicantId: "230000-01",
      applicantName: "John Brown",
      country: "Grenada",
      programType: "CBI",
      numberOfDependents: 4,
      assignedTo: "Ruth Godwin",
    });
  }
  const [form] = Form.useForm();
  // Reassign Modal
  const [openReassignModal, setOpenReassignModal] = useState(false);
  const showReassignModal = () => {
    setOpenReassignModal(true);
  };
  const handleReassignCancel = () => {
    setOpenReassignModal(false);
  };

  // Inactive Modal
  const [openInactiveModal, setOpenInactiveModal] = useState(false);
  const showInactiveModal = () => {
    setOpenInactiveModal(true);
  };
  const handleInactiveCancel = () => {
    setOpenInactiveModal(false);
  };

  return (
    <>
      {/* REASSIGN MODAL */}
      <Modal
        open={openReassignModal}
        onCancel={handleReassignCancel}
        footer={null}
      >
        <div>
          <h1 className="p-4 font-bold text-center text-lg">
            Assign Applicant To Service Manager
          </h1>
          <Form layout="vertical" form={form} name="">
            <Form.Item label="Select Service Manager" name="serviceManger">
              <Select
                defaultValue={1}
                className="applicantDetailsSinglePTag"
                options={[
                  {
                    value: 1,
                    label: "Ruth Godwin",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Reason for Reassignment"
              name="reasonForReassignment"
            >
              <Input className="applicantDetailsSinglePTag" />
            </Form.Item>
          </Form>
          <div className="flex items-center justify-center gap-4 p-4">
            <AppButton
              label="Cancel"
              variant="transparent"
              containerStyle="border border-blue"
            />
            <AppButton label="Submit" />
          </div>
        </div>
      </Modal>
      {/* INACTIVE MODAL */}
      <Modal
        open={openInactiveModal}
        onCancel={handleInactiveCancel}
        footer={null}
      >
        <div>
          <h1 className="p-4 font-bold text-center text-lg">Make Inactive</h1>
          <Form layout="vertical" name="">
            <Form.Item label="Reason for Inactivity" name="inactivityReason">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
          <div className="flex items-center justify-center gap-4 p-4">
            <AppButton
              label="Cancel"
              variant="transparent"
              containerStyle="border border-blue"
            />
            <AppButton label="Submit" />
          </div>
        </div>
      </Modal>
      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={dataSource}
        className="bg-white rounded-md shadow border mt-2"
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
    </>
  );
};
