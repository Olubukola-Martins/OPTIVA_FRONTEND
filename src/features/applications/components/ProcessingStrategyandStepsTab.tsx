import { Form, Tabs } from "antd";
import { ProcessingSteps } from "./ProcessingSteps";
import { ProcessingStrategy } from "./ProcessingStrategy";

export const ProcessingStrategyandStepsTab = () => {
  
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
  }[] = [
    {
      label: "Processing Strategy",
      key: "Processing Strategy",
      children: <ProcessingStrategy />,
    },
    {
      label: "Processing Steps",
      key: "Processing Steps",
      children: <ProcessingSteps />,
    },
  ];
  return (
    <>
      <Tabs items={tabItems} />
        
    </>
  );
};
