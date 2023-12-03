import { Steps, Form,  } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { NewApplicantBrief } from "../components/NewApplication/NewApplicantBrief";
import { NewAboutTheApplicant } from "../components/NewApplication/NewAboutTheApplicant";
import { useState } from "react";
import { NewApplicantPeculiarites } from "../components/NewApplication/NewApplicantPeculiarities";
import { NewOthers } from "../components/NewApplication/NewOthers";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AppButton } from "src/components/button/AppButton";

const NewApplication = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const formValues = form.getFieldsValue();
    console.log("Form values:", formValues);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const steps = [
    <NewApplicantBrief />,
    <NewAboutTheApplicant form={form} />,
    <NewApplicantPeculiarites />,
    <NewOthers form={form} />,
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
        <Form form={form} onFinish={handleSubmit}>
          <Steps
            labelPlacement="vertical"
            className="py-6 h-auto "
            current={currentStep}
            onChange={setCurrentStep}
          >
            <Step description="Applicant Brief" />
            <Step description="About the Applicant" />
            <Step description="Applicant Peculiarities" />
            <Step description="Others" />
          </Steps>

          <div>{steps[currentStep]}</div>

          {/* Navigation and Submit buttons */}
          <div className="flex justify-end items-center gap-5">
            {currentStep > 0 && (
                <AppButton
                  type="button"
                  handleClick={handlePrev}
                  label=" Previous"
                  variant="transparent"
                />
            )}
            {currentStep < steps.length - 1 && (
                <AppButton
                  type="button"
                  handleClick={handleNext}
                  label="Next"
                />
            )}
            {currentStep === steps.length - 1 && (
                <AppButton type="submit" label="Submit" />
            
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewApplication;
