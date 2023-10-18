import { Form, Input, InputNumber, Select } from "antd";

export const NewApplicantBrief = () => {
  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="$" style={{ width: 100 }}>
      <Option value="$">$</Option>
      <Option value="€">€</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue="USD" style={{ width: 100 }}>
      <Option value="USD">USD</Option>
      <Option value="EUR">EUR</Option>
    </Select>
  );

  return (
    <div>
      <Form
        layout="vertical"
        className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full"
      >
        <div className="w-1/2">
          <Form.Item
            label="Why is the applicant applying for the program?"
            name="applicantProgram"
            className="w-full"
            required
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Has the applicant started a CBI/RBI application
            previously?"
            name="previousApplication"
            className="w-full"
            required
          >
            <Select
              size="large"
              options={[
                {
                  value: "Yes",
                  label: "Yes",
                },
                {
                  value: "No",
                  label: "No",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Which Country?"
            name="whichCountry"
            className="w-full"
            required
          >
            <Input size="large" />
          </Form.Item>
        </div>
        <div className="w-1/2">
          <Form.Item
            label="Did the Applicant mention a budget amount that 
            they are willing to spend? "
            name="applicantBudget"
            className="w-full"
            required
          >
            <Select
              size="large"
              options={[
                {
                  value: "Yes",
                  label: "Yes",
                },
                {
                  value: "No",
                  label: "No",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="How much is the Applicant willing to invest?"
            name="applicantInvest"
            className="w-full"
            required
          >
            <InputNumber
              addonBefore={selectBefore}
              addonAfter={selectAfter}
              size="large"
              className="w-full"
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
