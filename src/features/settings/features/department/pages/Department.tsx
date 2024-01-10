import { NewDepartment } from "../components/NewDepartment";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AppButton } from "src/components/button/AppButton";
import { ActiveDepartment } from "../components/ActiveDepartment";
import { InactivateDepartment } from "../components/InactivateDepartment";
import { Input, Tabs } from "antd";
import { useHandleDepartment } from "../hooks/useHandleDepartment";
import { useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";

const Department = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const {addDepartment, departmentId, setAddDepartment, handleAddDepartment} = useHandleDepartment()

  // const { removeData } = useDelete({
  //   EndPointUrl: "admin/departments/",
  //   queryKey: QUERY_KEY_FOR_DEPARTMENT,
  // });

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "Active Departments",
      children: <ActiveDepartment searchValue={debouncedSearchTerm} />,
      key: "Active Employees",
    },
    {
      label: "Inactive Departments",
      children: <InactivateDepartment searchValue={debouncedSearchTerm} />,
      key: "Inactive Employees",
    },
  ];

  return (
    <>
      <NewDepartment
        id={departmentId}
        open={addDepartment}
        handleClose={() => setAddDepartment(false)}
      />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Department"
          description="Create, View & edit departments on the system"
          linkBack={appRoute.settings}
        />

        <div>
          <AppButton
            label="Add New"
            handleClick={() => handleAddDepartment()}
          />
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
2;
export default Department;
