import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { SimpleCard } from "src/components/cards/SimpleCard";
import { DashboardLayout } from "src/components/layout/Layout";
import welcomeVector from ".././assets/welcomeVector.svg";
import introBg from ".././assets/introBg.png";
import { LatestActivities } from "../components/LatestActivities";
import { AppStatus } from "../components/AppStatus";
import { PopularCountries } from "../components/PopularCountries";

const Dashboard = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageIntro title="Dashboard" arrowBack={false} />
        <AppButton label="Add Applicants" />
      </div>

      <div
        className="flex justify-between rounded-lg Container"
        style={{ background: `url(${introBg})` }}
      >
        <div className="text-white flex flex-col justify-center py-4">
          <h2 className="font-semibold text-lg md:text-2xl pb-1">
            Hello Ruth!
          </h2>
          <p className="text-sm md:text-base">Welcome to your dashboard</p>
        </div>
        <div className="pt-5 md:flex hidden">
          <img src={welcomeVector} alt="dashboard" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-7">
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="blue"
          title="Master List"
          count={0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="oxblood"
          title="Authorized  
            Applicants"
          count={0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="green"
          title="Paid
          Applicants"
          count={0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="yellow"
          title="Prospects"
          count={0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <PopularCountries />
        <AppStatus />
        <LatestActivities />
      </div>
    </>
  );
};

export default Dashboard;
