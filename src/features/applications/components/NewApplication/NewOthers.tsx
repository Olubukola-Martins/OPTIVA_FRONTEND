import { Form, Input } from "antd";

export const NewOthers = () => {
  return (
    <>
      <h2 className="p-1">
        Please enter below any other information gleaned from discusion with the
        Applicant
      </h2>
      <Form.Item name="otherInformation">
        <Input.TextArea rows={10} />
      </Form.Item>
    </>
  );
};
