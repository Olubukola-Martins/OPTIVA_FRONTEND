import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

const DocumentReviewStatus = () => {
  // TABLE DATA
  interface DataType {
    key: number;
    applicantID: number | string;
    applicantName: string;
    programType: string;
    country: string;
    numberDependents: number;
    uploadedDocuments: string;
    // documentsStatus: string;
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
      title: "Program Type",
      dataIndex: "programType",
      key: "programType",
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
    {
      title: "Uploaded Documents",
      dataIndex: "uploadedDocuments",
      key: "uploadedDocuments",
      width: 35,
    },
    {
      title: "Documents Status",
      dataIndex: "documentsStatus",
      key: "documentsStatus",
      render: (_, record) => {
        const status =
          record.key % 3 === 1
            ? "Pending"
            : record.key % 3 === 2
            ? "Uploaded"
            : "Reviewed";
        return (
          <p
            className={`${
              status === "Pending" ? "text-[#012168]" : status === "Uploaded"
            ? "text-yellow-500" : "text-green-500"}`}
          >
            {status}
          </p>
        );
      },
    },
  ];
  const dataSource: DataType[] = [];
  for (let i = 0; i < 9; i++) {
    dataSource.push({
      key: i,
      applicantID: "230000-01",
      applicantName: "John Brown",
      programType: "CBI",
      country: "Grenada",
      numberDependents: 6 * i + i ** 2,
      uploadedDocuments: "3/10",
    });
  }

  return (
    <>
      <h2 className="font-semibold text-lg pb-5 pt-3 px-8 max-sm:text-center">
        Document Review Status
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

export default DocumentReviewStatus;
