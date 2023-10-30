import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

const ApplicantInteractions = () => {
  // TABLE DATA 
  interface DataType {
    key: number | string;
    applicantID: number | string;
    applicantName: string;
    phoneNumber: string;
    email: string;
    logActivity: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Applicant ID",
      dataIndex: "applicantID",
      key: "applicantID",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Log Activity",
      dataIndex: "logActivity",
      key: "logActivity",
    },
  ];
  const dataSource: DataType[] = [];
  for (let i = 0; i < 9; i++) {
    dataSource.push({
      key: i,
      applicantID: "230000-01",
      applicantName: "John Brown",
      phoneNumber: "+234 7080 342 232",
      email: "Johnbrown@gmail.com",
      logActivity: "2 days ago",
    });
  }

  return (
    <>
      <h2 className="font-semibold text-lg pb-5 pt-3 px-8 max-sm:text-center">
        Applicant Interactions
      </h2>
      {/* Chart */}
      <div className="hidden"></div>

      {/* Table */}
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered={true}
          scroll={{ x: 900 }}
        />
        ;
      </div>
    </>
  );
};

export default ApplicantInteractions;
