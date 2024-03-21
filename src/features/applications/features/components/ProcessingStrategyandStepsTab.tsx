import { Form, Tabs } from "antd";
import { ProcessingSteps } from "./ProcessingSteps";
import { ProcessingStrategy } from "./ProcessingStrategy";
import { useEffect, useState } from "react";
import { useCreateProcessingStrategy } from "../../hooks/Application hooks/useCreateProcessingStrategy";
import { useParams } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import {
  QUERY_KEY_FOR_PROCESSING_STRATEGY_AND_STEPS,
  useGetProcessingStrategy,
} from "../../hooks/Application hooks/useGetProcessingStrategy";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";

export const ProcessingStrategyandStepsTab = () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateProcessingStrategy();
  const queryClient = useQueryClient();

  const { data, } = useGetProcessingStrategy(id as unknown as number);
  console.log(data, 'straget')
  const handleSubmit = (val: any) => {
    mutate(
      {
        application_id: id as unknown as number,
        steps: val.processingSteps,
        strategy: val.processingStrategy,
      },
      {
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
          queryClient.invalidateQueries([
            QUERY_KEY_FOR_PROCESSING_STRATEGY_AND_STEPS,
          ]);
          form.resetFields();
          if (currentTab < tabItems.length - 1) {
            setCurrentTab(currentTab + 1);
          }
        },
      }
    );
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        processingStrategy: data.strategy, 
        processingSteps: data.steps, 
      });
    }
  }, [data, form]);

  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
  }[] = [
    {
      label: "Processing Strategy",
      key: "Processing Strategy",
      children: <ProcessingStrategy />,
    },
    {
      label: "Processing Steps",
      key: "Processing Steps",
      children: <ProcessingSteps />,
    },
  ];

  const isSaveButtonVisible = currentTab === 1;
  const isNextButtonVisible = currentTab === 0;
  return (
    <>
      <Form onFinish={handleSubmit} form={form}>
        <Tabs
          activeKey={currentTab.toString()}
          onChange={(key) => setCurrentTab(Number(key))}
        >
          {tabItems.map((tab, index) => (
            <Tabs.TabPane tab={tab.label} key={index.toString()}>
              {tab.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
        <div className="flex justify-end items-center gap-5">
          <AppButton label="Cancel" type="reset" variant="transparent" />
          {isNextButtonVisible && (
            <AppButton
              label="Next"
              type="button"
              handleClick={() => setCurrentTab((prevTab) => prevTab + 1)}
            />
          )}
          {isSaveButtonVisible && (
            <AppButton label="Save" type="submit" isLoading={isLoading} />
          )}
        </div>
      </Form>
    </>
  );
};
