import { Form, Tabs } from "antd";
import { ImmigrationAndCourtProceedings } from "./ImmigrationAndCourtProceedings";
import { CriminalHistory } from "./CriminalHistory";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { ICreateApplicationResponse } from "../../types/types";
import { AppButton } from "src/components/button/AppButton";
import { IApplicantDetailsProps } from "./ApplicantBrief";


export const ApplicantPeculiaritiesTab: React.FC<IApplicantDetailsProps> = ({
  onNext,
  onPrev,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { id } = useParams();

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateApplicationResponse(
    "sectionthreeresponse"
  );

  const handleTabSubmit = (responses: ICreateApplicationResponse['responses']) => {
    const applicationData: ICreateApplicationResponse = {
      application_id: id as unknown as number,
      responses: responses.map((response) => ({
        question_id: response.question_id,
        response: [form.getFieldValue(response.schema_name)],
        subsection_name: response.subsection_name,
      })),
          
    
    };
    console.log('responses', applicationData)
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

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
    subsectionName: string;
  }[] = [
    {
      children: (
        <ImmigrationAndCourtProceedings
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          subsectionName="immigrationCourtProcedings"
          form={form}
        />
      ),
      subsectionName: "immigrationCourtProcedings",
      label: "Immigration And Court Proceedings",
      key: "Immigration And Court Proceedings",
    },
    {
      children: (
        <CriminalHistory
          onPrev={() => setCurrentTab(currentTab - 1)}
          subsectionName="criminalHistory"
          form={form}
        />
      ),
      label: "Criminal History",
      key: "Criminal History",
      subsectionName: "criminalHistory",
    },
  ];

  const lastTab = currentTab === tabItems.length - 1;

  return (
    <>
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
    </>
  );
};
