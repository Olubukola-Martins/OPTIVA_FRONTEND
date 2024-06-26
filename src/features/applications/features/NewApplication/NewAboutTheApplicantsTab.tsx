import { Form, Tabs } from "antd";
import { NewPersonalDetails } from "./NewPersonalDetails";
import { NewContactDetails } from "./NewContactDetails";
import { NewMarriageDetails } from "./NewMarriageDetails";
import { NewChildrenDetails } from "./NewChildrenDetails";
import { NewOtherDependentDetails } from "./NewOtherDependentDetails";
import { NewPEP } from "./NewPEP";
import { NewEmploymentDetails } from "./NewEmploymentDetails";
import { NewBusinessIncomeAndNetwork } from "./NewBusinessIncomeAndNetwork";
import { NewAcademicHistory } from "./NewAcademicHistory";
import { NewTravelDetailsAndHistory } from "./NewTravelDetailsAndHistory";
import { useQueryClient } from "react-query";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { useState } from "react";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { ICreateApplicationResponse } from "../../types/types";
import { useGlobalContext } from "src/stateManagement/GlobalContext";
import { IProps } from "./NewApplicantBrief";

export const NewAboutTheApplicantsTab: React.FC<IProps> = ({ onNext }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } =
    useCreateApplicationResponse("sectiontworesponse");
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [form] = Form.useForm();
  const { sharedData } = useGlobalContext();

  const handleTabSubmit = (responses: any) => {
    const applicationId = sharedData.applicantId as unknown as number;
    const applicationData: ICreateApplicationResponse = {
      application_id: applicationId,
      responses: Array.isArray(responses)
        ? responses.map(
            (response: {
              id: number;
              schema_name: any;
              subsection_name: string;
            }) => ({
              question_id: response.id,
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
        // if (currentTab < tabItems.length - 1) {
        //   setCurrentTab(currentTab + 1);
        // }
        onNext();
      },
    });
  };

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
        <NewPersonalDetails
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          subsectionName="personalDetails"
        />
      ),
    },
    {
      label: "Contact Details",
      key: "Contact Details",
      children: (
        <NewContactDetails
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
        <NewMarriageDetails
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
        <NewChildrenDetails
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
        <NewOtherDependentDetails
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
        <NewPEP
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
        <NewEmploymentDetails
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
        <NewBusinessIncomeAndNetwork
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
        <NewAcademicHistory
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
        <NewTravelDetailsAndHistory
          isLoading={isLoading}
          onCollectResponses={handleTabSubmit}
          subsectionName="travelDetails"
          isSuccess={isSuccess}
          onPrevTabItem={() => setCurrentTab(currentTab - 1)}
        />
      ),
    },
  ];

  return (
    <>
      <Form
        onFinish={() => handleTabSubmit}
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Tabs
          tabPosition="top"
          // defaultActiveKey="1"
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
    </>
  );
};