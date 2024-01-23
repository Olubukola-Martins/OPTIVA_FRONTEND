import { Tabs } from "antd";
import { ImmigrationAndCourtProceedings } from "./ImmigrationAndCourtProceedings";
import { CriminalHistory } from "./CriminalHistory";
import { useState } from "react";

export const ApplicantPeculiaritiesTab = () => {
  
  const [currentTab, setCurrentTab] = useState<number>(0);

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
    subsectionName: string;
  }[] = [
    {
      children: (
        <ImmigrationAndCourtProceedings
          onNext={() => setCurrentTab(currentTab + 1)}
          subsectionName="immigrationCourtProcedings"
        />
      ),
      subsectionName: "immigrationCourtProcedings",
      label: "Immigration And Court Proceedings",
      key: "Immigration And Court Proceedings",
    },
    {
      children: (
        <CriminalHistory
        onPrev={() => setCurrentTab(currentTab - 1)}
          subsectionName="criminalHistory"
        />
      ),
      label: "Criminal History",
      key: "Criminal History",
      subsectionName: "criminalHistory",
    },
  ];
  return (
    <>
       <Tabs
          activeKey={currentTab.toString()}
          onChange={(key) => setCurrentTab(Number(key))}
        tabBarGutter={50}
        tabBarStyle={{}}
        >
          {tabItems.map((tab, index) => (
            <Tabs.TabPane tab={tab.label} key={index.toString()}>
              {tab.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
    </>
  );
};
