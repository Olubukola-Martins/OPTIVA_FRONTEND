import { Icon } from "@iconify/react";
import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { CountryMilestonesAndProgramsTab } from "../components/CountryMilestonesAndProgramsTab";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import "../assets/style.css";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";

import { AddCountryModal } from "../components/AddCountryModal";
import { DownOutlined } from "@ant-design/icons";
import { AddMilestoneModal } from "../components/AddMilestoneModal";
import type { MenuProps } from "antd";

const CountryMilestonesAndPrograms = () => {
  // Country Modal
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const showCountryModal = () => {
    setOpenCountryModal(true);
  };
  const handleCountryModalCancel = () => {
    setOpenCountryModal(false);
  };

  // Milestone Modal
  const [openMilestoneModal, setOpenMilestoneModal] = useState(false);
  const showMilestoneModal = () => {
    setOpenMilestoneModal(true);
  };
  const handleMilestoneModalCancel = () => {
    setOpenMilestoneModal(false);
  };

  // Import Modal
  const [openImportModal, setOpenImportModal] = useState(false);
  const showImportModal = () => {
    setOpenImportModal(true);
  };
  const handleImportCancel = () => {
    setOpenImportModal(false);
  };



  const items: MenuProps["items"] = [
    {
      label: "Country",
      key: "1",
      onClick: () => showCountryModal(),
    },
    {
      label: "Milestone",
      key: "2",
      onClick: () => showMilestoneModal(),
    },
    {
      label: <Link to={appRoute.createProgramType}>Program Type</Link>,
      key: "3",
    },
  ];

  const menuProps = {
    items,
    onClick: () => {},
  };

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
              // onClick={showExportModal}
            />
          </div>

          <Dropdown.Button menu={menuProps} icon={<DownOutlined />}>
            Add New
          </Dropdown.Button>
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

      {/* ADD COUNTRY MODAL */}
      <AddCountryModal
        handleClose={handleCountryModalCancel}
        open={openCountryModal}
      />

      {/* MILESTONE MODAL */}
      <AddMilestoneModal
        handleClose={handleMilestoneModalCancel}
        open={openMilestoneModal}
      />
    </>
  );
};

export default CountryMilestonesAndPrograms;
