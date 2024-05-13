import { Input, Select, Tabs } from "antd";
import { ActiveApplications } from "./ActiveApplications";
import { InactiveApplications } from "./InactiveApplications";
import { IRoleTabProps } from "../AuditRole/AuditTab";
import { useState } from "react";

export const ApplicationsTab: React.FC<IRoleTabProps> = ({
  onRoleSelect,
  selectedRole,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "Active Prospects",
      children: <ActiveApplications searchTerm={searchTerm} />,
      key: "Active Prospects",
    },
    {
      label: "Inactive Prospects",
      children: <InactiveApplications searchTerm={searchTerm} />,
      key: "Inactive Prospects",
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
                value={selectedRole}
                options={[
                  {
                    value: 6,
                    label: "DR's List",
                  },
                  {
                    value: 4,
                    label: "DPO's List",
                  },
                  {
                    value: 3,
                    label: "DMS's List",
                  },
                  {
                    value: 5,
                    label: "Audit's List",
                  },
                  {
                    value: 1,
                    label: "Operations List",
                  },
                  {
                    value: 2,
                    label: "Service Manager's List",
                  },
                  {
                    value: 9,
                    label: "Customer Engager's List",
                  },
                ]}
             
              />
          </div>
        }
      />
    </>
  );
};
