import { Tabs } from "antd";
import React, { useState } from "react";
import { IdentityDocument } from "./IdentityDocument";
import { TravelHistory } from "./TravelHistory";
import { AcademicQualifications } from "./AcademicQualifications";
import { Occupation } from "./Occupation";
import { Reports } from "./Reports";
import { FianancialAsset } from "./FinancialAsset";
import { Others } from "./Others";

interface IApplicantDocTabProps {
  filterValue: string;
}

export const ApplicantDocumentTab: React.FC<IApplicantDocTabProps> = ({
  filterValue,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const tabItems: {
    children: React.ReactNode;
    label: string;
    key: string;
  }[] = [
    {
      children: (
        <IdentityDocument
          filterValue={filterValue}
          onNext={() => setCurrentTab(currentTab + 1)}
        />
      ),
      label: "Identity Document",
      key: "Identity Document",
    },
    {
      label: "Travel History",
      key: "Travel History",
      children: (
        <TravelHistory
          filterValue={filterValue}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
    {
      label: "Academic Qualification",
      key: "Academic Qualification",
      children: (
        <AcademicQualifications
          filterValue={filterValue}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
    {
      label: "Occupation",
      key: "Occupation",
      children: (
        <Occupation
          filterValue={filterValue}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
    {
      label: "Reports",
      key: "Reports",
      children: (
        <Reports
          filterValue={filterValue}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
    {
      label: "Financial Asset",
      key: "Financial Asset",
      children: (
        <FianancialAsset
          filterValue={filterValue}
          onNext={() => setCurrentTab(currentTab + 1)}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
    {
      label: "Others",
      key: "Others",
      children: (
        <Others
          filterValue={filterValue}
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
  ];
  return (
    <Tabs
      activeKey={currentTab.toString()}
      onChange={(key) => setCurrentTab(Number(key))}
      tabBarGutter={50}
    >
      {tabItems.map((tab, index) => (
        <Tabs.TabPane tab={tab.label} key={index.toString()}>
          {tab.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};
