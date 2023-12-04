import { Modal, Input,  Form } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { usePostCountry } from "../hooks/usePostCountry";
import { useQueryClient } from "react-query";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { QUERY_KEY_FOR_COUNTRY } from "../hooks/useGetCountry";
import { openNotification } from "src/utils/notification";
import { textInputValidationRules } from "src/utils/formHelpers/validations";

export const AddCountryModal = ({ handleClose, open }: IdentifierProps) => {
  const [form] = Form.useForm();
  // POST REQUEST
  const { mutate, isLoading } = usePostCountry();
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
   const handleCountrySubmit = (val: any) => {
    mutate(
      {
        country_name: val.country,
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_COUNTRY]);
          form.resetFields();
        },
      }
    );
  };
  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <h2 className="text-center font-bold py-2">Add Country</h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleCountrySubmit}
        requiredMark={false}
      >
        <Form.Item
          name="country"
          label="Country"
          rules={textInputValidationRules}
        >
          <Input  />
        </Form.Item>
       
        <div className="flex items-center justify-center gap-4 p-4">
          <AppButton
            variant="transparent"
            label="Cancel"
            type="reset"
            handleClick={() => handleClose}
          />
          <AppButton label="Save" type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
