import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { ApplicantBriefTemplate } from "./ApplicantBriefTemplate";
import { AboutTheApplicantTemplate } from "./AboutTheApplicantTemplate";
import { ApplicantPeculiaritesTemplate } from "./ApplicantPeculiaritesTemplate";
import { OthersTemplate } from "./OthersTemplate";
import { useState } from "react";

export interface ITemplateCreatedProps {
  templateCreated: boolean;
  resId?: number;
  onPrev?: () => void
  onNext?:()=>void
}
export const ApplicationTemplateTab: React.FC<ITemplateCreatedProps> = ({
  templateCreated,
  resId,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabItems: TabsProps["items"] = [
    {
      key: "Applicant Brief",
      label: "Applicant Brief",
      children: (
        <ApplicantBriefTemplate
          templateCreated={templateCreated}
          resId={resId}
          onNext={() => setCurrentTab(currentTab + 1)}
        />
      ),
      disabled: templateCreated,
    },
    {
      key: "About the Applicant",
      label: "About the Applicant",
      children: (
        <AboutTheApplicantTemplate
          templateCreated={templateCreated}
          resId={resId}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
      disabled: templateCreated,
    },
    {
      key: "Applicant Peculiarities",
      label: "Applicant Peculiarities",
      children: (
        <ApplicantPeculiaritesTemplate
          templateCreated={templateCreated}
          resId={resId}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
      disabled: templateCreated,
    },
    {
      key: "Others",
      label: "Others",
      children: (
        <OthersTemplate
          templateCreated={templateCreated}
          resId={resId}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
      disabled: templateCreated,
    },
  ];
  return (
    <>
      <Tabs
        activeKey={currentTab.toString()}
        onChange={(key) => setCurrentTab(Number(key))}
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
