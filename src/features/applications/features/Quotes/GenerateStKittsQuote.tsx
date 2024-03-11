import { Form, InputNumber, Select } from "antd";
import { generalValidationRules } from "src/utils/formHelpers/validations";
import { useCreateStKittsNevisQuotes } from "../../hooks/Quotes hooks/useCreateStKittsNevisQuotes";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_QUOTES } from "src/features/payment/pages/Payments";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { useNavigate, useParams } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";

export const GenerateStKittsQuote = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateStKittsNevisQuotes();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate()

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
          navigate(appRoute.send_generated_quotes(id as unknown as number).path)
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
              label="Additional dependents less than 18?"
              name="add_dependents_ls_than_eighteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Additional dependents greater than 18?"
              name="add_dependents_gt_than_eighteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Children aged 0-15yrs?"
              name="children_zero_to_fifteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Children aged 16-18yrs?"
              name="children_sixteen_to_eighteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Children greater than 18yrs?"
              name="children_gt_than_eighteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>
          </div>

          <div className="w-1/2">
            <Form.Item
              label="Parents greater than 65yrs?"
              name="parents_gt_than_sixty_five"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Grandparents greater than 55yrs?"
              name="grand_parents_gt_than_fifty_five"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Siblings age 0-15yrs?"
              name="siblings_zero_to_fifteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              label="Siblings greater than 15yrs?"
              name="siblings_gt_than_fifteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            {/* <Form.Item
              label="Dependents less than 15yrs?"
              name="dependents_ls_than_fifteen"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item> */}

            <Form.Item
              label="Dependents greater than 15yrs?"
              name="dependents_greater_than_fifteen"
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
