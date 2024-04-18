import { Form, Skeleton } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "./NewApplicantBrief";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { useGlobalContext } from "src/stateManagement/GlobalContext";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { renderDetailsInput } from "../ApplicantDetails/AcademicHistory";
import { useEffect } from "react";

export const NewOthers = () => {
  const { sharedData } = useGlobalContext();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data, isLoading } = useGetSingleQuestion({
    id: sharedData.templateId as unknown as number,
    endpointUrl: "section-four",
  });

  const {
    mutate,
    isLoading: postLoading,
    isSuccess,
  } = useCreateApplicationResponse("sectionfourresponse");

  const {
    data: sectionFourResponse,
    isLoading: sectionFourLoading,
    isSuccess: sectionFourSuccess,
  } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectionfourresponse",
  });

  useEffect(() => {
    if (
      sectionFourResponse &&
      sectionFourResponse.data.length > 0 &&
      sectionFourSuccess
    ) {
      const initialValues: Record<string, any> = {};
      sectionFourResponse.data.forEach((item) => {
        initialValues[item.question.schema_name] = item.response;
      });
      form.setFieldsValue(initialValues);
      console.log("iniyial vals", initialValues);
      console.log("set vals", form.setFieldsValue(initialValues));
    }
  }, [sectionFourResponse]);

  const handleSubmit = (val: any) => {
    const applicationId = sharedData.applicantId as number;
    const payload = {
      application_id: applicationId,
      responses:
        data?.map((item) => ({
          question_id: item.id,
          response: Array.isArray(val[item.schema_name])
            ? val[item.schema_name]
            : [val[item.schema_name]],
        })) || [],
    };
  
    const putPayload = {
      application_id: id as unknown as number,
      responses:
        data?.map((item) => ({
          question_id: item.id,
          response: Array.isArray(val[item.schema_name])
            ? val[item.schema_name]
            : [val[item.schema_name]],
        })) || [],
    };
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
        queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
        // onNext();
      },
    };

    if (id) {
      mutate(putPayload, notifs);
    } else {
      mutate(payload, notifs);
    }
  };

  return (
    <>
      <Skeleton active loading={isLoading || sectionFourLoading}>
        {sectionFourResponse?.data.length !== 0 ? (
          <Form
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            requiredMark={false}
          >
            {sectionFourResponse?.data.map((item) => (
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
              {/* <AppButton
                label="Next"
                type="button"
                handleClick={onNext}
                variant="transparent"
              /> */}
              <AppButton label="Save" type="submit" isLoading={postLoading} />
            </div>
          </Form>
        ) : (
          // <p>{ sectionOneResponse?.map((item)=>item.question.form_question)}</p>
          <Form
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            requiredMark={false}
          >
            {data?.map((item) => (
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
            {!isSuccess && (
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
                  containerStyle={isSuccess ? "cursor-not-allowed" : ""}
                />
              </div>
            )}
          </Form>
        )}
      </Skeleton>
    </>
  );
};
