import {Form, Skeleton } from "antd";
import { useEffect, } from "react";
import { useParams } from "react-router-dom";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { AppButton } from "src/components/button/AppButton";
// import { renderDetailsInput } from "./AcademicHistory";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "../NewApplication/NewApplicantBrief";
import { generalValidationRules, generalValidationRulesOpt } from "src/utils/formHelpers/validations";
// import { renderInput } from "../NewApplication/NewApplicantBrief";

export interface IApplicantDetailsProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const ApplicantBrief: React.FC<IApplicantDetailsProps> = ({
  onNext,
}) => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiononeresponse",
  });
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading: postLoading } =
    useCreateApplicationResponse("sectiononeresponse");
  
    // const [inputValue, setInputValue] = useState<any>()
  
    // const renderInput = (inputType: string, options?: any[]) => {
    //   if (inputType === "textarea") {
    //     return <Input.TextArea className="w-full" />;
    //   } else if (inputType === "text_input") {
    //     return <Input className="w-1/2" />;
    //   } else if (inputType === "select") {
    //     return (
    //       <div className="w-1/2">
    //         <Select
    //           className="w-1/2"
    //           onChange={(value) => {
    //             setInputValue(value);
    //           }}
    //           value={inputValue} // Pass inputValue as the value prop
    //         >
    //           {options?.map((option, index) => (
    //             <Select.Option key={index} value={option}>
    //               {option.charAt(0).toUpperCase() + option.slice(1)}
    //             </Select.Option>
    //           ))}
    //         </Select>
    //       </div>
    //     );
    //   } else if (inputType === "check_box") {
    //     return (
    //       <Checkbox.Group className="w-full">
    //         {options?.map((option, index) => (
    //           <Checkbox key={index} value={option}>
    //             {option.charAt(0).toUpperCase() + option.slice(1)}
    //           </Checkbox>
    //         ))}
    //       </Checkbox.Group>
    //     );
    //   } else if (inputType === "number_input") {
    //     return <InputNumber className="w-1/2" />;
    //   } else if (inputType === "date_input") {
    //     return <DatePicker className="w-1/2" format="YYYY-MM-DD" />;
    //   }
    // };
  

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const initialValues: Record<string, any> = {};
      data.data.forEach((item) => {
        initialValues[item.question.schema_name] = item.response || null;
      });
      form.setFieldsValue(initialValues);
    }
  }, [data, form]);

  const { data: sectionOneQst, isLoading: sectionOneQstLoading } =
    useGetSingleQuestion({
      id: data?.template_id as unknown as number,
      endpointUrl: "section-one",
    });

  const handleSubmit = (values: any) => {
    const payload = {
      application_id: Number(id),
      responses:
        data?.data.map((item) => ({
          question_id: item.id,
          response: Array.isArray(values[item.question.schema_name])
            ? values[item.question.schema_name]
            : [values[item.question.schema_name]],
        })) || [],
    };
    mutate(payload, {
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
        queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
      },
    });
  };

  return (
    <>
      <Skeleton active loading={isLoading || sectionOneQstLoading}>
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          {data?.data.length !== 0 ? (
            <>
              {data?.data.map((item) => (
                <>
                  <Form.Item
                    name={item.question.schema_name}
                    label={item.question.form_question}
                    key={item.question_id}
                    className="w-full"
                    rules={
                      item.question.is_required === 1
                        ? generalValidationRules
                        : generalValidationRulesOpt
                    }
                  >
                    {/* {renderDetailsInput(
                      item.question.input_type,
                      item.question.options
                    )} */}
                    {renderInput(item.question.input_type, item.question.options)}
                  </Form.Item>
                </>
              ))}
            </>
          ) : (
            <>
              {sectionOneQst?.map((item) => (
                <Form.Item
                  name={item.schema_name}
                  label={item.form_question}
                  key={item.id}
                  rules={
                    item.is_required === 1
                      ? generalValidationRules
                      : generalValidationRulesOpt
                  }
                >
                  {renderInput(item.input_type, item.options)}
                </Form.Item>
              ))}
            </>
          )}

          <div className="flex justify-between items-center gap-5">
            <AppButton
              label="Next"
              type="button"
              handleClick={onNext}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" isLoading={postLoading} />
          </div>
        </Form>
       
      </Skeleton>
    </>
  );
};
