import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import {
  emailValidationRules,
  generalValidationRules,
} from "src/utils/formHelpers/validations";
import { useCreateAndUpdateEmployee } from "../hooks/useCreateAndUpdateEmployee";
import { openNotification } from "src/utils/notification";
import { useFetchDepartment } from "../../department/hooks/useFetchDepartment";
import { useFetchBranches } from "../../branch/hooks/useFetchBranches";
import { useFetchRoles } from "../../rolesAndPermissions/hooks/useFetchRoles";

export const NewEmployee = ({ handleClose, open, id }: IdentifierProps) => {
  const [form] = Form.useForm();
  const { mutate, isLoading: loadAddEmp } = useCreateAndUpdateEmployee();
  const { data: departData, isLoading: loadDepart } = useFetchDepartment();
  const { data: branchData, isLoading: loadBranch } = useFetchBranches();
  const { data: rolesData, isLoading: loadRole } = useFetchRoles();

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
          // queryClient.invalidateQueries([QUERY_KEY_FOR_DEPARTMENT]);
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
      title="New Employee"
      style={{ top: 15 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        className="mt-5"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          name="branches"
          label="Branch"
          rules={generalValidationRules}
        >
          <Select
            placeholder="Select"
            options={branchData?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            loading={loadBranch}
            allowClear
            mode="multiple"
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Employee Name"
          rules={generalValidationRules}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={emailValidationRules}>
          <Input />
        </Form.Item>
        <Form.Item name="roles" label="Roles" rules={generalValidationRules}>
          <Select
            placeholder="Select"
            options={rolesData?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            loading={loadRole}
            allowClear
            mode="multiple"
          />
        </Form.Item>
        <Form.Item
          name="department_id"
          label="Department"
          rules={generalValidationRules}
        >
          <Select
            placeholder="Select"
            options={departData?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            loading={loadDepart}
            allowClear
          />
        </Form.Item>

        <AppButton type="submit" isLoading={loadAddEmp} />
      </Form>
    </Modal>
  );
};
