import { useState } from "react";
import { AuditTab } from "../AuditRole/AuditTab";
import { CEApplicantTab } from "../CustomerEngagerRole/CEApplicantTab";
import { DMSTab } from "../DMSRole/DMSTab";
import { DPOTab } from "../DPOSRole/DPOTab";
import { DRTab } from "../DRRole/DRTab";
import { ServiceManagerTab } from "../ServiceManager/ServiceManagerTab";
import { ApplicationsTab } from "./ApplicationsTab";

export const OperationsApplicationPage = () => {
  const [selectedRole, setSelectedRole] = useState<number>(1);
  // const [roleLabel, setSelectedRoleLabel]= useState<string>('Operations List')

  const handleRoleChange = (role: number) => {
    setSelectedRole(role);
  };

  // <Select
  //               allowClear
  //               placeholder="Role"
  //               className="md:flex hidden w-[250px]"
  //               onChange={onRoleSelect}
  //               value={selectedRole}
  //               options={[
  //                 {
  //                   value: 6,
  //                   label: "DR's List",
  //                 },
  //                 {
  //                   value: 4,
  //                   label: "DPO's List",
  //                 },
  //                 {
  //                   value: 3,
  //                   label: "DMS's List",
  //                 },
  //                 {
  //                   value: 5,
  //                   label: "Audit's List",
  //                 },
  //                 {
  //                   value: 1,
  //                   label: "Operations List",
  //                 },
  //                 {
  //                   value: 2,
  //                   label: "Service Manager's List",
  //                 },
  //                 {
  //                   value: 9,
  //                   label: "Customer Engager's List",
  //                 },
  //               ]}
             
  //             />
  let renderApplications;
  switch (selectedRole) {
    case 6:
      renderApplications = (
        <DRTab onRoleSelect={handleRoleChange} selectedRole={selectedRole} />
      );
      break;
    case 4:
      renderApplications = (
        <DPOTab onRoleSelect={handleRoleChange} selectedRole={selectedRole} />
      );
      break;
    case 3:
      renderApplications = (
        <DMSTab onRoleSelect={handleRoleChange} selectedRole={selectedRole} />
      );
      break;
    case 5:
      renderApplications = (
        <AuditTab onRoleSelect={handleRoleChange} selectedRole={selectedRole} />
      );
      break;
    case 1:
      renderApplications = (
        <ApplicationsTab
          onRoleSelect={handleRoleChange}
          selectedRole={selectedRole}
        />
      );
      break;
    case 2:
      renderApplications = (
        <ServiceManagerTab
          onRoleSelect={handleRoleChange}
          selectedRole={selectedRole}
        />
      );
      break;
    case 9:
      renderApplications = (
        <CEApplicantTab
          onRoleSelect={handleRoleChange}
          selectedRole={selectedRole}
        />
      );
      break;
    // case "Customer Experience List":
      renderApplications = (
        <ApplicationsTab
          onRoleSelect={handleRoleChange}
          selectedRole={selectedRole}
        />
      );
      break;
    default:
      renderApplications = (
        <ApplicationsTab
          onRoleSelect={handleRoleChange}
          selectedRole={selectedRole}
        />
      );
      break;
  }

  return <>{renderApplications}</>;
};
