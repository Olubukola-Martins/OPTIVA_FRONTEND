import { Input, Modal, Form, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { generalValidationRules } from "src/utils/formHelpers/validations";
import { useFetchPermissions } from "../hooks/useFetchPermissions";
import { useCreateAndUpdateRole } from "../hooks/useCreateAndUpdateRole";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_ROLES } from "../hooks/useFetchRoles";
import { useQueryClient } from "react-query";

export const NewRole = ({ handleClose, open, id }: IdentifierProps) => {
    const queryClient = useQueryClient()
  const { data: permissionData, isLoading: loadPermissions } =
    useFetchPermissions();
    const {mutate, isLoading} = useCreateAndUpdateRole()
  const [form] = Form.useForm()

    const handleSubmit = (data: any) => {
       mutate({...data},   {
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_ROLES]);
          handleClose();
        },
      })
    }

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={`${id ? "Edit" : "New"} Role`}
      style={{ top: 15 }}
    >
      <Form layout="vertical" className="mt-5" form={form} onFinish={handleSubmit}>
        <Form.Item name="name" label="Name" rules={generalValidationRules}>
          <Input />
        </Form.Item>
        <Form.Item
          name="permissions"
          label="Permissions"
          rules={generalValidationRules}
        >
          <Select
            loading={loadPermissions}
            placeholder="Select Branch"
            allowClear
            options={permissionData?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            mode="multiple"
          />
        </Form.Item>
        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
