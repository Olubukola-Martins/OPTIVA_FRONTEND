import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { passwordValidationRules } from "src/utils/formHelpers/validations";


export const EmployeeAccountForm = () => {

const handleSubmit = (value: any) => {
  
}

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
    <Form.Item name="email" label="Email" initialValue={''}>
      <Input disabled />
    </Form.Item>
    <Form.Item
      name="password"
      label="New Password"
      rules={passwordValidationRules}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      name="password_confirmation"
      label="Confirm New Password"
      dependencies={["password"]}
      rules={[
        {
          required: true,
          message: "Field is required",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              "The two passwords that you entered does not match."
            );
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Link
      to={appRoute.forgot_password}
      className="text-sm flex justify-end -mt-3 text-green-700 font-medium cursor-pointer hover:text-primary"
    >
      Back to forgot password?
    </Link>
    <AppButton
      type="submit"
      label="Submit"
      containerStyle="w-full mt-5"
      isLoading={false}
    />
  </Form>
  )
}
