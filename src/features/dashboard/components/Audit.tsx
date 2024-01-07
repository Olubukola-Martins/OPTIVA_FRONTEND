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

Chart.register(ArcElement, Tooltip, Legend);

export const Audit = () => {
  const { data: rolesData } = useFetchUserProfile();
  const { data: countData } = useGetAdminDashboardCounts();
  const count = countData?.audit;

  const [chartInstance, setChartInstance] = useState<any>(null);

  useEffect(() => {
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  const data = {
    labels: [
      "Bank Due Diligence Clearance",
      "Approved",
      "Soft Copy Passport Released/Shipped",
      "Passport Delivered",
    ],
    datasets: [
      {
        data: [
          count?.submission_status.bank_due_dilligence,
          count?.submission_status.approved,
          count?.submission_status.soft_copy,
          count?.submission_status.passport_delivered,
        ],
        backgroundColor: ["#28a745", "#012168", "#ff9500", "#801d23"],
        hoverBackgroundColor: ["#28a745", "#012168", "#ff9500", "#801d23"],
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
          title="Internal Review (Category 1)"
          count={count?.internal_review || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="green"
          title="Submitted to Partner"
          count={count?.submitted_to_partner || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="yellow"
          title="External Review (Category 2)"
          count={count?.external_review || 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 mt-10">
        <PercentageWrap title="Submission status" buttonLabel="This month">
          <div className="flex justify-center">
            <div style={{ width: "600px", height: "400px" }}>
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
        <LatestActivities />
      </div>
    </div>
  );
};
