import { Input, Select, Tabs } from "antd";
import { ActiveApplications } from "./ActiveApplications";
import { InactiveApplications } from "./InactiveApplications";
// import { SearchApplicants } from "./SearchApplicants";
// import Input from "antd";

export const ApplicationsTab = () => {
  const operations = (
    <div className="hidden lg:flex gap-4 w-full">
      <Input.Search placeholder="Search" className="w-1/2"></Input.Search>
      <Select placeholder="Filter" className="w-1/2" />
    </div>
  );
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "Active Applications",
      children: <ActiveApplications />,
      key: "Active Applications",
    },
    {
      label: "Inactive Applications",
      children: <InactiveApplications />,
      key: "Inactive Applications",
    },
  ];
  return (
    <>
      <Tabs
        items={tabItems}
        className="hover:bg-caramel active:text-primary"
        tabBarExtraContent={operations}
      />
    </>
  );
};
