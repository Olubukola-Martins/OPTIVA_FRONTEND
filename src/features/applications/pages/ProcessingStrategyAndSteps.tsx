import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ProcessingStrategyandStepsTab } from "../components/ProcessingStrategyandStepsTab";

const ProcessingStrategyAndSteps = () => {
 
  return (
    <>
      <PageIntro
        title="Processing Strategy & Steps"
        description="Please fill in the following information"
        linkBack={appRoute.applications}
      />
      <div className="border rounded-lg  p-5 my-5">
      <ProcessingStrategyandStepsTab />
      </div>
             
      {/* <Form
        className="border rounded-lg  p-5 my-5"
        onFinish={handleSubmit}
        form={form}
      >

        <div className="w-full flex justify-end py-3 gap-4">
          <AppButton label="Cancel" variant="transparent" type="reset" />
          <AppButton label="Submit" type="submit" />
        </div>
      </Form> */}
    </>
  );
};

export default ProcessingStrategyAndSteps;
