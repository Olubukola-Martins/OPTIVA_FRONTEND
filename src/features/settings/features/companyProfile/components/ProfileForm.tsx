import { Input } from "antd";
import { Form } from "antd/lib";
import {
  emailValidationRules,
  generalValidationRules,
  phoneNumberValidationRules,
  urlValidationRules,
} from "src/utils/formHelpers/validations";
import { useUpdateCompanyProfile } from "../hooks/useUpdateCompanyProfile";
import { openNotification } from "src/utils/notification";
import { AppButton } from "src/components/button/AppButton";
import {
  QUERY_KEY_FOR_COMPANY_PROFILE,
  useGetCompanyInfo,
} from "../hooks/useGetCompanyInfo";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

export const ProfileForm = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading: loadUpdate } = useUpdateCompanyProfile();
  const { data, isLoading, isSuccess } = useGetCompanyInfo();

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        ...data,
      });
    } else {
      form.resetFields();
    }
  }, [form, data, isSuccess]);

  const handleSubmit = (data: any) => {
    mutate(
      { ...data },
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_COMPANY_PROFILE]);
        },
      }
    );
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={isLoading}
        requiredMark="optional"
      >
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
              name="secondary_email"
              label="Secondary Email"
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
              name="phone_number"
              label="Phone Number"
              rules={phoneNumberValidationRules}
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              name="secondary_phone_number"
              label="Secondary Phone Number"
              rules={phoneNumberValidationRules}
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              name="head_office"
              label="Head Office"
              rules={[{ required: false }, { whitespace: true }]}
            >
              <Input.TextArea className="w-full" />
            </Form.Item>

          <div className="flex justify-end">
          <AppButton type="submit" label="Save Changes" isLoading={loadUpdate} />
          </div>
          </div>
        </div>
      </Form>
    </>
  );
};
