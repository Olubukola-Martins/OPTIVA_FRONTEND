import { Form, Input, Select } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { textInputValidationRules } from "src/utils/formHelpers/validations";
import { FormBranchInput } from "../../branch/components/FormBranchInput";
import { AppButton } from "src/components/button/AppButton";

const AddWorkflow = () => {
  const [form] = Form.useForm();
  
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
        <Form layout="vertical" requiredMark={false} form={form}>
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
            <AppButton type="submit" label="Set Workflow" />
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddWorkflow;
