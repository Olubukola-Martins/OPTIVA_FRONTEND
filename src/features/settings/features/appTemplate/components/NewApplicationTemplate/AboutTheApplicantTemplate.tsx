import { Form, Input, Select } from "antd";
import { useQueryClient } from "react-query";
import { AppButton } from "src/components/button/AppButton";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "../../hooks/useGetApplicationTemplate";
import { usePostSectionOneQuestion } from "../../hooks/usePostSectionOneQuestion";
import { ITemplateCreatedProps } from "./ApplicationTemplateTab";

export const AboutTheApplicantTemplate = ({
  templateCreated,
  resId,
}: ITemplateCreatedProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // const handleAddField = () => {
  //   const newTemplateQuestion = form.getFieldValue("newTemplateQuestion") || [];
  //   const initialQuestion = { newQuestion: "", newInputType: "" };
  //   form.setFieldsValue({
  //     newTemplateQuestion: [...newTemplateQuestion, initialQuestion],
  //   });
  // };

  // const handleRemoveField = (index: number) => {
  //   const newTemplateQuestion = form.getFieldValue("newTemplateQuestion") || [];
  //   form.setFieldsValue({
  //     newTemplateQuestion: newTemplateQuestion.filter(
  //       (_: any, i: number) => i !== index
  //     ),
  //   });
  // };
  const initialValues = {
    questions: [{ question: "", inputType: "" }],
  };

  const { mutate, isLoading } = usePostSectionOneQuestion("section-two");
  const handleSubmit = (val: any) => {
    console.log("form values", val);
    const formattedValues = {
      template_id: resId as unknown as number,
      questions: val.questions.map((question: any) => ({
        form_question: question.question,
        input_type: question.inputType,
        subsection_name: question.subsection_name
      })),
    };
    mutate(formattedValues, {
      onError: (error: any) => {
        openNotification({
          state: "error",
          title: "Error Occured",
          description: error.response.data.message,
          duration: 5,
        });
      },
      onSuccess: (res: any) => {
        openNotification({
          state: "success",
          title: "Success",
          description: res.data.message,
        });
        queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATION_TEMPLATE]);
      },
    });
  };

  return (
    <>
      <Form
        name="dynamic_form_question"
        onFinish={handleSubmit}
        layout="vertical"
        form={form}
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex gap-5 items-center">
                  <div className="flex gap-5 w-[90%]">
                    <div className="w-1/3">
                      <Form.Item
                        {...restField}
                        label="Question"
                        rules={textInputValidationRules}
                        name={[name, "question"]}
                      >
                        <Input
                          placeholder="Question"
                          disabled={templateCreated}
                        />
                      </Form.Item>
                    </div>

                    <div className="w-1/3">
                      <Form.Item
                        {...restField}
                        name={[name, "inputType"]}
                        label="Input Type"
                        rules={generalValidationRules}
                      >
                        <Select
                          disabled={templateCreated}
                          placeholder="Select Input Type"
                          options={[
                            { value: "text_input", label: "Text Input" },
                            { value: "number_input", label: "Number Input" },

                            { value: "select", label: "Select" },
                            { value: "textarea", label: "Text Area" },
                            {
                              value: "date_input",
                              label: "Date Picker",
                            },
                            { value: "check_box", label: "Checkbox" },
                            // { value: "Date Range", label: "Date Range" },
                            // {
                            //   value: "Multiple Select",
                            //   label: "Multiple Select",
                            // },
                          ]}
                        />
                      </Form.Item>
                    </div>

                    <div className="w-1/3">
                      <Form.Item
                        {...restField}
                        name={[name, "subsection_name"]}
                        label="Subsection Name"
                        rules={generalValidationRules}
                      >
                        <Select
                          disabled={templateCreated}
                          placeholder="Select Input Type"
                          options={[
                            {
                              value: "personalDetails",
                              label: "Personal Details",
                            },
                            {
                              value: "contactDetails",
                              label: "Contact Details",
                            },
                            {
                              value: "marriageDetails",
                              label: "Marriage Details",
                            },
                            {
                              value: "childrenDetails",
                              label: "Children Details",
                            },
                            {
                              value: "otherDependentsDetails",
                              label: "Other Dependent Details",
                            },
                            {
                              value: "PEP",
                              label: "PEP",
                            },
                            {
                              value: "employmentDetails",
                              label: "Employment Details",
                            },
                            {
                              value: "businessIncomeNetworth",
                              label: "Business, Income and Network",
                            },
                            {
                              value: "academicHistory",
                              label: "Academic History",
                            },
                            {
                              value: "travelDetails",
                              label: "Travel Details and History",
                            },
                          ]}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex justify-end my-4 w-[5%]">
                    <i
                      className="ri-delete-bin-line text-xl cursor-pointer"
                      onClick={() => remove(name)}
                    ></i>
                  </div>
                </div>
              ))}

              <AppButton
                variant="transparent"
                label="+ Add question"
                handleClick={() => add()}
                isDisabled={templateCreated}
                containerStyle={templateCreated ? "cursor-not-allowed" : ""}
              />
            </>
          )}
        </Form.List>

        {/* BUTTONS TO SUBMIT FORM */}
        <div className="flex justify-end items-center gap-4 mt-5 ">
          <AppButton
            label="Cancel"
            type="reset"
            variant="transparent"
            isDisabled={templateCreated}
            containerStyle={templateCreated ? "cursor-not-allowed" : ""}
          />
          <AppButton
            label="Save"
            type="submit"
            isLoading={isLoading}
            isDisabled={templateCreated}
            containerStyle={templateCreated ? "cursor-not-allowed" : ""}
          />
        </div>
      </Form>
    </>
  );
};
