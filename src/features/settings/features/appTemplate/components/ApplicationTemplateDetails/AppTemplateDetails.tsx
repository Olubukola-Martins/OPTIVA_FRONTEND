import { Input, Form, Skeleton } from "antd";
import { AppButton } from "src/components/button/AppButton";
import {
  textInputValidationRules,
  textInputValidationRulesOpt,
} from "src/utils/formHelpers/validations";
import { useGetSingleApplicationTemplate } from "../../hooks/useGetSingleApplicationTemplate";
import { useParams } from "react-router-dom";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "../../hooks/useGetApplicationTemplate";
import { useEffect } from "react";
import { useUpdateTemplateName } from "../../hooks/useUpdateTemplateName";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";

export const AppTemplateDetails = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetSingleApplicationTemplate({
    id: id as unknown as number,
  });

  const { putData, isLoading:putLoading } = useUpdateTemplateName();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, [data]);
 

  const handleSubmit = (val: any) => {
    putData({
      ...val,
      id,
    }),
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.response.data.message,
            duration: 8.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            title: "Success",
            state: "success",
            description: res.data.message,
            duration: 6.0,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATION_TEMPLATE]);
        },
      };
  };
  return (
    <Skeleton active loading={isLoading}>
      <Form form={form} onFinish={handleSubmit}>
        <div className="flex gap-5 ">
          <div className="w-1/2">
            <Form.Item name="template_name" rules={textInputValidationRules}>
              <Input placeholder="Template Name" />
            </Form.Item>
          </div>
          <div className="w-1/2">
            <Form.Item
              name="template_description"
              rules={textInputValidationRulesOpt}
            >
              <Input placeholder="Template Description (Optional)" />
            </Form.Item>
          </div>
        </div>

        {/* BUTTONS TO SUBMIT FORM */}
        <div className="flex justify-end items-center gap-4 mt-5">
          <AppButton label="Cancel" type="reset" variant="transparent" />
          <AppButton label="Save" type="submit" isLoading={putLoading} />
        </div>
      </Form>
    </Skeleton>
  );
};
