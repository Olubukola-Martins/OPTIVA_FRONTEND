import {  Form,  Skeleton } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetSingleQuestion";
import { renderInput } from "./NewApplicantBrief";

export const NewChildrenDetails = () => {
  
  const { data, isLoading } = useGetSingleQuestion({
    id: 3,
    endpointUrl: "section-two",
  });
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log("Values of form:", val);
  };
  return (
    <Skeleton active loading={isLoading}>
        <Form onFinish={handleSubmit} form={form} layout="vertical">
      {data?.map(
        (item) =>
          item.subsection_name === "childrenDetails" && (
            <div className="w-full">
            <Form.Item
              name={item.form_question}
              label={item.form_question}
              key={item.id}
              className="w-full"
            >
              {renderInput(item.input_type)}
            </Form.Item>
          </div>
          )
      )}

      <AppButton label="Save" type="submit" />
    </Form>
    </Skeleton>
  
    
  );
};
