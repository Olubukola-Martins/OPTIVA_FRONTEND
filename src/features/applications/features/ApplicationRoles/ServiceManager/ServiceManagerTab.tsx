import React, { useState } from "react";
import { ServiceManagerPortfolio } from "./ServiceManagerPortfolio";
import { Input, Select, Tabs } from "antd";
import { IRoleTabProps } from "../AuditRole/AuditTab";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";
// import { roleOptions } from "../OperationsRole/ApplicationsTab";

export const ServiceManagerTab: React.FC<IRoleTabProps> = ({
  onRoleSelect, selectedRole
}) => {
  const { data } = useFetchUserProfile();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "All Applicants",
      children: (
        <ServiceManagerPortfolio
          searchTerm={searchTerm}
        />
      ),
      key: "MyPortfolio",
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
            {data?.roles.id === 1 && (
              <Select
                allowClear
                placeholder="Role"
                className="md:flex hidden w-[250px]"
                onChange={onRoleSelect}
                value={selectedRole}
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
              //   onChange={(value) => onRoleSelect(value, roleOptions.find(option => option.value === value)?.label || "")}
              // options={roleOptions}
              />
            )}
            <Select
              allowClear
              placeholder="Filter"
              className="md:flex hidden w-[250px]"
              options={[
                {
                  value: `1`,
                  label: `All`,
                },
                {
                  value: `2`,
                  label: `Assigned to DMS`,
                },
                {
                  value: `3`,
                  label: `Assigned to DPO`,
                },
                {
                  value: `4`,
                  label: `Submitted to Audit`,
                },
              ]}
            />
          </div>
        }
      />
    </>
  );
};