import { Input, Form  } from 'antd'
import { AppButton } from 'src/components/button/AppButton'
import { emailValidationRules, textInputValidationRules } from 'src/utils/formHelpers/validations'

export const LoginForm = () => {
  return (
    <Form layout="vertical">
    <Form.Item name="email" label="Email" rules={emailValidationRules}>
      <Input />
    </Form.Item>
    <Form.Item
      name="password"
      label="Password"
      rules={textInputValidationRules}
    >
      <Input.Password />
    </Form.Item>
    <span className="text-sm flex justify-end -mt-3 text-green-700 font-medium cursor-pointer hover:text-primary">
      Forgot Password?
    </span>

    <AppButton
      type="submit"
      label="Sign in"
      containerStyle="w-full mt-5"
    />
  </Form>
  )
}
