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
import { AddCountryModal } from "../components/AddCountryModal";
import { EditMilestoneModal } from "../components/EditMilestoneModal";
import { DownOutlined } from "@ant-design/icons";
import { AddMilestoneModal } from "../components/AddMilestoneModal";

const CountryMilestonesAndPrograms = () => {
  const { token } = useGetUserInfo();
  const queryClient = useQueryClient();

  // Add New Country
  const { mutate, isLoading: postLoading } = usePostCountry();
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

  // Milestone Modal
  const [openMilestoneModal, setOpenMilestoneModal] = useState<boolean>(false);
  const handleMilestoneModalCancel = () => {
    setOpenMilestoneModal(false);
  };

  //Add Milestone Modal
  const [openAddMilestoneModal, setOpenAddMilestoneModal] =
    useState<boolean>(false);
  const showAddMilestoneModal = () => {
    setOpenAddMilestoneModal(true);
  };
  const handleAddMilestoneModalCancel = () => {
    setOpenAddMilestoneModal(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showCountryModal}>Country</Menu.Item>
      <Menu.Item key="2" onClick={showAddMilestoneModal}>Milestone</Menu.Item>
      <Menu.Item key="3">
        <Link to={appRoute.createProgramType}>Program Type</Link>
      </Menu.Item>
    </Menu>
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

      {/*ADD MILESTONE MODAL */}
      <AddMilestoneModal
        handleClose={handleAddMilestoneModalCancel}
        open={openAddMilestoneModal}
        
      />
      {/* ADD COUNTRY MODAL */}
      <AddCountryModal
        handleClose={handleCountryModalCancel}
        open={openCountryModal}
      />
      {/*EDIT MILESTONE MODAL */}
      <EditMilestoneModal
        handleClose={handleMilestoneModalCancel}
        open={openMilestoneModal}
      />
    </>
  );
};

export default CountryMilestonesAndPrograms;
