import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddBranch } from "../components/AddBranch";
import { Tabs } from "antd";

import { ActivateBranches } from "../hooks/ActivateBranches";
import { InactiveBranches } from "../hooks/InactiveBranches";
import { useBranchUpdate } from "../hooks/useBranchUpdate";

const Branches = () => {
  const { addBranch, setAddBranch, branchId, handleAddBranch } =
  useBranchUpdate();
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "Active Branches",
      children: <ActivateBranches />,
      key: "Active Employees",
    },
    {
      label: "Inactive Branches",
      children: <InactiveBranches />,
      key: "Inactive Employees",
    },
  ];
  return (
    <>
      <AddBranch
        id={branchId}
        open={addBranch}
        handleClose={() => setAddBranch(false)}
      />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Branches"
          description="Create, View & edit branch on the system"
          linkBack={appRoute.settings}
        />
        <div>
          <AppButton label="Add New" handleClick={() => handleAddBranch()} />
        </div>
      </div>

      <Tabs
        items={tabItems}
        className="hover:bg-caramel active:text-primary"
        // tabBarExtraContent={operations}
      />
    </>
  );
};

export default Branches;
