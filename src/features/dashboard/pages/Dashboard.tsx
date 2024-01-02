import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { SimpleCard } from "src/components/cards/SimpleCard";

import { LatestActivities } from "../components/LatestActivities";
import { AppStatus } from "../components/AppStatus";
import { PopularCountries } from "../components/PopularCountries";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";
import { useFetchRoles } from "src/features/settings/features/rolesAndPermissions/hooks/useFetchRoles";

const Dashboard = () => {
  // const { data } = useFetchRoles();
  const { data } = useFetchUserProfile();
  console.log(data);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageIntro title="Dashboard" arrowBack={false} />
        <AppButton label="Add Applicants" />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <PopularCountries />
        <AppStatus />
        <LatestActivities />
      </div> */}
    </>
  );
};

export default Dashboard;
