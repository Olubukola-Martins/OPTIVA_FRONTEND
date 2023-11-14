import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

const ApplicantTypeBreakdown = () => {
  // TABLE DATA
  interface DataType {
    key: number;
    applicantID: number | string;
    applicantName: string;
    country: string;
    programType: string;
    numberDependents: number;
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
      title: "Applicant Type",
      dataIndex: "applicantType",
      key: "applicantType",
      render: (_, record) => {
        const type = record.key % 2 === 1 ? "Authorized" : "Paid";
        return (
          <p
            className={`${
              type === "Authorized" ? "text-[#012168]" : "text-green-500"
            }`}
          >
            {type}
          </p>
        );
      },
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
      title: "Number of Dependents",
      dataIndex: "numberDependents",
      key: "numberDependents",
      width: 35,
    },
  ];
  const dataSource: DataType[] = [];
  for (let i = 0; i < 9; i++) {
    dataSource.push({
      key: i,
      applicantID: "230000-01",
      applicantName: "John Brown",
      country: "Grenada",
      programType: "CBI",
      numberDependents: 6 * i + i ** 2,
    });
  }

  return (
    <>
      <h2 className="font-semibold text-lg pb-5 pt-3 px-8 max-sm:text-center">
        Applicant Type Breakdown
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

export default ApplicantTypeBreakdown;
