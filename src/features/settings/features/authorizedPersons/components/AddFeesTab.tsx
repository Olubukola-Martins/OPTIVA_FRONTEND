import { Form, Tabs, TabsProps } from "antd";
import React from "react";
import { AddFees } from "./AddFees";
import { ProgramFeesBreakdown } from "./ProgramFeesBreakdown";
import { AppButton } from "src/components/button/AppButton";

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

  const hanldeSubmit = (val: any) => {
    console.log('program fees form', val)
  }
  return (
    <Form layout="vertical" onFinish={hanldeSubmit}>
      <Tabs items={tabItems} />

      <div className="flex items-center justify-end gap-4 mt-5">
        <AppButton label="Cancel" type="reset" variant="transparent" />
        <AppButton label="Save" type="submit" />
      </div>
    </Form>
  );
};

export default AddFeesTab;
