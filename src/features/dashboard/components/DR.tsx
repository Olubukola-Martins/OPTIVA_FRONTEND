import { SimpleCard } from "src/components/cards/SimpleCard";
import { Banner } from "./Banner";
import { LatestActivities } from "./LatestActivities";
import { useGetAdminDashboardCounts } from "../hooks/useGetAdminDashboardCounts";
import { PercentageWrap } from "./PercentageWrap";
import { Progress } from "antd";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";

export const DR = () => {
  const { data } = useGetAdminDashboardCounts();
  const { data: rolesData } = useFetchUserProfile();
  const count = data?.dr;

  return (
    <>
      <Banner title={rolesData?.roles.name || ""} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-8">
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="blue"
          title="Total Handover From DMS"
          count={count?.total_handover_from_dms || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="oxblood"
          title="Pending Handover"
          count={count?.pending_handover || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="green"
          title="Confirmed Handover"
          count={count?.confirmed_handover || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="yellow"
          title="Unreviewed Documents"
          count={count?.declined_handover || 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 mt-10">
        <PercentageWrap title="Handover status" buttonLabel="This month">
          <div className="flex justify-center">
            <div className="flex gap-y-6 flex-col">
              <Progress
                strokeColor={"var(--card-yellow)"}
                type="circle"
                percent={count?.handover_status.pending}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Pending</span>
                  </div>
                )}
                size={130}
              />
              <Progress
                strokeColor={"var(--card-oxblood)"}
                type="circle"
                percent={count?.handover_status.declined}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Declined</span>
                  </div>
                )}
                size={150}
              />
            </div>
            <div className="mt-7">
              <Progress
                strokeColor={"var(--card-blue)"}
                type="circle"
                percent={count?.handover_status.confirmed}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Confirmed</span>
                  </div>
                )}
                size={170}
              />
            </div>
          </div>
        </PercentageWrap>
        <LatestActivities />
      </div>
    </>
  );
};
