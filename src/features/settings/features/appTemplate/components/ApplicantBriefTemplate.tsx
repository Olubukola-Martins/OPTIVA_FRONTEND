import { Form, Input, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { textInputValidationRules } from "src/utils/formHelpers/validations";

const ApplicantBriefTemplate = () => {
  const [form] = Form.useForm();

  const handleAddField = () => {
    const newTemplateQuestion = form.getFieldValue("newTemplateQuestion") || [];
    const initialQuestion = { newQuestion: "", newInputType: "" };
    form.setFieldsValue({
      newTemplateQuestion: [...newTemplateQuestion, initialQuestion],
    });
  };

  const handleRemoveField = (index: number) => {
    const newTemplateQuestion = form.getFieldValue("newTemplateQuestion") || [];
    form.setFieldsValue({
      newTemplateQuestion: newTemplateQuestion.filter(
        (_: any, i: number) => i !== index
      ),
    });
  };
  return (
    <>
      <Form layout="vertical" form={form} requiredMark={false}>
        <div className="flex gap-5">
          <div className="w-1/2">
            <Form.Item label="Question" name="question">
              <Input placeholder="Question" />
            </Form.Item>
          </div>
          <div className="w-1/2">
            <Form.Item label="Input Type" name="inputType">
              <Select
                //   onChange={handleSelectChange}
                placeholder="Select Input Type"
                options={[
                  { value: "Input", label: "Input" },

                  { value: "Select", label: "Select" },
                  { value: "Text Area", label: "Text Area" },
                  {
                    value: "Date Picker",
                    label: "Date Picker",
                  },
                  { value: "Date Range", label: "Date Range" },
                  {
                    value: "Multiple Select",
                    label: "Multiple Select",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <div>
          <Form.List name="newTemplateQuestion">
            {(fields) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <div className="flex gap-5 mt-3">
                      <div className="w-1/2">
                        <Form.Item
                          {...field}
                          name={[field.name, "newQuestion"]}
                          rules={textInputValidationRules}
                        >
                          <Input placeholder="Question" />
                        </Form.Item>
                      </div>

                      <div className="w-1/2">
                        <Form.Item
                          {...field}
                          name={[field.name, "newInputType"]}
                        >
                          <Select
                            //   onChange={handleSelectChange}
                            placeholder="Select Input Type"
                            options={[
                              { value: "Input", label: "Input" },

                              { value: "Select", label: "Select" },
                              { value: "Text Area", label: "Text Area" },
                              {
                                value: "Date Picker",
                                label: "Date Picker",
                              },
                              { value: "Date Range", label: "Date Range" },
                              {
                                value: "Multiple Select",
                                label: "Multiple Select",
                              },
                            ]}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="flex justify-end my-4">
                      <i
                        className="ri-delete-bin-line text-xl cursor-pointer"
                        onClick={() => handleRemoveField(index)}
                      ></i>
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

        {/* BUTTONS TO SUBMIT FORM */}
        <div className="flex justify-end items-center gap-4 mt-5">
          <AppButton label="Cancel" type="reset" variant="transparent" />
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </>
  );
};

export default ApplicantBriefTemplate;
