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
import { useGetSingleBranch } from "../hooks/useGetSingleBranch";
import { useEffect } from "react";

export const AddBranch = ({ handleClose, open, id }: IdentifierProps) => {
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useCreateBranch();
  const { data, isSuccess } = useGetSingleBranch({
    token,
    id: id as unknown as number,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess && id) {
      form.setFieldsValue({
        ...data,
      });
    } else {
      form.resetFields();
    }
  }, [form, id, data, isSuccess]);

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
      title={`${id ? "Edit" : "New"} Branch`}
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

        <AppButton
          type="submit"
          label={id ? "Save branch" : "Submit"}
          isLoading={isLoading}
        />
      </Form>
    </Modal>
  );
};
