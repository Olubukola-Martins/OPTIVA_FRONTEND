import { ApplicationsTab } from "../components/ApplicantDetails/ApplicationsTab";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";

const Applications = () => {
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {};
  // New Applications Modal
  const [openNewApplicationsModal, setOpenNewApplicationsModal] =
    useState(false);
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
      <Modal
        open={openNewApplicationsModal}
        onCancel={handleNewApplicationsCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <div>
            <h1 className="p-4 font-bold text-center text-lg">
              Select Country/Program Type
            </h1>
            <div>
              <h2 className="py-1">
                Which country passport/residency is applicant applying for?
              </h2>
              <Form.Item required label="" name="passportCountry">
                <Select
                  defaultValue={1}
                  options={[
                    {
                      value: 1,
                      label: "Grenada",
                    },
                  ]}
                  size="large"
                />
              </Form.Item>
            </div>
            <div>
              <h2 className="py-1">
                Which program is the applicant interested in?
              </h2>
              <Form.Item required name="interestedProgram">
                <Select
                  size="large"
                  defaultValue={1}
                  options={[
                    {
                      value: 1,
                      label: "Grenada",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <h2 className="py-1">
                Which investment route is the applicant interested in?
              </h2>
              <Form.Item required name="investmentRoute">
                <Select
                  size="large"
                  defaultValue={1}
                  options={[
                    {
                      value: 1,
                      label: "Grenada",
                    },
                  ]}
                  className="w-full"
                />
              </Form.Item>
            </div>
            <div>
              <h2>What is the applicant full name?</h2>
              <Form.Item name="applicantFullName" required>
                <Input size="large" />
              </Form.Item>
            </div>
            <div>
              <h2>What is the applicant email?</h2>
              <Form.Item name="applicantEmail" required>
                <Input size="large" />
              </Form.Item>
            </div>
            <div className="flex items-center justify-center gap-4 p-4">
              <Form.Item>
                <AppButton
                  type="reset"
                  label="Cancel"
                  variant="transparent"
                  containerStyle="border border-secondary text-secondary"
                />
              </Form.Item>

              <Link to={appRoute.new_application}>
                <Form.Item>
                  <AppButton label="Next" type="submit" />
                </Form.Item>
              </Link>
            </div>
          </div>
        </Form>
      </Modal>
      {/* Import Modal */}
      <ImportModal
        open={openImportModal}
        onCancel={handleImportCancel}
        header="Application(s)"
      />
      {/* Export Modal */}
      <ExportModal header="Application(s)" open={exportModal} onCancel={handleExportCancel}/>
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
