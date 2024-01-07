import { SimpleCard } from "src/components/cards/SimpleCard";
import { Banner } from "./Banner";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";
import { useGetAdminDashboardCounts } from "../hooks/useGetAdminDashboardCounts";
import { PercentageWrap } from "./PercentageWrap";
import { LatestActivities } from "./LatestActivities";
import { Pie } from "react-chartjs-2";
import { options } from "../utils";
import { useEffect, useState } from "react";

import { ArcElement, Tooltip, Legend, Chart } from "chart.js";
import { Progress } from "antd";

Chart.register(ArcElement, Tooltip, Legend);

export const DSM = () => {
  const { data: rolesData } = useFetchUserProfile();
  const { data: countData } = useGetAdminDashboardCounts();
  const count = countData?.dms;

  const [chartInstance, setChartInstance] = useState<any>(null);

  useEffect(() => {
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  const data = {
    labels: ["Collected", "Not Collected"],
    datasets: [
      {
        data: [
          count?.document_status.collated_documents,
          count?.document_status.uncollated_documents,
        ],
        backgroundColor: ["#012168", "#801d23"],
        hoverBackgroundColor: ["#012168", "#801d23"],
      },
    ],
  };

  return (
    <div>
      <Banner title={rolesData?.roles?.name || ""} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-8">
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="blue"
          title="Total Applications"
          count={count?.total_applications || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="oxblood"
          title="Collated Documents Applicants"
          count={count?.collated_documents || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="green"
          title="Uncollected Documents Applicants"
          count={count?.uncollated_documents || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="yellow"
          title="Submitted Applicants Documents"
          count={count?.submited_applicant_documents || 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
        <PercentageWrap title="Document status" buttonLabel="This month">
          <div className="flex justify-center">
            <div style={{ width: "500px", height: "300px" }}>
              <Pie
                data={data}
                options={options}
                ref={(ref: any) =>
                  setChartInstance(ref ? ref.chartInstance : null)
                }
              />
            </div>
          </div>
        </PercentageWrap>
        <PercentageWrap title="Collation status" buttonLabel="Application">
          <div className="flex justify-center">
            <div className="flex gap-y-6 flex-col">
              <Progress
                strokeColor={"var(--card-yellow)"}
                type="circle"
                percent={count?.collation_status.pending}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Pending</span>
                  </div>
                )}
                size={100}
              />
              <Progress
                strokeColor={"#EC5252"}
                type="circle"
                percent={count?.collation_status.rejected}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Rejected</span>
                  </div>
                )}
                size={120}
              />
            </div>

            <div className="mt-7">
              <Progress
                strokeColor={"var(--card-green)"}
                type="circle"
                percent={count?.collation_status.approved}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Approved</span>
                  </div>
                )}
                size={140}
              />
            </div>
          </div>
        </PercentageWrap>
        <LatestActivities />
      </div>
    </div>
  );
};
