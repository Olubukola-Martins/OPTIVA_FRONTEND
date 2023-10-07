import { useState } from "react";
import { Navbar } from "./Navbar";
import { SideBar } from "./SideBar";

export interface IProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<IProps> = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div className="flex w-full relative">
        <div className={`w-52 fixed z-40 overflow-hidden lg:flex hidden`}>
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div
          className={isOpen ? "w-full lg:ml-52 pb-10" : "lg:ml-16 pb-10 w-full"}
        >
          <Navbar />
          <main className="Container">{children}</main>
        </div>
      </div>
    </div>
  );
};
