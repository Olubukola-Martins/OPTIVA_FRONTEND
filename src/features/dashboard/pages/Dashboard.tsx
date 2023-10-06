import { PageIntro } from "src/components/PageIntro";
import { SimpleCard } from "src/components/cards/SimpleCard";
import { DashboardLayout } from "src/components/layout/Layout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div>
        <PageIntro title="Dashboard" description="All descriptions here" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <SimpleCard
            icon="ph:user-list-duotone"
            cardColor="yellow"
            title="card title"
            count={9}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
