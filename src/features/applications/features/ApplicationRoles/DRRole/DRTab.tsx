import React, { useState } from "react";
import { DRApplicant } from "./DRApplicant";
import { Input, Select, Tabs } from "antd";
import { IRoleTabProps } from "../AuditRole/AuditTab";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";

export const DRTab: React.FC<IRoleTabProps> = ({ onRoleSelect }) => {
  const { data} =useFetchUserProfile()
   const [pendingFilterActive, setPendingFilterActive] = useState<boolean>(false);
  const [confirmedFilterActive, setConfirmedFilterActive] = useState<boolean>(false);
  const [declinedFilterActive, setDeclinedFilterActive] = useState<boolean>(false);

  const handleFilterChange = (value: string) => {
    if (value === "pending") {
      setPendingFilterActive(true);
      setConfirmedFilterActive(false);
      setDeclinedFilterActive(false);
    } else if (value === "confirmed") {
      setPendingFilterActive(false);
      setConfirmedFilterActive(true);
      setDeclinedFilterActive(false);
    } else if (value === "declined") {
      setPendingFilterActive(false);
      setConfirmedFilterActive(false);
      setDeclinedFilterActive(true);
    } else { 
      setPendingFilterActive(false);
      setConfirmedFilterActive(false);
      setDeclinedFilterActive(false);
    }
  };


  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "All Applicants",
      children: <DRApplicant  pendingFilterActive={pendingFilterActive}
      confirmedFilterActive={confirmedFilterActive}
        declinedFilterActive={declinedFilterActive}
        // filter={filter}
      />,
      key: "AllApplicants",
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
              onChange={handleFilterChange}
              options={[
                {
                  value: `pending`,
                  label: `Pending Handover`,
                },
                {
                  value: `confirmed`,
                  label: `Confirmed Handover`,
                },
                {
                  value: `declined`,
                  label: `Declined Handover`,
                },
              ]}
            />
          </div>
        }
      />
    </>
  );
};
