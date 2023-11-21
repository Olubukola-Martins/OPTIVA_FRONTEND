import { Icon } from "@iconify/react";
import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { CountryMilestonesAndProgramsTab } from "../components/CountryMilestonesAndProgramsTab";
import { Dropdown, Form, Input, Menu, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";
import { usePostCountry } from "../hooks/usePostCountry";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_COUNTRY } from "../hooks/useGetCountry";

const CountryMilestonesAndPrograms = () => {
  const { token } = useGetUserInfo();
  const queryClient = useQueryClient();
  
  // Add New Country
  const { mutate, isLoading: postLoading } = usePostCountry();
  const [form] = Form.useForm();
  // Country Modal
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const showCountryModal = () => {
    setOpenCountryModal(true);
  };
  const handleCountryModalCancel = () => {
    setOpenCountryModal(false);
  };

  // SUBMIT COUNTRY
  const handleCountrySubmit = (val: any) => {
    mutate(
      {
        country_name: val.country,
        program_types: val.programType,
        token,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_COUNTRY]);
        },
      }
    );
  };

  // Add Country Success
  const [openCountrySuccessModal, setOpenCountrySuccessModal] = useState(false);
  const showCountrySuccessModal = () => {
    setOpenCountrySuccessModal(true);
  };
  const handleCountrySucessCancel = () => {
    setOpenCountrySuccessModal(false);
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

  //Add New Modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const renderAddNewModal = () => {
    setShowAddModal(true);
  };
  const cancelAddNewModal = () => {
    setShowAddModal(false);
  };

  // Milestone Modal
  const [openMilestoneModal, setOpenMilestoneModal] = useState<boolean>(false);
  const showMilestoneModal = () => {
    setOpenMilestoneModal(true);
  };
  const handleMilestoneModalCancel = () => {
    setOpenMilestoneModal(false);
  };
  const handleEditMilestoneSubmit = (val: any) => {};

  //Add Milestone Modal
  const [openAddMilestoneModal, setOpenAddMilestoneModal] =
    useState<boolean>(false);
  const showAddMilestoneModal = () => {
    setOpenAddMilestoneModal(true);
  };
  const handleAddMilestoneModalCancel = () => {
    setOpenAddMilestoneModal(false);
  };
  const handleAddMilestoneSubmit = (val: any) => {};

  const selectTimeAfter = (
    <Select
      defaultValue="Day(s)"
      options={[
        {
          value: "Day(s)",
          label: "Day(s)",
        },
      ]}
    />
  );

  return (
    <>
      <div className=" flex flex-col md:flex-row justify-between p-3">
        <PageIntro
          title="Country, Milestone & Program Type Configuration "
          description="Create, View & edit assessment templates on the systemConfigure country, milestones & program types on the system"
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
          <AppButton label="Add New" handleClick={renderAddNewModal} />

          {/* <AppButton label="Add New" handleClick={renderDropdown} /> */}
        </div>
      </div>
      <CountryMilestonesAndProgramsTab />
      {/* Import Modal */}
      <ImportModal
        open={openImportModal}
        onCancel={handleImportCancel}
        header="Country"
      />
      {/* Export Modal */}
      <ExportModal
        open={openImportModal}
        onCancel={handleImportCancel}
        header="Country"
      />

      {/* Country  Modal */}
      <Modal
        open={openCountryModal}
        footer={null}
        onCancel={handleCountryModalCancel}
      >
        <h2 className="text-center font-bold py-2">Add Country</h2>
        <Form layout="vertical" form={form} onFinish={handleCountrySubmit}>
          <Form.Item name="country" label="Country" required>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="programType" label="Select Program Type" required>
            <Select
              size="large"
              options={[
                {
                  value: "Lorem",
                  label: "Lorem",
                },
              ]}
            />
          </Form.Item>
          <div className="flex items-center justify-center gap-4 p-4">
            <AppButton
              variant="transparent"
              label="Cancel"
              type="reset"
              handleClick={handleCountryModalCancel}
              
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>

      {/* DROPDOWN */}
      <Modal open={showAddModal} footer={null} onCancel={cancelAddNewModal}>
        <h2 className="text-center font-bold p-4">Add New</h2>
        <div className="flex flex-col gap-2 items-center">
          <button
            className="border-0 bg-transparent"
            onClick={() => {
              showCountryModal();
              cancelAddNewModal();
            }}
          >
            Country
          </button>
          <button
            className="border-0 bg-transparent"
            onClick={() => {
              showAddMilestoneModal();
              cancelAddNewModal();
            }}
          >
            Milestones
          </button>
          <Link to={appRoute.createProgramType}>
            <button className="border-0 bg-transparent">Program Type</button>
          </Link>
        </div>
      </Modal>

      {/* MILESTONE MODAL */}
      <Modal
        open={openMilestoneModal}
        footer={null}
        onCancel={handleMilestoneModalCancel}
      >
        <h2 className="text-center text-lg font-bold">Edit Milestone</h2>
        <Form layout="vertical" onFinish={handleEditMilestoneSubmit}>
          <Form.Item name="milestone" label="Milestone" required>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="timeline" label="Timeline" required>
            <Input size="large" addonAfter={selectTimeAfter} />
          </Form.Item>
          <Form.Item name="processes" label="Processes">
            <Select
              size="large"
              options={[
                {
                  label: "",
                  value: "",
                },
              ]}
            />
          </Form.Item>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={handleMilestoneModalCancel}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>

      {/*ADD MILESTONE MODAL */}
      <Modal
        open={openAddMilestoneModal}
        footer={null}
        onCancel={handleAddMilestoneModalCancel}
      >
        <h2 className="text-center text-lg font-bold">Add Milestone</h2>
        <Form layout="vertical" onFinish={handleAddMilestoneSubmit}>
          <Form.Item name="milestone" label="Milestone" required>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="timeline" label="Timeline" required>
            <Input size="large" addonAfter={selectTimeAfter} />
          </Form.Item>
          <Form.Item name="processes" label="Processes">
            <Select
              size="large"
              options={[
                {
                  label: "",
                  value: "",
                },
              ]}
            />
          </Form.Item>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={handleAddMilestoneModalCancel}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CountryMilestonesAndPrograms;
