import { Form, Input } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { DashboardLayout } from "src/components/layout/Layout";

const ApplicantDetails = () => {
  const { TextArea } = Input;
  return (
    <DashboardLayout>
      <PageIntro title="Applicant Details" />
      <div
      // className=" w-full max-sm:w-full bg-card pt-7 pb-16 mx-auto lg-ml-auto lg-mr-1"
      >
        <Form
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
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default ApplicantDetails;
