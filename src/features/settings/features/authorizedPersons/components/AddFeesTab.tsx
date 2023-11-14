import { Tabs, TabsProps } from "antd";
import React from "react";
import { AddFees } from "./AddFees";
import { ProgramFeesBreakdown } from "./ProgramFeesBreakdown";

const AddFeesTab = () => {
  const tabItems: TabsProps["items"] = [
    {
      label: "Fees",
      key: "Fees",
      children: <AddFees />,
    },
    {
      label: "Program Fees Breakdown",
      key: "Program Fees Breakdown",
      children: <ProgramFeesBreakdown />,
    },
  ];
  return <Tabs items={tabItems} />;
};

export default AddFeesTab;
