import React, { useState } from "react";
import { AuditPortfolio } from "./AuditPortfolio";
import {  Input, Select, Tabs } from "antd";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";

export interface IRoleTabProps {
  onRoleSelect: (role: number) => void;
  selectedRole?: number

}

export const AuditTab: React.FC<IRoleTabProps> = ({ onRoleSelect, selectedRole }) => {
  const { data } = useFetchUserProfile();
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
  
    {
      label: "All Applicants",
      children: <AuditPortfolio searchTerm={searchTerm} roleId={ selectedRole} />,
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
            )}

            {/* <FormRolesInput Form={Form} showLabel={false} mode="" /> */}
            <Select
              allowClear
              placeholder="Filter"
              className="md:flex hidden w-[250px]"
              options={[
                {
                  value: `1`,
                  label: `Internal Review`,
                },
                {
                  value: `2`,
                  label: `External Review`,
                },
                {
                  value: `3`,
                  label: `Submitted to Partners`,
                },
              ]}
            />
          </div>
        }
      />
    </>
  );
};