import { Steps } from "antd";
import { PageIntro } from "src/components/PageIntro";
import ApplicantBrief from "./ApplicantBrief";
import AboutTheApplicant from "./AboutTheApplicant";
import { useState } from "react";

const ApplicantDetails = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };
  const steps = [<ApplicantBrief />, <AboutTheApplicant />];
  return (
      <div className="Container">
        <div className="flex items-center justify-between">
          <PageIntro title="Applicant Details" />
          <p>
            Application Count down:
            <span className="text-[#28A745] text-lg"> 81 days</span>
          </p>
        </div>

        <div>
          {/* STEPPER */}
          <div
            className="w-full h-36 mx-auto my-6 rounded-2xl shadow shadow-[rgba(0, 0, 0, 0.08)] add-job-opening-step"
            id="add-job-opening"
          >
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
            <div>
              {steps[currentStep]}
              {/* <ApplicantBrief /> */}
              {/* <AboutTheApplicant /> */}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ApplicantDetails;
