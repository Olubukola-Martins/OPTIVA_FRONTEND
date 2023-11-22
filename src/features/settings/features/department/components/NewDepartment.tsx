import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import {
  generalValidationRules,
  textInputValidationRulesOpt,
} from "src/utils/formHelpers/validations";
import { QUERY_KEY_FOR_DEPARTMENT } from "../hooks/useFetchDepartment";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { useCreateAndUpdateDepart } from "../hooks/useCreateAndUpdateDepart";

export const NewDepartment = ({ handleClose, open, id }: IdentifierProps) => {
  const queryClient = useQueryClient();
  const {mutate, isLoading} = useCreateAndUpdateDepart()
    const [form] = Form.useForm()
  const handleSubmit = (data: any) => {
    mutate(
      { ...data, id },
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_DEPARTMENT]);
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
      <Form layout="vertical" requiredMark="optional" onFinish={handleSubmit}>
        <Form.Item name={"name"} label="Name" rules={generalValidationRules}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"departmentID"}
          label="Department ID"
          rules={textInputValidationRulesOpt}
        >
          <Input />
        </Form.Item>
        <Form.Item name="branch" label="Branch">
          <Select options={[{ value: 1, label: "Lagos" }]} />
        </Form.Item>
        <Form.Item name="head" label="Department head">
          <Select options={[{ value: 1, label: "Basil Ikpe" }]} />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Description"
          rules={textInputValidationRulesOpt}
        >
          <Input />
        </Form.Item>
        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
