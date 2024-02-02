import { Steps } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { NewApplicantBrief } from "../features/NewApplication/NewApplicantBrief";
import { NewAboutTheApplicant } from "../features/NewApplication/NewAboutTheApplicant";
import { useState } from "react";
import { NewApplicantPeculiarites } from "../features/NewApplication/NewApplicantPeculiarities";
import { NewOthers } from "../features/NewApplication/NewOthers";
import { appRoute } from "src/config/routeMgt/routePaths";

const NewApplication = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState<number>(0);
  // const [isPostRequestSuccess, setIsPostRequestSuccess] =
  //   useState<boolean>(false);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    // setIsPostRequestSuccess(false)
  };

  // const handlePrev = () => {
  //   setCurrentStep((prevStep) => prevStep - 1);
  //   // setIsPostRequestSuccess(false);
  // };
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    // setIsPostRequestSuccess(false);
  };
  const steps = [
    <NewApplicantBrief onNext={handleNext} />,
    <NewAboutTheApplicant onNext={handleNext} />,
    <NewApplicantPeculiarites onNext={handleNext} />,
    // <NewOthers onPrev={handlePrev} />
    <NewOthers />,
  ];

  return (
    <>
      <PageIntro
        title="New Application"
        description="Please fill in the following information"
        linkBack={appRoute.applications}
      />

      {/* STEPPER */}
      <div className="border rounded-lg mx-auto p-5 w-full">
        <Steps
          labelPlacement="vertical"
          className="py-6 h-auto "
          current={currentStep}
          onChange={handleStepChange}
        >
          <Step description="Applicant Brief" />
          <Step description="About the Applicant" />
          <Step description="Applicant Peculiarities" />
          <Step description="Others" />
        </Steps>
        <div>{steps[currentStep]}</div>
        {/* Navigation buttons */}
        {/* <div className="flex justify-end items-center gap-5 my-3">
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
      </div> */}
        {/* <div className="flex justify-end items-center gap-5">
          {currentStep > 0 && (
            <AppButton
              type="button"
              handleClick={handlePrev}
              label=" Previous"
              variant="transparent"
            />
          )}
          {isPostRequestSuccess && currentStep < steps.length - 1 && (
            <AppButton type="button" handleClick={handleNext} label="Next" />
          )}
        </div> */}
      </div>
    </>
  );
};

export default NewApplication;
