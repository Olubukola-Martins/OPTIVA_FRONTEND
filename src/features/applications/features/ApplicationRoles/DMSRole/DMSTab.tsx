import { Input, Select, Tabs } from "antd";
import { AllDMSApplicants } from "./AllDMSApplicants";
import { IRoleTabProps } from "../AuditRole/AuditTab";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";
import { useState } from "react";

export const DMSTab: React.FC<IRoleTabProps> = ({ onRoleSelect, selectedRole }) => {
  const { data } = useFetchUserProfile();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "All Clients",
      children: <AllDMSApplicants searchTerm={searchTerm} status={ status} />,
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
                 label:"Customer Engager's List",
               },
             ]}
          
           />
            )}
            <Select
              allowClear
              placeholder="Filter"
              className="md:flex hidden w-[250px]"
              onChange={(val) => setStatus(val)}
              options={[
                { value: "collated", label: "Collated Document Applicant" },
                { value: "uncollated", label: "Uncollated Document Applicant" },
                // { value: "3", label: "All Applicant Documents" },
              ]}
            />
          </div>
        }
      />
    </>
  );
};