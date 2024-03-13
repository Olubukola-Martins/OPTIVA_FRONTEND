import { Form, InputNumber, Select } from "antd";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_QUOTES } from "src/features/payment/pages/Payments";
import { generalValidationRules } from "src/utils/formHelpers/validations";
import { openNotification } from "src/utils/notification";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useCreateAntiguaDonationQuote } from "src/features/applications/hooks/Quotes hooks/useCreateAntiguaDonationQuote";

export const GenerateAntiguaDonationQuote = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateAntiguaDonationQuote();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleSubmit = (val: any) => {
    mutate(
      { id, ...val },
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.response.data.message,
            duration: 8.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            title: "Success",
            state: "success",
            description: res.data.message,
            duration: 6.0,
          });
          form.resetFields();
          queryClient.invalidateQueries([QUERY_KEY_QUOTES]);
          navigate(
            appRoute.send_generated_quotes(id as unknown as number, 6).path
          );
        },
      }
    );
  };
  return (
    <div className="border rounded-lg p-5">
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <div className="flex gap-8">
          <div className="w-1/2">
            <Form.Item
              label="What is the total number of applicants?"
              name="total_number_of_applicants"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Does applicant have a spouse?"
              name="does_applicant_have_a_spouse"
              rules={generalValidationRules}
            >
              <Select
                options={[
                  {
                    value: "yes",
                    label: "Yes",
                  },
                  {
                    value: "no",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Number of dependents 0-11yrs?"
              name="number_of_dependent_zero_to_eleven"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Number of dependents 12-17yrs?"
              name="number_of_dependent_twelve_to_seventeen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>
          </div>

          <div className="w-1/2">
            <Form.Item
              label="Number of dependents greater than 18yrs?"
              name="number_of_dependent_greater_than_eighteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Number of dependents greater than 58?"
              name="number_of_dependent_greater_than_fifty_eight"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5">
          <AppButton
            label="Cancel"
            type="reset"
            // handleClick={() => handleClose()}
            variant="transparent"
          />
          <AppButton label="Generate" type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </div>
  );
};
