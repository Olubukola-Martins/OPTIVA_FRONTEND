import { Input, DatePicker, Select, Form, InputNumber, Switch } from "antd";

export const NewMarriageDetails = () => {
  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="US" style={{ width: 100 }}>
      <Option value="US">US</Option>
      <Option value="NG">NG</Option>
    </Select>
  );
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  //   const initialMarriageDetailsForm = (
  //     <Form
  //       layout="vertical"
  //       className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full"
  //       requiredMark
  //     >
  //       <div className="w-1/2">
  //         <Form.Item
  //           label="Marital Status"
  //           name="maritalStatus"
  //           className="w-full"
  //           required
  //         >
  //           <Input size="large" />
  //         </Form.Item>
  //         <Form.Item
  //           label="Will you be applying with you partner?"
  //           name="applyPartner"
  //           className="w-full"
  //           required
  //         >
  //           <Select
  //             size="large"
  //             options={[
  //               {
  //                 value: "Yes",
  //                 label: "Yes",
  //               },
  //             ]}
  //           />
  //         </Form.Item>
  //         <Form.Item
  //           label="Marriage Certificate Available?"
  //           name="marriageCertificate"
  //           className="w-full"
  //           required
  //         >
  //           <Select
  //             size="large"
  //             options={[
  //               {
  //                 value: "Yes",
  //                 label: "Yes",
  //               },
  //             ]}
  //           />
  //         </Form.Item>
  //         <div>
  //           <h2 className="p-2">Spouse Name(s)</h2>
  //           <div className="w-full flex justify-evenly gap-6">
  //             <Form.Item name="firstName" className="w-full" required>
  //               <Input size="large" placeholder="First Name" />
  //             </Form.Item>
  //             <Form.Item name="middleName" className="w-full" required>
  //               <Input size="large" placeholder="Middle Name" />
  //             </Form.Item>
  //           </div>
  //           <div className="w-full flex justify-evenly gap-6">
  //             <Form.Item name="maidenName" className="w-full" required>
  //               <Input size="large" placeholder="Maiden Name" />
  //             </Form.Item>
  //             <Form.Item name="lastName" className="w-full" required>
  //               <Input size="large" placeholder="Last Name" />
  //             </Form.Item>
  //           </div>
  //         </div>
  //         <Form.Item label="Gender" name="gender" className="w-full" required>
  //           <Select
  //             size="large"
  //             options={[
  //               {
  //                 value: "Male",
  //                 label: "Male",
  //               },
  //             ]}
  //             placeholder="Select input"
  //           />
  //         </Form.Item>
  //         <Form.Item
  //           label=" Spouse's Email Address "
  //           name=" spouseEmail Address "
  //           className="w-full"
  //           required
  //         >
  //           <Input size="large" />
  //         </Form.Item>
  //         <Form.Item
  //           label="Mobile Phone Number"
  //           name="mobilePhoneNumber"
  //           className="w-full"
  //           required
  //         >
  //           <InputNumber
  //             size="large"
  //             addonBefore={selectBefore}
  //             className="w-full"
  //           />
  //         </Form.Item>
  //         <div className="py-4">
  //           <h2 className=" text-lg">Physical Address</h2>
  //           <div className="flex justify-between">
  //             <p>Select if the applicant and spouse live seperately</p>
  //             <Form.Item name="physicalAddress" noStyle>
  //               <Switch />
  //             </Form.Item>
  //           </div>
  //         </div>
  //         <div>
  //           <h2 className="p-2">Birth Details</h2>
  //           <div className="w-full flex justify-evenly gap-6">
  //             <Form.Item name="dob" className="w-full" required>
  //               <DatePicker
  //                 placeholder="Date of Birth"
  //                 className="w-full"
  //                 size="large"
  //               />
  //             </Form.Item>
  //             <Form.Item name="countryOfBirth" className="w-full" required>
  //               <Select
  //                 size="large"
  //                 options={[
  //                   {
  //                     value: "Nigeria",
  //                     label: "Nigeria",
  //                   },
  //                 ]}
  //                 placeholder="Country of Birth"
  //               />
  //             </Form.Item>
  //           </div>
  //           <div className="w-full flex justify-evenly gap-6">
  //             <Form.Item name="cityOfBirth" className="w-full" required>
  //               <Select
  //                 size="large"
  //                 options={[
  //                   {
  //                     value: "Lagos",
  //                     label: "Lagos",
  //                   },
  //                 ]}
  //                 placeholder="City of Birth"
  //               />
  //             </Form.Item>
  //             <Form.Item name="lgaOfBirth" className="w-full" required>
  //               <Select
  //                 size="large"
  //                 options={[
  //                   {
  //                     value: "Lagos",
  //                     label: "Lagos",
  //                   },
  //                 ]}
  //                 placeholder="LGA of Birth"
  //               />
  //             </Form.Item>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="w-1/2">
  //         <div>
  //           <h2 className="p-2">Physical Attributes</h2>
  //           <div className="w-full flex justify-evenly gap-6">
  //             <Form.Item name="height" className="w-full" required>
  //               <Input size="large" placeholder="Height" />
  //             </Form.Item>
  //             <Form.Item name="weight" className="w-full" required>
  //               <Input size="large" placeholder="weight" />
  //             </Form.Item>
  //           </div>
  //           <div className="w-full flex justify-evenly gap-6">
  //             <Form.Item name="eyeColor" className="w-full" required>
  //               <Input size="large" placeholder="Eye Color" />
  //             </Form.Item>
  //             <Form.Item name="hairColor" className="w-full" required>
  //               <Input size="large" placeholder="Hair Color" />
  //             </Form.Item>
  //           </div>
  //         </div>
  //         <div>
  //           <h2 className="p-2">Language</h2>
  //           <div className="w-full flex justify-evenly gap-6">
  //             <Form.Item name="nativeLanguage" className="w-full" required>
  //               <Input size="large" placeholder="Native Language" />
  //             </Form.Item>
  //             <Form.Item name="speakFluently" className="w-full" required>
  //               <Select
  //                 size="large"
  //                 options={[
  //                   {
  //                     value: "Yes",
  //                     label: "Yes",
  //                   },
  //                 ]}
  //                 placeholder="Speak fluently"
  //               />
  //             </Form.Item>
  //           </div>
  //         </div>
  //         <div>
  //           <h2 className="p-2">Countries of Citizenship</h2>
  //           <div className="w-full flex justify-evenly gap-6">
  //             <Form.Item name="countriesOfCitizenship" className="w-full">
  //               <Select
  //                 mode="multiple"
  //                 allowClear
  //                 onChange={handleChange}
  //                 size="large"
  //                 options={[
  //                   {
  //                     value: "Grenada",
  //                     label: "Grenada",
  //                   },
  //                   {
  //                     value: "United States",
  //                     label: "United States",
  //                   },
  //                 ]}
  //                 placeholder="Add countries"
  //               />
  //             </Form.Item>
  //           </div>
  //         </div>
  //         <Form.Item label="Passport No" name="passportNo" className="w-full">
  //           <Input size="large" />
  //         </Form.Item>
  //         <div className="py-4">
  //           <h2 className=" text-lg">Previous Spouse(s)</h2>
  //           <div className="flex justify-between">
  //             <p>Select if applicant has been divorced previouslyy</p>
  //             <Form.Item name="previousSpouse" noStyle>
  //               <Switch />
  //             </Form.Item>
  //           </div>
  //         </div>
  //       </div>
  //     </Form>
  //   );
  return (
    <div>
      <Form
        layout="vertical"
        className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full"
        requiredMark
      >
        <div className="w-1/2">
          <Form.Item
            label="Marital Status"
            name="maritalStatus"
            className="w-full"
            required
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Will you be applying with you partner?"
            name="applyPartner"
            className="w-full"
            required
          >
            <Select
              size="large"
              options={[
                {
                  value: "Yes",
                  label: "Yes",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Marriage Certificate Available?"
            name="marriageCertificate"
            className="w-full"
            required
          >
            <Select
              size="large"
              options={[
                {
                  value: "Yes",
                  label: "Yes",
                },
              ]}
            />
          </Form.Item>
          <div>
            <h2 className="p-2">Spouse Name(s)</h2>
            <div className="w-full flex justify-evenly gap-6">
              <Form.Item name="firstName" className="w-full" required>
                <Input size="large" placeholder="First Name" />
              </Form.Item>
              <Form.Item name="middleName" className="w-full" required>
                <Input size="large" placeholder="Middle Name" />
              </Form.Item>
            </div>
            <div className="w-full flex justify-evenly gap-6">
              <Form.Item name="maidenName" className="w-full" required>
                <Input size="large" placeholder="Maiden Name" />
              </Form.Item>
              <Form.Item name="lastName" className="w-full" required>
                <Input size="large" placeholder="Last Name" />
              </Form.Item>
            </div>
          </div>
          <Form.Item label="Gender" name="gender" className="w-full" required>
            <Select
              size="large"
              options={[
                {
                  value: "Male",
                  label: "Male",
                },
              ]}
              placeholder="Select input"
            />
          </Form.Item>
          <Form.Item
            label=" Spouse's Email Address "
            name=" spouseEmail Address "
            className="w-full"
            required
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Mobile Phone Number"
            name="mobilePhoneNumber"
            className="w-full"
            required
          >
            <InputNumber
              size="large"
              addonBefore={selectBefore}
              className="w-full"
            />
          </Form.Item>
          <div className="py-4">
            <h2 className=" text-lg">Physical Address</h2>
            <div className="flex justify-between">
              <p>Select if the applicant and spouse live seperately</p>
              <Form.Item name="physicalAddress" noStyle>
                <Switch />
              </Form.Item>
            </div>
          </div>
          <div>
            <h2 className="p-2">Birth Details</h2>
            <div className="w-full flex justify-evenly gap-6">
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
            <div className="w-full flex justify-evenly gap-6">
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
          <div>
            <h2 className="p-2">Physical Attributes</h2>
            <div className="w-full flex justify-evenly gap-6">
              <Form.Item name="height" className="w-full" required>
                <Input size="large" placeholder="Height" />
              </Form.Item>
              <Form.Item name="weight" className="w-full" required>
                <Input size="large" placeholder="weight" />
              </Form.Item>
            </div>
            <div className="w-full flex justify-evenly gap-6">
              <Form.Item name="eyeColor" className="w-full" required>
                <Input size="large" placeholder="Eye Color" />
              </Form.Item>
              <Form.Item name="hairColor" className="w-full" required>
                <Input size="large" placeholder="Hair Color" />
              </Form.Item>
            </div>
          </div>
          <div>
            <h2 className="p-2">Language</h2>
            <div className="w-full flex justify-evenly gap-6">
              <Form.Item name="nativeLanguage" className="w-full" required>
                <Input size="large" placeholder="Native Language" />
              </Form.Item>
              <Form.Item name="speakFluently" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                  placeholder="Speak fluently"
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <h2 className="p-2">Countries of Citizenship</h2>
            <div className="w-full flex justify-evenly gap-6">
              <Form.Item name="countriesOfCitizenship" className="w-full">
                <Select
                  mode="multiple"
                  allowClear
                  onChange={handleChange}
                  size="large"
                  options={[
                    {
                      value: "Grenada",
                      label: "Grenada",
                    },
                    {
                      value: "United States",
                      label: "United States",
                    },
                  ]}
                  placeholder="Add countries"
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item label="Passport No" name="passportNo" className="w-full">
            <Input size="large" />
          </Form.Item>
        </div>

        <div className="w-1/2">
          <>
            <div className="py-4">
              <h2 className=" text-lg">Previous Spouse(s)</h2>
              <div className="flex justify-between">
                <p>Select if applicant has been divorced previously</p>
                <Form.Item name="previousSpouse" noStyle>
                  <Switch />
                </Form.Item>
              </div>
            </div>
            <div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item name="dateOfDivorce" className="w-full">
                  <DatePicker
                    placeholder="Date of Divorce"
                    className="w-full"
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="dateOfMarriage" className="w-full">
                  <DatePicker
                    placeholder="Date of Marriage"
                    className="w-full"
                    size="large"
                  />
                </Form.Item>
              </div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item name="firstName" className="w-full">
                  <Input size="large" placeholder="First Name" />
                </Form.Item>
                <Form.Item name="middleName" className="w-full">
                  <Input size="large" placeholder="Middle Name" />
                </Form.Item>
              </div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item name="maidenName" className="w-full">
                  <Input size="large" placeholder="Maiden Name" />
                </Form.Item>
                <Form.Item name="lastName" className="w-full">
                  <Input size="large" placeholder="Last Name" />
                </Form.Item>
              </div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item name="dateOfDivorceeBirth" className="w-full">
                  <DatePicker
                    placeholder="Date of Birth"
                    className="w-full"
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="divorceeGender" className="w-full">
                  <Select
                    size="large"
                    options={[
                      {
                        value: "Lagos",
                        label: "Lagos",
                      },
                    ]}
                    placeholder="Gender"
                  />
                </Form.Item>
              </div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item
                  name="divorceeCountryOfBirth"
                  className="w-full"
                  required
                >
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
                <Form.Item
                  name="divorceeCityOfBirth"
                  className="w-full"
                  required
                >
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
              </div>
              <Form.Item
                label="Mobile Phone Number"
                name="divorceeMobilePhoneNumber"
                className="w-full"
              >
                <InputNumber
                  size="large"
                  addonBefore={selectBefore}
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                label="Email Address "
                name=" divorceeEmail Address "
                className="w-full"
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="countriesOfCitizenship"
                label="Countries Of Citizenship"
                className="w-full"
              >
                <Select
                  mode="multiple"
                  allowClear
                  onChange={handleChange}
                  size="large"
                  options={[
                    {
                      value: "Grenada",
                      label: "Grenada",
                    },
                    {
                      value: "United States",
                      label: "United States",
                    },
                  ]}
                  placeholder="Add countries"
                />
              </Form.Item>
            </div>
          </>
          <>
            <div className="py-4">
              <h2 className=" text-lg">Previous Spouse(2)</h2>
              <div className="flex justify-between">
                <p>Select if applicant has been divorced previously</p>
                <Form.Item name="previousSpouse2" noStyle>
                  <Switch />
                </Form.Item>
              </div>
            </div>
            <div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item name="dateOfDivorce2" className="w-full">
                  <DatePicker
                    placeholder="Date of Divorce"
                    className="w-full"
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="dateOfMarriage2" className="w-full">
                  <DatePicker
                    placeholder="Date of Marriage"
                    className="w-full"
                    size="large"
                  />
                </Form.Item>
              </div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item name="firstName2" className="w-full">
                  <Input size="large" placeholder="First Name" />
                </Form.Item>
                <Form.Item name="middleName2" className="w-full">
                  <Input size="large" placeholder="Middle Name" />
                </Form.Item>
              </div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item name="maidenName2" className="w-full">
                  <Input size="large" placeholder="Maiden Name" />
                </Form.Item>
                <Form.Item name="lastName2" className="w-full">
                  <Input size="large" placeholder="Last Name" />
                </Form.Item>
              </div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item name="dateOfDivorceeBirth2" className="w-full">
                  <DatePicker
                    placeholder="Date of Birth"
                    className="w-full"
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="divorceeGender2" className="w-full">
                  <Select
                    size="large"
                    options={[
                      {
                        value: "Lagos",
                        label: "Lagos",
                      },
                    ]}
                    placeholder="Gender"
                  />
                </Form.Item>
              </div>
              <div className="w-full flex justify-evenly gap-6">
                <Form.Item
                  name="divorceeCountryOfBirth2"
                  className="w-full"
                  required
                >
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
                <Form.Item
                  name="divorceeCityOfBirth2"
                  className="w-full"
                  required
                >
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
              </div>
              <Form.Item
                label="Mobile Phone Number"
                name="divorceeMobilePhoneNumber2"
                className="w-full"
              >
                <InputNumber
                  size="large"
                  addonBefore={selectBefore}
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                label="Email Address "
                name=" divorceeEmail Address2"
                className="w-full"
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="countriesOfCitizenship2"
                label="Countries Of Citizenship"
                className="w-full"
              >
                <Select
                  mode="multiple"
                  allowClear
                  onChange={handleChange}
                  size="large"
                  options={[
                    {
                      value: "Grenada",
                      label: "Grenada",
                    },
                    {
                      value: "United States",
                      label: "United States",
                    },
                  ]}
                  placeholder="Add countries"
                />
              </Form.Item>
            </div>
          </>
        </div>
      </Form>
    </div>
  );
};
