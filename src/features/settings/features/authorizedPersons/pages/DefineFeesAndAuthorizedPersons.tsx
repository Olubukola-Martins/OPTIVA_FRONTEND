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
          <div>
            <Dropdown.Button
              className="bg-secondary text-white w-full "
              overlay={menu}
              icon={<DownOutlined />}
            >
              Add New
            </Dropdown.Button>
          </div>
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
