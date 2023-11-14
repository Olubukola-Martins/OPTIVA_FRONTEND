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
import type { TabsProps } from "antd";

export const AboutTheApplicantsTab = () => {
  const tabItems: TabsProps["items"] = [
    {
      label: "Personal Details",
      key: "Personal Details",
      children: <PersonalDetails />,
    },
    {
      label: "Contact Details",
      key: "Contact Details",
      children: <ContactDetails />,
    },
    {
      label: "Marriage Details",
      key: "Marriage Details",
      children: <MarriageDetails />,
    },
    {
      label: "Children Details",
      key: "Children Details",
      children: <ChildrenDetails />,
    },
    {
      label: "Other Dependent Details",
      key: "Other Dependent Details",
      children: <OtherDependentDetails />,
    },
    {
      label: "PEP",
      key: "PEP",
      children: <PEP />,
    },
    {
      label: "Employment Details",
      key: "Employment Details",
      children: <EmploymentDetails />,
    },
    {
      label: "Business, Income amd Network",
      key: "Business, Income and Network",
      children: <BusinessIncomeAndNetwork />,
    },
    {
      label: "Academic History",
      key: "Academic History",
      children: <AcademicHistory />,
    },
    {
      label: "Travel Details and History",
      key: "Travel Details and History",
      children: <TravelDetailsAndHistory />,
    },
  ];
  return (
    <div className="w-full">
    <Tabs
      items={tabItems}
      defaultActiveKey="1"  
      size="small"
      moreIcon
      tabBarStyle={{ display: "flex", flexWrap: "wrap", maxWidth: "1150px", }}
    />
  </div>
  
  );
};
