import React from "react";
// import { AllDPOApplicants } from "./AllDPOApplicants";
import { DPOPortfolio } from "./DPOPortfolio";
import { Tabs, Input, Select } from "antd";
import { IRoleTabProps } from "../AuditRole/AuditTab";

export const DPOTab: React.FC<IRoleTabProps> = ({ onRoleSelect }) => {
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    // {
    //   label: "All Applicants",
    //   children: <AllDPOApplicants />,
    //   key: "AllApplicants",
    // },
    {
      label: "My Portfolio",
      children: <DPOPortfolio />,
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
          </div>
        }
      />
    </>
  );
};
