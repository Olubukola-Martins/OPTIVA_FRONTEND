import { Form, Input, Select } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";

const CreateProgramType = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Form values submitted:", values);
  };

  return (
    <>
      <PageIntro
        title="Create Program Type"
        description="Create new program type on the system"
        linkBack={appRoute.countryMilestonesProgram}
      />
      <div className="border rounded-lg p-4">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="flex gap-7 lg:flex-row flex-col">
            <div className="w-1/2">
              <Form.Item label="Program Name" required name="programName">
                <Input />
              </Form.Item>

              <Form.Item name="programLink" label="Program Link">
                <Input />
              </Form.Item>

              <Form.Item
                label="Eligible Dependents"
                name="eligibleDependents"
                required
              >
                <Select
                  mode="multiple"
                  options={[
                    {
                      value: "Real Estate",
                      label: "Real Estate",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Application Template"
                name="applicationTemplate"
                required
              >
                <Select
                  options={[
                    {
                      value: "Real Estate",
                      label: "Real Estate",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item
                label="Document Requirement"
                name="documentRequirement"
                required
              >
                <Select
                  mode="multiple"
                  options={[
                    {
                      value: "Real Estate",
                      label: "Real Estate",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="milestones" label="Milestones" required>
                <Select
                  options={[
                    {
                      value: "lorem",
                      label: "lorem",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="selectWorkflow" label="Select Workflow" required>
                <Select
                  options={[
                    {
                      value: "lorem",
                      label: "lorem",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4">
            <AppButton label="Cancel" type="reset" variant="transparent" />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateProgramType;
