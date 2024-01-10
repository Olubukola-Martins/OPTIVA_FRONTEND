import { Form, Tabs } from "antd";
import { NewImmigrationAndCourtProceedings } from "./NewImmigrationAndCourtProceedings";
import { NewCriminalHistory } from "./NewCriminalHistory";
import { useCreateApplicationResponse } from "../../hooks/useCreateApplicationResponse";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/useGetApplication";
import { ICreateApplicationResponse } from "../../types/types";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { useGlobalContext } from "src/stateManagement/GlobalContext";

export const NewApplicantPeculiaritiesTab = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateApplicationResponse(
    "sectionthreeresponse"
  );
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
        if (currentTab < tabItems.length - 1) {
          setCurrentTab(currentTab + 1);
        }
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
      children: (
        <NewImmigrationAndCourtProceedings
          onNext={() => setCurrentTab(currentTab + 1)}
          subsectionName="immigrationCourtProcedings"
        />
      ),
      subsectionName: "immigrationCourtProcedings",
      label: "Immigration And Court Proceedings",
      key: "Immigration And Court Proceedings",
    },
    {
      children: (
        <NewCriminalHistory
          onCollectResponses={handleTabSubmit}
          subsectionName="criminalHistory"
          isLoading={isLoading}
        />
      ),
      label: "Criminal History",
      key: "Criminal History",
      subsectionName: "criminalHistory",
    },
  ];

  return (
    <>
      <Form onFinish={() => handleTabSubmit} form={form} layout="vertical">
        <Tabs
          activeKey={currentTab.toString()}
          onChange={(key) => setCurrentTab(Number(key))}
          tabBarGutter={50}
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
