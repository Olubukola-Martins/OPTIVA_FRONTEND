import { Steps } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { NewApplicantBrief } from "../components/NewApplication/NewApplicantBrief";
import { NewAboutTheApplicant } from "../components/NewApplication/NewAboutTheApplicant";
import { useState } from "react";
// import { ApplicantPeculiarites } from "../components/ApplicantPeculiarites";
// import { Others } from "../components/Others";
import { appRoute } from "src/config/routeMgt/routePaths";

const NewApplication = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };
  const steps = [
    <NewApplicantBrief />,
    <NewAboutTheApplicant />,
    // <ApplicantPeculiarites />,
    // <Others />,
  ];
  return (
    <>
      <PageIntro
        title="New Application"
        description="Please fill in the following information"
        linkBack={appRoute.applications}
      />

      {/* STEPPER */}
      <div className="border rounded-lg mx-auto p-5">
        <Steps
          labelPlacement="vertical"
          className="py-6 h-auto "
          current={currentStep}
          onChange={handleStepChange}
        >
          <Step description="Applicant Brief" />
          <Step description="About the Applicant" />
          <Step description="Applicant Perculiarities" />
          <Step description="Others" />
        </Steps>
      </div>
      <div className="border rounded-lg my-3 p-8">
        <div>{steps[currentStep]}</div>
      </div>
    </>
  );
};

export default NewApplication;
