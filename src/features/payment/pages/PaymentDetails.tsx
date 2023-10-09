import { Form, Input, InputNumber, Select } from "antd";
import React from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { DashboardLayout } from "src/components/layout/Layout";
import { appRoute } from "src/config/routeMgt/routePaths";

const PaymentDetails = () => {
  // ///// prefix example in case i use
  // const { Option } = Select;
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="86">+86</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );

  return (
    <DashboardLayout>
      <PageIntro title="Update Payment Details" linkBack={appRoute.payments} />

      <div className="border-2 rounded-xl border-gray-100 p-12 w-11/12">
        <Form
          layout="vertical"
          name="updatePaymentDetails"
          className="flex flex-col"
        >
          <div className="flex flex-row gap-10 w-full">
            <Form.Item
              label="Applicant ID"
              name="applicantID"
              className="w-full"
            >
              <Input placeholder="e.g 230000-01" allowClear className="p-2.5" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              className="w-full"
            >
              {/* addonBefore={prefixSelector} */}
              <Input
                placeholder="+1 (000) 000-0000"
                allowClear
                className="p-2.5"
              />
            </Form.Item>
          </div>

          <div className="flex flex-row gap-10 w-full">
            <Form.Item
              label="Applicant Name"
              name="applicantName"
              className="w-full"
            >
              <Input placeholder="Ruth Godwin" allowClear className="p-2.5" />
            </Form.Item>
            <Form.Item label="Email" name="email" className="w-full">
              <Input
                placeholder="ruthgodwin@gmail.com"
                allowClear
                className="p-2.5"
              />
            </Form.Item>
          </div>

          <div className="flex flex-row gap-10 w-full">
            <Form.Item
              label="Number of Dependent(s)"
              name="noDependents"
              className="w-full"
            >
              <InputNumber placeholder="4" className="p-1.5 w-full" />
            </Form.Item>
            <Form.Item label="Country" name="country" className="w-full">
              <Input placeholder="Grenada" allowClear className="p-2.5" />
            </Form.Item>
          </div>

          <div className="flex flex-row gap-10 w-full ">
            <Form.Item
              label="Applicant Address"
              name="applicantAddress"
              className="w-full"
            >
              <Input.Group className="gap-x-4 grid grid-cols-2 ">
                <Form.Item
                  name="street"
                  rules={[{ required: true, message: "street is required" }]}
                >
                  <Input placeholder="Street" allowClear className="p-2.5" />
                </Form.Item>
                <Form.Item
                  name="floorSuite"
                  rules={[
                    { required: true, message: "Apt/Floor/Suite is required" },
                  ]}
                >
                  <Input
                    placeholder="Apt/Floor/Suite"
                    allowClear
                    className="p-2.5"
                  />
                </Form.Item>
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: "City is required" }]}
                >
                  <Input placeholder="City" allowClear className="p-2.5" />
                </Form.Item>
                <Form.Item
                  name="state"
                  rules={[{ required: true, message: "State is required" }]}
                >
                  <Input placeholder="State" allowClear className="p-2.5" />
                </Form.Item>
                <Form.Item
                  name="country"
                  rules={[{ required: true, message: "Country is required" }]}
                >
                  <Input placeholder="Country" allowClear className="p-2.5" />
                </Form.Item>
                <Form.Item
                  name="zipCode"
                  rules={[
                    { required: true, message: "Zip/postal code is required" },
                  ]}
                >
                  <Input
                    placeholder="Zip/postal code"
                    allowClear
                    className="p-2.5"
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <div className="w-full">
              <Form.Item label="Program Name" name="programName">
                <Input
                  placeholder="Citizenship By Investment"
                  allowClear
                  className="p-2.5"
                />
              </Form.Item>

              <Form.Item label="Investment Route" name="investmentRoute">
                <Input
                  placeholder="Real Estate Investment"
                  allowClear
                  className="p-2.5"
                />
              </Form.Item>
            </div>
          </div>

          <div className="place-self-end pt-6 flex flex-row gap-7">
            <AppButton
              variant="transparent"
              label="Cancel"
              type="button"
              containerStyle="px-4 py-3.5 text-base"
            />
            <AppButton
              label="Save"
              type="button"
              containerStyle="px-4 py-3.5 text-base"
            />
          </div>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default PaymentDetails;
