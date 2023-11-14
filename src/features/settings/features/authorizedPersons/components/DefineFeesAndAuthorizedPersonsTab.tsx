import { Select, Tabs, TabsProps } from "antd";
import { Fees } from "./Fees";
import { AuthorizedPersons } from "./AuthorizedPersons";

export const DefineFeesAndAuthorizedPersonsTab = () => {
  const tabItems: TabsProps["items"] = [
    {
      label: "Fees",
      key: "Fees",
      children: <Fees />,
    },
    {
      label: "Authorized Persons",
      key: "Authorized Persons",
      children: <AuthorizedPersons />,
    },
  ];
  const operations = <Select placeholder="Filter" className="" />;
  return <Tabs items={tabItems} tabBarExtraContent={operations} />;
};
