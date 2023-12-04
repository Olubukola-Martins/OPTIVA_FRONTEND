import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";

export type DataSourceItem = {
  key: React.Key;
  sn: number;
  documentName: string;
  documentRequirements: string;
  uploadedBy: string;
  documentStatus: string;
  handoverStatus: string;
  comments: number;
};
export const columns: ColumnsType<DataSourceItem> = [
  {
    key: "1",
    title: "SN",
    dataIndex: "sn",
  },
  {
    key: "2",
    title: "Document Name",
    dataIndex: "documentName",
  },
  {
    key: "3",
    title: "Document Requirements",
    dataIndex: "documentRequirements",
  },
  {
    key: "4",
    title: "Uploaded By",
    dataIndex: "uploadedBy",
  },
  {
    key: "5",
    title: "Uploaded By",
    dataIndex: "uploadedBy",
  },
  {
    key: "6",
    title: " Document Status",
    dataIndex: "documentStatus",
  },
  {
    key: "7",
    title: "Handover Status",
    dataIndex: "handoverStatus",
  },
  {
    key: "8",
    title: "Comments",
    dataIndex: "comments",
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
              <Menu.Item key="1">View Document</Menu.Item>
              <Menu.Item key="2">Accept Document</Menu.Item>
              <Menu.Item key="3">Decline Document</Menu.Item>
              <Menu.Item key="4">Comments</Menu.Item>
              <Menu.Item key="5">Download</Menu.Item>
              <Menu.Item key="6">Replace</Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      </div>
    ),
  },
];

export const dataSource: DataSourceItem[] = [];
for (let i = 0; i < 8; i++) {
  dataSource.push({
    key: i,
    sn: i + 1,
    documentName: "Birth Certificate",
    documentRequirements:
      "only xls, xlsx and csv formats are supported.  Maximum upload file size is 5 MB.",
    uploadedBy: "Pending",
    documentStatus: "Accepted",
    handoverStatus: "Confirmed",
    comments: 4,
  });
}
export const IdentityDocument = () => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      className="bg-white rounded-md shadow border mt-2"
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
  );
};
