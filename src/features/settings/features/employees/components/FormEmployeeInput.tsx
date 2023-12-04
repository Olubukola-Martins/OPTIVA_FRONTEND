import { Select, Spin } from "antd";
import { useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import {
  generalValidationRules,
  generalValidationRulesOpt,
} from "src/utils/formHelpers/validations";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { employeesProps } from "../types";

export const FormEmployeeInput: React.FC<{
  handleSelect?: (val: number, employee?: employeesProps) => void;
  fieldKey?: number;
  Form: any;
  showLabel?: boolean;
  optional?: boolean;
  mode?: "multiple" | "tags";
  control?: { label: string; name: string | (string | number)[] };
}> = ({
  Form,
  showLabel = true,
  control,
  handleSelect,
  fieldKey,
  optional = false,
  mode,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isLoading, isSuccess } = useFetchEmployees({
    currentUrl: "active-employees",
    search: debouncedSearchTerm,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      className="w-full"
      fieldKey={fieldKey}
      name={control?.name ?? "employee_id"}
      label={showLabel ? control?.label ?? "Employee" : null}
      rules={optional ? generalValidationRulesOpt : generalValidationRules}
    >
      <Select
        mode={mode}
        onSelect={(val: number) => {
          if (handleSelect) {
            const employee = data?.data.find((emp) => emp.id === val);
            handleSelect(val, employee);
          }
        }}
        placeholder="Select"
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        loading={isLoading}
        filterOption={false}
      >
        {isSuccess ? (
          data?.data.map((item) => (
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
  );
};
