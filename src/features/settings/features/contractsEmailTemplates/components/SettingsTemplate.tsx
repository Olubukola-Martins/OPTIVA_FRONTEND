import {  Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { JoditEditorComponent } from "src/features/settings/components/JoditEditor";

interface IProps {
  title: string;
}

const SettingsTemplate = ({ title }: IProps) => {
  return (
    <>
      <PageIntro
        title={`${title}`}
        linkBack={appRoute.contractsEmailTemplates}
      />
      <Form>
        <JoditEditorComponent />
        <div className="flex justify-between ">
          <AppButton
            label="Cancel"
            variant="transparent"
            containerStyle="h-fit"
          />

          <div className="flex flex-row gap-4">
            <div className="text-[#012168] hover:text-[#801D23] underline decoration-2 decoration-[#012168] hover:decoration-[#801D23] pt-2 font-semibold cursor-pointer ">
              Preview
            </div>
            <FormItem>
              <AppButton label="Save" type="submit" />
            </FormItem>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SettingsTemplate;