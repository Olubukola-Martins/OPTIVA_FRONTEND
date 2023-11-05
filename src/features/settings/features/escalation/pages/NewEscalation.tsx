import { Form, Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";

const NewEscalation = () => {
  return (
    <>
      <PageIntro
        title="Define Escalation "
        description="Define new escalation on the system"
        linkBack={appRoute.escalation}
      />
      <div className="border rounded-xl border-gray-500 mb-10  ">
        <Form name="defineEscalation" layout="vertical">
          <div>
            <div>
              <FormItem label="Escalation Name">
                <Input placeholder="e.g (Accept Client)" />
              </FormItem>
              <FormItem label="Select Role">
                <Select
                  //   placeholder="e.g (Service Manager)"
                  defaultValue={"Service Manager 2"}
                  options={[
                    { value: "Service Manager 1", label: "Service Manager 1" },
                    { value: "Service Manager 2", label: "Service Manager 2" },
                    { value: "Client Manager 1", label: "Client Manager 1" },
                    { value: "Client Manager 2", label: "Client Manager 2" },
                  ]}
                />
              </FormItem>
              <div></div>
              <FormItem label="Task Deadline">
                <Select
                  //   placeholder="e.g (Service Manager)"
                  defaultValue={"2 Hours"}
                  options={[
                    { value: "8 Hours", label: "8 Hours" },
                    { value: "2 Hours", label: "2 Hours" },
                  ]}
                />
              </FormItem>
            </div>
            <div></div>
          </div>
          <div>
            <AppButton />
            <AppButton />
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewEscalation;
