import { Tabs } from "antd";
import React from "react";
import { IdentityDocument } from "./IdentityDocument";
import { TravelHistory } from "./TravelHistory";
import { AcademicQualifications } from "./AcademicQualifications";
import { Occupation } from "./Occupation";
import { Reports } from "./Reports";
import { FianancialAsset } from "./FinancialAsset";
import { Others } from "./Others";

export const ApplicantDocumentTab = () => {
  const tabItems: {
    children: React.ReactNode;
    label: string;
    key: string;
  }[] = [
    {
      children: <IdentityDocument />,
      label: "Identity Document",
      key: "Identity Document",
    },
    {
      label: "Travel History",
      key: "Travel History",
      children: <TravelHistory />,
    },
    {
      label: "Academic Qualification",
      key: "Academic Qualification",
      children: <AcademicQualifications />,
    },
    {
      label: "Occupation",
      key: "Occupation",
      children: <Occupation />,
    },
    {
      label: "Reports",
      key: "Reports",
      children: <Reports />,
    },
    {
      label: "Financial Asset",
      key: "Financial Asset",
      children: <FianancialAsset />,
    },
    {
      label: "Others",
      key: "Others",
      children: <Others />,
    },
  ];
  return (
    <>
      <Tabs items={tabItems} />
    </>
  );
};
