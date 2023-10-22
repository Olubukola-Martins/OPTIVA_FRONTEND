import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

const AdminActivity = () => {
  // TABLE DATA
  interface DataType {
    key: number | string;
    adminID: number | string;
    adminName: string;
    role: string;
    department: string;
    activity: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Admin ID",
      dataIndex: "adminID",
      key: "adminID",
    },
    {
      title: "Admin Name",
      dataIndex: "adminName",
      key: "adminName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
  ];

  const dataSource: DataType[] = [];
  for (let i = 0; i < 9; i++) {
    dataSource.push({
      key: i,
      adminID: "230000-01",
      adminName: "John Brown",
      role: "CMA",
      department: "Customer Experience",
      activity: "Modify Applicant Data",
    });
  }

  return (
    <>
      {/* Chart */}
      <div></div>
          {/* Table */}
          <div>
              <h2 className="font-semibold text-lg pb-5 pl-2">Admin Activity</h2>
      <Table dataSource={dataSource} columns={columns} bordered={true}/>;
          </div>
    </>
  );
};

export default AdminActivity;
