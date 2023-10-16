import { Input, Form } from "antd";
import { AppButton } from "src/components/button/AppButton";
import {
  emailValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import { useLogin } from "../hooks/useLogin";
import { openNotification } from "src/utils/notification";
import { useSignIn } from "react-auth-kit";

export const LoginForm = () => {
  const signIn = useSignIn();
  const { mutate, isLoading } = useLogin();

  const handleSubmit = (values: any) => {
    mutate(
      { ...values },
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.response.data.msg,
            duration: 8.0,
          });
        },
        onSuccess: (res: any) => {
          console.log(res);
          
          const result = res.data.data;
          if (
            signIn({
              token: result.token,
              tokenType: "Bearer",
              authState: result,
              expiresIn: 180,
            })
          ) {
            openNotification({
              title: "Success",
              state: "success",
              description: "Logged in successfully",
              duration: 4.5,
            });
          }
        },
      }
    );
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
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
        isLoading={isLoading}
      />
    </Form>
  );
};
