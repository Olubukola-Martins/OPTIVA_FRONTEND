import { Input, Select, Tabs } from "antd";
import { ActiveApplications } from "../ApplicationRoles/OperationsRole/ActiveApplications";
import { InactiveApplications } from "../ApplicationRoles/OperationsRole/InactiveApplications";
import { IRoleTabProps } from "../ApplicationRoles/AuditRole/AuditTab";
import { useState } from "react";

export const ApplicationsTab: React.FC<IRoleTabProps> = ({ onRoleSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "Active Applications",
      children: <ActiveApplications searchTerm={searchTerm} />,
      key: "Active Applications",
    },
    {
      label: "Inactive Applications",
      children: <InactiveApplications searchTerm={searchTerm} />,
      key: "Inactive Applications",
    },
  ];
  return (
    <>
      <Tabs
        items={tabItems}
        className="hover:bg-caramel active:text-primary"
        tabBarExtraContent={
          <div className="flex gap-4">
            <Input.Search
              placeholder="Search"
              className="md:flex hidden w-[250px]"
              onSearch={(val) => setSearchTerm(val)}
              onChange={(e) => e.target.value === "" && setSearchTerm("")}
            />
            <Select
              allowClear
              placeholder="Role"
              className="md:flex hidden w-[250px]"
              onChange={onRoleSelect}
              options={[
                {
                  value: 1,
                  label: `DR's List`,
                },
                {
                  value: 2,
                  label: `DPO's List`,
                },
                {
                  value: 3,
                  label: `DMS's List`,
                },
                {
                  value: 4,
                  label: `Audit's List`,
                },
                {
                  value: 5,
                  label: `Operations  List`,
                },
                {
                  value: 6,
                  label: `Service Manager's  List`,
                },
                {
                  value: 7,
                  label: `Customer Engager's  List`,
                },
              ]}
            />
          </div>
        }
      />
    </>
  );
};
