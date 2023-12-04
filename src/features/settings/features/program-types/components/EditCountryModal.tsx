import { Form, Input, Modal,  Skeleton } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { textInputValidationRules } from "src/utils/formHelpers/validations";
import { useGetSingleCountry } from "../hooks/useGetSingleCountry";
import { useEffect } from "react";
import { useUpdateCountry } from "../hooks/useUpdateCountry";
import { QUERY_KEY_FOR_COUNTRY } from "../hooks/useGetCountry";

interface IEditCountry extends IdentifierProps {
  countryId: React.Key;
}

export const EditCountryModal = ({
  handleClose,
  open,
  countryId,
}: IEditCountry) => {
  const { data: countryData, isLoading: singleCountryLoading } =
    useGetSingleCountry({
      id: countryId as unknown as number,
      queryKey: QUERY_KEY_FOR_COUNTRY,
    });


  useEffect(() => {
    if (countryData) {
      form.setFieldsValue({
        country: countryData.country.country_name,
      });
    }
  }, [countryData]);

  const { putData, isLoading: countryLoading } = useUpdateCountry({
    queryKey: QUERY_KEY_FOR_COUNTRY,
  });

  const [form] = Form.useForm();
  const handleEditCountrySubmit = (val: any) => {
    putData(countryId as unknown as number, val.country);
  };
  return (
    <Skeleton active loading={singleCountryLoading}>
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
    </Skeleton>
  );
};
