import { Tabs } from "antd";
import { AttachFinancial } from "./AttachFinancial";
import { AttachOthers } from "./AttachOthers";
import { AttachReport } from "./AttachReport";
import { AttachOccupation } from "./AttachOccupation";
import { AttachAcademic } from "./AttachAcademic";
import { AttachTravelHistory } from "./AttachTravelHistory";
import { AttachIdentityDocument } from "./AttachIdentityDocument";
import { useState } from "react";
import { AppButton } from "src/components/button/AppButton";

export const DocumentsTab = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  // const [form] = Form.useForm();

  // const handleSubmit = () => {};
  const tabItems: {
    children: React.ReactNode;
    label: string;
    key: string;
  }[] = [
    {
      children: (
        <AttachIdentityDocument
          onNext={() => setCurrentTab(currentTab + 1)}
          docId={1}
        />
      ),
      label: "Identity Document",
      key: "Identity Document",
    },
    {
      label: "Travel History",
      key: "Travel History",
      children: (
        <AttachTravelHistory
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
          docId={2}
        />
      ),
    },
    {
      label: "Academic Qualification",
      key: "Academic Qualification",
      children: (
        <AttachAcademic
          docId={3}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
    {
      label: "Occupation",
      key: "Occupation",
      children: (
        <AttachOccupation
          docId={4}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
    {
      label: "Reports",
      key: "Reports",
      children: (
        <AttachReport
          docId={5}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
    {
      label: "Financial Asset",
      key: "Financial Asset",
      children: (
        <AttachFinancial
          docId={6}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
    {
      label: "Others",
      key: "Others",
      children: (
        <AttachOthers docId={7} onPrev={() => setCurrentTab(currentTab - 1)} />
      ),
    },
  ];
  const isLastTab = currentTab === tabItems.length - 1;

  return (
    // <Form form={form} layout="vertical" onFinish={handleSubmit}>
    <>
      <Tabs activeKey={currentTab.toString()}
        onChange={(key) => setCurrentTab(Number(key))}>
        {tabItems.map((tab, index) => (
          <Tabs.TabPane tab={tab.label} key={index.toString()}>
            {tab.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
      {/* <div className="flex justify-end items-center gap-5">
        {currentTab !== 0 && (
          <AppButton
            label="Prev"
            variant="transparent"
            handleClick={() => setCurrentTab(currentTab - 1)}
          />
        )}
        {!isLastTab && (
          <AppButton
            handleClick={() => setCurrentTab(currentTab + 1)}
            label="Next"
          />
        )}
        {isLastTab && <AppButton label="Submit" type="submit" />}
      </div> */}
      </>
    // </Form>
  );
};
