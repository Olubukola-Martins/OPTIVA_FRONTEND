import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import { useGetSingleQuestion } from "../../hooks/useGetSingleQuestion";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "../../hooks/useGetApplicationTemplate";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";

export const OthersTemplateDetails = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-four",
  });

 
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const formValues = data.map((item) => ({
        key: item.id,
        question: item.form_question,
        inputType: item.input_type,
      }));

      form.setFieldsValue({
        sectionFourQuestions: formValues,
      });
    }
  }, [data]);;

  const { removeData } = useDelete({
    EndPointUrl: "admin/templates/section-four/",
    queryKey: QUERY_KEY_FOR_APPLICATION_TEMPLATE,
  });

  const [showDelete, setShowDelete] = useState<boolean>(false);

  const initialValues = {
    sectionFourQuestions: [{ question: "", inputType: "" }],
  };

  return (
    <>
      {data && data.length > 0 ? (
        <Form
          name="dynamic_form_question"
          layout="vertical"
          form={form}
          requiredMark={false}
          initialValues={initialValues}
        >
          <Form.List name="sectionFourQuestions">
            {(fields) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="flex gap-5 items-center">
                    <div className="flex gap-5 w-[90%]">
                      <div className="w-1/2">
                        <Form.Item
                          {...restField}
                          label="Question"
                          rules={textInputValidationRules}
                          name={[name, "question"]}
                        >
                          <Input
                            placeholder="Question"
                            // disabled
                          />
                        </Form.Item>
                      </div>

                      <div className="w-1/2">
                        <Form.Item
                          {...restField}
                          name={[name, "inputType"]}
                          label="Input Type"
                          rules={generalValidationRules}
                        >
                          <Select
                            // disabled
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
                    </div>

                    <div className="flex justify-end my-4 w-[5%]">
                      <i
                        className="ri-delete-bin-line text-xl cursor-pointer"
                        onClick={() => setShowDelete(true)}
                      ></i>
                    </div>

                  </div>
                ))}
               
              </>
            )}
          </Form.List>

          {/* BUTTONS TO SUBMIT FORM */}
          <div className="flex justify-end items-center gap-4 mt-5 ">
            <AppButton label="Cancel" type="reset" variant="transparent" />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      ) : (
        <div>
          No questions have been created for this section in the template
        </div>
      )}

      <DeleteModal
        header="question"
        text="question"
        onCancel={() => setShowDelete(false)}
        open={showDelete}
        onDelete={() =>
          data?.forEach((item) => {
            removeData(item.id);
            // console.log(item.id);
          })
        }
      />
    </>
  );
};
