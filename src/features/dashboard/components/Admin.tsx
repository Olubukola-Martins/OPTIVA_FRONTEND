import { SimpleCard } from "src/components/cards/SimpleCard";
import { Banner } from "./Banner";
import { useGetAdminDashboardCounts } from "../hooks/useGetAdminDashboardCounts";
import { PercentageWrap } from "./PercentageWrap";
import { Progress } from "antd";
import { AdminActivityLog } from "./AdminActivityLog";
import { appRoute } from "src/config/routeMgt/routePaths";

export const Admin = () => {
  const { data } = useGetAdminDashboardCounts();
  const count = data?.administrator;
  console.log('master list', data)
  return (
    <>
      <Banner title="" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-8">
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="blue"
          title="Master List"
          count={count?.master_list || 0}
          link={true}
          linkPath={appRoute.master_list}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="oxblood"
          title="Authorized  
            Applicants"
          count={count?.authorized_applications || 0}
          link={true}
          linkPath={appRoute.authorized_applicants}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="green"
          title="Paid
          Applicants"
          count={count?.paid_applications || 0}
          link={true}
          linkPath={appRoute.payments}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="yellow"
          title="Prospects"
          count={count?.prospects || 0}
          link={true}
          linkPath={appRoute.prospects}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 mt-10">
        <PercentageWrap title="Application status" buttonLabel="This month">
          <div className="flex justify-center">
            <div className="flex gap-y-6 flex-col">
              <Progress
                strokeColor={"var(--card-yellow)"}
                type="circle"
                percent={count?.application_status.inactive}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Inactive</span>
                  </div>
                )}
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
                size={160}
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
                size={180}
              />
            </div>
          </div>
        </PercentageWrap>
        <AdminActivityLog />
      </div>
    </>
  );
};
