import { Form, Input, Select, Skeleton } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useGetSingleProgram } from "../hooks/useGetSingleProgram";
import { useParams } from "react-router-dom";
import { QUERY_KEY_FOR_PROGRAM_TYPE } from "../hooks/useGetProgramType";
import { useEffect } from "react";
import { useGetApplicationTemplate } from "../../appTemplate/hooks/useGetApplicationTemplate";
import { useGetDocumentRequirement } from "../hooks/useGetDocumentRequirement";
import { useGetEligibleDependent } from "../hooks/useGetEligibleDependent";
import { useGetMilestone } from "../hooks/useGetMilestone";
import { useGetWorkflow } from "../hooks/useGetWorkflow";
import type { SelectProps } from "antd";
import { useUpdateProgramType } from "../hooks/useUpdateProgramType";
import { useGetCountry } from "../hooks/useGetCountry";

const EditProgramType = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const id = params.id;
  const { data: programData, isLoading: programLoading } = useGetSingleProgram({
    id: id as unknown as number,
    queryKey: QUERY_KEY_FOR_PROGRAM_TYPE,
  });
  const { data: dependentData } = useGetEligibleDependent();
  const { data: documentData } = useGetDocumentRequirement();
  const { data: applicationData } = useGetApplicationTemplate();
  const { data: milestoneData } = useGetMilestone();
  const { data: workflowData } = useGetWorkflow();
  const { data: countryData } = useGetCountry();

  const { putData, isLoading: putLoading } = useUpdateProgramType({
    queryKey: QUERY_KEY_FOR_PROGRAM_TYPE,
  });

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
  
 

  useEffect(() => {
    if (programData) {
      form.setFieldsValue({
        programName: programData.program_name,
        programLink: programData.program_link,
        eligibleDependents: programData.eligibledependents,
        applicationTemplate: programData.template_id,
        documentRequirement: programData.documentrequirements,
        milestones: programData.milestones,
        selectWorkflow: programData.workflow_id,
      });
    }
  }, [programData]);

  const handleSubmit = (values: any) => {
    putData(
      id as unknown as number,
      values.programName,
      values.selectCountry,
      values.programLink,
      values.documentRequirement,
      values.applicationTemplate,
      values.selectWorkflow,
      values.milestones,
      values.eligibleDependents,
      
    );
  };

  return (
    <>
      <PageIntro
        title="Edit Program Type"
        description="Edit program type on the system"
        linkBack={appRoute.countryMilestonesProgram}
      />
      <Skeleton active loading={programLoading}>
        <div className="border rounded-lg p-4">
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
          >
            <div className="flex lg:gap-7 lg:flex-row flex-col">
              <div className="lg:w-1/2">
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
                    allowClear
                    options={dependentOptions}
                  />
                </Form.Item>
                <Form.Item
                  label="Application Template"
                  name="applicationTemplate"
                  required
                >
                  <Select allowClear options={applicantOptions} />
                </Form.Item>
              </div>
              <div className="lg:w-1/2">
                <Form.Item
                  label="Document Requirement"
                  name="documentRequirement"
                  required
                >
                  <Select
                    mode="multiple"
                    allowClear
                    options={documentOptions}
                  />
                </Form.Item>
                <Form.Item name="milestones" label="Milestones" required>
                  <Select
                    mode="multiple"
                    allowClear
                    options={milestoneOptions}
                  />
                </Form.Item>
                <Form.Item
                  name="selectWorkflow"
                  label="Select Workflow"
                  required
                >
                  <Select allowClear options={workflowOptions} />
                </Form.Item>
                <Form.Item name="selectCountry" label="Select Country" required>
                  <Select allowClear options={countryOptions} mode="multiple" />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4">
              <AppButton label="Cancel" type="reset" variant="transparent" />
              <AppButton label="Save" type="submit" isLoading={putLoading} />
            </div>
          </Form>
        </div>
      </Skeleton>
    </>
  );
};

export default EditProgramType;
