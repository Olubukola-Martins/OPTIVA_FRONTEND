import { PageIntro } from "src/components/PageIntro";
import { Icon } from "@iconify/react";
import { AppButton } from "src/components/button/AppButton";
import { useState } from "react";
import { Modal, Select, Form, Dropdown, Menu } from "antd";


const DocumentRequirements = () => {
  // New Applications Modal
  const [openSupportingDocumentModal, setSupportingDocumentModal] =
    useState(false);
  // const showSupportingDocumentModal = () => {
  //   setSupportingDocumentModal(true);
  // };
  const handleSupportingDocumentCancel = () => {
    setSupportingDocumentModal(false);
  };
  const showDropdown = () => {
    <Dropdown
      trigger={["click"]}
      overlay={
        <Menu>
          <Menu.Item key="1">Required Document</Menu.Item>
          <Menu.Item key="2">Supporting Document</Menu.Item>
        </Menu>
      }
    >
      <i className="ri-more-2-fill text-lg cursor-pointer"></i>
    </Dropdown>;
  };
  return (
    <>
      {/* New Applications Modal */}
      <Modal
        open={openSupportingDocumentModal}
        onCancel={handleSupportingDocumentCancel}
        footer={null}
      >
        <div className="flex flex-col items-center">
          <h1 className="p-4 font-bold text-center text-lg">
            Select Country/Program Type
          </h1>
          <Form.Item
            required
            label="Which country passport/residency is applicant applying for?"
            name="passportCountry"
            className="md:w-96"
          >
            <Select
              className="w-full"
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
          <Form.Item
            required
            label="Which program is the applicant interested in?"
            name="interestedProgram"
            className="md:w-96"
          >
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
          <Form.Item
            required
            label="Which investment route is the applicant interested in?"
            name="investmentRoute"
            className="md:w-96"
          >
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
          <div className="flex items-center justify-center gap-4 p-4">
            <Form.Item>
              <AppButton
                type="reset"
                label="Cancel"
                variant="transparent"
                containerStyle="border border-secondary text-secondary"
              />
            </Form.Item>
          </div>
        </div>
      </Modal>
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
              // onClick={showImportModal}
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
              // onClick={showExportModal}
            />
          </div>
          <AppButton label="Add New" handleClick={showDropdown} />
        </div>
      </div>
    </>
  );
};

export default DocumentRequirements;
