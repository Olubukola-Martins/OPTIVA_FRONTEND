import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { textInputValidationRules } from "src/utils/formHelpers/validations";
import { useGetSingleCountry } from "../hooks/useGetSingleCountry";
import { useEffect } from "react";
import { useUpdateCountry } from "../hooks/useUpdateCountry";
import { QUERY_KEY_FOR_COUNTRY } from "../hooks/useGetCountry";
import { useGetProgramType } from "../hooks/useGetProgramType";
import type { SelectProps } from "antd";

interface IEditCountry extends IdentifierProps {
  countryId: React.Key;
}

export const EditCountryModal = ({
  handleClose,
  open,
  countryId,
}: IEditCountry) => {
  const { data: countryData } = useGetSingleCountry({
    id: countryId as unknown as number,
    queryKey: QUERY_KEY_FOR_COUNTRY,
  });

  const { data: programData } = useGetProgramType();
  console.log("country data", countryData);

  useEffect(() => {
    if (countryData) {
      form.setFieldsValue({
        country: countryData.country.country_name,
        programType:programData?.map((item)=>item.program_name),
      });
    }
  }, [countryData]);

  const { putData, isLoading: countryLoading } = useUpdateCountry({
    queryKey: QUERY_KEY_FOR_COUNTRY,
  });

  // PROGRAM SELECT
  const options: SelectProps["options"] =
    programData?.map((item) => ({
      value: item.id,
      label: item.program_name,
      key: item.id,
    })) || [];

  const [form] = Form.useForm();
  const handleEditCountrySubmit = (val: any) => {
    console.log("value of country", val);
    putData(countryId as unknown as number, val.country, val.programType);
  };
  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <h2 className="text-center text-lg font-bold">Edit Country</h2>
      <Form
        layout="vertical"
        onFinish={handleEditCountrySubmit}
        form={form}
        requiredMark={false}
      >
        <Form.Item
          name="country"
          label="Country"
          required
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
        <Form.Item name="programType" label="Select Program Type" required>
          <Select mode="multiple" allowClear options={options} />
        </Form.Item>

        <div className="flex items-center justify-center gap-5">
          <AppButton
            label="Cancel"
            type="reset"
            handleClick={() => handleClose()}
            variant="transparent"
          />
          <AppButton label="Save" type="submit" isLoading={countryLoading} />
        </div>
      </Form>
    </Modal>
  );
};
