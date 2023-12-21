import { Form, Skeleton } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "src/features/settings/features/appTemplate/hooks/useGetApplicationTemplate";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetSingleQuestion";
import { renderInput } from "./NewApplicantBrief";

export const NewPersonalDetails = () => {
  const { data, isLoading } = useGetSingleQuestion({
    id: 3,
    endpointUrl: "section-two",
    queryKey: QUERY_KEY_FOR_APPLICATION_TEMPLATE,
  });
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log("Values of form:", val);
  };
  return (
    <>
      <Skeleton active loading={isLoading}>
      <Form onFinish={handleSubmit} form={form} layout="vertical">
        {data?.map(
          (item) =>
            item.subsection_name === "personalDetails" && (
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
     
      {/* <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full">
        <div className="lg:w-1/2">
          <div>
            <h2 className="p-2">Title</h2>
            <Form.Item name="title" className="w-full" required>
              <Input size="large" />
            </Form.Item>
          </div>

          <div>
            <h2 className="p-2">Name(s)</h2>
            <div className="newApplicantTextArea">
              <Form.Item name="firstName" className="w-full" required>
                <Input.TextArea
                  rows={4}
                  size="large"
                  placeholder="First Name"
                />
              </Form.Item>
              <Form.Item name="middleName" className="w-full" required>
                <Input.TextArea
                  rows={4}
                  size="large"
                  placeholder="Middle Name"
                />
              </Form.Item>
            </div>
            <div className="newApplicantTextArea">
              <Form.Item name="middleName" className="w-full" required>
                <Input.TextArea
                  rows={4}
                  size="large"
                  placeholder="Middle Name (2)"
                />
              </Form.Item>
              <Form.Item name="lastName" className="w-full" required>
                <Input.TextArea rows={4} size="large" placeholder="Last Name" />
              </Form.Item>
            </div>
          </div>
          <div>
            <h2 className="p-2">Gender</h2>
            <Form.Item name="gender" className="w-full" required>
              <Input size="large" />
            </Form.Item>
          </div>

          <div>
            <h2 className="p-2">Birth Details</h2>
            <div className="newApplicantTextArea">
              <Form.Item name="dob" className="w-full" required>
                <DatePicker
                  placeholder="Date of Birth"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
              <Form.Item name="countryOfBirth" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Nigeria",
                      label: "Nigeria",
                    },
                  ]}
                  placeholder="Country of Birth"
                />
              </Form.Item>
            </div>
            <div className="newApplicantTextArea">
              <Form.Item name="cityOfBirth" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Lagos",
                      label: "Lagos",
                    },
                  ]}
                  placeholder="City of Birth"
                />
              </Form.Item>
              <Form.Item name="lgaOfBirth" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Lagos",
                      label: "Lagos",
                    },
                  ]}
                  placeholder="LGA of Birth"
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div>
            <h2 className="p-2">Physical Attributes</h2>
            <div className="newApplicantTextArea">
              <Form.Item name="height" className="w-full" required>
                <Input.TextArea rows={4} size="large" placeholder="Height" />
              </Form.Item>
              <Form.Item name="weight" className="w-full" required>
                <Input.TextArea rows={4} size="large" placeholder="weight" />
              </Form.Item>
            </div>
            <div className="newApplicantTextArea">
              <Form.Item name="eyeColor" className="w-full" required>
                <Input.TextArea rows={4} size="large" placeholder="Eye Color" />
              </Form.Item>
              <Form.Item name="hairColor" className="w-full" required>
                <Input.TextArea
                  rows={4}
                  size="large"
                  placeholder="Hair Color"
                />
              </Form.Item>
            </div>
            <div className="newApplicantTextArea">
              <Form.Item
                name="distinguishingFacialMarks"
                className="w-full"
                required
              >
                <Input.TextArea
                  rows={4}
                  size="large"
                  placeholder="Distinguishing Facial Marks"
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <h2 className="p-2">Language</h2>
            <div className="newApplicantTextArea">
              <Form.Item name="nativeLanguage" className="w-full" required>
                <Input.TextArea
                  rows={4}
                  size="large"
                  placeholder="Native Language"
                />
              </Form.Item>
              <Form.Item name="speakFluently" className="w-full" required>
                <Input.TextArea
                  rows={4}
                  size="large"
                  placeholder="Speak Fluently"
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
