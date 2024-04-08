import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { ExportModal } from "src/components/modals/ExportModal";
import { NewApplicationModal } from "../features/NewApplication/NewApplicationModal";
import { OperationsApplicationPage } from "../features/ApplicationRoles/OperationsRole/OperationsApplicationPage";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";
import { ServiceManagerTab } from "../features/ApplicationRoles/ServiceManager/ServiceManagerTab";
import { DMSTab } from "../features/ApplicationRoles/DMSRole/DMSTab";
import { DPOTab } from "../features/ApplicationRoles/DPOSRole/DPOTab";
import { AuditTab } from "../features/ApplicationRoles/AuditRole/AuditTab";
import { DRTab } from "../features/ApplicationRoles/DRRole/DRTab";
import { CEApplicantTab } from "../features/ApplicationRoles/CustomerEngagerRole/CEApplicantTab";

const Applications = () => {
  const { data } = useFetchUserProfile();

  // New Applications Modal
  const [openNewApplicationsModal, setOpenNewApplicationsModal] =
    useState<boolean>(false);
  const showNewApplicationsModal = () => {
    setOpenNewApplicationsModal(true);
  };
  const handleNewApplicationsCancel = () => {
    setOpenNewApplicationsModal(false);
  };


  // Upload Document
  const [exportModal, setExportModal] = useState(false);
  const showExportModal = () => {
    setExportModal(true);
  };
  const handleExportCancel = () => {
    setExportModal(false);
  };
  

  return (
    <>
      {/* New Applications Modal */}
      <NewApplicationModal
        open={openNewApplicationsModal}
        handleClose={handleNewApplicationsCancel}
      />
     
      {/* Export Modal */}
      <ExportModal
        header="Application(s)"
        open={exportModal}
        onCancel={handleExportCancel}
      />
      <div className=" flex flex-col md:flex-row justify-between p-3">
        <PageIntro
          title={
            data?.roles.id === 1
              ? "Applicants (Operations) List"
              : data?.roles.id === 2
              ? "Service Manager's List"
              : data?.roles.id === 3
              ? "DMS's List"
              : data?.roles.id === 4
              ? "DPO's List"
              : data?.roles.id === 5
              ? "Audit's List"
              : data?.roles.id === 6
              ? "DR's List"
              : data?.roles?.id === 7
              ? "Payment's List"
              : data?.roles.id === 8
              ? "Customer Experience List"
              : data?.roles?.id === 9
              ? "Customer Engager's List"
              : "Applications List"
            //  CE and PAYMENT
          }
          description="View & Edit Applicant Details"
          arrowBack={false}
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
              onClick={showExportModal}
            />
          </div>
          <AppButton label="Add New" handleClick={showNewApplicationsModal} />
        </div>
      </div>
      
      {data?.roles.id === 1 && <OperationsApplicationPage />}
      {data?.roles.id === 2 && <ServiceManagerTab onRoleSelect={() => {}} />}
      {data?.roles.id === 3 && <DMSTab onRoleSelect={() => {}} />}
      {data?.roles.id === 4 && <DPOTab onRoleSelect={() => {}} />}
      {data?.roles.id === 5 && <AuditTab onRoleSelect={() => {}} />}
      {data?.roles.id === 6 && <DRTab onRoleSelect={() => {}} />}
      {data?.roles?.id === 8 && <OperationsApplicationPage />}
      {/* CUSTOMER EXPERIENCE*/}
      {data?.roles?.id === 9 && <CEApplicantTab onRoleSelect={() => {}} />}
      {data?.roles.id === 7 && <ServiceManagerTab onRoleSelect={() => {}} />}
    </>
  );
};

export default Applications;