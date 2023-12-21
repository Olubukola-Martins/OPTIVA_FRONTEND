import { Form, Input, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { generalValidationRules } from "src/utils/formHelpers/validations";
import { QUERY_KEY_FOR_DEPARTMENT } from "../hooks/useFetchDepartment";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { useCreateAndUpdateDepart } from "../hooks/useCreateAndUpdateDepart";
import { useGetSingleDepartment } from "../hooks/useGetSingleDepartment";
import { useEffect } from "react";
import { FormBranchInput } from "../../branch/components/FormBranchInput";
import { FormEmployeeInput } from "../../employees/components/FormEmployeeInput";

export const NewDepartment = ({ handleClose, open, id }: IdentifierProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateAndUpdateDepart();
  const [form] = Form.useForm();
  const { data, isSuccess } = useGetSingleDepartment({ id: id as number });
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
      title={`${id ? "Edit" : "New"} Department`}
      style={{ top: 15 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark="optional"
      >
        <Form.Item name={"name"} label="Name" rules={generalValidationRules}>
          <Input />
        </Form.Item>

        <FormBranchInput
          Form={Form}
          // handleSelect={(_, b) =>
          //   console.log({
          //     name: b?.name,
          //     id: b?.id,
          //   })
          // }
        />
        <FormEmployeeInput Form={Form} optional={true}/>

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
