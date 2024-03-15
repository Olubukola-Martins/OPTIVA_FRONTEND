import React from "react";
import { ServiceManagerPortfolio } from "./ServiceManagerPortfolio";
import { Input, Select, Tabs } from "antd";
import { IRoleTabProps } from "../AuditRole/AuditTab";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";

export const ServiceManagerTab: React.FC<IRoleTabProps> = ({
  onRoleSelect,
}) => {
  const { data} =useFetchUserProfile()
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
   
    {
      label: "All Applicants",
      children: <ServiceManagerPortfolio />,
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
             {data?.roles.id === 1 && (
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
