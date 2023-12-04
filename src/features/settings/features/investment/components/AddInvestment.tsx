import { Modal, Input, Form, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { textInputValidationRules } from "src/utils/formHelpers/validations";
import { usePostInvestmentRoute } from "../hooks/usePostInvestmentRoute";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { QUERY_KEY_FOR_INVESTMENT_ROUTE } from "../hooks/useGetInvestmentRoute";
import { useGetCountry } from "../../program-types/hooks/useGetCountry";
import type { SelectProps } from "antd";

export interface IAddInvestmentProps extends IdentifierProps {
  isEditing?: boolean; // Add a prop to indicate editing mode
  investmentId?: React.Key; // Add investmentId prop for editing
}

export const AddInvestment = ({ handleClose, open }: IAddInvestmentProps) => {
  // POST REQUEST
  const { mutate, isLoading } = usePostInvestmentRoute();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { data } = useGetCountry();

  // COUNTRY SELECT
  const options: SelectProps["options"] =
    data?.map((item) => ({
      value: item.id,
      label: item.country_name,
      key: item.id,
    })) || [];

  const handleSubmit = (val: any) => {
    console.log("form values", val);
    mutate(
      {
        country_id: val.country,
        investment_name: val.name,
        token,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_INVESTMENT_ROUTE]);
          form.resetFields();
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add Investment Route"
    >
      <Form
        layout="vertical"
        className="mt-4"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Investment Name"
          rules={textInputValidationRules}
        >
          <Input placeholder="Enter..." />
        </Form.Item>
        <Form.Item
          name="country"
          label="Select Country"
          // rules={textInputValidationRules}
        >
          <Select>
            {data?.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.country_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
