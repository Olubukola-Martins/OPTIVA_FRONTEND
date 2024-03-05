import { Form, Input, Select } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { usePostProgramType } from "../hooks/usePostProgramType";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_PROGRAM_TYPE } from "../hooks/useGetProgramType";
import { useQueryClient } from "react-query";
import { useGetEligibleDependent } from "../hooks/useGetEligibleDependent";
import type { SelectProps } from "antd";
import { useGetDocumentRequirement } from "../hooks/useGetDocumentRequirement";
import { useGetApplicationTemplate } from "../../appTemplate/hooks/useGetApplicationTemplate";
import { useGetMilestone } from "../hooks/useGetMilestone";
import { useGetWorkflow } from "../hooks/useGetWorkflow";
import { useGetCountry } from "../hooks/useGetCountry";
import {
  generalValidationRules,
  textInputValidationRules,
  textInputValidationRulesOpt,
} from "src/utils/formHelpers/validations";

const CreateProgramType = () => {
  const [form] = Form.useForm();
  const { token } = useGetUserInfo();
  const queryClient = useQueryClient();
  const { mutate, isLoading: postLoading } = usePostProgramType();
  const { data: dependentData } = useGetEligibleDependent();
  const { data: documentData } = useGetDocumentRequirement();
  const { data: applicationData } = useGetApplicationTemplate();
  const { data: milestoneData } = useGetMilestone();
  const { data: workflowData } = useGetWorkflow();
  const { data: countryData } = useGetCountry();

  // DEPENDENT OPTION
  const dependentOptions: SelectProps["options"] =
    dependentData?.map((item) => ({
      value: item.id,
      label: item.dependant,
      key: item.id,
    })) || [];

  // DOCUMENT OPTION
  const documentOptions: SelectProps["options"] =
    documentData?.map((item) => ({
      value: item.id,
      label: item.name,
      key: item.id,
    })) || [];

  // APPLICANT OPTION
  const applicantOptions: SelectProps["options"] =
    applicationData?.map((item) => ({
      value: item.id,
      label: item.template_name,
      key: item.id,
    })) || [];

  // MILESTONE OPTION
  const milestoneOptions: SelectProps["options"] =
    milestoneData?.map((item) => ({
      value: item.id,
      label: item.milestone,
      key: item.id,
    })) || [];

  // WORKFLOW OPTION
  const workflowOptions: SelectProps["options"] =
    workflowData?.map((item) => ({
      value: item.id,
      label: item.name,
      key: item.id,
    })) || [];

  // COUNTRY OPTION
  const countryOptions: SelectProps["options"] =
    countryData?.map((item) => ({
      value: item.id,
      label: item.country_name,
      key: item.id,
    })) || [];

  const handleSubmit = (values: any) => {
    mutate(
      {
        token,
        program_name: values.programName,
        program_link: values.programLink,
        eligible_dependants: values.eligibleDependents,
        document_requirements: values.documentRequirement,
        milestones: values.milestones,
        template_id: values.applicationTemplate,
        workflow_id: values.selectWorkflow,
        countries: values.selectCountry,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_PROGRAM_TYPE]);
          form.resetFields();
        },
      }
    );
  };

  return (
    <>
      <PageIntro
        title="Create Program Type"
        description="Create new program type on the system"
        linkBack={appRoute.countryMilestonesProgram}
      />
      <div className="border rounded-lg p-4">
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <div className="flex lg:gap-7 lg:flex-row flex-col">
            <div className="lg:w-1/2">
              <Form.Item
                label="Program Name"
                rules={textInputValidationRules}
                name="programName"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="programLink"
                label="Program Link"
                rules={textInputValidationRulesOpt}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Eligible Dependents"
                name="eligibleDependents"
                rules={generalValidationRules}
              >
                <Select mode="multiple" allowClear options={dependentOptions} />
              </Form.Item>
              <Form.Item
                label="Application Template"
                name="applicationTemplate"
                rules={generalValidationRules}
              >
                <Select allowClear options={applicantOptions} />
              </Form.Item>
            </div>
            <div className="lg:w-1/2">
              <Form.Item
                label="Document Requirement"
                name="documentRequirement"
                rules={generalValidationRules}
              >
                <Select mode="multiple" allowClear options={documentOptions} />
              </Form.Item>
              <Form.Item
                name="milestones"
                label="Milestones"
                rules={generalValidationRules}
              >
                <Select mode="multiple" allowClear options={milestoneOptions} />
              </Form.Item>
              <Form.Item
                name="selectWorkflow"
                label="Select Workflow"
                rules={generalValidationRules}
              >
                <Select allowClear options={workflowOptions} />
              </Form.Item>

              <Form.Item
                name="selectCountry"
                label="Select Country"
                rules={generalValidationRules}
              >
                <Select allowClear options={countryOptions} mode="multiple" />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4">
            <AppButton label="Cancel" type="reset" variant="transparent" />
            <AppButton label="Save" type="submit" isLoading={postLoading} />
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateProgramType;
