import { Steps } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { ApplicantBrief } from "../components/ApplicantBrief";
import { AboutTheApplicant } from "../components/AboutTheApplicant";
import { useState } from "react";
import { ApplicantPeculiarites } from "../components/ApplicantPeculiarites";
import { Others } from "../components/Others";
import { appRoute } from "src/config/routeMgt/routePaths";

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
  return (
    <div className="Container">
      <div className="flex flex-col md:flex-row items-center justify-between p-2">
        <PageIntro title="Applicant Details" linkBack={appRoute.applications} />
        <p>
          Application Count down:
          <span className="text-[#28A745] text-lg"> 81 days</span>
        </p>
      </div>

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
    </div>
  );
};

export default ApplicantDetails;
