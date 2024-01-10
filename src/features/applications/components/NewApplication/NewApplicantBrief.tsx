import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
} from "antd";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "src/features/settings/features/appTemplate/hooks/useGetApplicationTemplate";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetSingleQuestion";

export const renderInput = (inputType: string) => {
  if (inputType === "textarea") {
    return <Input.TextArea className="w-full" />;
  } else if (inputType === "text_input") {
    return <Input className="w-full" />;
  } else if (inputType === "select") {
    return <Select className="w-1/2" />;
  } else if (inputType === "check_box") {
    return <Checkbox className="w-full" />;
  } else if (inputType === "number_input") {
    return <InputNumber className="w-1/2" />;
  } else if (inputType === "date_input") {
    return <DatePicker className="1/2" />;
  }
};

export const NewApplicantBrief = () => {
  const { data, isLoading } = useGetSingleQuestion({
    id: 1,
    endpointUrl: "section-one",
    queryKey: QUERY_KEY_FOR_APPLICATION_TEMPLATE,
  });
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log("Values of form:", val);
  };
  console.log("application questions data", data);

  return (
    <>
      <Skeleton active loading={isLoading}>
        <Form onFinish={handleSubmit} form={form} layout="vertical">
          {data?.map((item) => (
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
          ))}
          <div className="flex justify-end items-center gap-5">
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Skeleton>

      {/* <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full">
        <div className="lg:w-1/2">
          <div>
            <h2>Why is the applicant applying for the program?</h2>
            <Form.Item name="applicantProgram" className="w-full" required>
              <Input.TextArea rows={5} />
            </Form.Item>
          </div>

          <div>
            <h2>Has the applicant started a CBI/RBI application previously?</h2>
            <Form.Item name="previousApplication" className="w-full" required>
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <div>
            <h2>Which Country?</h2>
            <Form.Item name="whichCountry" className="w-full" required>
              <Input size="large" />
            </Form.Item>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div>
            <h2>
              Did the Applicant mention a budget amount that they are willing to
              spend?{" "}
            </h2>
            <Form.Item name="applicantBudget" className="w-full" required>
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <div>
            <h2>How much is the Applicant willing to invest?</h2>
            <Form.Item name="applicantInvest" className="w-full" required>
              <InputNumber
                addonBefore={selectBefore}
                addonAfter={selectAfter}
                size="large"
                className="w-full"
              />
            </Form.Item>
          </div>
        </div>
      </div> */}
    </>
  );
};
