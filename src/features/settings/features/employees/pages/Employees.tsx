import { Input, Select, Tabs } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ActiveEmployees } from "../components/ActiveEmployees";
import { InvitedEmployees } from "../components/InvitedEmployees";

const Employees = () => {
  const operations = (
    <div className="hidden lg:flex gap-4 w-full">
      <Input.Search placeholder="Search" className="w-1/2"></Input.Search>
      <Select placeholder="Filter" className="w-1/2" />
    </div>
  );
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "Active Employees",
      children: <ActiveEmployees />,
      key: "Active Employees",
    },
    {
      label: "Inactive Employees",
      children: <InvitedEmployees />,
      key: "Inactive Employees",
    },
  ];
  return (
    <>
      {/* <NewDepartment
        open={addDepartment}
        handleClose={() => setAddDepartment(false)}
      /> */}
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Employees"
          description="Create, View & edit employees on the system"
          linkBack={appRoute.settings}
        />

        <div>
          <AppButton
            label="Add New"
            // handleClick={() => setAddDepartment(true)}
          />
        </div>
      </div>

      <div>
      <Tabs
        items={tabItems}
        className="hover:bg-caramel active:text-primary"
        tabBarExtraContent={operations}
      />
      </div>
    </>
  );
};

export default Employees;
