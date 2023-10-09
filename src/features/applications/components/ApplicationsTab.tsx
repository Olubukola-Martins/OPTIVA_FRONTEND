import { Tabs } from "antd";
import { ActiveApplications } from "./ActiveApplications";
import { InactiveApplications } from "./InactiveApplications";
import { SearchApplicants } from "./SearchApplicants";

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
    {
      label: "Search",
      children: <SearchApplicants />,
      key: "",
    },
  ];
  return (
    <>
      <Tabs items={tabItems} />
    </>
  );
};
