import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataSourceItem } from "./ActiveApplications";

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
      dataIndex: " applicantName",
      key: "3",
    },
    {
      title: "Country",
      dataIndex: " country",
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
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">View Applicant Details</Menu.Item>
                <Menu.Item key="2">View Uploaded Documents</Menu.Item>
                <Menu.Item key="3">View Comment</Menu.Item>
                <Menu.Item key="4">Move to Active</Menu.Item>
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
      sn: 1,
      applicantId: "230000-01",
      applicantName: "John Brown",
      country: "Grenada",
      programType: "CBI",
      numberOfDependents: 4,
      assignedTo: "Ruth Godwin",
      comment: "Neque consectetur sit commodo ipsum sed.",
    });
  }
  return (
    <>
      {" "}
      {/* TABLE */}
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 600 }} />
    </>
  );
};
