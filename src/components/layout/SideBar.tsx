import { Tooltip } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "src/assets/logoSvg.svg";
import miniLogo from "src/assets/miniLogo.png";
import { Icon } from "@iconify/react";
import { appRoute } from "src/config/routeMgt/routePaths";
import "./style.css";
import { sidebarLinks } from ".";
import { SidebarProps } from "src/types";

export const SideBar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const toggle = () => setIsOpen(!isOpen);
  const { pathname } = useLocation();
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
        {sidebarLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={`sidebar_link ${pathname === link.to && "active"}`}
          >
            <Tooltip title={isOpen ? "" : link.title} placement="right">
              <Icon icon={link.icon} className="nav_icon" />
            </Tooltip>
            <span className={isOpen ? "" : "hidden"}>{link.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="flex justify-end">
        <Tooltip
          title={`${isOpen ? "Close" : "Open"} Sidebar`}
          placement="right"
        >
          <div
            onClick={toggle}
            className="bg-primary mt-10 cursor-pointer hover-bg-secondary flex items-center rounded-full justify-center h-7 w-7"
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
