import { Drawer, Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { JoditEditorComponent } from "src/features/settings/components/JoditEditor";
import { UseWindowWidth } from "src/features/settings/hooks/UseWindowWidth";

interface IProps {
  title: string;
}
const SettingsTemplate = ({ title }: IProps) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState();
    const { drawerSize } = UseWindowWidth();
    const onClose = () => {
      setOpen(false);
    };

  const handleCancel = () => {
    form.resetFields();
  };
  const handlePreview = () => {
    const values = form.getFieldsValue();
    setFormValues(values);
    setOpen(true);
  };
  const handleSave = (values: any) => {};
  return (
    <>
      <PageIntro
        title={`${title}`}
        linkBack={appRoute.contractsEmailTemplates}
      />
      <Form onFinish={handleSave} name={title.replace(/[^\w\s]/gi, "")}>
        <JoditEditorComponent />
        <div className="flex justify-between ">
          <AppButton
            label="Cancel"
            variant="transparent"
            containerStyle="h-fit"
            handleClick={handleCancel}
          />

          <div className="flex flex-row gap-4">
            <div
              onClick={handlePreview}
              className="text-[#012168] hover:text-[#801D23] underline decoration-2 decoration-[#012168] hover:decoration-[#801D23] pt-2 font-semibold cursor-pointer "
            >
              Preview
            </div>
            <FormItem>
              <AppButton label="Save" type="submit" />
            </FormItem>
          </div>
        </div>
      </Form>
      <Drawer
        title={`${title} Preview`}
        placement="right"
        onClose={onClose}
        open={open}
        size={drawerSize}
      ></Drawer>
    </>
  );
};

export default SettingsTemplate;
