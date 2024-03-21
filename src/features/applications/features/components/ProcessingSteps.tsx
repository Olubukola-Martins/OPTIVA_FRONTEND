import { Form, Input } from "antd";

export const ProcessingSteps = () => {
  return (
    <>
      <h2 className="p-1">
        Fill out this section after deliberations with the applicant. Please
        list the steps to be taken to employ the strategy above
      </h2>
      <Form.Item name="processingSteps" className="p-3 my-4">
        <Input.TextArea rows={10} className="my-4" />
      </Form.Item>
    </>
  );
};
