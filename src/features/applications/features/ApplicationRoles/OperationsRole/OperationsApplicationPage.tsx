import { useState } from "react";
import { ApplicationsTab } from "../../ApplicantDetails/ApplicationsTab";
import { AuditTab } from "../AuditRole/AuditTab";
import { CEApplicantTab } from "../CustomerEngagerRole/CEApplicantTab";
import { DMSTab } from "../DMSRole/DMSTab";
import { DPOTab } from "../DPOSRole/DPOTab";
import { DRTab } from "../DRRole/DRTab";
import { ServiceManagerTab } from "../ServiceManager/ServiceManagerTab";

export const OperationsApplicationPage = () => {
  const [selectedRole, setSelectedRole] = useState<number>(8);

  const handleRoleChange = (role: number) => {
    setSelectedRole(role);
  };

  let renderApplications;
  switch (selectedRole) {
    case 1:
      renderApplications = <DRTab onRoleSelect={handleRoleChange} />;
      break;
    case 2:
      renderApplications = <DPOTab onRoleSelect={handleRoleChange} />;
      break;
    case 3:
      renderApplications = <DMSTab onRoleSelect={handleRoleChange} />;
      break;
    case 4:
      renderApplications = <AuditTab onRoleSelect={handleRoleChange} />;
      break;
    case 5:
      renderApplications = <ApplicationsTab onRoleSelect={handleRoleChange} />;
      break;
    case 6:
      renderApplications = (
        <ServiceManagerTab onRoleSelect={handleRoleChange} />
      );
      break;
    case 7:
      renderApplications = <CEApplicantTab onRoleSelect={handleRoleChange} />;
      break;
    case 8:
      renderApplications = <ApplicationsTab onRoleSelect={handleRoleChange} />;
      break;
    default:
      renderApplications = <ApplicationsTab onRoleSelect={handleRoleChange} />;
      break;
  }

  return <>{renderApplications}</>;
};
