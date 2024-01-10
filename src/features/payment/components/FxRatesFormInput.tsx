import { Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { END_POINT } from "src/config/environment";
import { IAllFxRates } from "src/features/meetings/types/types";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import {
  generalValidationRules,
  generalValidationRulesOpt,
} from "src/utils/formHelpers/validations";

export const QUERY_KEY_FOR_FXRATES = "FxRates";
export const fxRatesUrl = `${END_POINT.BASE_URL}/admin/currency-rates`;

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
  const [allRatesData, setAllRatesData] = useState<
    { value: number; label: string }[] | []
  >([]);
  const {
    data,
    isLoading,
  }: { data: IAllFxRates | undefined; isLoading: boolean } = useFetchAllItems({
    queryKey: QUERY_KEY_FOR_FXRATES,
    urlEndPoint: fxRatesUrl,
  });
  useEffect(() => {
    if (data?.data) {
      console.log(data.data);
      const newArr = data.data.map((rate) => {
        const {
          id,
          source_currency,
          source_currency_amount,
          target_currency,
          target_currency_amount,
        } = rate;
        return {
          value: id,
          label: `${source_currency} ${source_currency_amount} ~ ${target_currency} ${target_currency_amount}`,
        };
      });
      setAllRatesData(newArr);
    }
  }, [data, isLoading]);

  useEffect(() => {}, [allRatesData]);

  return (
    allRatesData && (
      <FormItem
        className={`${extraStyles}`}
        name={name ? name : "fxRate"}
        label={label ? label : "Fx Rate"}
        noStyle={hideLabel}
        rules={
          optionalField ? generalValidationRulesOpt : generalValidationRules
        }
      >
        <Select
          mode={multiple ? "multiple" : undefined}
          options={allRatesData}
          loading={isLoading}
        />
      </FormItem>
    )
  );
};

export default FxRatesFormInput;
