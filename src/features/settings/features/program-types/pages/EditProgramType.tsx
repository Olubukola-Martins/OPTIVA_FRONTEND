import { Form, Input, Select, Skeleton, Spin } from "antd";
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
import {
  generalValidationRules,
  textInputValidationRules,
  textInputValidationRulesOpt,
} from "src/utils/formHelpers/validations";

const EditProgramType = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const id = params.id;
  const { data: programData, isLoading: programLoading } = useGetSingleProgram({
    id: id as unknown as number,
  });
  const { data: dependentData, isSuccess: dependentDataSucess } =
    useGetEligibleDependent();
  const { data: documentData, isSuccess: documentDataSuccess } =
    useGetDocumentRequirement();
  const { data: applicationData } = useGetApplicationTemplate();
  const { data: milestoneData, isSuccess: milestoneDataSucess } =
    useGetMilestone();
  const { data: workflowData,  } =
    useGetWorkflow();
  const { data: countryData, isSuccess: countryDataSuccess } = useGetCountry();

  const { putData, isLoading: putLoading } = useUpdateProgramType({
    queryKey: QUERY_KEY_FOR_PROGRAM_TYPE,
  });


  // APPLICANT OPTION
  const applicantOptions: SelectProps["options"] =
    applicationData?.map((item) => ({
      value: item.id,
      label: item.template_name,
      key: item.id,
    })) || [];

  useEffect(() => {
    if (programData) {
      form.setFieldsValue({
        programName: programData.program_name,
        programLink: programData.program_link,
        eligibleDependents: programData.eligibledependents.map(
          (item) => item.id
        ),
        applicationTemplate: programData.template_id,
        documentRequirement: programData.documentrequirements.map(
          (item) => item.id
        ),
        milestones: programData.milestones.map((item) => item.id),
        selectWorkflow: programData.workflow.name,
        selectCountry: programData.countries.map((item) => item.id),
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
      values.eligibleDependents
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
                  <Select mode="multiple" placeholder="Select" allowClear>
                    {dependentDataSucess ? (
                      dependentData.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.dependant}
                        </Select.Option>
                      ))
                    ) : (
                      <div className="flex justify-center items-center w-full">
                        <Spin size="small" />
                      </div>
                    )}
                  </Select>
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
                  <Select mode="multiple" placeholder="Select" allowClear>
                    {documentDataSuccess ? (
                      documentData.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))
                    ) : (
                      <div className="flex justify-center items-center w-full">
                        <Spin size="small" />
                      </div>
                    )}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="milestones"
                  label="Milestones"
                  rules={generalValidationRules}
                >
                  <Select mode="multiple" placeholder="Select" allowClear>
                    {milestoneDataSucess ? (
                      milestoneData.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.milestone}
                        </Select.Option>
                      ))
                    ) : (
                      <div className="flex justify-center items-center w-full">
                        <Spin size="small" />
                      </div>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="selectWorkflow"
                  label="Select Workflow"
                  rules={generalValidationRules}
                >
                  <Select placeholder="Select" allowClear>
                    {workflowData?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}

                    {/* {workflowDataSuccess ? (
                      workflowData.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))
                    ) : (
                      <div className="flex justify-center items-center w-full">
                        <Spin size="small" />
                      </div>
                    )} */}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="selectCountry"
                  label="Select Country"
                  rules={generalValidationRules}
                >
                  <Select mode="multiple" placeholder="Select" allowClear>
                    {countryDataSuccess ? (
                      countryData.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.country_name}
                        </Select.Option>
                      ))
                    ) : (
                      <div className="flex justify-center items-center w-full">
                        <Spin size="small" />
                      </div>
                    )}
                  </Select>
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
