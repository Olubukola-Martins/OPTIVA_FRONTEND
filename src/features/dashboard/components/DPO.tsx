import { SimpleCard } from "src/components/cards/SimpleCard";
import { Banner } from "./Banner";
import { LatestActivities } from "./LatestActivities";
import { useGetAdminDashboardCounts } from "../hooks/useGetAdminDashboardCounts";
import { PercentageWrap } from "./PercentageWrap";
import { Progress } from "antd";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";

export const DPO = () => {
  const { data } = useGetAdminDashboardCounts();
  const { data: rolesData } = useFetchUserProfile();
  const count = data?.dpo;

  return (
    <>
      <Banner title={rolesData?.roles.name || ""} />
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
          title="Court Certified Documents"
          count={count?.court_certified_documents || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="green"
          title="Reviewed Documents"
          count={count?.reviewed_documents || 0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="yellow"
          title="Unreviewed Documents"
          count={count?.unreviewed_documents || 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 mt-10">
        <PercentageWrap title="Document status" buttonLabel="Applicant">
          <div className="flex justify-center">
            <div className="flex gap-y-6 flex-col">
              <Progress
                strokeColor={"var(--card-yellow)"}
                type="circle"
                percent={count?.document_status.court_certified}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Court Certified</span>
                  </div>
                )}
                size={130}
              />
              <Progress
                strokeColor={"var(--card-oxblood)"}
                type="circle"
                percent={count?.document_status.unreviewed}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Not Reviewed</span>
                  </div>
                )}
                size={150}
              />
            </div>
            <div className="mt-7">
              <Progress
                strokeColor={"var(--card-blue)"}
                type="circle"
                percent={count?.document_status.reviewed}
                format={(percent) => (
                  <div className="text-accent">
                    <span>{percent}%</span>
                    <span className="block text-sm pt-1">Reviewed</span>
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
