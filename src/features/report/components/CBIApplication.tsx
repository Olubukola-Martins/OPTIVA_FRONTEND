import { Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

interface IProp {
  displayTable: boolean;
}


// Data for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// CBI Stages
const allStages = [
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
];

// TABLE DATA FOR STAGE 1-16, EXCEPT 2,3,4,5,6
interface DataTypeOthers {
  key: number | string;
  applicantID: number | string;
  applicantName: string;
  phoneNumber: string;
  email: string;
  country: string;
  numberDependents: number;
}
const columnsOthers: ColumnsType<DataTypeOthers> = [
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
const dataSourceOthers: DataTypeOthers[] = [];
for (let i = 0; i < 9; i++) {
  dataSourceOthers.push({
    key: i,
    applicantID: "230000-01",
    applicantName: "John Brown",
    phoneNumber: "+234 7080 342 232",
    email: "Johnbrown@gmail.com",
    country: "Grenada",
    numberDependents: 6 * i + i ** 2,
  });
}

// TABLE DATA STAGE 2
interface DataType2 {
  key: number | string;
  applicantID: number | string;
  applicantName: string;
  phoneNumber: string;
  email: string;
  country: string;
  numberDependents: number;
  cmaAssigned: string;
  dmsAssigned: string;
}
const columns2: ColumnsType<DataType2> = [
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
    title: "CMA Assigned To",
    dataIndex: "cmaAssigned",
    key: "cmaAssigned",
  },
  {
    title: "DMS Assigned To",
    dataIndex: "dmsAssigned",
    key: "dmsAssigned",
  },
];
const dataSource2: DataType2[] = [];
for (let i = 0; i < 9; i++) {
  dataSource2.push({
    key: i,
    applicantID: "230000-01",
    applicantName: "John Brown",
    phoneNumber: "+234 7080 342 232",
    email: "Johnbrown@gmail.com",
    country: "Grenada",
    numberDependents: 6 * i + i ** 2,
    cmaAssigned: "Jane Doe",
    dmsAssigned: "Mike Smith",
  });
}

// TABLE DATA FOR STAGE 3
interface DataType3 {
  key: number | string;
  applicantID: number | string;
  applicantName: string;
  phoneNumber: string;
  email: string;
  country: string;
  numberDependents: number;
  onboardedBy: string;
}
const columns3: ColumnsType<DataType3> = [
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
    title: "Onboarded By",
    dataIndex: "onboardedBy",
    key: "onboardedBy",
  },
];
const dataSource3: DataType3[] = [];
for (let i = 0; i < 9; i++) {
  dataSource3.push({
    key: i,
    applicantID: "230000-01",
    applicantName: "John Brown",
    phoneNumber: "+234 7080 342 232",
    email: "Johnbrown@gmail.com",
    country: "Grenada",
    numberDependents: 6 * i + i ** 2,
    onboardedBy: "John Brown",
  });
}

// TABLE DATA FOR STAGE 4
interface DataType4 {
  key: number | string;
  applicantID: number | string;
  applicantName: string;
  phoneNumber: string;
  email: string;
  country: string;
  numberDependents: number;
  numberDocuments: string;
  collatedBy: string;
}
const columns4: ColumnsType<DataType4> = [
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
    title: "Number of Documents",
    dataIndex: "numberDocuments",
    key: "numberDocuments",
    width: 35,
  },

  {
    title: "Collated By",
    dataIndex: "collatedBy",
    key: "collatedBy",
  },
];
const dataSource4: DataType4[] = [];
for (let i = 0; i < 9; i++) {
  dataSource4.push({
    key: i,
    applicantID: "230000-01",
    applicantName: "John Brown",
    phoneNumber: "+234 7080 342 232",
    email: "Johnbrown@gmail.com",
    country: "Grenada",
    numberDependents: 6 * i + i ** 2,
    numberDocuments: "3/10",
    collatedBy: "John Brown",
  });
}

// TABLE DATA FOR STAGE 5
interface DataType5 {
  key: number | string;
  applicantID: number | string;
  applicantName: string;
  phoneNumber: string;
  email: string;
  country: string;
  numberDependents: number;
  numberDocuments: string;
  processedBy: string;
}
const columns5: ColumnsType<DataType5> = [
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
    title: "Number of Documents",
    dataIndex: "numberDocuments",
    key: "numberDocuments",
    width: 35,
  },
  {
    title: "Processed By",
    dataIndex: "processedBy",
    key: "processedBy",
  },
];
const dataSource5: DataType5[] = [];
for (let i = 0; i < 9; i++) {
  dataSource5.push({
    key: i,
    applicantID: "230000-01",
    applicantName: "John Brown",
    phoneNumber: "+234 7080 342 232",
    email: "Johnbrown@gmail.com",
    country: "Grenada",
    numberDependents: 6 * i + i ** 2,
    numberDocuments: "3/10",
    processedBy: "John Brown",
  });
}

// TABLE DATA FOR STAGE 6
interface DataType6 {
  key: number | string;
  applicantID: number | string;
  applicantName: string;
  phoneNumber: string;
  email: string;
  country: string;
  numberDependents: number;
  auditedBy: string;
}
const columns6: ColumnsType<DataType6> = [
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
    title: "Audited By",
    dataIndex: "auditedBy",
    key: "auditedBy",
  },
];
const dataSource6: DataType6[] = [];
for (let i = 0; i < 9; i++) {
  dataSource6.push({
    key: i,
    applicantID: "230000-01",
    applicantName: "John Brown",
    phoneNumber: "+234 7080 342 232",
    email: "Johnbrown@gmail.com",
    country: "Grenada",
    numberDependents: 6 * i + i ** 2,
    auditedBy: `Edward King`,
  });
}

type AnyDataType =
  | DataType2
  | DataType3
  | DataType4
  | DataType5
  | DataType6
  | DataTypeOthers;

const CBIApplication = ({ displayTable }: IProp) => {
  const [columns, setColumns] =
    useState<ColumnsType<AnyDataType>>(columnsOthers);
  const [dataSource, setDataSource] = useState<AnyDataType[]>(dataSourceOthers);
  const [selectedStage, setSelectedStage] = useState<string>(
    "Stage 1 -Prospect Report"
  );
  const [chartData, setChartData] = useState<number[]>([
    78, 43, 90, 43, 60, 26, 71, 55, 41,
  ]);

  // CHART DATA CONT ....
  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "%",
        data: chartData,
        fill: "start",
        lineTension: 0.4,
        backgroundColor: "rgba(0, 106, 255, 0.15)",
        borderColor: "#006AFF",
      },
    ],
  };
  // ;
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
        text: selectedStage,
        font: {
          size: 16,
        },
      },
    },
  };

  const handleSelectChange = (value: string) => {
    const stageDataMapping: Record<
      string,
      { columns: ColumnsType<AnyDataType>; data: AnyDataType[] }
    > = {
      "Stage 2 - Client Assignment": {
        columns: columns2 as ColumnsType<AnyDataType>,
        data: dataSource2,
      },
      "Stage 3 - Client Onboarding": {
        columns: columns3 as ColumnsType<AnyDataType>,
        data: dataSource3,
      },
      "Stage 4 - Document Collation": {
        columns: columns4 as ColumnsType<AnyDataType>,
        data: dataSource4,
      },
      "Stage 5 - Document Processing": {
        columns: columns5 as ColumnsType<AnyDataType>,
        data: dataSource5,
      },
      "Stage 6 - Audit Review": {
        columns: columns6 as ColumnsType<AnyDataType>,
        data: dataSource6,
      },
    };

    const selectedStageData = stageDataMapping[value] || {
      columns: columnsOthers,
      data: dataSourceOthers,
    };
    setChartData(chartData.map(() => Math.floor(Math.random() * 100) + 1));
    setSelectedStage(value);
    setColumns(selectedStageData.columns);
    setDataSource(selectedStageData.data);
  };

  return (
    <>
      <div className=" pb-5 pt-3 px-8 flex flex-col gap-2 sm:flex-row justify-between items-center">
        <h2 className="font-semibold sm:text-lg ">CBI Application Report</h2>
        <Select
          placeholder="Select Stage Report"
          onChange={handleSelectChange}
          popupMatchSelectWidth={false}
          options={allStages}
        />
      </div>
      {/* Chart */}
      {!displayTable && (
        <div className="h-[350px] sm:h-[500px]">
          <Line
            data={data}
            options={options}
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

export default CBIApplication;
