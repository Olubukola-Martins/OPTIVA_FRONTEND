import { Form, Tabs } from "antd";
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";

export const AboutTheApplicantsTab = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { id } = useParams();
  const { data,  } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiontworesponse",
  });

  console.log('data', data)

  const [form] = Form.useForm();
  useEffect(() => {
    if (data && data.length > 0) {
      const initialValues: Record<string, any> = {};
      data.forEach((item) => {
        if (item.subsection_name === tabItems[currentTab].subsectionName) {
          initialValues[item.question.schema_name] = item.response;
        }
      });
      form.setFieldsValue(initialValues);
    }
  }, [data, currentTab]);

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
    subsectionName: string;
  }[] = [
    {
      label: "Personal Details",
      key: "Personal Details",
      subsectionName: "personalDetails",
      children: (
        <PersonalDetails
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          subsectionName="personalDetails"
        />
      ),
    },
    {
      label: "Contact Details",
      key: "Contact Details",
      children: (
        <ContactDetails
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          onPrevTabItem={() => setCurrentTab(currentTab - 1)}
          subsectionName="contactDetails"
        />
      ),
      subsectionName: "contactDetails",
    },
    {
      label: "Marriage Details",
      key: "Marriage Details",
      subsectionName: "marriageDetails",
      children: (
        <MarriageDetails
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          onPrevTabItem={() => setCurrentTab(currentTab - 1)}
          subsectionName="marriageDetails"
        />
      ),
    },
    {
      label: "Children Details",
      key: "Children Details",
      subsectionName: "childrenDetails",
      children: (
        <ChildrenDetails
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          onPrevTabItem={() => setCurrentTab(currentTab - 1)}
          subsectionName="childrenDetails"
        />
      ),
    },
    {
      label: "Other Dependent Details",
      key: "Other Dependent Details",
      subsectionName: "otherDependentsDetails",
      children: (
        <OtherDependentDetails
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          onPrevTabItem={() => setCurrentTab(currentTab - 1)}
          subsectionName="otherDependentsDetails"
        />
      ),
    },
    {
      label: "PEP",
      key: "PEP",
      subsectionName: "PEP",
      children: (
        <PEP
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          onPrevTabItem={() => setCurrentTab(currentTab - 1)}
          subsectionName="PEP"
        />
      ),
    },
    {
      label: "Employment Details",
      key: "Employment Details",
      subsectionName: "employmentDetails",
      children: (
        <EmploymentDetails
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          onPrevTabItem={() => setCurrentTab(currentTab - 1)}
          subsectionName="employmentDetails"
        />
      ),
    },
    {
      label: "Business, Income and Network",
      key: "Business, Income and Networks",
      subsectionName: "businessIncomeNetworth",
      children: (
        <BusinessIncomeAndNetwork
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          onPrevTabItem={() => setCurrentTab(currentTab - 1)}
          subsectionName="businessIncomeNetworth"
        />
      ),
    },
    {
      label: "Academic History",
      key: "Academic History",
      subsectionName: "academicHistory",
      children: (
        <AcademicHistory
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          onPrevTabItem={() => setCurrentTab(currentTab - 1)}
          subsectionName="academicHistory"
        />
      ),
    },
    {
      label: "Travel Details and History",
      key: "Travel Details and History",
      subsectionName: "travelDetails",
      children: (
        <TravelDetailsAndHistory
          subsectionName="travelDetails"
          onPrev={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical" >
      <Tabs
        tabBarStyle={{ maxWidth: "1200px" }}
        activeKey={currentTab.toString()}
        onChange={(key) => setCurrentTab(Number(key))}
        tabBarGutter={15}
        
      >
        {tabItems.map((tab, index) => (
          <Tabs.TabPane tab={tab.label} key={index.toString()}>
            {tab.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Form>
  );
};
