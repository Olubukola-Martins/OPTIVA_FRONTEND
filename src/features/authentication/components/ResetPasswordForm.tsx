import { Form, Input } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { passwordValidationRules } from "src/utils/formHelpers/validations";
import { useResetPassword } from "../hooks/useResetPassword";
import { openNotification } from "src/utils/notification";
import { useLogin } from "../hooks/useLogin";
import { useSignIn } from "react-auth-kit";

export const ResetPasswordForm = () => {
  const { isLoading, mutate } = useResetPassword();
  const { mutate: loginMutate } = useLogin();
  const signIn = useSignIn();
  let [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const handleSubmit = (data: any) => {
    mutate(
      {
        token,
        email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.response.data.message,
            duration: 8.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            title: "Success",
            state: "success",
            description: res.data.message,
            duration: 6.0,
          });
          loginMutate(
            {
              email,
              password: data.password,
            },
            {
              onError: (err: any) => {
                openNotification({
                  title: "Error",
                  state: "error",
                  description: err.response.data.message,
                  duration: 8.0,
                });
              },
              onSuccess: (res: any) => {
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
        },
      }
    );
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="email" label="Email" initialValue={email}>
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
        isLoading={isLoading}
      />
    </Form>
  );
};
