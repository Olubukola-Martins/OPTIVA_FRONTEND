import { Form, Select } from "antd";
import { SelectProps } from "antd/lib";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import {
  generalValidationRules,
  generalValidationRulesOpt,
} from "src/utils/formHelpers/validations";
import {
  eligibleDependentURL,
  QUERY_KEY_ELIGIBLE_DEPENDENTS,
} from "../hooks/useCreateEligibleDependents";
import { useEffect, useState } from "react";
import { IQueryDataType } from "src/features/payment/pages/Payments";
import { IAllEligiDependentsResponse } from "src/features/settings/types/settingsType";

interface IProps extends SelectProps {
  multiple?: boolean;
  extraStyles?: string;
  name?: string;
  label?: string;
  hideLabel?: boolean;
  optionalField?: boolean;
}

// interface ITreeDatum {
//   value: any;
//   title: string;
//   children: { value: any; title: string }[];
// }

interface ITreeDatum {
  label: any;
  title: string;
  options: { value: any; label: string }[];
}


const FormItemDependents = ({
  multiple = false,
  extraStyles,
  label,
  name,
  hideLabel,
  optionalField = true,
  ...restProps
}: IProps) => {
  const {
    data: allDependentsData,
    isLoading: allDependentsLoading,
  }: IQueryDataType<IAllEligiDependentsResponse> = useFetchAllItems({
    queryKey: QUERY_KEY_ELIGIBLE_DEPENDENTS,
    urlEndPoint: eligibleDependentURL,
  });

  const [optionsData, setOptionsData] = useState<ITreeDatum[] | []>([]);

  useEffect(() => {
    if (allDependentsData?.data) {
      const data = allDependentsData.data;
      const availableCountries = data
        .map((item) => {
          return { name: item.country.country_name, id: item.country };
        })
        .filter((value, index, self) => {
          const currentValue = value.id.id;
          return (
            self.findIndex((item) => item.id.id === currentValue) === index
          );
        });

      const allSelectData:ITreeDatum[] = availableCountries.map((country) => {
        const childrenData = data
          .filter((item) => item.country.id === country.id.id)
          .map((item) => ({
            value: item.id,
            label: item.dependant,
          }));

        return {
          label: country.name,
          title: country.name,
          options: childrenData,
        };
      });
      setOptionsData(allSelectData);
    }
  }, [allDependentsLoading, allDependentsData]);

  return (
    <Form.Item
      name={name ? name : "dependents"}
      label={label ? label : "Select Dependents"}
      noStyle={hideLabel}
      rules={optionalField ? generalValidationRulesOpt : generalValidationRules}
    >
      <Select
        mode={multiple ? "multiple" : undefined}
        loading={allDependentsLoading}
        options={optionsData}
        placeholder="Select dependent"
        className={`${extraStyles}`}
        {...restProps}
      />
    </Form.Item>
  );
};

export default FormItemDependents;
