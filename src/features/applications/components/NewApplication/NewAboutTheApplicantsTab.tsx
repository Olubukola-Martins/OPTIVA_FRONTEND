import { Tabs } from "antd";
import React from "react";
import { NewPersonalDetails } from "./NewPersonalDetails";
import { NewContactDetails } from "./NewContactDetails";
import { NewMarriageDetails } from "./NewMarriageDetails";
import { NewChildrenDetails } from "./NewChildrenDetails";
import { NewOtherDependentDetails } from "./NewOtherDependentDetails";
import { NewPEP } from "./NewPEP";

export const NewAboutTheApplicantsTab = () => {
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
  }[] = [
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
  ];
  return <Tabs items={tabItems} />;
};
