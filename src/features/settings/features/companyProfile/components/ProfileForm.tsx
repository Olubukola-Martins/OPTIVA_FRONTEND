import { Input } from "antd";
import { Form } from "antd/lib";
import {
  emailValidationRules,
  generalValidationRules,
  phoneNumberValidationRules,
  urlValidationRules,
} from "src/utils/formHelpers/validations";

export const ProfileForm = () => {
  return (
    <>
      <Form layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
          <div>
            <Form.Item
              name="name"
              label="Company Name"
              rules={generalValidationRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Administrator Email"
              rules={emailValidationRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="secondEmail"
              label="Second Email"
              rules={[
                { type: "email" },
                { required: false },
                { whitespace: true },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="website"
              label="Website"
              rules={urlValidationRules}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="mainPhone"
              label="Phone Number"
              rules={phoneNumberValidationRules}
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              name="secondPhone"
              label="Secondary Phone Number"
              rules={phoneNumberValidationRules}
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              name="headOffice"
              label="Head Office"
              rules={[{ required: false }, { whitespace: true }]}
            >
              <Input.TextArea className="w-full" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};
