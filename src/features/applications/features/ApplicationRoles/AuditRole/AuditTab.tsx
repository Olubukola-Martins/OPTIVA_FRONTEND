import React from "react";
import { AuditPortfolio } from "./AuditPortfolio";
import { AuditApplicant } from "./AuditApplicant";
import { Input, Select, Tabs } from "antd";

export interface IRoleTabProps {
  onRoleSelect: (role: string) => void;
}

export const AuditTab: React.FC<IRoleTabProps> = ({ onRoleSelect }) => {
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "All Applicants",
      children: <AuditApplicant />,
      key: "AllApplicants",
    },
    {
      label: "My Portfolio",
      children: <AuditPortfolio />,
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
            />
            <Select
              allowClear
              placeholder="Role"
              className="md:flex hidden w-[250px]"
              onChange={onRoleSelect}
              options={[
                {
                  value: `DR's List`,
                  label: `DR's List`,
                },
                {
                  value: `DPO's List`,
                  label: `DPO's List`,
                },
                {
                  value: `DMS's List`,
                  label: `DMS's List`,
                },
                {
                  value: `Audit's List`,
                  label: `Audit's List`,
                },
                {
                  value: `Operations List`,
                  label: `Operations  List`,
                },
                {
                  value: `Service Manager's List`,
                  label: `Service Manager's  List`,
                },
                {
                  value: `Customer Engager's List`,
                  label: `Customer Engager's  List`,
                },
              ]}
            />
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
