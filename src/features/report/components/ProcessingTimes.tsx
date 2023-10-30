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

const ProcessingTimes = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = [
    "Milestone 1",
    "Milestone 2",
    "Milestone 3",
    "Milestone 4",
    "Milestone 5",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Days",
        minBarThickness: 28,
        maxBarThickness: 42,
        data: [5, 10, 15, 20, 35],
        backgroundColor: "#B0C3CC",
        Tooltip: {
          enabled: true,
        },
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...data.datasets[0].data) + 5,
        stepSize: 5,
        title: {
          display: true,
          text: "Days",
          font: {
            size: 16,
          },
        },
      },
      x: {
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
        text: "Processing Times",
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <>
      <h2 className="font-semibold text-lg pb-5 pt-3 px-8 max-sm:text-center">
        Processing Times
      </h2>
      {/* Chart */}
      <div style={{ height: "600px" }}>
        <Bar
                  className={`md:px-11 sm:px-8 px-3`}
                //   ${styles["chart-container"]}
          options={options}
          data={data}
        />
      </div>
    </>
  );
};

export default ProcessingTimes;
