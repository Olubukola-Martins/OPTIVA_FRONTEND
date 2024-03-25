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
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { useQueryClient } from "react-query";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { ICreateApplicationResponse } from "../../types/types";
import { AppButton } from "src/components/button/AppButton";
import { IApplicantDetailsProps } from "./ApplicantBrief";

export const AboutTheApplicantsTab: React.FC<IApplicantDetailsProps> = ({
  onNext,
  onPrev,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { id } = useParams();
  const { data } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiontworesponse",
  });
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } =
    useCreateApplicationResponse("sectiontworesponse");

  const handleTabSubmit = (responses: any) => {
    const applicationData: ICreateApplicationResponse = {
      application_id: id as unknown as number,
      responses: Array.isArray(responses)
        ? responses.map(
            (response: {
              question_id: number;
              schema_name: any;
              subsection_name: string;
            }) => ({
              question_id: response.question_id,
              response: [form.getFieldValue(response.schema_name)],
              subsection_name: response.subsection_name,
            })
          )
        : [],
    };

    mutate(applicationData, {
      onError: (error: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description: error.response.data.message,
          duration: 5,
        });
      },
      onSuccess: (res: any) => {
        openNotification({
          state: "success",
          title: "Success",
          description: res.data.data.message,
        });
        queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
      },
    });
  };

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

  const lastTab = currentTab === tabItems.length - 1;
  return (
    <Form form={form} layout="vertical" onFinish={handleTabSubmit}>
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
      {lastTab && (
        <div className="flex justify-between my-2">
          <AppButton
            label="Previous"
            type="button"
            variant="transparent"
            handleClick={() => {
              onPrev && onPrev();
            }}
          />
          <div className="flex justify-end items-center gap-5">
            <AppButton
              label="Next"
              type="button"
              variant="transparent"
              handleClick={() => {
                onNext && onNext();
              }}
            />
            <AppButton
              label="Save"
              type="submit"
              isLoading={isLoading}
              // isDisabled={isSuccess}
            />
          </div>
        </div>
      )}
      {!lastTab && (
        <div className="flex justify-end items-center gap-5">
          <AppButton
            label="Prev"
            type="button"
            variant="transparent"
            handleClick={() => {
              onPrev && onPrev();
            }}
          />
          <AppButton
            label="Next"
            type="button"
            handleClick={() => {
              onNext && onNext();
            }}
          />
        </div>
      )}
    </Form>
  );
};
