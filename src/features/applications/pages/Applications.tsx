import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";
import { useState } from "react";
// import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";
import { NewApplicationModal } from "../features/NewApplication/NewApplicationModal";
import { ApplicationsTab } from "../features/ApplicantDetails/ApplicationsTab";
import { CEApplicantTab } from "../features/ApplicationRoles/CustomerEngagerRole/CEApplicantTab";
import { UploadModal } from "src/components/modals/UploadModal";
import { ServiceManagerTab } from "../features/ApplicationRoles/ServiceManager.tsx/ServiceManagerTab";
import { DMSTab } from "../features/ApplicationRoles/DMSRole/DMSTab";
import { DPOTab } from "../features/ApplicationRoles/DPOSRole/DPOTab";
import { DRTab } from "../features/ApplicationRoles/DRRole/DRTab";
import { AuditTab } from "../features/ApplicationRoles/AuditRole/AuditTab";
import { PaymentTab } from "../features/ApplicationRoles/PaymentRole/PaymentTab";

// export let applicantId: number | undefined;

const Applications = () => {
  // New Applications Modal
  const [openNewApplicationsModal, setOpenNewApplicationsModal] =
    useState<boolean>(false);
  const showNewApplicationsModal = () => {
    setOpenNewApplicationsModal(true);
  };
  const handleNewApplicationsCancel = () => {
    setOpenNewApplicationsModal(false);
  };

  // Import Modal
  const [openImportModal, setOpenImportModal] = useState(false);
  const showImportModal = () => {
    setOpenImportModal(true);
  };
  const handleImportCancel = () => {
    setOpenImportModal(false);
  };

  // Upload Document
  const [exportModal, setExportModal] = useState(false);
  const showExportModal = () => {
    setExportModal(true);
  };
  const handleExportCancel = () => {
    setExportModal(false);
  };

  // change roles
  const [selectedRole, setSelectedRole] = useState<string>("Operations List");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <>
      {/* New Applications Modal */}
      <NewApplicationModal
        open={openNewApplicationsModal}
        handleClose={handleNewApplicationsCancel}
      />
      {/* Import Modal */}
      <UploadModal
        open={openImportModal}
        onCancel={handleImportCancel}
        header="Application(s)"
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
            selectedRole === "Operations List"
              ? "Applicants (Operations) List"
              : selectedRole === "Audit's List"
              ? "Audit's List"
              : selectedRole === "DR's List"
              ? "DR's List"
              : selectedRole === "DPO's List"
              ? "DPO's List"
              : selectedRole === "DMS's List"
              ? "DMS's List"
              : selectedRole === "Service Manager's List"
              ? "Service Manager's List"
              : selectedRole === "Customer Engager's List"
              ? "Customer Engager's List"
              : "" // Handle default case here if necessary
          }
          // title="Applicants (Operations) List"
          description="View & Edit Applicant Details"
          arrowBack={false}
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon
              icon="uil:file-import"
              className="text-3xl cursor-pointer hover:text-primary"
              onClick={showImportModal}
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
              onClick={showExportModal}
            />
          </div>
          <AppButton label="Add New" handleClick={showNewApplicationsModal} />
        </div>
      </div>

      {selectedRole === "Audit's List" && (
        <AuditTab onRoleSelect={handleRoleChange} />
      )}
      {selectedRole === "DR's List" && (
        <DRTab onRoleSelect={handleRoleChange} />
      )}
      {selectedRole === "DPO's List" && (
        <DPOTab onRoleSelect={handleRoleChange} />
      )}
      {selectedRole === "DMS's List" && (
        <DMSTab onRoleSelect={handleRoleChange} />
      )}
      {/* {selectedRole === "Audit's List" && (
        <AuditTab onRoleSelect={handleRoleChange} />
      )} */}
      {selectedRole === "Operations List" && (
        <ApplicationsTab onRoleSelect={handleRoleChange} />
      )}
      {selectedRole === "Service Manager's List" && (
        <ServiceManagerTab onRoleSelect={handleRoleChange} />
      )}
      {selectedRole === "Customer Engager's List" && (
        <CEApplicantTab onRoleSelect={handleRoleChange} />
      )}

      {/* <PaymentTab /> */}
    </>
  );
};

export default Applications;
