import { Input, Tabs } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ActiveEmployees } from "../components/ActiveEmployees";
import { InvitedEmployees } from "../components/InvitedEmployees";
import { NewEmployee } from "../components/NewEmployee";
import { useHandleUpdate } from "../hooks/useHandleUpdate";
import { useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import { DisabledEmployees } from "../components/DisabledEmployees";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { addEmployee, setAddEmployee, employeeId, handleAddEmployee } =
    useHandleUpdate();

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "Active Employees",
      children: <ActiveEmployees searchValue={debouncedSearchTerm} />,
      key: "Active Employees",
    },
    {
      label: "Invited Employees",
      children: <InvitedEmployees searchValue={debouncedSearchTerm} />,
      key: "InvitedEmployees",
    },
    {
      label: "Disabled Employees",
      children: <DisabledEmployees searchValue={debouncedSearchTerm} />,
      key: "Disabled Employees",
    },
  ];
  return (
    <>
      <NewEmployee
        id={employeeId}
        open={addEmployee}
        handleClose={() => setAddEmployee(false)}
      />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Employees"
          description="Create, View & edit employees on the system"
          linkBack={appRoute.settings}
        />

        <div>
          <AppButton label="Add New" handleClick={() => handleAddEmployee()} />
        </div>
      </div>

      <div>
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
      </div>
    </>
  );
};

export default Employees;
