import { Input, Select, Form, Switch, Modal } from "antd";
import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import Success from "../assets/img/success.png";

const NewApplicationTemplate = () => {
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => { };
  // Add Success
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const renderSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const cancelSuccessModal = () => {
    setShowSuccessModal(false);
  };
  return (
    <>
      <PageIntro
        title="New Application Template "
        description="Create new application template on the system"
        linkBack={appRoute.app_template}
      />
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className="flex gap-5 border rounded p-5">
          <div className="w-1/2">
            <Form.Item name="templateName">
              <Input size="large" placeholder="Template Name" />
            </Form.Item>
          </div>
          <div className="w-1/2">
            <Form.Item name="description">
              <Input size="large" placeholder="Description (Optional)" />
            </Form.Item>
          </div>
        </div>

        <div>
          <h2 className="text-center p-4 font-bold text-lg">Section One</h2>
          <div className="border rounded p-5">
            <div className="flex gap-5 ">
              <div className="w-1/2">
                <Form.Item name="sectionTitle">
                  <Input size="large" placeholder="Section Title" />
                </Form.Item>
              </div>
              <div className="w-1/2">
                <Form.Item name="descriptionSectionOne">
                  <Input size="large" placeholder="Description (Optional)" />
                </Form.Item>
              </div>
            </div>
            <div>
              <h2 className="font-bold py-4">Sub-section</h2>
              <div className="flex justify-between items-center">
                <p>Select if this section would have sub sections</p>
                <Form.Item label="" name="subSection" noStyle>
                  <Switch />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border rounded">
          <div className="flex gap-5 px-5">
            <div className="w-1/2">
              <Form.Item name="question">
                <Input size="large" placeholder="Question" />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item name="inputField">
                <Select
                  size="large"
                  placeholder="Select Input Field"
                  options={[
                    {
                      value: "Text Field",
                      label: "Text Field",
                    },
                    {
                      value: "Dropdown",
                      label: "Dropdown",
                    },
                    {
                      value: "Checkbox",
                      label: "Checkbox",
                    },
                    {
                      value: "Table",
                      label: "Table",
                    },
                    {
                      value: "Phone Number",
                      label: "Phone Number",
                    },
                    {
                      value: "Country",
                      label: "Country",
                    },
                    {
                      value: "Amount",
                      label: "Amount",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="px-5 mt-3">
            <Form.Item name="textField" label="Text Field">
              <Input.TextArea rows={5} />
            </Form.Item>
          </div>
          <div className="flex justify-between items-center p-5">
            <div className="flex gap-2">
              <p>Make it required</p>
              <Form.Item name="makeRequired" noStyle>
                <Switch />
              </Form.Item>
            </div>
            <div className="flex gap-5">
              <i className="ri-pencil-line text-xl cursor-pointer"></i>
              <i className="ri-settings-3-fill text-xl cursor-pointer"></i>
              <i className="ri-delete-bin-line text-xl cursor-pointer"></i>
            </div>
          </div>
        </div>

        <div className=" border rounded p-5 my-5 py-5">
          <div className="flex gap-5">
            <div className="w-1/2">
              <Form.Item name="questionTwo">
                <Input size="large" placeholder="Question" />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item name="selectInputFieldTwo">
                <Select
                  size="large"
                  placeholder="Select Input Field"
                  options={[{ value: "", label: "" }]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-1/2">
              <Form.Item name="dropdownOption">
                <Input size="large" placeholder="Dropdown Option 1" />
              </Form.Item>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-1/2">
              <Form.Item name="addOption">
                <Input size="large" placeholder="Add Option " />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-between items-center p-3">
            <div className="flex gap-2">
              <p>Make it required</p>
              <Form.Item name="makeRequiredTwo" noStyle>
                <Switch />
              </Form.Item>
            </div>
            <div className="flex gap-5">
              <i className="ri-pencil-line text-xl cursor-pointer"></i>
              <i className="ri-settings-3-fill text-xl cursor-pointer"></i>
              <i className="ri-delete-bin-line text-xl cursor-pointer"></i>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-center p-4 font-bold text-lg">
            Sub - section One
          </h2>
          <div className="border rounded p-5">
            <div className="flex gap-5 ">
              <div className="w-1/2">
                <Form.Item name="subSectionTitle">
                  <Input size="large" placeholder="Sub section Title" />
                </Form.Item>
              </div>
              <div className="w-1/2">
                <Form.Item name="descriptionSectionTwo">
                  <Input size="large" placeholder="Description (Optional)" />
                </Form.Item>
              </div>
            </div>

            <div className="my-5 py-5">
              <div className="flex gap-5">
                <div className="w-1/2">
                  <Form.Item name="questionThree">
                    <Input size="large" placeholder="Question" />
                  </Form.Item>
                </div>
                <div className="w-1/2">
                  <Form.Item name="selectInputFieldThree">
                    <Select
                      size="large"
                      placeholder="Select Input Field"
                      options={[{ value: "", label: "" }]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-1/2">
                  <Form.Item name="dropdownOptionTwo">
                    <Input size="large" placeholder="Option 1" />
                  </Form.Item>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-1/2">
                  <Form.Item name="addOptionTwo">
                    <Input size="large" placeholder="Add Option " />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-between items-center p-3">
                <div className="flex gap-2">
                  <p>Make it required</p>
                  <Form.Item name="makeRequiredThree" noStyle>
                    <Switch />
                  </Form.Item>
                </div>
                <div className="flex gap-5">
                  <i className="ri-pencil-line text-xl cursor-pointer"></i>
                  <i className="ri-settings-3-fill text-xl cursor-pointer"></i>
                  <i className="ri-delete-bin-line text-xl cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border rounded">
          <div className=" p-5">
            <div className="flex gap-5 p-5">
              <div className="w-1/2">
                <Form.Item name="categoryTitle">
                  <Input size="large" placeholder="Category Title" />
                </Form.Item>
              </div>
              <div className="w-1/2">
                <Form.Item name="descriptionFour">
                  <Input size="large" placeholder="Description (Optional)" />
                </Form.Item>
              </div>
            </div>
            <div className="flex gap-5 px-5">
              <div className="w-1/2">
                <Form.Item name="questionFour">
                  <Input size="large" placeholder="Question" />
                </Form.Item>
              </div>
              <div className="w-1/2">
                <Form.Item name="inputFieldFour">
                  <Select
                    size="large"
                    placeholder="Select Input Field"
                    options={[
                      {
                        value: "Text Field",
                        label: "Text Field",
                      },
                      {
                        value: "Dropdown",
                        label: "Dropdown",
                      },
                      {
                        value: "Checkbox",
                        label: "Checkbox",
                      },
                      {
                        value: "Table",
                        label: "Table",
                      },
                      {
                        value: "Phone Number",
                        label: "Phone Number",
                      },
                      {
                        value: "Country",
                        label: "Country",
                      },
                      {
                        value: "Amount",
                        label: "Amount",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="px-5 mt-3">
              <Form.Item name="textFieldTwo" label="Text Field">
                <Input.TextArea rows={5} />
              </Form.Item>
            </div>

            <div className="my-5 py-5">
              <div className="flex justify-between items-center p-3">
                <div className="flex gap-2">
                  <p>Make it required</p>
                  <Form.Item name="makeRequiredFour" noStyle>
                    <Switch />
                  </Form.Item>
                </div>
                <div className="flex gap-5">
                  <i className="ri-pencil-line text-xl cursor-pointer"></i>
                  <i className="ri-settings-3-fill text-xl cursor-pointer"></i>
                  <i className="ri-delete-bin-line text-xl cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded p-5 mt-5">
          <div className="flex gap-5 ">
            <div className="w-1/2">
              <Form.Item name="questionFive">
                <Input size="large" placeholder="Question" />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item name="selectInputFieldFive">
                <Select
                  size="large"
                  placeholder="Select Input Field"
                  options={[{ value: "", label: "" }]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex gap-5 ">
            <div className="w-1/2">
              <Form.Item name="numberOfRows">
                <Input size="large" placeholder="Number of rows" />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item name="numberOfColumns">
                <Input size="large" placeholder="Number of columns" />
              </Form.Item>
            </div>
          </div>
          <div className="flex gap-5 ">
            <div className="w-1/2">
              <Form.Item name="inputText">
                <Input size="large" placeholder="Input Text" />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-between items-center p-5">
            <div className="flex gap-2">
              <p>Make it required</p>
              <Form.Item name="makeRequiredFive" noStyle>
                <Switch />
              </Form.Item>
            </div>
            <div className="flex gap-5">
              <i className="ri-pencil-line text-xl cursor-pointer"></i>
              <i className="ri-settings-3-fill text-xl cursor-pointer"></i>
              <i className="ri-delete-bin-line text-xl cursor-pointer"></i>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 mt-5">
          <AppButton label="Cancel" type="reset" variant="transparent" />
          <AppButton label="Save" type="submit" handleClick={renderSuccessModal}/>
        </div>
      </Form>
       {/* ADD SUCCESS MODAL */}
       <Modal
        open={showSuccessModal}
        footer={null}
        onCancel={cancelSuccessModal}
      >
        <div className="flex flex-col items-center gap-4 font-bold">
          <img src={Success} className="mx-auto" />
          <div className="text-center text-lg">
            <h2>Application Template(s)</h2>
            <h2>Added Successfully</h2>
          </div>

          <AppButton label="Back" handleClick={cancelSuccessModal} />
        </div>
      </Modal>
    </>
  );
};

export default NewApplicationTemplate;
