import { Form, Tabs } from "antd";
import type { TabsProps } from "antd";
import ApplicantBriefTemplate from "./ApplicantBriefTemplate";
import { AboutTheApplicantTemplate } from "./AboutTheApplicantTemplate";
import { ApplicantPeculiaritesTemplate } from "./ApplicantPeculiaritesTemplate";
import { OthersTemplate } from "./OthersTemplate";

export const ApplicationTemplateTab = () => {
  const tabItems: TabsProps["items"] = [
    {
      key: "Applicant Brief",
      label: "Applicant Brief",
      children: <ApplicantBriefTemplate />,
    },
    {
      key: "About the Applicant",
      label: "About the Applicant",
      children: <AboutTheApplicantTemplate />,
    },
    {
      key: "Applicant Peculiairties",
      label: "Applicant Peculiairties",
      children: <ApplicantPeculiaritesTemplate />,
    },
    {
      key: "Others",
      label: "Others",
      children: <OthersTemplate />,
    },
  ];
  return (
    <>
      <Tabs items={tabItems} />
    </>
  );
};
