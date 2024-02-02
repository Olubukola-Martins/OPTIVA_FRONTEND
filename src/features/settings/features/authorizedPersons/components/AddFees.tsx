import { Form, Input, InputNumber, Select } from "antd";
import { useGetProgramType } from "../../program-types/hooks/useGetProgramType";
import type { SelectProps } from "antd";
import {
  QUERY_KEY_FOR_COUNTRY,
} from "../../program-types/hooks/useGetCountry";
import {
  useGetInvestmentRoute,
} from "../../investment/hooks/useGetInvestmentRoute";
import { useState } from "react";
import { useGetInvestmentByCountry } from "../hooks/useGetInvestmentByCountry";
import { useGetCountryByProgram } from "../hooks/useGetCountryByProgram";
import { generalValidationRules, textInputValidationRules } from "src/utils/formHelpers/validations";

interface IAddFeeProps {
  setInvestmentRoute: (val: number | undefined) => void;
}

export const AddFees = ({ setInvestmentRoute }: IAddFeeProps) => {
  const { data: programData, isLoading: programDataLoading } =
    useGetProgramType();
  const { data: investmentData } = useGetInvestmentRoute();

  const [selectedProgram, setSelectedProgram] = useState<number | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<number | undefined>();
  const { data: countryByProgramData, isLoading: countryByProgramLoading } =
    useGetCountryByProgram({
      queryKey: QUERY_KEY_FOR_COUNTRY,
      id: selectedProgram as unknown as number,
    });
  const {
    data: investmentByCountryData,
    isLoading: investmentByCountryLoading,
  } = useGetInvestmentByCountry({
    id: selectedCountry as unknown as number,
  });

  const programOptions: SelectProps["options"] =
    programData?.map((item) => ({
      value: item.id,
      label: item.program_name,
      key: item.id,
    })) || [];

  return (
    <div className="border rounded-lg p-5">
      <div className="flex gap-8">
        <div className="w-1/2">
          <Form.Item label="Fee Name" name="fee_name" rules={textInputValidationRules}>
            <Input />
          </Form.Item>
          <Form.Item label="Program Type" name="program_type_id" rules={generalValidationRules}>
            <Select
              loading={programDataLoading}
              options={programOptions}
              onChange={(value: number) => {
                setSelectedProgram(value);
              }}
            />
          </Form.Item>
          <Form.Item label="Country" name="country_id" rules={generalValidationRules}>
            <Select
              loading={countryByProgramLoading}
              onChange={(value: number) => {
                setInvestmentRoute(undefined);
                setSelectedCountry(value);
              }}
            >
              {countryByProgramData?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.country_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Investment Route"
            name="investment_route_id"
            rules={generalValidationRules}
          >
            <Select
              loading={investmentByCountryLoading}
              onChange={(value) => {
                setInvestmentRoute(value);
              }}
            >
              {investmentData && selectedCountry !== undefined
                ? investmentByCountryData?.map((item) => (
                    <Select.Option value={item.id} key={item.id}>
                      {item.investment_name}
                    </Select.Option>
                  ))
                : null}
            </Select>
          </Form.Item>

          <Form.Item
            label="Local Processing Fee"
            name="local_processing_fee"
            rules={generalValidationRules}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
        <div className="w-1/2">
          <Form.Item
            label="Local Processing Fee Threshold Payment"
            name="local_processing_fee_threshold_payment"
            rules={generalValidationRules}
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            label="Local Processing Fee Balance Payment"
            name="local_processing_fee_balance_payment"
            rules={generalValidationRules}
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            label="Program Threshold Payment"
            name="program_threshold_payment"
            rules={generalValidationRules}
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            label="Program Balance Payment"
            name="program_balance_payment"
            rules={generalValidationRules}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};
