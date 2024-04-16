import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  useGetSingleQuestion,
} from "../../hooks/useGetTemplateQuestion";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";
import { Empty, Form, Input, List, Select, Skeleton, Tooltip } from "antd";
import { showInputName } from "./ApplicantBriefTemplateDetails";
import { renderInput } from "src/features/applications/features/NewApplication/NewApplicantBrief";
import Item from "antd/es/list/Item";
import { AppButton } from "src/components/button/AppButton";
import { textInputValidationRules } from "src/utils/formHelpers/validations";

export const showSubsectionName = (subSection: string) => {
  if (subSection === "personalDetails") {
    return "Personal Details";
  } else if (subSection === "contactDetails") {
    return "Contact Details";
  } else if (subSection === "marriageDetails") {
    return "Marriage Details";
  } else if (subSection === "childrenDetails") {
    return "Children Details";
  } else if (subSection === "otherDependentsDetails") {
    return "Other Dependents Details";
  } else if (subSection === "PEP") {
    return "PEP";
  } else if (subSection === "employmentDetails") {
    return "Employment Details";
  } else if (subSection === "businessIncomeNetworth") {
    return "Business Income Networth";
  } else if (subSection === "academicHistory") {
    return "Academic History";
  } else if (subSection === "travelDetails") {
    return "Travel Details";
  } else if (subSection === "immigrationCourtProcedings") {
    return "Immigration Court Procedings";
  } else if (subSection === "criminalHistory") {
    return "Criminal History";
  }
};

export const AboutTheApplicantTemplateDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-two",
  });
  const [form] = Form.useForm()
  const initialValues = {
    questions: [{ question: "", inputType: "" }],
  };

  // useEffect(() => {
  //   if (data) {
  //     form.setFieldsValue({
  //       schema_name:data.form_question
  //     })
  //   }
  // },[data])
  // useEffect(() => {
  //   if (data) {
  //     form.setFieldsValue({ [data.schema_name]: data.form_question }); // Set form field value using setFieldsValue method
  //   }
  // }, [data, form]); // Run effect when data or form changes
  const { removeData } = useDelete({
    EndPointUrl: "admin/templates/section-two/",
    queryKey: QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  });
  const [showDeleteModalForItem, setShowDeleteModalForItem] = useState<
    number | null
  >(null);

  console.log('data', data)
  return (
    <>
    <Form
        name="dynamic_form_question"
        // onFinish={handleSubmit}
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
                    <div className="w-1/4">
                      <Form.Item
                        {...restField}
                        label="Question"
                        rules={textInputValidationRules}
                        name={[name, "question"]}
                      >
                        <Input
                          placeholder="Question"
                          // disabled={templateCreated}
                        />
                      </Form.Item>
                    </div>

                    <div className="w-1/4">
                      <Form.Item
                        {...restField}
                        name={[name, "inputType"]}
                        label="Input Type"
                        // rules={generalValidationRules}
                      >
                        <Select
                          // disabled={templateCreated}
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
                            // const updatedInputTypes = [...selectedInputTypes];
                            // updatedInputTypes[name] = value;
                            // setSelectedInputTypes(updatedInputTypes);
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="w-1/4">
                      <Form.Item
                        {...restField}
                        name={[name, "subsection_name"]}
                        label="Subsection Name"
                        // rules={generalValidationRules}
                      >
                        <Select
                          // disabled={templateCreated}
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
                    {/* Render text area for "select" or "check_box" */}
                    {["select", "check_box"].includes(
                      form.getFieldValue(["questions", name, "inputType"])
                    ) && (
                      <div className="w-1/4">
                        <Form.Item
                          {...restField}
                          name={[name, "options"]}
                          label="Options (seperate each option by a comma)"
                          // rules={optionInputValidationRules}
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
                // isDisabled={templateCreated}
                // containerStyle={templateCreated ? "cursor-not-allowed" : ""}
              />
            </>
          )}
        </Form.List>

        <div className="flex justify-between  my-5 py-2">
          <Tooltip title="Click to go to the previous section of the form">
            <i
              className="ri-arrow-left-s-line cursor-pointer text-2xl font-semibold"
              // onClick={() => {
              //   onPrev && onPrev();
              // }}
            ></i>
          </Tooltip>

          <Tooltip title="Click to go to the next section of the form">
            <i
              className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
              // onClick={() => {
              //   onNext && onNext();
              // }}
            ></i>
          </Tooltip>
        </div>

        {/* BUTTONS TO SUBMIT FORM */}
        <div className="flex justify-end items-center gap-4 mt-5 ">
          <AppButton
            label="Cancel"
            type="reset"
            variant="transparent"
            // isDisabled={templateCreated || isSuccess}
            // containerStyle={templateCreated ? "cursor-not-allowed" : ""}
          />
          <AppButton
            label="Save"
            type="submit"
            isLoading={isLoading}
            // isDisabled={templateCreated || isSuccess}
            // containerStyle={templateCreated ? "cursor-not-allowed" : ""}
          />
        </div>
      </Form>
    </>
  );
};
