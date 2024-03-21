import {  Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { END_POINT } from "src/config/environment";
import { useGetCurrency } from "src/features/settings/features/authorizedPersons/hooks/useGetCurrency";
import {
  generalValidationRules,
  generalValidationRulesOpt,
} from "src/utils/formHelpers/validations";

export const QUERY_KEY_FOR_FXRATES = "FxRates";
export const fxRatesUrl = `${END_POINT.BASE_URL}/admin/show/currency-rates/1`;

interface IProps {
  multiple?: true;
  extraStyles?: string;
  name?: string;
  label?: string;
  hideLabel?: boolean;
  optionalField?: boolean;
}

const FxRatesFormInput = ({
  multiple,
  extraStyles,
  label,
  name,
  hideLabel,
  optionalField,
}: IProps) => {
  const [allRatesData, setAllRatesData] = useState<{
    value: number;
    label: string;
  }>();
  

 const {data,isLoading} = useGetCurrency();
  useEffect(() => {
    if (data) {
      // console.log("fxDta",data)
      // console.log("rate",rate)
      // const rate = data[0];

      const {
        // id,
        source_currency,
        source_currency_amount,
        target_currency,
        target_currency_amount,
      } = data;

      const fxRateString = `${source_currency} ${source_currency_amount} ~ ${target_currency} ${target_currency_amount}`;
      const rateValue = {
        value: +target_currency_amount / +source_currency_amount,
        label: fxRateString,
      };
      setAllRatesData(rateValue);
    }
  }, [data, isLoading]);

  useEffect(() => {}, [allRatesData]);

  return (
    allRatesData && (
      <FormItem
        className={`${extraStyles}`}
        initialValue={allRatesData}
        name={name ? name : "fxRate"}
        label={label ? label : "Fx Rate"}
        noStyle={hideLabel}
        rules={
          optionalField ? generalValidationRulesOpt : generalValidationRules
        }
      >
        <Select
          disabled
          mode={multiple ? "multiple" : undefined}
          options={[allRatesData]}
          defaultValue={allRatesData}
          loading={isLoading}
          labelInValue
        />
        {/* <Input readOnly value={}/> */}
      </FormItem>
    )
  );
};

export default FxRatesFormInput;
