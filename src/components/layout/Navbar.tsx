import { SearchOutlined } from "@ant-design/icons";
import { Drawer, Input } from "antd";
import { Icon } from "@iconify/react";
import { Badge, Select, Dropdown } from "antd";
import logo from "src/assets/miniLogo.png";
import { useState } from "react";
import { SideBar } from "./SideBar";

export const Navbar = () => {
  const [openSideBar, setOpenSideBar] = useState(false)
  return (
    <>
    <div className="w-full bg-white sticky top-0 z-50 shadow-sm border-b py-3 Container flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <Icon icon="lucide:menu" className="text-xl lg:hidden flex" onClick={() => setOpenSideBar(true)}/>
        <img src={logo} alt="logo" className="lg:hidden flex h-6" />
        <Input
          placeholder="Search here..."
          suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
          className="md:w-80 lg:flex hidden"
        />
      </div>
      <div className="flex items-center gap-x-5 text-gray-600">
        <Select
          placeholder="Select branch"
          options={[
            {
              value: 1,
              label: "Abuja branch",
            },
            {
              value: 2,
              label: "Lagos branch",
            },
          ]}
          style={{
            borderRadius: "7px",
            border: "1.5px solid var(--app-color-primary)",
            width: "150px",
          }}
          className="lg:flex hidden"
        />
        <Icon icon="tabler:search" className="lg:hidden flex text-xl" />
        <Badge dot>
          <Icon icon="radix-icons:bell" className="text-xl font-medium" />
        </Badge>
        <Dropdown
          overlay={
            <div className="bg-white border rounded py-7 mr-3 mt-2 shadow-sm">
              <ul>
                <li className="menuStyle">First one</li>
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
        <Drawer title="Sidebar" open={openSideBar} onClose={() => setOpenSideBar(false)}>
          <SideBar isOpen={true} setIsOpen={undefined} />
        </Drawer>
    </>
  );
};
