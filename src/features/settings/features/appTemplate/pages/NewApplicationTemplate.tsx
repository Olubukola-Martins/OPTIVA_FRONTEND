import { Form, Input, Select} from "antd";
import { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import Section from "../assets/img/add-section.png";
import { appRoute } from "src/config/routeMgt/routePaths";
import { PageIntro } from "src/components/PageIntro";

interface ISection {
  section_title: string;
  section_description?: string;
  subsections?: Subsection[];
  form_questions?: FormQuestion[];
}

interface Subsection {
  subsection_title: string;
  subsection_description?: string;
  form_questions: FormQuestion[];
}

interface FormQuestion {
  question: string;
  input_type: string;
  is_required: boolean;
  options?: string[];
}

const NewApplicationTemplate = () => {
  const [sections, setSections] = useState<ISection[]>([
    {
      form_questions: [],
      section_description: "",
      section_title: "",
      subsections: [],
    },
  ]);
  const [form] = Form.useForm();
  const [options, setOptions] = useState<string[]>([""]);
  const [selectedInputType, setSelectedInputType] = useState<string | null>(
    null
  );
  const [subsectionSelectedInputType, setSubsectionSelectedInputType] =
    useState<string | null>(null);

  // FUNCTION TO SUBMIT FORM
  const handleSubmit = (val: any) => {
    console.log("values of form", val);
  };

  // FUNCTIONS FOR SELECT COMPONENT
  const handleSelectChange = (value: string) => {
    setSelectedInputType(value);
    setOptions([""]); // Reset options when input type changes
  };
  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  // FUNCTIONS TO ADD NEW QUESTION TO A SUBSECTION
  const handleAddField = () => {
    const newQuestion = form.getFieldValue("newQuestion") || [];
    const initialQuestion = { question: "", inputType: "" };
    form.setFieldsValue({ newQuestion: [...newQuestion, initialQuestion] });
  };

  const handleRemoveField = (index: number) => {
    const newQuestion = form.getFieldValue("newQuestion") || [];
    form.setFieldsValue({
      newQuestion: newQuestion.filter((_: any, i: number) => i !== index),
    });
  };

  const handleAddSubSection = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections?.push({
      form_questions: [],
      subsection_title: "",
      subsection_description: "",
    });
    setSections(updatedSections);
  };

  const handleSubsectionSelectChange = (value: string) => {
    setSubsectionSelectedInputType(value);
    setOptions([""]); // Reset options when input type changes
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        section_title: "",
        form_questions: [],
        section_description: "",
        subsections: [],
      },
    ]);
  };

  // const { token } = useGetUserInfo();
  // const { mutate } = usePostApplicationTemplate();

  // const handleSubmit = (val: any) => {
  //   console.log("application template val", val);

  //   const constructFormData = (values: any): IPostApplication | null => {
  //     const { templateName, description, sections } = values;

  //     if (!templateName || !sections || !Array.isArray(sections)) {
  //       console.error("Invalid form values:", values);
  //       return null;
  //     }

  //     const formData: IPostApplication = {
  //       template_name: templateName,
  //       template_description: description,
  //       sections: sections.map((section) => ({
  //         section_title: section.sectionTitle,
  //         section_description: section.descriptionSectionOne,
  //         subsections: section.subsections.map((subsection: any) => ({
  //           subsection_title: subsection.subSectionTitle,
  //           subsection_description: subsection.descriptionSubSection,
  //           form_questions: subsection.questions.map((question: any) => ({
  //             question: question.question,
  //             input_type: question.inputType,
  //             is_required: question.makeRequiredThree,
  //             options: question.addNewQuestion.map((option: any) => option),
  //           })),
  //         })),
  //       })),
  //       token,
  //     };

  //     return formData;
  //   };

  //   const formData = constructFormData(val);

  //   if (formData) {
  //     mutate(formData);
  //   }
  // };

  return (
    <>
      <PageIntro
        title="New Application Template "
        description="Create a new application template on the system"
        linkBack={appRoute.app_template}
      />

      {/* TEMPLATE FORM */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* TEMPLATE NAME AND DESCRIPTION */}
        <div className="flex gap-5 border rounded shadow p-5">
          <div className="w-1/2">
            <Form.Item name="templateName">
              <Input placeholder="Template Name" />
            </Form.Item>
          </div>
          <div className="w-1/2">
            <Form.Item name="templateDescription">
              <Input placeholder="Description (Optional)" />
            </Form.Item>
          </div>
        </div>

        {/* CREATING FORM SECTIONS */}
        {sections.map((section, sectionIndex) => (
          <>
            <div key={sectionIndex}>
              <h2 className="text-center p-4 font-bold text-lg">
                Section {sectionIndex + 1}
              </h2>

              <div className="border rounded shadow p-5">
                <div className="flex gap-5 ">
                  <div className="w-1/2">
                    <Form.Item name="sectionTitle">
                      <Input placeholder="Section Title" />
                    </Form.Item>
                  </div>
                  <div className="w-1/2">
                    <Form.Item name="sectionDescription">
                      <Input placeholder="Description (Optional)" />
                    </Form.Item>
                  </div>
                </div>

                <h2 className="text-center p-4 font-bold text-lg">
                  Question {sectionIndex + 1}
                </h2>

                <div className="flex gap-5">
                  <div className="w-1/2">
                    <Form.Item label="Question" name="question">
                      <Input placeholder="Question" />
                    </Form.Item>
                  </div>
                  <div className="w-1/2">
                    <Form.Item label="Input Type" name="inputType">
                      <Select
                        onChange={handleSelectChange}
                        placeholder="Select Input Type"
                        options={[
                          { value: "Input", label: "Input" },

                          { value: "Select", label: "Select" },
                          { value: "Text Area", label: "Text Area" },
                          {
                            value: "Date Picker",
                            label: "Date Picker",
                          },
                          { value: "Date Range", label: "Date Range" },
                          {
                            value: "Multiple Select",
                            label: "Multiple Select",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* RENDER INPUT FIELDS TO CREATE OPTIONS FOR SELECT COMPONENT */}
                <div className="w-1/2">
                  {selectedInputType === "Select" ||
                  selectedInputType === "Multiple Select" ? (
                    <>
                      {options.map((option, index) => (
                        <div key={index} className="mt-3">
                          <Form.Item name="selectOptions">
                            <Input
                              placeholder={`Option ${index + 1}`}
                              value={option}
                              onChange={(e) => handleOptionChange(e, index)}
                            />
                          </Form.Item>

                          {index > 0 && (
                            <span
                              className="cursor-pointer text-blue-500"
                              onClick={() => handleRemoveOption(index)}
                            >
                              Remove
                            </span>
                          )}
                        </div>
                      ))}
                      <button
                        className="mt-2 p-2 border rounded-sm text-black"
                        onClick={handleAddOption}
                      >
                        Add more options
                      </button>
                    </>
                  ) : null}
                </div>

                {/* ADD NEW QUESTIONS TO THE SECTION */}
                <div>
                  <Form.List name="newQuestion">
                    {(fields) => (
                      <>
                        {fields.map((field, index) => (
                          <div key={field.key}>
                            <h2 className="text-center p-4 font-bold text-lg">
                              Question {index + 2}
                            </h2>
                            <div className="flex gap-5">
                              <div className="w-1/2">
                                <Form.Item
                                  {...field}
                                  name={[field.name, "newQuestion"]}
                                >
                                  <Input placeholder="Question" />
                                </Form.Item>
                              </div>
                              <div className="w-1/2">
                                <Form.Item
                                  {...field}
                                  name={[field.name, "newQuestionInputType"]}
                                >
                                  <Select
                                    onChange={handleSelectChange}
                                    placeholder="Select Input Type"
                                    options={[
                                      { value: "Input", label: "Input" },

                                      { value: "Select", label: "Select" },
                                      {
                                        value: "Text Area",
                                        label: "Text Area",
                                      },
                                      {
                                        value: "Date Picker",
                                        label: "Date Picker",
                                      },
                                      {
                                        value: "Date Range",
                                        label: "Date Range",
                                      },
                                      {
                                        value: "Multiple Select",
                                        label: "Multiple Select",
                                      },
                                    ]}
                                  />
                                </Form.Item>
                              </div>
                            </div>

                            <div>
                              <div className="w-1/2">
                                {selectedInputType === "Select" ||
                                selectedInputType === "Multiple Select" ? (
                                  <>
                                    {options.map((option, index) => (
                                      <div key={index} className="mt-3">
                                        <Form.Item name="selectOptions">
                                          <Input
                                            placeholder={`Option ${index + 1}`}
                                            value={option}
                                            onChange={(e) =>
                                              handleOptionChange(e, index)
                                            }
                                          />
                                        </Form.Item>

                                        {index > 0 && (
                                          <span
                                            className="cursor-pointer text-blue-500"
                                            onClick={() =>
                                              handleRemoveOption(index)
                                            }
                                          >
                                            Remove
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                    <button
                                      className="mt-2 p-2 border rounded-sm text-black"
                                      onClick={handleAddOption}
                                    >
                                      Add more options
                                    </button>
                                  </>
                                ) : null}
                              </div>
                              <i
                                className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                                onClick={() => handleRemoveField(index)}
                              ></i>
                            </div>
                          </div>
                        ))}

                        <div className="my-5">
                          <button
                            className="mt-2 p-2 border rounded-sm text-black"
                            onClick={handleAddField}
                          >
                            + Add new question
                          </button>
                        </div>
                      </>
                    )}
                  </Form.List>
                </div>

                {/* ADD SUBSECTIONS */}

                {section.subsections?.map((_, subsectionIndex) => (
                  <div key={subsectionIndex}>
                    <h2 className="text-center p-4 font-bold text-lg">
                      Sub-section {subsectionIndex + 1}
                    </h2>
                    <div className="border rounded shadow p-5">
                      <div className="flex gap-5">
                        <div className="w-1/2">
                          <Form.Item name="subSectionTitle">
                            <Input placeholder="Sub section Title" />
                          </Form.Item>
                        </div>
                        <div className="w-1/2">
                          <Form.Item name="descriptionSubSection">
                            <Input placeholder="Description (Optional)" />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="my-5 py 5">
                        <div className="flex gap-5">
                          <div className="w-1/2">
                            <Form.Item name="subSectionQuestion">
                              <Input placeholder="Question" />
                            </Form.Item>
                          </div>
                          <div className="w-1/2">
                            <Form.Item
                              name={`subsections[${subsectionIndex}].selectSubSectionInputField`}
                            >
                              <Select
                                onChange={handleSubsectionSelectChange}
                                placeholder="Select Input Type"
                                options={[
                                  { value: "Text Area", label: "Text Area" },
                                  { value: "Select", label: "Select" },
                                  {
                                    value: "Multiple Select",
                                    label: "Multiple Select",
                                  },
                                  { value: "Input", label: "Input" },
                                  {
                                    value: "Date Picker",
                                    label: "Date Picker",
                                  },
                                  {
                                    value: "Date Range",
                                    label: "Date Range",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="w-1/2">
                          {subsectionSelectedInputType === "Select" ||
                          subsectionSelectedInputType === "Multiple Select" ? (
                            <>
                              {options.map((option, index) => (
                                <div key={index} className="mt-3">
                                  <Form.Item name="subSectionSelectOptions">
                                    <Input
                                      placeholder={`Option ${index + 1}`}
                                      value={option}
                                      onChange={(e) =>
                                        handleOptionChange(e, index)
                                      }
                                    />
                                  </Form.Item>

                                  {index > 0 && (
                                    <span
                                      className="cursor-pointer text-blue-500"
                                      onClick={() => handleRemoveOption(index)}
                                    >
                                      Remove
                                    </span>
                                  )}
                                </div>
                              ))}
                              <button
                                className="mt-2 p-2 border rounded text-black"
                                onClick={handleAddOption}
                              >
                                Add more options
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="my-3 flex gap-2 p-2 text-base justify-center"
                  onClick={() => handleAddSubSection(sectionIndex)}
                >
                  <img src={Section} alt="Add Subsection" />
                  Add new subsection
                </button>
              </div>
            </div>
          </>
        ))}
        {/* BUTTON TO ADD NEW SECTION */}
        <button
          type="button"
          className="my-3 flex gap-2 p-2 text-base justify-center"
          onClick={handleAddSection}
        >
          <img src={Section} alt="Add section" />
          Add section
        </button>

        {/* BUTTONS TO SUBMIT FORM */}
        <div className="flex justify-end items-center gap-4 mt-5">
          <AppButton label="Cancel" type="reset" variant="transparent" />
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </>
  );
};

export default NewApplicationTemplate;
