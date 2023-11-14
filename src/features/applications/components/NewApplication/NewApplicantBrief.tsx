import { Form, Input, InputNumber, Select, FormInstance } from "antd";

export const NewApplicantBrief = ({ form }: { form: FormInstance }) => {
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
    <>
      <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full">
        <div className="lg:w-1/2">
          <div>
            <h2>Why is the applicant applying for the program?</h2>
            <Form.Item name="applicantProgram" className="w-full" required>
              <Input.TextArea rows={5} />
            </Form.Item>
          </div>

          <div>
            <h2>Has the applicant started a CBI/RBI application previously?</h2>
            <Form.Item name="previousApplication" className="w-full" required>
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
          </div>

          <div>
            <h2>Which Country?</h2>
            <Form.Item name="whichCountry" className="w-full" required>
              <Input size="large" />
            </Form.Item>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div>
            <h2>
              Did the Applicant mention a budget amount that they are willing to
              spend?{" "}
            </h2>
            <Form.Item name="applicantBudget" className="w-full" required>
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
          </div>

          <div>
            <h2>How much is the Applicant willing to invest?</h2>
            <Form.Item name="applicantInvest" className="w-full" required>
              <InputNumber
                addonBefore={selectBefore}
                addonAfter={selectAfter}
                size="large"
                className="w-full"
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </>
  );
};
