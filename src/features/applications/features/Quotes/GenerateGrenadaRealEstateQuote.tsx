import { Form, InputNumber, Select } from "antd";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_QUOTES } from "src/features/payment/pages/Payments";
import { generalValidationRules } from "src/utils/formHelpers/validations";
import { openNotification } from "src/utils/notification";
import { useCreateGrenadaRealEstateQuotes } from "../../hooks/useCreateGrenadaRealEstateQuotes";

export const GenerateGrenadaRealEstateQuote = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateGrenadaRealEstateQuotes();
  const queryClient = useQueryClient();
  const { id } = useParams();

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
              label="What is the size of the family?"
              name="size_of_family"
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
              label="Number of additional dependents?"
              name="num_of_add_dependents"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Number of unmarried siblings?"
              name="num_of_unmarried_siblings"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Number of dependents less than or equal to 16yrs?"
              name="num_of_dependent_less_than_eq_sixteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>
          </div>

          <div className="w-1/2">
            <Form.Item
              label="Number of dependents greater than 17?"
              name="num_of_dependent_greater_than_seventeen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Number of dependents less than 55yrs?"
              name="num_of_dependent_less_than_fifty_five"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Number of dependents greater than 55yrs?"
              name="num_of_dependent_greater_than_fifty_five"
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
