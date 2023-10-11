import { Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AppButton } from "src/components/button/AppButton";

const ApplicantBrief = () => {
  return (
    <>
      <div className="flex justify-center gap-10 p-4">
        <div className="w-1/2">
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
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Has the applicant started a CBI/RBI application
      previously? "
            name="previousApplication"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="w-1/2">
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
            <TextArea rows={3} />
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-end">
        <AppButton label="Next" type="button" />
      </div>
    </>
  );
};

export default ApplicantBrief;
