import { Form, Input, Select, Spin } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { textInputValidationRules } from "src/utils/formHelpers/validations";
import { FormBranchInput } from "../../branch/components/FormBranchInput";
import { AppButton } from "src/components/button/AppButton";
import { useEffect, useState } from "react";
import { useHandleData } from "../hooks/useHandleData";
import { useCreateWorkflow } from "../hooks/useCreateWorkflow";
import { openNotification } from "src/utils/notification";

const AddWorkflow = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateWorkflow();
  const [selectedId, setSelectedId] = useState<string>();
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

  const handleAddField = () => {
    const newStage = form.getFieldValue("stages") || [];
    const initialValues = { name: "", approver_type: "" };
    form.setFieldsValue({
      stages: [...newStage, initialValues],
    });
  };

  const handleRemoveField = (index: number) => {
    const newStage = form.getFieldValue("stages") || [];
    form.setFieldsValue({
      stages: newStage.filter((_: any, i: number) => i !== index),
    });
  };

  useEffect(() => {
    const initialValues = { name: "", approver_type: "" };
    form.setFieldsValue({ stages: [initialValues] });
  }, []);

  const handleSubmit = (data: any) => {
    mutate(
      { ...data },
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
          // queryClient.invalidateQueries([QUERY_KEY_FOR_ROLES]);
        },
      }
    );
  };

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Create Workflow"
          description="Create new workflow on the system"
          linkBack={appRoute.settings}
        />
        <div></div>
      </div>

      <div className="bg-white rounded-md p-5 shadow border">
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={handleSubmit}
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
                              onSelect={(val) => setSelectedId(val)}
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
                        {selectedId === "Employee" && (
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
                        {selectedId === "Department" && (
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
                        {selectedId === "Role" && (
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
                    label="+ Add question"
                    handleClick={() => handleAddField()}
                  />
                </>
              )}
            </Form.List>
          </div>

          <div className="flex justify-end gap-x-5">
            <AppButton type="reset" label="Cancel" variant="transparent" />
            <AppButton
              type="submit"
              label="Set Workflow"
              isLoading={isLoading}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddWorkflow;
