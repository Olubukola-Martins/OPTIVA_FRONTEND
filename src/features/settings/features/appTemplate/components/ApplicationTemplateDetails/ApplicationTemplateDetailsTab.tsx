import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { ApplicantBriefTemplateDetails } from "./ApplicantBriefTemplateDetails";
import { AboutTheApplicantTemplateDetails } from "./AboutTheApplicantTemplateDetails";
import { ApplicantPeculiaritesTemplateDetails } from "./ApplicantPeculiaritesTemplateDetails";
import { OthersTemplateDetails } from "./OthersTemplateDetails";

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
  return (
    <>
      <Tabs items={tabItems} />
    </>
  );
};
