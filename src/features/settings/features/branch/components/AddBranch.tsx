import { Form, Input, Modal } from "antd";
import { IdentifierProps } from "src/types";
import { useCreateBranch } from "../hooks/useCreateBranch";
import { openNotification } from "src/utils/notification";
import {
  emailValidationRules,
  generalValidationRules,
} from "src/utils/formHelpers/validations";
import { AppButton } from "src/components/button/AppButton";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_BRANCHES } from "../hooks/useFetchBranches";

export const AddBranch = ({ handleClose, open }: IdentifierProps) => {
    const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateBranch();
  const { token } = useGetUserInfo();
  const [form] = Form.useForm();
  const handleSubmit = (data: any) => {
    mutate(
      { ...data, token },
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
        queryClient.invalidateQueries([QUERY_KEY_FOR_BRANCHES]);
          handleClose();
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="New Department"
      style={{ top: 15 }}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="name" label="Name" rules={generalValidationRules}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={emailValidationRules}>
          <Input />
        </Form.Item>
        <Form.Item
          name="address_details"
          label="Address"
          rules={generalValidationRules}
        >
          <Input.TextArea />
        </Form.Item>

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
