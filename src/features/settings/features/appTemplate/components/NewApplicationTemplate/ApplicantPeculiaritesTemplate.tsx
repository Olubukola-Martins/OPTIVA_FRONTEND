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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleQuestion } from "../../hooks/useGetTemplateQuestion";
import { ISingleQuestion } from "../../types";
import { useUpdateQuestions } from "../../hooks/useUpdateQuestions";

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
    questions: [{ question: "", inputType: "", is_required: "" }],
  };

  const { id } = useParams();
  const { data: sectionThreeData } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-three",
  });

  const { patchData } = useUpdateQuestions(
    "section-three",
    id as unknown as number
  );

  const { mutate, isLoading, isSuccess } =
    usePostSectionOneQuestion("section-three");

  useEffect(() => {
    if (sectionThreeData) {
      const initialValues = sectionThreeData.map(
        (question: ISingleQuestion) => ({
          question: question.form_question || "",
          inputType: question.input_type || "",
          options: (question.options || []).join(", ") || "",
          is_required: question.is_required === 1 ? true : false,
          subsection_name: question.subsection_name || "",
        })
      );
      form.setFieldsValue({ questions: initialValues });
    }
  }, [sectionThreeData, form]);

  const handleSubmit = (val: any) => {
    const notifs = {
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
    };
    if (sectionThreeData && id) {
      val.questions.forEach((question: any) => {
        patchData(
          question.question,
          question.inputType,
          id as unknown as number,
          question.is_required
        );
      });
    } else {
      const formattedValues = {
        template_id: resId as unknown as number,
        questions: val.questions.map((question: any) => {
          const baseQuestion = {
            form_question: question.question,
            input_type: question.inputType,
            subsection_name: question.subsection_name,
          };

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
      mutate(formattedValues, notifs);
    }
  };

  const isDefault = form.getFieldValue(["is_default"]);

  return (
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
                  <div className="w-1/5">
                    <Form.Item
                      {...restField}
                      label="Question"
                      rules={textInputValidationRules}
                      name={[name, "question"]}
                    >
                      <Input
                        placeholder="Question"
                        disabled={!id && templateCreated}
                      />
                    </Form.Item>
                  </div>

                  <div className="w-1/5">
                    <Form.Item
                      {...restField}
                      name={[name, "is_required"]}
                      label="Is the question required?"
                      rules={generalValidationRules}
                    >
                      <Select
                        disabled={!id && templateCreated}
                        placeholder="Is the question required?"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className="w-1/5">
                    <Form.Item
                      {...restField}
                      name={[name, "inputType"]}
                      label="Input Type"
                      rules={generalValidationRules}
                    >
                      <Select
                        disabled={!id && templateCreated}
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

                  <div className="w-1/5">
                    <Form.Item
                      {...restField}
                      name={[name, "subsection_name"]}
                      label="Subsection Name"
                      rules={generalValidationRules}
                    >
                      <Select
                        disabled={!id && templateCreated}
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
                    <div className="w-1/5">
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

                {/* <div className="w-[5%]">
                    <Form.Item noStyle>
                      <i
                        className="ri-delete-bin-line text-xl cursor-pointer"
                        onClick={() => remove(name)}
                      ></i>
                    </Form.Item>
                  </div> */}

                {isDefault === false && (
                  <div className="w-[5%]">
                    <Form.Item noStyle>
                      <i
                        className="ri-delete-bin-line text-xl cursor-pointer"
                        onClick={() => remove(name)}
                      ></i>
                    </Form.Item>
                  </div>
                )}
              </div>
            ))}

            <AppButton
              variant="transparent"
              label="+ Add question"
              handleClick={() => add()}
              isDisabled={templateCreated && !id}
              containerStyle={
                templateCreated && !id ? "cursor-not-allowed" : ""
              }
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
          isDisabled={(templateCreated && !id) || isSuccess}
          containerStyle={templateCreated && !id ? "cursor-not-allowed" : ""}
        />
        <AppButton
          label="Save"
          type="submit"
          isLoading={isLoading}
          isDisabled={(templateCreated && !id) || isSuccess}
          containerStyle={templateCreated && !id ? "cursor-not-allowed" : ""}
        />
      </div>
    </Form>
  );
};
