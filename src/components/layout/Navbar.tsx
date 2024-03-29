import { SearchOutlined } from "@ant-design/icons";
import { Drawer, Input } from "antd";
import { Icon } from "@iconify/react";
import { Badge, Dropdown } from "antd";
import logo from "src/assets/miniLogo.png";
import { useState } from "react";
import { SideBar } from "./SideBar";
import avatar from "src/assets/user.png";
import { SignOut } from "./SignOut";
import { EditProfile } from "src/ExtraSettings/components/EditProfile";
import { ChangePassword } from "src/ExtraSettings/components/ChangePassword";
import { CurrentBranch } from "src/ExtraSettings/components/CurrentBranch";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";

export const Navbar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const { data: userInfo } = useFetchUserProfile();

  return (
    <>
      <EditProfile
        open={editProfile}
        handleClose={() => setEditProfile(false)}
      />
      <ChangePassword
        open={passwordChange}
        handleClose={() => setPasswordChange(false)}
      />
      <div className="w-full bg-white sticky top-0 z-50 shadow-sm border-b py-3 Container flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <Icon
            icon="lucide:menu"
            className="text-xl lg:hidden flex"
            onClick={() => setOpenSideBar(true)}
          />
          <img src={logo} alt="logo" className="lg:hidden flex h-6" />
          <Input
            placeholder="Search here..."
            suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
            className="md:w-80 lg:flex hidden"
          />
        </div>
        <div className="flex items-center gap-x-5 text-gray-600">
          <CurrentBranch />
          <Icon icon="tabler:search" className="lg:hidden flex text-xl" />
          <Badge dot>
            <Icon icon="radix-icons:bell" className="text-xl font-medium" />
          </Badge>
          <Dropdown
            overlay={
              <div className="bg-white border overflow-y-auto px-3 rounded py-5 mr-3 mt-2 shadow-sm">
                <div className="text-center">
                  <div className="flex justify-center">
                    <img src={avatar} alt="avatar" className="h-10" />
                  </div>
                  <h3 className="text-base font-semibold py-3">
                    {userInfo?.name}
                  </h3>

                  <p className="text-xs">{userInfo?.roles.name}</p>
                  <div className="flex items-center gap-2 text-xs mt-2 mb-4">
                    <div className="flex items-center gap-2">
                      <i className="ri-mail-line text-green-600"></i>
                      <span>{userInfo?.email} | </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <i className="ri-phone-line text-green-600"></i>
                      <span>{userInfo?.phone}</span>
                    </div>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  <li
                    className="menuStyle"
                    onClick={() => setEditProfile(true)}
                  >
                    <Icon icon="mingcute:user-4-line" className="text-xl" />
                    <span>Edit Profile</span>
                  </li>
                  <Link to={appRoute.roles} className="menuStyle">
                    <Icon icon="mdi:user-badge-outline" className="text-xl" />
                    <span>Roles and Permission</span>
                  </Link>

                  <Link to={appRoute.workflow} className="menuStyle">
                    <Icon
                      icon="carbon:workflow-automation"
                      className="text-xl"
                    />
                    <span>Workflow</span>
                  </Link>
                  {/* <li className="menuStyle">
                    <Icon icon="mdi:partnership" className="text-xl" />
                    <span>International Partners</span>
                  </li> */}
                  <Link to={appRoute.companyProfile} className="menuStyle">
                    <Icon icon="mdi:company" className="text-xl" />
                    <span>Company Profile</span>
                  </Link>
                  {/* <li className="menuStyle">
                    <Icon icon="ion:key-outline" className="text-xl" />
                    <span>Enable 2FA</span>
                  </li> */}
                  <li
                    className="menuStyle"
                    onClick={() => setPasswordChange(true)}
                  >
                    <Icon icon="uis:padlock" className="text-xl" />
                    <span>Change Password</span>
                  </li>
                  <li className="menuStyle" onClick={() => setOpenLogout(true)}>
                    <Icon
                      icon="ant-design:logout-outlined"
                      className="text-xl"
                    />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            }
            placement="bottom"
            trigger={["click"]}
          >
            <div className="flex items-center gap-2 hover:border-b border-gray-700 cursor-pointer hover:text-primary">
              <Icon icon="mingcute:user-4-fill" className="text-xl" />
              <span className="text-base md:flex hidden">Admin user</span>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* sidebar mobile */}
      <Drawer
        title="Sidebar"
        open={openSideBar}
        onClose={() => setOpenSideBar(false)}
      >
        <SideBar isOpen={true} setIsOpen={() => console.log()} />
      </Drawer>

      {/* Logout confirmation */}
      <SignOut open={openLogout} handleClose={() => setOpenLogout(false)} />
    </>
  );
};
