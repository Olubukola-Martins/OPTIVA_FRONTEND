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

// CHART DATA
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
      label: "Inactive",
      data: [78, 54, 61, 41, 68, 72, 56, 82, 45, 59, 83, 60],
      lineTension: 0.4,
      borderColor: "#E8CC81",
      backgroundColor: "#E8CC81",
    },
    {
      label: "Active",
      data: [80, 42, 75, 48, 63, 37, 51, 71, 55, 66, 79, 44],
      lineTension: 0.4,
      borderColor: "#7CE5C1",
      backgroundColor:"#7CE5C1",
    },
  ],
};

const ApplicantStatusOverview = ({ displayTable }: IProp) => {
  // TABLE DATA
  interface DataType {
    key: number | string;
    adminID: number | string;
    applicantName: string;
    country: string;
    programType: string;
    investmentRoute: string;
    numberDependents: number;
    applicantStatus: string;
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
        <p
          className={`${
            val.applicantStatus === "Active"
              ? "text-green-600"
              : "text-yellow-500"
          }`}
        >
          {val.applicantStatus}
        </p>
      ),
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
      <h2 className="font-semibold text-lg pb-5 pt-3 px-8 max-sm:text-center">
        Applicant Status Overview
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
          ;
        </div>
      )}
    </>
  );
};

export default ApplicantStatusOverview;
