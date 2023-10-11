import { Form, Input, Steps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { DashboardLayout } from "src/components/layout/Layout";
import ApplicantBrief from "./ApplicantBrief";
import AboutTheApplicant from "./AboutTheApplicant";

const ApplicantDetails = () => {
  const { TextArea } = Input;
  const { Step } = Steps;
  const [form] = Form.useForm();
  const [stepperCurrentState, setStepperCurrentState] = useState<number>(0);
  const navigate = useNavigate();

  // handling Form onFinish
  const onFinish = (values: any) => {
    console.log(values);
    navigate("");
  };

  const updateCount = (newState: number) => {
    setStepperCurrentState(newState);
  };
  return (
    <DashboardLayout>
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
            current={stepperCurrentState}
            labelPlacement="vertical"
            className="py-6 h-auto "
          >
            <Step description="Applicant Brief" />
            <Step description="About the Applicant" />
            <Step description="Applicant Perculiarities" />
            <Step description="Others" />
          </Steps>
        </div>

        {/* FORM */}
        <div className="border rounded-lg my-3 p-8">
          <div>
            {/* <ApplicantBrief /> */}
            <AboutTheApplicant />
          </div>
        </div>

        {/* <Form
          name="applicantDetails"
          layout="vertical"
          // className="w-11/12 bg-mainBg mx-auto md-px-3 py-8 px-6 max-sm:py-6 max-sm:px-4 rounded-lg flex flex-col gap-6"
        >
          <div className="flex items-center justify-around gap-4">
            <div>
              <Form.Item
                label="Which country passport/residency is applicant applying for?"
                name="applicantPassport"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Which program is the applicant interested in?"
                name="applicantProgram"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Which investment route is the applicant interested in?"
                name="applicantInvestment"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Why is the applicant applying for the program above?"
                name="applicantProgramApply"
              >
                <TextArea />
              </Form.Item>
              <Form.Item
                label="Has the applicant started a CBI/RBI application
            previously? "
                name="previousApplication"
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item label="Which Country?" name="applicantCountry">
                <Input />
              </Form.Item>
              <Form.Item
                label="Did the Applicant mention a budget amount that they are willing to spend?"
                name="applicantBudget"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="How much is the Applicant willing to invest?"
                name="applicantInvest"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Please enter below any other information gleaned from discussion with the Applicant"
                name="applicantDiscussion"
              >
                <TextArea />
              </Form.Item>
            </div>
          </div>
          <AppButton label="Next" type="button" />
        </Form> */}

        {/* <section
          id="addJobOpeningSection"
          className="w-full max-sm:w-full bg-card pt-7 pb-16 mx-auto lg-ml-auto lg-mr-1 "
        >
          <Form
            name="applicantDetails"
            layout="vertical"
            form={form}
            className="w-11/12 bg-mainBg mx-auto md-px-3 py-8 px-6 max-sm:py-6 max-sm:px-4 rounded-lg flex flex-col gap-6"
            onFinish={onFinish}
          >
            {stepperCurrentState === 0 ? (
              <>
                <JobDetails
                  stepperCurrentState={stepperCurrentState}
                  updateCount={updateCount}
                  form={form}
                />
                <div
                  style={{
                    display: "none",
                  }}
                >
                  <ApplicationQuestions
                    stepperCurrentState={stepperCurrentState}
                    updateCount={updateCount}
                  />
                </div>
                <div
                  style={{
                    display: "none",
                  }}
                >
                  <AdditionalQuestions
                    stepperCurrentState={stepperCurrentState}
                    updateCount={updateCount}
                  />
                </div>
              </>
            ) : stepperCurrentState === 1 ? (
              <>
                <div
                  style={{
                    display: "none",
                  }}
                >
                  <JobDetails
                    stepperCurrentState={stepperCurrentState}
                    updateCount={updateCount}
                    form={form}
                  />
                </div>

                <ApplicationQuestions
                  stepperCurrentState={stepperCurrentState}
                  updateCount={updateCount}
                />

                <div
                  style={{
                    display: "none",
                  }}
                >
                  <AdditionalQuestions
                    stepperCurrentState={stepperCurrentState}
                    updateCount={updateCount}
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "none",
                  }}
                >
                  <JobDetails
                    stepperCurrentState={stepperCurrentState}
                    updateCount={updateCount}
                    form={form}
                  />
                </div>
                <div
                  style={{
                    display: "none",
                  }}
                >
                  <ApplicationQuestions
                    stepperCurrentState={stepperCurrentState}
                    updateCount={updateCount}
                  />
                </div>
                <AdditionalQuestions
                  stepperCurrentState={stepperCurrentState}
                  updateCount={updateCount}
                />
              </>
            )}
          </Form>
        </section> */}
      </div>
    </DashboardLayout>
  );
};

export default ApplicantDetails;
