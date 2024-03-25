import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { CountryMilestonesAndProgramsTab } from "../components/CountryMilestonesAndProgramsTab";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import "../assets/style.css";

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

  // const menuProps = {
  //   items,
  //   onClick: () => {},
  // };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-1/2">
          <PageIntro
            title="Country, Milestone & Program Type Configuration "
            description="Configure country, milestones & program types on the system"
            linkBack={appRoute.settings}
          />
        </div>

        <div className="w-1/2 flex justify-end">
          <Dropdown.Button
            className="bg-secondary rounded-lg w-fit "
            arrow={true}
            icon={
              <DownOutlined className="text-white font-medium hover:text-white" />
            }
            menu={{
              className: "text-white",
              color: "white",
              items,
            }}
          >
            <span className="text-white font-medium hover:text-white">
              Add New
            </span>
          </Dropdown.Button>
        </div>
      </div>
      <CountryMilestonesAndProgramsTab />

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
