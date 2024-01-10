import { Select, Tabs } from "antd";
import { Country } from "./Country";
import { Milestones } from "./Milestones";
import { ProgramTypes } from "./ProgramTypes";
import type { TabsProps } from "antd";

export const CountryMilestonesAndProgramsTab = () => {
  const tabItems: TabsProps["items"] = [
    {
      label: "Country",
      key: "Country",
      children: <Country />,
    },
    {
      label: "Milestones",
      key: "Milestones",
      children: <Milestones />,
    },
    {
      label: "Program Type",
      key: "Program Type",
      children: <ProgramTypes />,
    },
  ];
  // const operations = <Select placeholder="Filter" />;
  return (
    <Tabs
      items={tabItems}
      tabBarExtraContent={
        <Select allowClear placeholder="Filter" className="md:flex hidden w-[200px]" />
      }
    />
  );
};
