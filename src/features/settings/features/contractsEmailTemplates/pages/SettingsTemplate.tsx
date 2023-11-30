import { Drawer, Form, Skeleton } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { JoditEditorComponent } from "src/features/settings/components/JoditEditor";
import { UseWindowWidth } from "src/features/settings/hooks/UseWindowWidth";
import useUpdateTemplate, { IPropData, QUERY_KEY_EMAIL_TEMPLATES } from "../hooks/useUpdateTemplate";
import { useGetSingleTemplate } from "../hooks/useGetSingleTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";

interface IProps {
  title: string;
  id: number;
  name: string;
}
const SettingsTemplate = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const typeStr = type as string;
    const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { data, isLoading } = useGetSingleTemplate(typeStr);
  const [template,setTemplate]=useState(data?.data[0])
  const [open, setOpen] = useState(false);
  const { mutate,isLoading:updateLoading } = useUpdateTemplate();
  const { drawerSize } = UseWindowWidth();
    const editEmailTemplate = ({ content, name, type }: IPropData) => {
      mutate(
        { content, name, type },
        {
          onError: (error: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description: error.response.message,
              duration: 5,
            });
          },
          onSuccess: (response: any) => {
            openNotification({
              state: "success",
              title: "Success",
              description: response.message,
            });
            form.resetFields();
            navigate(appRoute.contractsEmailTemplates)
            queryClient.invalidateQueries([QUERY_KEY_EMAIL_TEMPLATES, type]);
          },
        }
      );
    };

  useEffect(() => {
    setTemplate(data?.data[0]);
    if (data?.data) {
      const itemData = data.data[0];
      form.setFieldValue("templateDescription", `${itemData.content}`);
    }
  }, [form,type, data,data?.data, isLoading]);

  const onClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
  };
  const handlePreview = () => {
    const values = form.getFieldsValue();
    setOpen(true);
  };
  const handleSave = (values: { templateDescription: JSX.Element }) => {
    editEmailTemplate({content:`${values.templateDescription}`,name:template?.name,type:typeStr});
  };
  return (
    <>
      <PageIntro
        title={`${template?.name || "Template"}`}
        linkBack={appRoute.contractsEmailTemplates}
      />
      <Skeleton active loading={isLoading} paragraph={{ rows: 6 }} title={true}>
        <Form
          form={form}
          onFinish={handleSave}
          name={template?.name?.replace(/[^\w\s]/gi, "")}
        >
          <JoditEditorComponent />
          <div className="flex justify-between ">
            <AppButton
              label="Cancel"
              type="button"
              variant="transparent"
              containerStyle="h-fit"
              handleClick={handleCancel}
            />

            <div className="flex flex-row gap-4">
              <div
                // onClick={handlePreview}
                className="text-[#012168] hover:text-[#801D23] underline decoration-2 decoration-[#012168] hover:decoration-[#801D23] pt-2 font-semibold cursor-pointer "
              >
                Preview
              </div>
              <FormItem>
                <AppButton
                  label="Save"
                  type="submit"
                  isLoading={updateLoading}
                />
              </FormItem>
            </div>
          </div>
        </Form>
      </Skeleton>
      <Drawer
        title={`${template?.name} Preview`}
        placement="right"
        onClose={onClose}
        open={open}
        size={drawerSize}
      ></Drawer>
    </>
  );
};

export default SettingsTemplate;
