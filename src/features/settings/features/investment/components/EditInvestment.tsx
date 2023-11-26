import { Modal, Input, Form, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { textInputValidationRules } from "src/utils/formHelpers/validations";
import { useGetSingleInvestmentRoute } from "../hooks/useGetSingleInvestmentRoute";
import { QUERY_KEY_FOR_INVESTMENT_ROUTE } from "../hooks/useGetInvestmentRoute";
import { useEffect } from "react";
import { usePutInvestmentRoute } from "../hooks/usePutInvestmentRoute";
import type { SelectProps } from "antd";
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
  const { data: countryData,} = useGetCountry();

  const { putData, isLoading: putLoading } = usePutInvestmentRoute({
    queryKey: QUERY_KEY_FOR_INVESTMENT_ROUTE,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        country: data.country,
        name: data.investment_name,
      });
    }
  }, [data]);

  // COUNTRY SELECT
  const options: SelectProps["options"] =
    countryData?.map((item) => ({
      value: item.id,
      label: item.country_name,
      key: item.id,
    })) || [];

  const handleSubmit = (values: any) => {
    console.log('values of form', values)
    putData(investmentId as unknown as number, values.name, values.country);
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
          //   rules={textInputValidationRules}
        >
          <Select
            mode="multiple"
            allowClear
            options={options}
            // loading={countryLoading}
          />
        </Form.Item>

        <AppButton type="submit" isLoading={putLoading} />
      </Form>
    </Modal>
  );
};
