import {  Table } from "antd";
import { ColumnsType } from "antd/es/table";

const ApplicantStatusOverview = () => {
  // TABLE DATA
  interface DataType {
    key: number | string;
    adminID: number | string;
    applicantName: string;
    country: string;
    programType: string;
    investmentRoute: string;
    numberDependents: number;
    applicantStatus:string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Admin ID",
      dataIndex: "adminID",
      key: "adminID",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },

    {
      title: "Program Type",
      dataIndex: "programType",
      key: "programType",
    },
    {
      title: "Investment Route",
      dataIndex: "investmentRoute",
      key: "investmentRoute",
    },
    {
      title: "Number of Dependents",
      dataIndex: "numberDependents",
      key: "numberDependents",
      width: 35,
    },
    {
      title: "Applicant Status",
      dataIndex: "applicantStatus",
        key: "applicantStatus",
        render: (_, val) => (
            <p className={`${val.applicantStatus === "Active" ? "text-green-600" : "text-yellow-500"}`}>{val.applicantStatus}</p>
        )
    },
  ];
    
      const dataSource: DataType[] = [];
      for (let i = 0; i < 9; i++) {
        dataSource.push({
          key: i,
          adminID: "230000-01",
          applicantName: "John Brown",
          country: "Grenada",
          programType: "CBI",
          investmentRoute: "Donation",
          numberDependents: 6 * i + i ** 2,
          applicantStatus: i === 1 ? "Inactive" : "Active",
        });
      }


  return (
    <>
      <h2 className="font-semibold text-lg pb-5 pl-2 ">
        Applicant Status Overview
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

export default ApplicantStatusOverview;
