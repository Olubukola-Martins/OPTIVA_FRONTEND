import { Tabs } from "antd";
import React from "react";
import { NewPersonalDetails } from "./NewPersonalDetails";
import { NewContactDetails } from "./NewContactDetails";
import { NewMarriageDetails } from "./NewMarriageDetails";
import { NewChildrenDetails } from "./NewChildrenDetails";
import { NewOtherDependentDetails } from "./NewOtherDependentDetails";
import { NewPEP } from "./NewPEP";
import { NewEmploymentDetails } from "./NewEmploymentDetails";
import { NewBusinessIncomeAndNetwork } from "./NewBusinessIncomeAndNetwork";
import { NewAcademicHistory } from "./NewAcademicHistory";
import { NewTravelDetailsAndHistory } from "./NewTravelDetailsAndHistory";
import type { TabsProps } from "antd";

export const NewAboutTheApplicantsTab = () => {
  const tabItems: TabsProps["items"] = [
    {
      label: "Personal Details",
      key: "Personal Details",
      children: <NewPersonalDetails />,
    },
    {
      label: "Contact Details",
      key: "Contact Details",
      children: <NewContactDetails />,
    },
    {
      label: "Marriage Details",
      key: "Marriage Details",
      children: <NewMarriageDetails />,
    },
    {
      label: "Children Details",
      key: "Children Details",
      children: <NewChildrenDetails />,
    },
    {
      label: "Other Dependent Details",
      key: "Other Dependent Details",
      children: <NewOtherDependentDetails />,
    },
    {
      label: "PEP",
      key: "PEP",
      children: <NewPEP />,
    },
    {
      label: "Employment Details",
      key: "Employment Details",
      children: <NewEmploymentDetails />,
    },
    {
      label: "Business, Income and Network",
      key: "Business, Income and Networks",
      children: <NewBusinessIncomeAndNetwork />,
    },
    {
      label: "Academic History",
      key: "Academic History",
      children: <NewAcademicHistory />,
    },
    {
      label: "Travel Details and History",
      key: "Travel Details and History",
      children: <NewTravelDetailsAndHistory />,
    },
  ];
  return (
    <div className="w-full">
      <Tabs
        items={tabItems}
        defaultActiveKey="1"  
        size="small"
        moreIcon
        tabBarStyle={{ display: "flex", flexWrap: "wrap", maxWidth: "1250px", }}
      />
    </div>
    
  );
};
