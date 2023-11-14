import { Table } from "antd";
import { DataSourceItem, columns, dataSource } from "./IdentityDocument";

export const Others = () => {
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
