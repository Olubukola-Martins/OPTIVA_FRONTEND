import { Steps } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { ApplicantBrief } from "../features/ApplicantDetails/ApplicantBrief";
import { AboutTheApplicant } from "../features/ApplicantDetails/AboutTheApplicant";
import { useState } from "react";
import { ApplicantPeculiarites } from "../features/ApplicantDetails/ApplicantPeculiarites";
import { Others } from "../features/ApplicantDetails/Others";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AppButton } from "src/components/button/AppButton";

const ApplicantDetails = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };
  const steps = [
    <ApplicantBrief />,
    <AboutTheApplicant />,
    <ApplicantPeculiarites />,
    <Others />,
  ];
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  return (
    <>
      <PageIntro title="Applicant Details" linkBack={appRoute.applications} />

      {/* STEPPER */}
      <div className="border rounded-lg p-2 my-5 pb-5">
        <Steps
          labelPlacement="vertical"
          className="py-6 h-auto"
          current={currentStep}
          onChange={handleStepChange}
        >
          <Step description="Applicant Brief" />
          <Step description="About the Applicant" />
          <Step description="Applicant Perculiarities" />
          <Step description="Others" />
        </Steps>
      </div>
      <div className="border rounded-lg mx-auto p-5">{steps[currentStep]}</div>
      {/* Navigation buttons */}
      <div className="flex justify-end items-center gap-5 my-3">
        {currentStep > 0 && (
          <AppButton
            type="button"
            handleClick={handlePrev}
            label=" Previous"
            variant="transparent"
          />
        )}
        {currentStep < steps.length - 1 && (
          <AppButton type="button" handleClick={handleNext} label="Next" />
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default ApplicantDetails;
