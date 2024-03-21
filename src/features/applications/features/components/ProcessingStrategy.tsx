import { Form, Input } from "antd";

export const ProcessingStrategy = () => {
  return (
    <>
      <h2 className="p-1">
        Fill out this section after deliberations with the applicant. Given all the information above, what is the strategy for
        a successful application for this Applicant?
      </h2>
      <Form.Item name="processingStrategy" className="p-3 my-4">
        <Input.TextArea rows={10} className="my-4" />
      </Form.Item>
    </>
  );
};
