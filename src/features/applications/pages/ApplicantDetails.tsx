import { Steps } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { ApplicantBrief } from "../features/ApplicantDetails/ApplicantBrief";
import { AboutTheApplicant } from "../features/ApplicantDetails/AboutTheApplicant";
import { useState } from "react";
import { ApplicantPeculiarites } from "../features/ApplicantDetails/ApplicantPeculiarites";
import { Others } from "../features/ApplicantDetails/Others";
import { appRoute } from "src/config/routeMgt/routePaths";

const ApplicantDetails = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const steps = [
    <ApplicantBrief onNext={ handleNext} />,
    <AboutTheApplicant onNext={handleNext} onPrev={ handlePrev} />,
    <ApplicantPeculiarites onNext={handleNext} onPrev={ handlePrev}/>,
    <Others onPrev={ handlePrev}/>,
  ];

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
      
    </>
  );
};

export default ApplicantDetails;
