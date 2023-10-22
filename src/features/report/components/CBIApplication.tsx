import { Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";

const CBIApplication = () => {
  // TABLE DATA
  interface DataType {
    key: number | string;
    adminID: number | string;
    applicantName: string;
    phoneNumber: string;
    email: string;
    country: string;
    numberDependents: number;
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
      title: "Country",
      dataIndex: "country",
      key: "country",
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
      adminID: "230000-01",
      applicantName: "John Brown",
      phoneNumber: "+234 7080 342 232",
      email: "Johnbrown@gmail.com",
      country: "Grenada",
      numberDependents: 6 * i + i ** 2,
    });
  }

  return (
    <>
      <div className="pt-2 pb-5 flex flex-row justify-between">
        <h2 className="font-semibold text-lg ">CBI Application Report</h2>
        <Select
          placeholder="Select Stage Report"
          popupMatchSelectWidth={false}
          options={[
            {
              value: "Stage 1 -Prospect Report",
              label: "Stage 1 -Prospect Report",
            },
            {
              value: "Stage 2 - Client Assignment",
              label: "Stage 2 - Client Assignment",
            },
            {
              value: "Stage 3 - Client Onboarding",
              label: "Stage 3 - Client Onboarding",
            },
            {
              value: "Stage 4 - Document Collation",
              label: "Stage 4 - Document Collation",
            },
            {
              value: "Stage 5 - Document Processing",
              label: "Stage 5 - Document Processing",
            },
            {
              value: "Stage 6 - Audit Review",
              label: "Stage 6 - Audit Review",
            },
            {
              value: "Stage 7 - Partner Review",
              label: "Stage 7 - Partner Review",
            },
            {
              value: "Stage 8 - Bank Clearance",
              label: "Stage 8 - Bank Clearance",
            },
            {
              value: "Stage 9 - CBI Committee Submission",
              label: "Stage 9 - CBI Committee Submission",
            },
            {
              value: "Stage 10 - CBI Committee Review",
              label: "Stage 10 - CBI Committee Review",
            },
            {
              value: "Stage 11 - CBI Cabinet Review",
              label: "Stage 11 - CBI Cabinet Review",
            },
            {
              value: "Stage 12 - CEO Voting Activity",
              label: "Stage 12 - CEO Voting Activity",
            },
            {
              value: "Stage 13 - Outstanding Balance",
              label: "Stage 13 - Outstanding Balance",
            },
            {
              value: "Stage 14 - Passport Issuance",
              label: "Stage 14 - Passport Issuance",
            },
            {
              value: "Stage 15 - Certificate shipped",
              label: "Stage 15 - Certificate shipped",
            },
            {
              value: "Stage 16 - Passport Delivery",
              label: "Stage 16 - Passport Delivery",
            },
          ]}
        />
      </div>
      {/* Chart */}
      <div className="hidden"></div>
      {/* Table */}
      <div>
        <Table dataSource={dataSource} columns={columns} bordered={true} />;
      </div>
    </>
  );
};

export default CBIApplication;
