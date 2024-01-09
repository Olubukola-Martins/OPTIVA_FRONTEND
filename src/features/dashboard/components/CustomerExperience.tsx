import { SimpleCard } from "src/components/cards/SimpleCard";
import { Banner } from "./Banner";
import { LatestActivities } from "./LatestActivities";
import { useGetAdminDashboardCounts } from "../hooks/useGetAdminDashboardCounts";
import { PercentageWrap } from "./PercentageWrap";
import { Progress } from "antd";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";

export const CustomerExperience = () => {
  const { data } = useGetAdminDashboardCounts();
  const { data: rolesData } = useFetchUserProfile();
  const count = data?.customer_experience;
    
  return (
    <>
      <Banner title={rolesData?.roles.name || ""} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-8">
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="blue"
          title="Total Application"
          count={count?.total_applications || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="oxblood"
          title="Active Applications"
          count={count?.active_application || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="green"
          title="Inactive Applications"
          count={count?.inactive_application || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="yellow"
          title="Submitted to Partner"
          count={count?.submitted_to_partner || 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 mt-10">
        <PercentageWrap title="Application status" buttonLabel="This month">
          <div className="flex justify-center">
            <div className="flex gap-y-6 flex-col">
              <Progress
                strokeColor={"var(--card-yellow)"}
                type="circle"
                percent={5}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Pending</span>
                  </div>
                )}
                size={130}
              />
              <Progress
                strokeColor={"var(--card-green)"}
                type="circle"
                percent={count?.application_status.submitted}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Submitted</span>
                  </div>
                )}
                size={150}
              />
            </div>
            <div className="mt-7">
              <Progress
                strokeColor={"var(--card-blue)"}
                type="circle"
                percent={count?.application_status.under_review}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Under Review</span>
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
