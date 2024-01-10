import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { ApplicantBriefTemplate } from "./ApplicantBriefTemplate";
import { AboutTheApplicantTemplate } from "./AboutTheApplicantTemplate";
import { ApplicantPeculiaritesTemplate } from "./ApplicantPeculiaritesTemplate";
import { OthersTemplate } from "./OthersTemplate";

export interface ITemplateCreatedProps{
  templateCreated: boolean
  resId?:number
}
export const ApplicationTemplateTab: React.FC<ITemplateCreatedProps> = ({ templateCreated, resId }) => {
  const tabItems: TabsProps["items"] = [
    {
      key: "Applicant Brief",
      label: "Applicant Brief",
      children: <ApplicantBriefTemplate templateCreated={templateCreated} resId={resId}/>,
       disabled:templateCreated
    },
    {
      key: "About the Applicant",
      label: "About the Applicant",
      children: <AboutTheApplicantTemplate templateCreated={templateCreated} resId={resId}/>,
      disabled:templateCreated
    },
    {
      key: "Applicant Peculiarities",
      label: "Applicant Peculiarities",
      children: <ApplicantPeculiaritesTemplate templateCreated={templateCreated} resId={resId}/>,
      disabled:templateCreated
    },
    {
      key: "Others",
      label: "Others",
      children: <OthersTemplate templateCreated={templateCreated} resId={resId}/>,
      disabled:templateCreated
    },
  ];
  return (
    <>
      <Tabs items={tabItems} />
    </>
  );
};
