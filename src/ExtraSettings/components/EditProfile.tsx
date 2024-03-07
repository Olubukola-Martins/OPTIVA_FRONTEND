import { Form, Input, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { generalValidationRules, phoneNumberValidationRules } from "src/utils/formHelpers/validations";
import { openNotification } from "src/utils/notification";
import { useEditProfile } from "../hooks/useEditProfile";
import {
  QUERY_KEY_FOR_USER_PROFILE,
  useFetchUserProfile,
} from "../hooks/useFetchUserProfile";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

export const EditProfile = ({ handleClose, open }: IdentifierProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useEditProfile();
  const { data, isSuccess } = useFetchUserProfile();
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
          form.resetFields();
          queryClient.invalidateQueries([QUERY_KEY_FOR_USER_PROFILE]);
          handleClose()
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Edit Profile"
      style={{ top: 15 }}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="name" label="Full Name" rules={generalValidationRules}>
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={phoneNumberValidationRules}
        >
          <Input className="w-full" type="tel"/>
        </Form.Item>

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
