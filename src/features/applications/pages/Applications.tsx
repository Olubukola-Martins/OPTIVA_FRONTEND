import { ApplicationsTab } from "../features/ApplicantDetails/ApplicationsTab";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";
import { NewApplicationModal } from "../features/NewApplication/NewApplicationModal";

export let applicantId: number | undefined;

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
  return (
    <>
      {/* New Applications Modal */}
      <NewApplicationModal
        open={openNewApplicationsModal}
        handleClose={handleNewApplicationsCancel}
      />
      {/* Import Modal */}
      <ImportModal
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
          title="Applicants (Operations) List"
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

      <ApplicationsTab />
    </>
  );
};

export default Applications;
