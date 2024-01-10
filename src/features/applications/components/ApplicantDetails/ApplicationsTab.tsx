import { Input, Select, Tabs } from "antd";
import { ActiveApplications } from "../ActiveApplications";
import { InactiveApplications } from "../InactiveApplications";

export const ApplicationsTab = () => {
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
        tabBarExtraContent={
          <div className="flex gap-4">
            <Input.Search
              placeholder="Search"
              className="md:flex hidden w-[250px]"
            />
            <Select
              allowClear
              placeholder="Filter"
              className="md:flex hidden w-[250px]"
            />
          </div>
        }
      />
    </>
  );
};
