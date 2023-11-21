import {
  Modal,
  Input,
  Form,
  Select,
  Menu,
  Dropdown,
  message,
  Upload,
} from "antd";
import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { Icon } from "@iconify/react";
import { DefineFeesAndAuthorizedPersonsTab } from "../components/DefineFeesAndAuthorizedPersonsTab";
import SetFx from "../assets/img/Fx.png";
import Switch from "../assets/img/switch.png";
import { Link } from "react-router-dom";
import Success from "../assets/img/success.png";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";
import { DownOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const props: UploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const DefineFeesAndAuthorizedPersons = () => {
  const [form] = Form.useForm();
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

  // FX Modal
  const [openSetFxModal, setOpenSetFxModal] = useState(false);
  const showSetFxModal = () => {
    setOpenSetFxModal(true);
  };
  const handleFxCancel = () => {
    setOpenSetFxModal(false);
  };

  // Submit Function
  const handleFormSubmit = (val: any) => {
    console.log("Values of form", val);
  };

  // Authorized Person Modal
  const [showAuthorizedModal, setShowAuthorizedModal] =
    useState<boolean>(false);

  const renderAddAuthorizedModal = () => {
    setShowAuthorizedModal(true);
  };
  const cancelAddAuthorizedModal = () => {
    setShowAuthorizedModal(false);
  };

  // Add Success
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const renderSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const cancelSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={appRoute.addFees}>Fees</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={renderAddAuthorizedModal}>
        Authorized Person
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className=" flex flex-col md:flex-row justify-between p-3">
        <PageIntro
          title="Fees & Authorized Persons"
          description="Configure fees & Authorized persons for each program type on the system"
          linkBack={appRoute.settings}
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
          <AppButton
            label="Set Rates"
            variant="transparent"
            handleClick={showSetFxModal}
          />
<div><Dropdown.Button
            className="bg-secondary text-white w-full "
            overlay={menu}
            icon={<DownOutlined />}
          >
            Add New
          </Dropdown.Button></div>
          
        </div>
      </div>
      {/* Import Modal */}
      <ImportModal
        open={openImportModal}
        onCancel={handleImportCancel}
        header="Fee(s)"
      />
      {/* Export Modal */}
      <ExportModal
        open={exportModal}
        onCancel={handleExportCancel}
        header="Fee(s)"
      />
      {/* FX Modal */}
      <Modal open={openSetFxModal} onCancel={handleFxCancel} footer={null}>
        <img src={SetFx} className="mx-auto" />
        <h1 className="p-4 font-bold text-center text-lg">Set FX Rate</h1>
        <p className="text-center">
          Enter the corresponding amount below to set rate.
        </p>
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <div className="flex gap-2 justify-center items-center">
            <Form.Item name="ngn" className="mt-3" label="NGN">
              <Input size="large" />
            </Form.Item>
            <img className="mx-auto" src={Switch} />
            <Form.Item name="usdToUsd" className="mt-3" label="USD">
              <Input size="large" />
            </Form.Item>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <Form.Item name="euro" className="mt-3" label="EURO">
              <Input size="large" />
            </Form.Item>
            <img className="mx-auto" src={Switch} />
            <Form.Item name="usdToEuro" className="mt-3" label="USD">
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center gap-4 p-4 mt-2">
            <AppButton
              label="Cancel"
              variant="transparent"
              type="reset"
              handleClick={handleFxCancel}
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>

      {/* AUTHORIZED PERSON */}
      <Modal
        open={showAuthorizedModal}
        footer={null}
        onCancel={cancelAddAuthorizedModal}
      >
        <h2 className="text-center font-bold p-4">Add Authorized Person</h2>
        <Form layout="vertical">
          <div>
            <h2>Select Employee</h2>
            <Form.Item name="selectEmployee" required>
              <Select
                size="large"
                options={[
                  {
                    value: "Ruth Godwin",
                    label: "Ruth Godwin",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="mb-3">
            <h2 className="mb-2">Upload Signature</h2>
            <Form.Item name="chooseFile" required>
              {/* <Input
                addonBefore="Choose file"
                placeholder="No file chosen"
                size="large"
              /> */}
              <Upload {...props} className="border p-1 rounded border-zinc-950 ">Choose file to Upload</Upload>
            </Form.Item>
            <p className="my-2 text-center text-lg">
              [only xls,xlsx and csv formats are supported]
            </p>
            <p className="text-center my-2">
              Maximum upload file size is 5 MB.
            </p>
          </div>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={cancelAddAuthorizedModal}
              variant="transparent"
            />
            <AppButton
              label="Save"
              type="submit"
              handleClick={() => {
                renderSuccessModal();
                cancelAddAuthorizedModal();
              }}
            />
          </div>
        </Form>
      </Modal>

      {/* ADD SUCCESS MODAL */}
      <Modal
        open={showSuccessModal}
        footer={null}
        onCancel={cancelSuccessModal}
      >
        <div className="flex flex-col items-center gap-4 font-bold">
          <img src={Success} className="mx-auto" />
          <div className="text-center text-lg">
            <h2>Authorized(s)</h2>
            <h2>Added Successfully</h2>
          </div>

          <AppButton label="Back" handleClick={cancelSuccessModal} />
        </div>
      </Modal>
      <DefineFeesAndAuthorizedPersonsTab />
    </>
  );
};

export default DefineFeesAndAuthorizedPersons;
