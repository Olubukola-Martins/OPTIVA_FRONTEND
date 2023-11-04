import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface IProp {
  displayTable: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// CHART DATA
const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
      max: 100,
      title: {
        display: true,
        text: "Percentage (%)",
        font: {
          size: 14,
        },
      },
    },
  },

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Applicant Status Overview",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  labels,
  datasets: [
    {
      label: "Pending",
      data: [36, 40, 53, 70, 57, 50, 76, 49, 67, 64, 73, 46],
      lineTension: 0.4,
      borderColor: "#EC5252",
      backgroundColor: "#EC5252",
    },
    {
      label: "Uploaded",
      data: [52, 54, 61, 41, 68, 72, 56, 82, 45, 59, 83, 60],
      lineTension: 0.4,
      borderColor: "#E8CC81",
      backgroundColor: "#E8CC81",
    },
    {
      label: "Reviewed",
      data: [67, 70, 85, 64, 77, 75, 76, 66, 81, 70, 84, 63],
      lineTension: 0.4,
      borderColor: "#7CE5C1",
      backgroundColor: "#7CE5C1",
    },
  ],
};


const DocumentReviewStatus = ({ displayTable }: IProp) => {
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
              status === "Pending"
                ? "text-[#012168]"
                : status === "Uploaded"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
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
      {!displayTable && (
        <div className="h-[350px] sm:h-[500px]">
          <Line
            options={options}
            data={data}
            className={`md:px-11 sm:px-8 px-1 `}
          />
        </div>
      )}

      {/* Table */}
      {displayTable && (
        <div>
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered={true}
            scroll={{ x: 900 }}
          />
        </div>
      )}
    </>
  );
};

export default DocumentReviewStatus;
