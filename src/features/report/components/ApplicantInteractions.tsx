import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface IProp {
  displayTable: boolean;
}

const ApplicantInteractions = ({ displayTable }: IProp) => {
  // CHART DATA
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

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

  const mainData: number[] = [85, 65, 87, 80, 70, 88, 62, 83, 47, 79, 90, 44];

  const data = {
    labels,
    datasets: [
      {
        label: "%",
        data: mainData,
        backgroundColor: "#3f96e8",
      },
      {
        label: "",
        data: mainData.map((item) => 100 - item),
        backgroundColor: " #c7b5e6",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Percentage (%)",
          font: {
            size: 16,
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
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
        text: "Applicant Interactions",
        font: {
          size: 16,
        },
      },
    },
  };

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
      {!displayTable && (
        <div style={{ height: "600px" }}>
          <Bar
            className={`md:px-11 sm:px-8 px-3 `}
            options={options}
            data={data}
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

export default ApplicantInteractions;
