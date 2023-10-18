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
    key: string;
    children: React.ReactNode;
  }[] = [
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
      label: "Business, Income & Network",
      key: "Business, Income and Network",
      children: <BusinessIncomeAndNetwork />,
    },
    {
      label: "Academic History",
      key: "Academic History",
      children: <AcademicHistory />,
    },
    {
      label: "Travel Details & History",
      key: "Travel Details &History",
      children: <TravelDetailsAndHistory />,
    },
  ];
  return (
    <Tabs
      items={tabItems}
        tabBarGutter={5.9}
      // tabBarStyle={{
      //   width: 1200,
      // }}
    />
  );
};
