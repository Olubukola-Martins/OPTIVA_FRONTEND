import { Form, Input } from "antd";
import { AppButton } from "src/components/button/AppButton";
import {
  textInputValidationRules,
  textInputValidationRulesOpt,
} from "src/utils/formHelpers/validations";
import { usePostTemplateName } from "../../hooks/usePostTemplateName";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "../../hooks/useGetApplicationTemplate";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useGetSingleApplicationTemplate } from "../../hooks/useGetSingleApplicationTemplate";
import { useEffect } from "react";
import { useUpdateTemplateName } from "../../hooks/useUpdateTemplateName";

interface IAppTemplateProps {
  setTemplateCreated: (value: boolean) => void;
  setResId: (value: number) => void;
}

export const AppTemplate: React.FC<IAppTemplateProps> = ({
  setTemplateCreated,
  setResId,
}) => {
  const { mutate, isLoading, isSuccess } = usePostTemplateName();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: tempDescData, } =
    useGetSingleApplicationTemplate({
      id: id as unknown as number,
    });
  const [form] = Form.useForm();

  const { putData, isLoading: putLoading } = useUpdateTemplateName();

  useEffect(() => {
    if (tempDescData && id) {
      form.setFieldsValue({ ...tempDescData });
    }
  }, [tempDescData, id, form]);

  const handleSubmit = (val: any) => {
    const notifs = {
      onError: (err: any) => {
        openNotification({
          title: "Error",
          state: "error",
          description: err.response.data.message,
          duration: 8.0,
        });
        setTemplateCreated(false);
      },
      onSuccess: (res: any) => {
        openNotification({
          title: "Success",
          state: "success",
          description: res.data.message,
          duration: 6.0,
        });
        setResId(res.data.data.id);
        queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATION_TEMPLATE]);
        setTemplateCreated(true);
      },
    };
    if (id && tempDescData) {
      putData({
        ...val,
        id,
      }),
        notifs;
    } else {
      mutate(
        {
          ...val,
        },
        notifs
      );
    }
  };
  return (
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
        <AppButton
          label="Cancel"
          type="reset"
          variant="transparent"
          containerStyle={isSuccess ? "cursor-not-allowed" : ""}
        />
        <AppButton
          label="Save"
          type="submit"
          isLoading={isLoading || putLoading}
          isDisabled={isSuccess}
          containerStyle={isSuccess ? "cursor-not-allowed" : ""}
        />
      </div>
    </Form>
  );
};
