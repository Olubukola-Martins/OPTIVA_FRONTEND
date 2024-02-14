import { Form, Modal, Select } from "antd";
import React, { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import { generalValidationRules } from "src/utils/formHelpers/validations";
import { IModalProps } from "./OutstandingDocuments";
import { useFetchRoles } from "src/features/settings/features/rolesAndPermissions/hooks/useFetchRoles";
import { useFetchEmployees } from "src/features/settings/features/employees/hooks/useFetchEmployees";
import { employeesProps } from "src/features/settings/features/employees/types";

export const AssignToModal: React.FC<IModalProps> = ({ onCancel, open }) => {
  const [form] = Form.useForm();
  const { data } = useFetchRoles();
  const { data: employeesData } = useFetchEmployees({
    currentUrl: "active-employees",
  });

  const [filteredEmployees, setFilteredEmployees] = useState<employeesProps[]>(
    []
  );
  const handleRoleChange = (roleId: number) => {
    const filtered = employeesData?.data.filter(
      (employee) => employee.user.roles.id === roleId
    );
    filtered && setFilteredEmployees(filtered);
  };

  const handleSubmit = () => {};
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
                <Select.Option value={employee.id} key={employee.id}>
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
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>
    </>
  );
};
