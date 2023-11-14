import { Input, Select, Form, DatePicker } from "antd";

export const NewPersonalDetails = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full">
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
      </div>
    </div>
  );
};
