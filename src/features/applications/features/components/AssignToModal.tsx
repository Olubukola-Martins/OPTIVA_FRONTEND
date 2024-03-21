import { Form, Modal, Select } from "antd";
import React, { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import { generalValidationRules } from "src/utils/formHelpers/validations";
import { useFetchRoles } from "src/features/settings/features/rolesAndPermissions/hooks/useFetchRoles";
import { useFetchEmployees } from "src/features/settings/features/employees/hooks/useFetchEmployees";
import { employeesProps } from "src/features/settings/features/employees/types";
import { useAssignApplicant } from "../../hooks/Application hooks/useAssignApplicant";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { IModalProps } from "./OutstandingDocuments";

export const AssignToModal: React.FC<IModalProps> = ({
  onCancel,
  open,
  applicantId,
}) => {
  const [form] = Form.useForm();
  const { data } = useFetchRoles();
  const { data: employeesData } = useFetchEmployees({
    currentUrl: "active-employees",
  });
  const { mutate, isLoading } = useAssignApplicant();
  const queryClient = useQueryClient();

  const [filteredEmployees, setFilteredEmployees] = useState<employeesProps[]>(
    []
  );
  const handleRoleChange = (roleId: number) => {
    const filtered = employeesData?.data.filter(
      (employee) => employee.user.roles.id === roleId
    );
    filtered && setFilteredEmployees(filtered);
  };

  const handleSubmit = (val: any) => {
    mutate(
      {
        application_id: applicantId as unknown as number,
        user_id: val.selectEmployee,
        role_id: val.selectRole,
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
          onCancel()
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
            Assign Applicant
          </h1>
          <Form.Item
            name="selectRole"
            label="Select Role"
            rules={generalValidationRules}
          >
            <Select onChange={handleRoleChange}>
              {data?.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="selectEmployee"
            label="Select Employee"
            rules={generalValidationRules}
          >
            <Select>
              {filteredEmployees.map((employee) => (
                <Select.Option value={employee.user.id} key={employee.id}>
                  {employee.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

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
