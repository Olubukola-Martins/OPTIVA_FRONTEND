import { Select, Spin } from "antd";
import { useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import {
  generalValidationRules,
  generalValidationRulesOpt,
} from "src/utils/formHelpers/validations";
import { rolesProps } from "../types";
import { useFetchRoles } from "../hooks/useFetchRoles";

export const FormRolesInput: React.FC<{
  handleSelect?: (val: number, role?: rolesProps) => void;
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

  const { data, isLoading, isSuccess } = useFetchRoles({
    search: debouncedSearchTerm,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      fieldKey={fieldKey}
      name={control?.name ?? "roles"}
      label={showLabel ? control?.label ?? "Role" : null}
      rules={optional ? generalValidationRulesOpt : generalValidationRules}
    >
      <Select
        mode={mode}
        onSelect={(val: number) => {
          if (handleSelect) {
            const role = data?.find((emp) => emp.id === val);
            handleSelect(val, role);
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
          data?.map((item) => (
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
