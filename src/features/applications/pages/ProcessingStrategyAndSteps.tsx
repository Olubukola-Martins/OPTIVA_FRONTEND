import { Form, Input } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";

const ProcessingStrategyAndSteps = () => {
  return (
    <>
      <PageIntro
        title="Processing Strategy & Steps"
        description="Please fill in the following information"
      />
      <Form layout="vertical" className="border rounded-lg  p-5 my-5">
        <Form.Item
          label="Fill out this section after deliberations with Mr. Franklin Nechi
              & Ms. Chinonye Eke. Given all the information above, what is the
              strategy for a successful application for this Applicant?"
          name=""
          className="p-3 my-4"
        >
          <Input.TextArea rows={10} className="my-4" />
        </Form.Item>
        <div className="w-full flex justify-end py-3 gap-4">
          <AppButton label="Cancel" variant="transparent" type="reset" />
          <AppButton label="Next" />
        </div>
      </Form>
    </>
  );
};

export default ProcessingStrategyAndSteps;
