import { Dropdown, Form, Input, Menu, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataSourceItem } from "./ActiveApplications";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AppButton } from "src/components/button/AppButton";
import { useState } from "react";

export const InactiveApplications = () => {
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
      title: " Comment",
      dataIndex: "comment",
      key: "8",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link to={appRoute.applicant_details().path}>
                    View Applicant Details
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">View Uploaded Documents</Menu.Item>
                <Menu.Item key="3">
                  {" "}
                  <Link to={appRoute.comments().path}>View Comment</Link>
                </Menu.Item>
                <Menu.Item key="4" onClick={showActiveModal}>
                  Move to Active
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
      sn: i + 1,
      applicantId: "230000-01",
      applicantName: "John Brown",
      country: "Grenada",
      programType: "CBI",
      numberOfDependents: 4,
      assignedTo: "Ruth Godwin",
      comment: "Neque consectetur sit commodo ipsum sed.",
    });
  }
  // Inactive Modal
  const [openActiveModal, setOpenActiveModal] = useState(false);
  const showActiveModal = () => {
    setOpenActiveModal(true);
  };
  const handleActiveCancel = () => {
    setOpenActiveModal(false);
  };
  return (
    <>
      {/* INACTIVE MODAL */}
      <Modal open={openActiveModal} onCancel={handleActiveCancel} footer={null}>
        <div>
          <h1 className="p-4 font-bold text-center text-lg">Make Active</h1>
          <Form layout="vertical" name="">
            <Form.Item label="Reason for Activity" name="activityReason">
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
        className="bg-white rounded-md shadow border mt-8"
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
        // rowClassName={titleRowBg}
      />
    </>
  );
};
