import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";

const InvoiceGenTable = () => {
  type DataSourceItem = {
    key: React.Key;
    SN: number;
    applicantID: string;
    applicantName: string;
    country: string;
    investmentRoute: string;
    dependents: number;
    dateCreated: string;
    createdBy: string;
  };

  const rowSelection = {
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
  };

  // COLUMS OF TABLE
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "SN",
    },
    {
      key: "2",
      title: "Applicant ID",
      dataIndex: "applicantID",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "3",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "4",
    },
    {
      title: "Investment Route",
      dataIndex: "investmentRoute",
      key: "5",
    },
    {
      title: "Number of Dependents",
      dataIndex: "dependents",
      key: "6",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "7",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "8",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: { key: unknown }) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">View</Menu.Item>

              <Menu.Item key="2">Download</Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

  // DATASOURCE FOR TABLE
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 20; i++) {
    dataSource.push({
      key: i,
      SN: i + 1,
      applicantID: "230000-01",
      applicantName: "John Brown",
      country: "Grenada",
      investmentRoute: "Donation",
      dependents: 3,
      dateCreated: "dd/mm/yy",
      createdBy: "John Brown",
    });
  }

  return (
    <Table
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 900 }}
      className="border-gray-100 border-t-0 border-2 rounded-b-md"
    />
  );
};

export default InvoiceGenTable;
