import { Modal, Input, Form, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import { useGetSingleInvestmentRoute } from "../hooks/useGetSingleInvestmentRoute";
import { QUERY_KEY_FOR_INVESTMENT_ROUTE } from "../hooks/useGetInvestmentRoute";
import { useEffect } from "react";
import { usePutInvestmentRoute } from "../hooks/usePutInvestmentRoute";
import { useGetCountry } from "../../program-types/hooks/useGetCountry";

interface IEditInvestmentProps extends IdentifierProps {
  investmentId: React.Key;
}

export const EditInvestment = ({
  handleClose,
  open,
  investmentId,
}: IEditInvestmentProps) => {
  const { data } = useGetSingleInvestmentRoute({
    id: investmentId as number,
    queryKey: QUERY_KEY_FOR_INVESTMENT_ROUTE,
  });
  const { data: countryData } = useGetCountry();

  const { putData, isLoading: putLoading } = usePutInvestmentRoute({
    queryKey: QUERY_KEY_FOR_INVESTMENT_ROUTE,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        country: data.country_id,
        name: data.investment_name,
      });
    }
  }, [data]);

  const handleSubmit = (values: any) => {
    console.log("values of form", values);
    putData(investmentId as unknown as number, values.name, values.country);
    form.resetFields()
    handleClose();
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Edit Investment Route"
    >
      <Form
        layout="vertical"
        className="mt-4"
        onFinish={handleSubmit}
        requiredMark={false}
        form={form}
      >
        <Form.Item
          name="name"
          label="Investment Name"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="country"
          label="Select Country"
          rules={generalValidationRules}
        >
          <Select>
            {countryData?.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.country_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <AppButton type="submit" isLoading={putLoading} />
      </Form>
      {putLoading && handleClose()}
    </Modal>
  );
};
