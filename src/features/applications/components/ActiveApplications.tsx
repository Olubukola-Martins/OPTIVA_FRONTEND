import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";

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
                <Menu.Item key="2">View Applicant Details</Menu.Item>
                <Menu.Item key="3">Processing Strategy/Steps</Menu.Item>
                <Menu.Item key="4">View Uploaded Documents</Menu.Item>
                <Menu.Item key="5">Timeline Extensions</Menu.Item>
                <Menu.Item key="6">Reassign Applicants</Menu.Item>
                <Menu.Item key="7">Move to Inactive</Menu.Item>
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
  return (
    <>
      {/* TABLE */}
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
    </>
  );
};
