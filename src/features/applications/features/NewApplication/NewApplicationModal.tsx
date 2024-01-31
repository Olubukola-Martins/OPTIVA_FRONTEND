import { Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { useFetchCurrentBranch } from "src/ExtraSettings/hooks/useFetchCurrentBranch";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useGetInvestmentRoute } from "src/features/settings/features/investment/hooks/useGetInvestmentRoute";
import { useGetCountry } from "src/features/settings/features/program-types/hooks/useGetCountry";
import { useGetProgramType } from "src/features/settings/features/program-types/hooks/useGetProgramType";
import { useGlobalContext } from "src/stateManagement/GlobalContext";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import { openNotification } from "src/utils/notification";
import { useCreateApplication } from "../../hooks/useCreateApplication";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/useGetApplication";

interface INewApplicationProps {
  open: boolean;
  handleClose: () => void;
}

export const NewApplicationModal: React.FC<INewApplicationProps> = ({
  open,
  handleClose,
}) => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateApplication();
  const { data: countryData } = useGetCountry();
  const { data: programData } = useGetProgramType();
  const { data: investmentData } = useGetInvestmentRoute();
  const { data: branchData } = useFetchCurrentBranch();
  const queryClient = useQueryClient();
  const { setSharedData } = useGlobalContext();


  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = (val: any) => {
    mutate(
      { branch_id: branchData?.id, ...val },
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
          form.resetFields();
          setFormSubmitted(true);
          navigate(appRoute.new_application);
          setSharedData((prevData: any) => ({
            ...prevData,
            applicantId: res.data.data.applicant.application_id,
            templateId: res.data.data.template_id,
          }));
        },
      }
    );
  };
  return (
    <>
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <div>
            <h1 className="p-4 font-bold text-center text-lg">
              Select Country/Program Type
            </h1>
            <div>
              <h2 className="py-1">
                Which country passport/residency is applicant applying for?
              </h2>
              <Form.Item rules={generalValidationRules} name="country_id">
                <Select>
                  {countryData?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.country_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <h2 className="py-1">
                Which program is the applicant interested in?
              </h2>
              <Form.Item rules={generalValidationRules} name="programtype_id">
                <Select>
                  {programData?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.program_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <h2 className="py-1">
                Which investment route is the applicant interested in?
              </h2>
              <Form.Item
                rules={generalValidationRules}
                name="investmentroute_id"
              >
                <Select>
                  {investmentData?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.investment_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <h2 className="py-1">Number of dependents</h2>
              <Form.Item
                rules={generalValidationRules}
                name="no_of_dependents"
                className="w-full"
              >
                <InputNumber className="w-full" />
              </Form.Item>
            </div>
            <div>
              <h2>What is the applicant full name?</h2>
              <Form.Item name="full_name" rules={textInputValidationRules}>
                <Input />
              </Form.Item>
            </div>
            <div>
              <h2>What is the applicant email?</h2>
              <Form.Item name="email_address" rules={textInputValidationRules}>
                <Input />
              </Form.Item>
            </div>
            <div className="flex items-center justify-center gap-4 p-4">
              <AppButton
                type="reset"
                label="Cancel"
                variant="transparent"
                containerStyle="border border-secondary text-secondary"
              />
              {formSubmitted ? (
                <Link to={appRoute.new_application}>Next</Link>
              ) : (
                <AppButton label="Next" type="submit" isLoading={isLoading} />
              )}
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
