import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useGetCountry } from "src/features/settings/features/program-types/hooks/useGetCountry";
import { generalValidationRules, generalValidationRulesOpt } from "src/utils/formHelpers/validations";

interface IProps {
    multiple?: true;
    extraStyles?: string;
    name?: string;
    label?: string;
    hideLabel?: boolean;
    optionalField?: boolean;
  }
  

const FormItemCountry = ({
    multiple,
    extraStyles,
    label,
    name,
    hideLabel,
    optionalField=true,
  }: IProps) => {
    const [allCountriesData, setAllCountriesData] = useState<{
        value: number;
        label: string;
      }[]>();

const {data,isLoading} = useGetCountry();

      useEffect(() => {
        if (data) {
            const value = data.map(({ id, country_name }) => ({value:id,label:country_name}));
    
          setAllCountriesData(value );
        }
      }, [data, isLoading]);
    
    
  return (
    <Form.Item
    className={`${extraStyles}`}
    name={name ? name : "country"}
    label={label ? label : "Select Country"}
    noStyle={hideLabel}
    rules={
      optionalField ? generalValidationRulesOpt : generalValidationRules
    }
>
    <Select           
          mode={multiple ? "multiple" : undefined}
          options={allCountriesData}
          loading={isLoading}
>
    </Select>
  </Form.Item>

  )
}

export default FormItemCountry