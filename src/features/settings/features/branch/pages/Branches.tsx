import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddBranch } from "../components/AddBranch";
import { Input, Tabs } from "antd";
import { ActivateBranches } from "../hooks/ActivateBranches";
import { useBranchUpdate } from "../hooks/useBranchUpdate";
import { InactivateBranches } from "../hooks/InactiveBranches";
import { useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { addBranch, setAddBranch, branchId, handleAddBranch } =
    useBranchUpdate();

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "Active Branches",
      children: <ActivateBranches searchValue={debouncedSearchTerm} />,
      key: "Active Branches",
    },
    {
      label: "Inactive Branches",
      children: <InactivateBranches searchValue={debouncedSearchTerm} />,
      key: "Inactive Branches",
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
        tabBarExtraContent={
          <Input.Search
            allowClear
            placeholder="Search"
            className="md:flex hidden"
            onSearch={(val) => setSearchTerm(val)}
            onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />
        }
      />
    </>
  );
};

export default Branches;
