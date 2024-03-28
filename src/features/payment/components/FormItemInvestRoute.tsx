import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useGetInvestmentRoute } from "src/features/settings/features/investment/hooks/useGetInvestmentRoute";
import { generalValidationRules, generalValidationRulesOpt } from "src/utils/formHelpers/validations";

interface IProps {
    multiple?: true;
    extraStyles?: string;
    name?: string;
    label?: string;
    hideLabel?: boolean;
    optionalField?: boolean;
  }
  

const FormItemInvestRoute = ({
    multiple,
    extraStyles,
    label,
    name,
    hideLabel,
    optionalField=true,
  }: IProps) => {
    const [allInvestRouteData, setAllInvestRouteData] = useState<{
        value: number;
        label: string;
      }[]>();

const {data,isLoading} = useGetInvestmentRoute();

      useEffect(() => {
        if (data) {
            const value = data.map(({ id, investment_name }) => ({value:id,label:investment_name}));
    
          setAllInvestRouteData(value );
        }
      }, [data, isLoading]);
    
    
  return (
    <Form.Item
    className={`${extraStyles}`}
    name={name ? name : "investmentRoute"}
    label={label ? label : "Investment Route"}
    noStyle={hideLabel}
    rules={
      optionalField ? generalValidationRulesOpt : generalValidationRules
    }
>
    <Select           
          mode={multiple ? "multiple" : undefined}
          options={allInvestRouteData}
          loading={isLoading}
>
    </Select>
  </Form.Item>

  )
}


export default FormItemInvestRoute