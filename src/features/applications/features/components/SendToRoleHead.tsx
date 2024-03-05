import React from "react";
import { IModalProps } from "./OutstandingDocuments";
import { Form, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { FormDepartmentInput } from "src/features/settings/features/department/components/FormDepartmentInput";
import { useSendToRoleHead } from "../../hooks/useSendToRoleHead";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/useGetApplication";
import { useQueryClient } from "react-query";

export const SendToRoleHead: React.FC<IModalProps> = ({
  onCancel,
  open,
  applicantId,
}) => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useSendToRoleHead();
  const queryClient = useQueryClient();

  const handleSubmit = (val: any) => {
    mutate(
      {
        application_id: applicantId as unknown as number,
        department_id: val.department_id,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
          form.resetFields();
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
          form.resetFields();
          
        },
      }
    );
  };
  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null}>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <h1 className="p-4 font-bold text-center text-lg">
            Send to Audit Head
          </h1>
          <FormDepartmentInput Form={Form} />

          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              // handleClick={() => handleClose()}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" isLoading={isLoading} />
          </div>
        </Form>
      </Modal>
    </>
  );
};
