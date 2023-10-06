// import { Navbar } from "./Navbar";

import { Navbar } from "./Navbar";
import { SideBar } from "./SideBar";

export interface IProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <div>
      <div className="flex w-full relative">
        <div className="w-52 fixed z-40 overflow-hidden lg:flex hidden">
          <SideBar />
        </div>
        <div className="w-full lg:ml-52 pb-10">
          <Navbar />
          <main className="Container">{children}</main>
        </div>
      </div>
    </div>
  );
};
