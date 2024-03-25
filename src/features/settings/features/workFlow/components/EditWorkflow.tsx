import { Drawer, Form, Input, Select, Spin } from "antd";
import { useWindowWidth } from "src/hooks/useWindowWidth";
import { IdentifierProps } from "src/types";
import { useGetSingleWorkflow } from "../hooks/useGetSingleWorkflow";
import { useCreateWorkflow } from "../hooks/useCreateWorkflow";
import { useEffect, useState } from "react";
import { useHandleData } from "../hooks/useHandleData";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_WORKFLOW } from "../hooks/useGetWorkflow";
import { textInputValidationRules } from "src/utils/formHelpers/validations";
import { FormBranchInput } from "../../branch/components/FormBranchInput";
import { AppButton } from "src/components/button/AppButton";

export const EditWorkflow = ({ handleClose, open, id }: IdentifierProps) => {
  const {
    data,
    isLoading: isLoadingSingle,
    isSuccess,
  } = useGetSingleWorkflow({
    id: id as unknown as number,
  });
  const { drawerSize } = useWindowWidth();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateWorkflow();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const {
    handleSearch,
    setSearchTerm,
    employeeData,
    isLoadingEmployees,
    employeesSuccess,
    departData,
    departSuccess,
    isLoadingDepart,
    rolesData,
    isLoadingRoles,
    rolesSuccess,
  } = useHandleData();

  const mapData = data?.stages.map((item) => ({
    name: item.name,
    approver_type: item.approver_type,
    roles: item.roles.map((item) => item.id),
    employees: item.employees.map((item) => item.id),
    departments: item.departments.map((item) => item.id),
  }));
  useEffect(() => {
    if (isSuccess && id) {
      form.setFieldsValue({
        name: data.name,
        branch_id: data.branch_id,
        stages: mapData,
      });
      const initialSelectedIds = data?.stages.map(
        (item) => item.approver_type || ""
      );
      setSelectedIds(initialSelectedIds);
    } else {
      form.resetFields();
    }
  }, [form, id, data, isSuccess]);

  const handleAddField = () => {
    const newStage = form.getFieldValue("stages") || [];
    const initialValues = { name: "", approver_type: "" };
    form.setFieldsValue({
      stages: [...newStage, initialValues],
    });
    setSelectedIds([...selectedIds, ""]); // Add an empty string for the new form list
  };

  const handleRemoveField = (index: number) => {
    const newStage = form.getFieldValue("stages") || [];
    form.setFieldsValue({
      stages: newStage.filter((_: any, i: number) => i !== index),
    });
    const newSelectedIds = [...selectedIds];
    newSelectedIds.splice(index, 1); // Remove the selectedId for the removed form list
    setSelectedIds(newSelectedIds);
  };

  useEffect(() => {
    const initialValues = { name: "", approver_type: "" };
    form.setFieldsValue({ stages: [initialValues] });
  }, []);

  const handleApproverTypeChange = (index: number, value: string) => {
    const newSelectedIds = [...selectedIds];
    newSelectedIds[index] = value; // Update the selectedId for the specific form list
    setSelectedIds(newSelectedIds);
  };

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
          queryClient.invalidateQueries([QUERY_KEY_FOR_WORKFLOW]);
          handleClose();
        },
      }
    );
  };

  return (
    <Drawer
      size={drawerSize}
      title="Edit workflow"
      open={open}
      onClose={() => handleClose()}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
        disabled={isLoadingSingle}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="name"
            label="Workflow Name"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
          <FormBranchInput Form={Form} />
        </div>

        <div>
          <Form.List name="stages">
            {(fields) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-3">
                      <Form.Item
                        {...field}
                        name={[field.name, "name"]}
                        rules={textInputValidationRules}
                        label="Stage Name"
                      >
                        <Input />
                      </Form.Item>

                      <div className="flex items-center gap-x-4">
                        <Form.Item
                          {...field}
                          name={[field.name, "approver_type"]}
                          label="Approver Type"
                          className="w-full"
                        >
                          <Select
                            allowClear
                            className="w-full"
                            onSelect={(val) =>
                              handleApproverTypeChange(index, val)
                            }
                            placeholder="Select"
                            options={[
                              { value: "Role", label: "Role" },
                              { value: "Employee", label: "Employee" },
                              { value: "Department", label: "Department" },
                            ]}
                          />
                        </Form.Item>

                        <div>
                          <i
                            className="ri-delete-bin-line text-xl cursor-pointer"
                            onClick={() => handleRemoveField(index)}
                          ></i>
                        </div>
                      </div>
                      {selectedIds[index] === "Employee" && (
                        <Form.Item
                          {...field}
                          name={[field.name, "employees"]}
                          label="Employees"
                          className="w-full"
                        >
                    
                          <Select
                            mode="multiple"
                            placeholder="Select"
                            showSearch
                            allowClear
                            onClear={() => setSearchTerm("")}
                            onSearch={handleSearch}
                            className="rounded border-slate-400 w-full"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            loading={isLoadingEmployees}
                            filterOption={false}
                          >
                            {employeesSuccess ? (
                              employeeData?.data.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              ))
                            ) : (
                              <div className="flex justify-center items-center w-full">
                                <Spin size="small" />
                              </div>
                            )}
                          </Select>
                        </Form.Item>
                      )}
                      {selectedIds[index] === "Department" && (
                        <Form.Item
                          {...field}
                          name={[field.name, "departments"]}
                          label="Departments"
                          className="w-full"
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select"
                            showSearch
                            allowClear
                            onClear={() => setSearchTerm("")}
                            onSearch={handleSearch}
                            className="rounded border-slate-400 w-full"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            loading={isLoadingDepart}
                            filterOption={false}
                          >
                            {departSuccess ? (
                              departData?.data.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              ))
                            ) : (
                              <div className="flex justify-center items-center w-full">
                                <Spin size="small" />
                              </div>
                            )}
                          </Select>
                        </Form.Item>
                      )}
                      {selectedIds[index] === "Role" && (
                        <Form.Item
                          {...field}
                          name={[field.name, "roles"]}
                          label="Roles"
                          className="w-full"
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select"
                            showSearch
                            allowClear
                            onClear={() => setSearchTerm("")}
                            onSearch={handleSearch}
                            className="rounded border-slate-400 w-full"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            loading={isLoadingRoles}
                            filterOption={false}
                          >
                            {rolesSuccess ? (
                              rolesData?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              ))
                            ) : (
                              <div className="flex justify-center items-center w-full">
                                <Spin size="small" />
                              </div>
                            )}
                          </Select>
                        </Form.Item>
                      )}
                    </div>
                  </div>
                ))}

                <AppButton
                  variant="transparent"
                  label="+ Add stage"
                  handleClick={() => handleAddField()}
                />
              </>
            )}
          </Form.List>
        </div>

        <div className="flex justify-end gap-x-5">
          <AppButton type="reset" label="Cancel" variant="transparent" />
          <AppButton type="submit" label="Set Workflow" isLoading={isLoading} />
        </div>
      </Form>
    </Drawer>
  );
};
