import { Form, Input, Select, Tooltip } from "antd";
import { AppButton } from "src/components/button/AppButton";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import { usePostSectionOneQuestion } from "../../hooks/usePostTemplateQuestion";
import { ITemplateCreatedProps } from "./ApplicationTemplateTab";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "../../hooks/useGetApplicationTemplate";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { optionInputValidationRules } from "./ApplicantBriefTemplate";
import { useState } from "react";

export const ApplicantPeculiaritesTemplate = ({
  templateCreated,
  resId,
  onNext,
  onPrev,
}: ITemplateCreatedProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [selectedInputTypes, setSelectedInputTypes] = useState<string[]>([]);

  const initialValues = {
    questions: [{ question: "", inputType: "", subsection_name: "" }],
  };

  const { mutate, isLoading, isSuccess } =
    usePostSectionOneQuestion("section-three");
  const handleSubmit = (val: any) => {
    const formattedValues = {
      template_id: resId as unknown as number,
      questions: val.questions.map((question: any) => {
        const baseQuestion = {
          form_question: question.question,
          input_type: question.inputType,
          subsection_name: question.subsection_name,
        };

        // if (["select", "check_box"].includes(question.inputType)) {
        //   const optionsArray = question.options
        //     ? question.options.split(",").map((option: string) => option.trim())
        //     : [];
        //   return {
        //     ...baseQuestion,
        //     options: optionsArray,
        //   };
        // }

        if (["select", "check_box"].includes(question.inputType)) {
          const optionsArray = question.options
            ? question.options
                .split(",")
                .map((option: any) => option.trim())
                .filter((option: any) => option !== null && option !== "")
            : [];

          return {
            ...baseQuestion,
            options: optionsArray,
          };
        }

        return baseQuestion;
      }),
    };
    mutate(formattedValues, {
      onError: (error: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
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
        disabled={isSuccess}
      >
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex gap-5 items-center">
                  <div className="flex gap-5 w-[90%]">
                    <div className="w-1/4">
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

                    <div className="w-1/4">
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
                          ]}
                          onChange={(value) => {
                            // Update selected input type for the current question
                            const updatedInputTypes = [...selectedInputTypes];
                            updatedInputTypes[name] = value;
                            setSelectedInputTypes(updatedInputTypes);
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="w-1/4">
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
                              value: "immigrationCourtProcedings",
                              label: "Immigration and Court Proceedings",
                            },
                            {
                              value: "criminalHistory",
                              label: "Criminal History",
                            },
                          ]}
                        />
                      </Form.Item>
                    </div>
                    {/* Render text area for "select" or "check_box" */}
                    {["select", "check_box"].includes(
                      form.getFieldValue(["questions", name, "inputType"])
                    ) && (
                      <div className="w-1/4">
                        <Form.Item
                          {...restField}
                          name={[name, "options"]}
                          label="Options (seperate each option by a comma)"
                          rules={optionInputValidationRules}
                        >
                          <Input.TextArea
                            placeholder="Enter options seperated by a comma"
                            rows={4}
                          />
                        </Form.Item>
                      </div>
                    )}
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
        <div className="flex justify-between  my-5 py-2">
          <Tooltip title="Click to go to the previous section of the form">
            <i
              className="ri-arrow-left-s-line cursor-pointer text-2xl font-semibold"
              onClick={() => {
                onPrev && onPrev();
              }}
            ></i>
          </Tooltip>

          <Tooltip title="Click to go to the next section of the form">
            <i
              className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
              onClick={() => {
                onNext && onNext();
              }}
            ></i>
          </Tooltip>
        </div>

        {/* BUTTONS TO SUBMIT FORM */}
        <div className="flex justify-end items-center gap-4 mt-5 ">
          <AppButton
            label="Cancel"
            type="reset"
            variant="transparent"
            isDisabled={templateCreated || isSuccess}
            containerStyle={templateCreated ? "cursor-not-allowed" : ""}
          />
          <AppButton
            label="Save"
            type="submit"
            isLoading={isLoading}
            isDisabled={templateCreated || isSuccess}
            containerStyle={templateCreated ? "cursor-not-allowed" : ""}
          />
        </div>
      </Form>
    </>
  );
};
