import { Tooltip } from "antd";
import { Link, NavLink } from "react-router-dom";
import logo from "src/assets/logoSvg.svg";
import miniLogo from "src/assets/miniLogo.png";
import { Icon } from "@iconify/react";
import { appRoute } from "src/config/routeMgt/routePaths";
import "./style.css";

export interface sideBarProps {
  isOpen: boolean;
  setIsOpen: any;
}

export const SideBar = ({ isOpen, setIsOpen }: sideBarProps) => {
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div
      className={`h-screen px-3 py-5 bg-[#F5F5F5] sidebar ${
        isOpen ? "w-[227px]" : "w-[65px]"
      }`}
    >
      <Link to={appRoute.home} className="flex justify-center mt-2">
        <img src={isOpen ? logo : miniLogo} alt="logo" className="" />
      </Link>

      <div className={"mt-16"}>
        <NavLink to={appRoute.home} className="sidebar_link">
          <Tooltip title="Dashboard" placement="right">
            <Icon icon="mingcute:grid-fill" className="nav_icon" />
          </Tooltip>
          <span className={isOpen ? "" : "hidden"}>Dashboard</span>
        </NavLink>
        <NavLink to="/all-users" className="sidebar_link">
          <Tooltip title="Applications" placement="right">
            <Icon icon="mdi:application-edit" className="nav_icon" />
          </Tooltip>
          <span className={isOpen ? "" : "hidden"}>Applications</span>
        </NavLink>

        <NavLink to="/payments" className="sidebar_link">
          <Tooltip title="Payment" placement="right">
            <Icon icon="fluent:payment-32-filled" className="nav_icon" />
          </Tooltip>
          <span className={isOpen ? "" : "hidden"}>Payments</span>
        </NavLink>

        <NavLink to="/sales-records" className="sidebar_link">
          <Tooltip title="Records" placement="right">
            <Icon icon="bi:pie-chart-fill" className="nav_icon" />
          </Tooltip>

          <span className={isOpen ? "" : "hidden"}>Records</span>
        </NavLink>

        <NavLink to="/account" className="sidebar_link">
          <Tooltip title="settings" placement="right">
            <Icon icon="material-symbols:settings" className="nav_icon" />
          </Tooltip>

          <span className={isOpen ? "" : "hidden"}>Settings</span>
        </NavLink>
      </div>
      <div className="flex justify-end">
        <Tooltip
          title={`${isOpen ? "Close" : "Open"} Sidebar`}
          placement="right"
        >
          <div
            onClick={toggle}
            className="bg-primary mt-10 cursor-pointer hover:bg-secondary flex items-center rounded-full justify-center h-7 w-7"
          >
            <Icon
              icon={`ep:arrow-${isOpen ? "left" : "right"}-bold`}
              className="text-white"
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
