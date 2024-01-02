import { Form, Input, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import {
  emailValidationRules,
  generalValidationRules,
} from "src/utils/formHelpers/validations";
import { useCreateAndUpdateEmployee } from "../hooks/useCreateAndUpdateEmployee";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_EMPLOYEES } from "../hooks/useFetchEmployees";
import { useQueryClient } from "react-query";
import { useGetSingleEmployee } from "../hooks/useGetSingleEmployee";
import { useEffect } from "react";
import { FormDepartmentInput } from "../../department/components/FormDepartmentInput";
import { FormBranchInput } from "../../branch/components/FormBranchInput";
import { FormRolesInput } from "../../rolesAndPermissions/components/FormRolesInput";

export const NewEmployee = ({ handleClose, open, id }: IdentifierProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading: loadAddEmp } = useCreateAndUpdateEmployee();
  const { data, isSuccess } = useGetSingleEmployee({ id: id as number });
  const branches = data?.user?.branches.map((item) => item.id);
  const roles = data?.user?.roles.map((item) => item.id);
  useEffect(() => {
    if (isSuccess && id) {
      form.setFieldsValue({
        ...data,
        branches,
        roles,
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_EMPLOYEES]);
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
          name="name"
          label="Employee Name"
          rules={generalValidationRules}
        >
          <Input placeholder="Full name" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={emailValidationRules}>
          <Input placeholder="Employee email" />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormBranchInput
            Form={Form}
            mode="multiple"
            control={{ name: "branches", label: "Branches" }}
          />
          <FormRolesInput Form={Form}/>
        </div>
        <FormDepartmentInput Form={Form} />

        <AppButton type="submit" isLoading={loadAddEmp} />
      </Form>
    </Modal>
  );
};
