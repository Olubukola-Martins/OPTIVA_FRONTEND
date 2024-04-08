import {  Form, Skeleton } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { AppButton } from "src/components/button/AppButton";
import { renderDetailsInput } from "./AcademicHistory";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "../NewApplication/NewApplicantBrief";

export interface IApplicantDetailsProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const ApplicantBrief: React.FC<IApplicantDetailsProps> = ({
  onNext,
}) => {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiononeresponse",
  });
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading: postLoading } =
    useCreateApplicationResponse("sectiononeresponse");
  const { data: sectionOneData, isLoading: sectionOneLoading } =
    useGetSingleQuestion({
      id: 1,
      endpointUrl: "section-one",
    });

  useEffect(() => {
    if (data && data.length > 0) {
      const initialValues: Record<string, any> = {};
      data.forEach((item) => {
        initialValues[item.question.schema_name] = item.response || null;
      });
      console.log('initial vals', initialValues)
      form.setFieldsValue(initialValues);
    }
  }, [data, form]);

  const handleSubmit = (val: any) => {
    const applicationId = Number(id);

    const payload = {
      application_id: applicationId,
      responses:
        data?.map((item) => ({
          question_id: item.question_id,
          response: Array.isArray(val[item.question.schema_name])
            ? val[item.question.schema_name]
            : [val[item.question.schema_name]],
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

  console.log('data', data)
  return (
    <>
      <Skeleton active loading={isLoading || sectionOneLoading}>
        {data?.length !== 0 ? (
          <Form
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            requiredMark={false}
          >
            {data?.map((item) => (
              <Form.Item
                name={item.question.schema_name}
                label={item.question.form_question}
                key={item.question_id}
                className="w-full"
              >
                {renderDetailsInput(
                  item.question.input_type,
                  item.question.options
                )}
              </Form.Item>
            ))}
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
        ) : (
          <Form
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            requiredMark={false}
          >
            {sectionOneData?.map((item) => (
              <div className="w-full">
                <Form.Item
                  name={item.schema_name}
                  // rules={generalValidationRules}
                  label={
                    item.form_question.charAt(0).toUpperCase() +
                    item.form_question.slice(1)
                  }
                  key={item.id}
                  className="w-full"
                >
                  {renderInput(item.input_type, item.options)}
                </Form.Item>
              </div>
            ))}
            {/* {!isSuccess && ( */}
              <div className="flex justify-end items-center gap-5">
                <AppButton
                  label="Cancel"
                  type="reset"
                  variant="transparent"
                  // isDisabled={isSuccess}
                />
                <AppButton
                  label="Save"
                  type="submit"
                  isLoading={postLoading}
                  // isDisabled={isSuccess}
                  // containerStyle={isSuccess ? "cursor-not-allowed" : ""}
                />
              </div>
            {/* )} */}
          </Form>
        )}
      </Skeleton>
    </>
  );
};
