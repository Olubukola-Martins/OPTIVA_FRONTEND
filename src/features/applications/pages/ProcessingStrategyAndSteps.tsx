import { Form } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ProcessingStrategyandStepsTab } from "../components/ProcessingStrategyandStepsTab";

const ProcessingStrategyAndSteps = () => {
  const [form] = Form.useForm();
  const handleSubmit = () => {};
  return (
    <>
      <PageIntro
        title="Processing Strategy & Steps"
        description="Please fill in the following information"
        linkBack={appRoute.applications}
      />
      <Form
        className="border rounded-lg  p-5 my-5"
        onFinish={handleSubmit}
        form={form}
      >
        <ProcessingStrategyandStepsTab />
        <div className="w-full flex justify-end py-3 gap-4">
          <AppButton label="Cancel" variant="transparent" type="reset" />
          <AppButton label="Submit" type="submit" />
        </div>
      </Form>
    </>
  );
};

export default ProcessingStrategyAndSteps;
