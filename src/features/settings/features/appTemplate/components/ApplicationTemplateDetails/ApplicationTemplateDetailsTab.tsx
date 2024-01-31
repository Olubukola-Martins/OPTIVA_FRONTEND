import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { ApplicantBriefTemplateDetails } from "./ApplicantBriefTemplateDetails";
import { AboutTheApplicantTemplateDetails } from "./AboutTheApplicantTemplateDetails";
import { ApplicantPeculiaritesTemplateDetails } from "./ApplicantPeculiaritesTemplateDetails";
import { OthersTemplateDetails } from "./OthersTemplateDetails";
import { useState } from "react";
import { AppButton } from "src/components/button/AppButton";

export const ApplicationTemplateDetailsTab = () => {
  const tabItems: TabsProps["items"] = [
    {
      key: "Applicant Brief",
      label: "Applicant Brief",
      children: <ApplicantBriefTemplateDetails />,
    },
    {
      key: "About the Applicant",
      label: "About the Applicant",
      children: <AboutTheApplicantTemplateDetails />,
    },
    {
      key: "Applicant Peculiairties",
      label: "Applicant Peculiairties",
      children: <ApplicantPeculiaritesTemplateDetails />,
    },
    {
      key: "Others",
      label: "Others",
      children: <OthersTemplateDetails />,
    },
  ];

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleNext = () => {
    setActiveTab((prevTab) =>
      prevTab < tabItems.length - 1 ? prevTab + 1 : prevTab
    );
  };

  const handlePrev = () => {
    setActiveTab((prevTab) => (prevTab > 0 ? prevTab - 1 : prevTab));
  };

  return (
    <>
      <Tabs
        activeKey={activeTab.toString()}
        onChange={(key) => setActiveTab(Number(key))}
      >
        {tabItems.map((tab, index) => (
          <Tabs.TabPane tab={tab.label} key={index.toString()}>
            {tab.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
      {/* Navigation buttons */}
      <div
        className={`flex  gap-3 my-5 py-2 ${
          activeTab === 0 ? "justify-end" : "justify-between"
        }`}
      >
        {activeTab !== 0 && (
          <AppButton
            handleClick={handlePrev}
            label="Previous"
            variant="transparent"
          />
        )}
        {activeTab !== tabItems.length - 1 && (
          <AppButton label="Next" handleClick={handleNext} />
        )}
      </div>
    </>
  );
};
