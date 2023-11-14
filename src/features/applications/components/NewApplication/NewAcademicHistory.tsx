import { DatePicker, Form, Input,} from "antd";

export const NewAcademicHistory = () => {
  const [form] = Form.useForm();
  // Add more employment
  const handleAddAcademicField = () => {
    const newAcademicHistory = form.getFieldValue("newAcademicHistory") || [];
    const initialAcademicHistory = {
      jobTitle: "",
      nameOfEmployer: "",
      natureOfBusiness: "",
      aptFloorSuite: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      website: "",
      phoneNumber: "",
      startOfEmployment: "",
      endOfEmployment: "",
    };
    form.setFieldsValue({
      newAcademicHistory: [...newAcademicHistory, initialAcademicHistory],
    });
  };

  const handleRemoveAcademicField = (index: number) => {
    const newAcademicHistory = form.getFieldValue("newEmployment") || [];
    form.setFieldsValue({
      newAcademicHistory: newAcademicHistory.filter(
        (_: any, i: number) => i !== index
      ),
    });
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <div className="lg:w-1/2">
          <h2 className="py-4">School 1</h2>
          <div className="flex gap-4">
            <Form.Item name="courseOfStudy" className="w-full">
              <Input
                placeholder="Course of Study"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>

            <Form.Item name="Institution" className="w-full">
              <Input
                placeholder="Name of Institution"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>
          </div>

          <div className="flex gap-4">
            <Form.Item name="city" className="w-full">
              <Input
                placeholder="City"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>

            <Form.Item name="country" className="w-full">
              <Input
                placeholder="Country"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item name="qualification" className="w-full">
              <Input
                placeholder="Qualification Obtained"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item name="dateOfEducation" className="w-full">
              <DatePicker.RangePicker className="w-full" size="large" />
            </Form.Item>
          </div>
        </div>
        <div className="lg:w-1/2">
          <h2 className="py-4">School 2</h2>
          <div className="flex gap-4">
            <Form.Item name="courseOfStudyTwo" className="w-full">
              <Input
                placeholder="Course of Study"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>
            <Form.Item name="institutionTwo" className="w-full">
              <Input
                placeholder="Name of Institution"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item name="cityTwo" className="w-full">
              <Input
                placeholder="City"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>
            <Form.Item name="countryTwo" className="w-full">
              <Input
                placeholder="Country"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item name="qualificationTwo" className="w-full">
              <Input
                placeholder="Qualification Obtained"
                className="w-full"
                size="large"
                required
              />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item name="dateOfEducationTwo" className="w-full">
              <DatePicker.RangePicker className="w-full" size="large" />
            </Form.Item>
          </div>
        </div>
      </div>

      <div>
        <Form.List name="newAcademicHistory">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <div className="flex flex-col lg:flex-row lg:gap-10">
                    <div className="lg:w-1/2">
                      <h2 className="py-4">School </h2>
                      <div className="flex gap-4">
                        <Form.Item name="courseOfStudy" className="w-full">
                          <Input
                            placeholder="Course of Study"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>

                        <Form.Item name="Institution" className="w-full">
                          <Input
                            placeholder="Name of Institution"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>
                      </div>

                      <div className="flex gap-4">
                        <Form.Item name="city" className="w-full">
                          <Input
                            placeholder="City"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>

                        <Form.Item name="country" className="w-full">
                          <Input
                            placeholder="Country"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>
                      </div>
                      <div className="flex gap-4">
                        <Form.Item name="qualification" className="w-full">
                          <Input
                            placeholder="Qualification Obtained"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>
                      </div>
                      <div className="flex gap-4">
                        <Form.Item name="dateOfEducation" className="w-full">
                          <DatePicker.RangePicker
                            className="w-full"
                            size="large"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <h2 className="py-4">School </h2>
                      <div className="flex gap-4">
                        <Form.Item name="courseOfStudyTwo" className="w-full">
                          <Input
                            placeholder="Course of Study"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>
                        <Form.Item name="institutionTwo" className="w-full">
                          <Input
                            placeholder="Name of Institution"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>
                      </div>
                      <div className="flex gap-4">
                        <Form.Item name="cityTwo" className="w-full">
                          <Input
                            placeholder="City"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>
                        <Form.Item name="countryTwo" className="w-full">
                          <Input
                            placeholder="Country"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>
                      </div>
                      <div className="flex gap-4">
                        <Form.Item name="qualificationTwo" className="w-full">
                          <Input
                            placeholder="Qualification Obtained"
                            className="w-full"
                            size="large"
                            required
                          />
                        </Form.Item>
                      </div>
                      <div className="flex gap-4">
                        <Form.Item name="dateOfEducationTwo" className="w-full">
                          <DatePicker.RangePicker
                            className="w-full"
                            size="large"
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <i
                    className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                    onClick={() => {
                      handleRemoveAcademicField(index);
                      remove(field.name);
                    }}
                  ></i>
                </div>
              ))}

              <button
                className="text-[#28A745] py-4"
                onClick={() => {
                  handleAddAcademicField();
                  add();
                }}
              >
                Add More
              </button>
            </>
          )}
        </Form.List>
      </div>
    </>
  );
};
