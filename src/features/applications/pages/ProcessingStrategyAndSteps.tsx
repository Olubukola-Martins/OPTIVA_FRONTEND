import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ProcessingStrategyandStepsTab } from "../features/Components/ProcessingStrategyandStepsTab";

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
    </>
  );
};

export default ProcessingStrategyAndSteps;
