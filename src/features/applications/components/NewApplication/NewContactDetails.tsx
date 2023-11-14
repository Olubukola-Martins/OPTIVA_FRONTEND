import { Input, DatePicker, Select, Form, InputNumber, Switch } from "antd";

export const NewContactDetails = () => {
  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="US" style={{ width: 100 }}>
      <Option value="US">US</Option>
      <Option value="NG">NG</Option>
    </Select>
  );
  const { RangePicker } = DatePicker;
  return (
    <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full">
      <div className="lg:w-1/2">
        <div>
          <h2 className="p-2">Mobile Phone Number</h2>
          <Form.Item name="mobilePhoneNumber" className="w-full" required>
            <InputNumber
              size="large"
              addonBefore={selectBefore}
              className="w-full"
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-2">Home Phone Number</h2>
          <Form.Item name="homePhoneNumber" className="w-full" required>
            <InputNumber
              size="large"
              addonBefore={selectBefore}
              className="w-full"
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-2">Email Address (1)</h2>
          <Form.Item name="emailAddress1" className="w-full" required>
            <Input size="large" className="w-full" />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-2">Email Address (2)</h2>
          <Form.Item name="emailAddress2" className="w-full" required>
            <Input size="large" className="w-full" />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-2">
            Physical Address - provide your addresses for the last ten years.
            List current address first
          </h2>
          <div className="newApplicantTextArea">
            <Form.Item name="aptFloorSuite" className="w-full" required>
              <Input size="large" placeholder="Apt/Floor/Suite " />
            </Form.Item>
            <Form.Item name="street" className="w-full" required>
              <Input size="large" placeholder="Street" />
            </Form.Item>
          </div>
          <div className="newApplicantTextArea">
            <Form.Item name="city" className="w-full" required>
              <Input size="large" placeholder="City" />
            </Form.Item>
            <Form.Item name="state" className="w-full" required>
              <Input size="large" placeholder="State" />
            </Form.Item>
          </div>
          <div className="newApplicantTextArea">
            <Form.Item name="country" className="w-full" required>
              <Input size="large" placeholder="Country" />
            </Form.Item>
            <Form.Item name="zipCode" className="w-full" required>
              <Input size="large" placeholder="Zip Code" />
            </Form.Item>
          </div>
          <div className="newApplicantTextArea">
            <Form.Item name="date" className="w-full" required>
              <RangePicker className="w-full" size="large" />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2">
        <div>
          <h2 className="p-2">Previous Address</h2>
          <div className="newApplicantTextArea">
            <Form.Item name="aptFloorSuite2" className="w-full" required>
              <Input size="large" placeholder="Apt/Floor/Suite " />
            </Form.Item>
            <Form.Item name="street2" className="w-full" required>
              <Input size="large" placeholder="Street" />
            </Form.Item>
          </div>
          <div className="newApplicantTextArea">
            <Form.Item name="city2" className="w-full" required>
              <Input size="large" placeholder="City" />
            </Form.Item>
            <Form.Item name="state2" className="w-full" required>
              <Input size="large" placeholder="State" />
            </Form.Item>
          </div>
          <div className="newApplicantTextArea">
            <Form.Item name="country2" className="w-full" required>
              <Input size="large" placeholder="Country" />
            </Form.Item>
            <Form.Item name="zipCode2" className="w-full" required>
              <Input size="large" placeholder="Zip Code" />
            </Form.Item>
          </div>
          <div className="newApplicantTextArea">
            <Form.Item name="date2" className="w-full" required>
              <RangePicker className="w-full" size="large" />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="p-2">Previous Address</h2>
          <div className="newApplicantTextArea">
            <Form.Item name="aptFloorSuite3" className="w-full">
              <Input size="large" placeholder="Apt/Floor/Suite " />
            </Form.Item>
            <Form.Item name="street3" className="w-full">
              <Input size="large" placeholder="Street" />
            </Form.Item>
          </div>
          <div className="newApplicantTextArea">
            <Form.Item name="city3" className="w-full">
              <Input size="large" placeholder="City" />
            </Form.Item>
            <Form.Item name="state3" className="w-full">
              <Input size="large" placeholder="State" />
            </Form.Item>
          </div>
          <div className="newApplicantTextArea">
            <Form.Item name="country3" className="w-full">
              <Input size="large" placeholder="Country" />
            </Form.Item>
            <Form.Item name="zipCode3" className="w-full">
              <Input size="large" placeholder="Zip Code" />
            </Form.Item>
          </div>
          <div className="newApplicantTextArea">
            <Form.Item name="date3" className="w-full">
              <RangePicker className="w-full" size="large" />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className=" text-lg"> Mailing Address</h2>
          <div className="flex justify-between">
            <p>
              Select if applicant's mailing address is different from physical
              address
            </p>
            <Form.Item name="mailingAddress" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  );
};
