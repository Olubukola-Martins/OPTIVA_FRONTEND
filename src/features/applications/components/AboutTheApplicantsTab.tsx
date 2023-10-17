import React from "react";
import { Tabs } from "antd";
import { PersonalDetails } from "./PersonalDetails";
import { ContactDetails } from "./ContactDetails";
import { MarriageDetails } from "./MarriageDetails";
import { ChildrenDetails } from "./ChildrenDetails";
import { OtherDependentDetails } from "./OtherDependentDetails";
import { PEP } from "./PEP";
import { EmploymentDetails } from "./EmploymentDetails";
import { BusinessIncomeAndNetwork } from "./BusinessIncomeAndNetwork";
import { AcademicHistory } from "./AcademicHistory";
import { TravelDetailsAndHistory } from "./TravelDetailsAndHistory";

export const AboutTheApplicantsTab = () => {
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      children: <PersonalDetails />,
      label: "Personal Details",
      key: "Personal Details",
    },
    {
      children: <ContactDetails />,
      label: "Contact Details",
      key: "Contact Details",
    },
    {
      children: <MarriageDetails />,
      label: "Marriage Details",
      key: "Marriage Details",
    },
    {
      children: <ChildrenDetails />,
      label: "Children Details",
      key: "Children Details",
    },
    {
      children: <OtherDependentDetails />,
      label: "Other Dependent Details",
      key: "Other Dependent Details",
    },
    {
      children: <PEP />,
      label: "PEP",
      key: "PEP",
    },
    {
      children: <EmploymentDetails />,
      label: "Employment Details",
      key: "Employment Details",
    },
    {
      children: <BusinessIncomeAndNetwork />,
      label: "Business, Income And Network",
      key: "Business, Income And Network",
    },
    {
      children: <AcademicHistory />,
      label: "Academic History",
      key: "Academy History",
    },
    {
      children: <TravelDetailsAndHistory />,
      label: "Travel Details And History",
      key: "Travel Details And History",
    },
  ];
  return <Tabs items={tabItems}
    // tabBarStyle={{ width: "800px" }}
  />;
};
