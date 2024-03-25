import { Tabs, TabsProps } from "antd";
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
  return (
    <Tabs
      items={tabItems}
      // tabBarExtraContent={
      //   <Select
      //     allowClear
      //     placeholder="Filter"
      //     className="md:flex hidden w-[200px]"
      //   />
      // }
    />
  );
};
