import { useState } from "react";
import { AuditTab } from "../AuditRole/AuditTab";
import { CEApplicantTab } from "../CustomerEngagerRole/CEApplicantTab";
import { DMSTab } from "../DMSRole/DMSTab";
import { DPOTab } from "../DPOSRole/DPOTab";
import { DRTab } from "../DRRole/DRTab";
import { ServiceManagerTab } from "../ServiceManager/ServiceManagerTab";
import { ApplicationsTab } from "./ApplicationsTab";

export const OperationsApplicationPage = () => {
  const [selectedRole, setSelectedRole] = useState<number>(8);
  // const [roleLabel, setSelectedRoleLabel]= useState<string>('Operations List')

  const handleRoleChange = (role: number) => {
    setSelectedRole(role);

  };

  let renderApplications;
  switch (selectedRole) {
    case 1:
      renderApplications = <DRTab onRoleSelect={handleRoleChange} selectedRole={ selectedRole}/>;
      break;
    case 2:
      renderApplications = <DPOTab onRoleSelect={handleRoleChange} selectedRole={ selectedRole}/>;
      break;
    case 3:
      renderApplications = <DMSTab onRoleSelect={handleRoleChange} selectedRole={ selectedRole}/>;
      break;
    case 4:
      renderApplications = <AuditTab onRoleSelect={handleRoleChange} selectedRole={ selectedRole}/>;
      break;
    case 5:
      renderApplications = <ApplicationsTab onRoleSelect={handleRoleChange} selectedRole={ selectedRole} />;
      break;
    case 6:
      renderApplications = (
        <ServiceManagerTab onRoleSelect={handleRoleChange} selectedRole={ selectedRole}/>
      );
      break;
    case 7:
      renderApplications = <CEApplicantTab onRoleSelect={handleRoleChange} selectedRole={ selectedRole}/>;
      break;
    case 8:
      renderApplications = <ApplicationsTab onRoleSelect={handleRoleChange} selectedRole={ selectedRole}/>;
      break;
    default:
      renderApplications = <ApplicationsTab onRoleSelect={handleRoleChange} selectedRole={ selectedRole}/>;
      break;
  }

  return <>{renderApplications}</>;
};