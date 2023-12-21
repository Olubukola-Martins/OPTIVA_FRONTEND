import { Form, Skeleton } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "src/features/settings/features/appTemplate/hooks/useGetApplicationTemplate";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetSingleQuestion";
import { renderInput } from "./NewApplicantBrief";

export const NewMarriageDetails = () => {
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
    <Skeleton active loading={isLoading}>
      <Form onFinish={handleSubmit} form={form} layout="vertical">
        {data?.map(
          (item) =>
            item.subsection_name === "marriageDetails" && (
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

    // <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full">
    //   <div className="lg:w-1/2">
    //     <div>
    //       <h2 className="p-2">Marital Status</h2>
    //       <Form.Item name="maritalStatus" className="w-full" required>
    //         <Input size="large" />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-2">Will you be applying with you partner?</h2>
    //       <Form.Item name="applyPartner" className="w-full" required>
    //         <Select
    //           size="large"
    //           options={[
    //             {
    //               value: "Yes",
    //               label: "Yes",
    //             },
    //           ]}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-2">Marriage Certificate Available?</h2>
    //       <Form.Item name="marriageCertificate" className="w-full" required>
    //         <Select
    //           size="large"
    //           options={[
    //             {
    //               value: "Yes",
    //               label: "Yes",
    //             },
    //           ]}
    //         />
    //       </Form.Item>
    //     </div>

    //     <div>
    //       <h2 className="p-2">Spouse Name(s)</h2>
    //       <div className="newApplicantTextArea">
    //         <Form.Item name="firstName" className="w-full" required>
    //           <Input size="large" placeholder="First Name" />
    //         </Form.Item>
    //         <Form.Item name="middleName" className="w-full" required>
    //           <Input size="large" placeholder="Middle Name" />
    //         </Form.Item>
    //       </div>
    //       <div className="newApplicantTextArea">
    //         <Form.Item name="maidenName" className="w-full" required>
    //           <Input size="large" placeholder="Maiden Name" />
    //         </Form.Item>
    //         <Form.Item name="lastName" className="w-full" required>
    //           <Input size="large" placeholder="Last Name" />
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div>
    //       <h2 className="p-2">Gender</h2>
    //       <Form.Item name="gender" className="w-full" required>
    //         <Select
    //           size="large"
    //           options={[
    //             {
    //               value: "Male",
    //               label: "Male",
    //             },
    //           ]}
    //           placeholder="Select input"
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-2">Spouse's Email Address</h2>
    //       <Form.Item name="spouseEmail Address " className="w-full" required>
    //         <Input size="large" />
    //       </Form.Item>
    //     </div>

    //     <div>
    //       <h2 className="p-2">Mobile Phone Number</h2>
    //       <Form.Item name="mobilePhoneNumber" className="w-full" required>
    //         <InputNumber
    //           size="large"
    //           addonBefore={selectBefore}
    //           className="w-full"
    //         />
    //       </Form.Item>
    //     </div>

    //     <div className="py-4">
    //       <h2 className=" text-lg">Physical Address</h2>
    //       <div className="flex justify-between">
    //         <p>Select if the applicant and spouse live seperately</p>
    //         <Form.Item name="physicalAddress" noStyle>
    //           <Switch onChange={handleAddressSwitchChange} />
    //         </Form.Item>
    //       </div>
    //       {showPhysicalAddress && (
    //         <>
    //           <div className="newApplicantTextArea mt-3">
    //             <Form.Item name="aptFloorSuite" className="w-full" required>
    //               <Input size="large" placeholder="Apt/Floor/Suite " />
    //             </Form.Item>
    //             <Form.Item name="street" className="w-full" required>
    //               <Input size="large" placeholder="Street" />
    //             </Form.Item>
    //           </div>
    //           <div className="newApplicantTextArea">
    //             <Form.Item name="city" className="w-full" required>
    //               <Input size="large" placeholder="City" />
    //             </Form.Item>
    //             <Form.Item name="state" className="w-full" required>
    //               <Input size="large" placeholder="State" />
    //             </Form.Item>
    //           </div>
    //           <div className="newApplicantTextArea">
    //             <Form.Item name="country" className="w-full" required>
    //               <Input size="large" placeholder="Country" />
    //             </Form.Item>
    //             <Form.Item name="zipCode" className="w-full" required>
    //               <Input size="large" placeholder="Zip Code" />
    //             </Form.Item>
    //           </div>
    //           <div className="newApplicantTextArea">
    //             <Form.Item name="date" className="w-full" required>
    //               <DatePicker.RangePicker className="w-full" size="large" />
    //             </Form.Item>
    //           </div>
    //         </>
    //       )}
    //     </div>
    //     <div>
    //       <h2 className="p-2">Birth Details</h2>
    //       <div className="newApplicantTextArea">
    //         <Form.Item name="dob" className="w-full" required>
    //           <DatePicker
    //             placeholder="Date of Birth"
    //             className="w-full"
    //             size="large"
    //           />
    //         </Form.Item>
    //         <Form.Item name="countryOfBirth" className="w-full" required>
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Nigeria",
    //                 label: "Nigeria",
    //               },
    //             ]}
    //             placeholder="Country of Birth"
    //           />
    //         </Form.Item>
    //       </div>
    //       <div className="newApplicantTextArea">
    //         <Form.Item name="cityOfBirth" className="w-full" required>
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Lagos",
    //                 label: "Lagos",
    //               },
    //             ]}
    //             placeholder="City of Birth"
    //           />
    //         </Form.Item>
    //         <Form.Item name="lgaOfBirth" className="w-full" required>
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Lagos",
    //                 label: "Lagos",
    //               },
    //             ]}
    //             placeholder="LGA of Birth"
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="p-2">Physical Attributes</h2>
    //       <div className="newApplicantTextArea">
    //         <Form.Item name="height" className="w-full" required>
    //           <Input size="large" placeholder="Height" />
    //         </Form.Item>
    //         <Form.Item name="weight" className="w-full" required>
    //           <Input size="large" placeholder="weight" />
    //         </Form.Item>
    //       </div>
    //       <div className="newApplicantTextArea">
    //         <Form.Item name="eyeColor" className="w-full" required>
    //           <Input size="large" placeholder="Eye Color" />
    //         </Form.Item>
    //         <Form.Item name="hairColor" className="w-full" required>
    //           <Input size="large" placeholder="Hair Color" />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="p-2">Language</h2>
    //       <div className="newApplicantTextArea">
    //         <Form.Item name="nativeLanguage" className="w-full" required>
    //           <Input size="large" placeholder="Native Language" />
    //         </Form.Item>
    //         <Form.Item name="speakFluently" className="w-full" required>
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //             ]}
    //             placeholder="Speak fluently"
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="p-2">Countries of Citizenship</h2>
    //       <div className="newApplicantTextArea">
    //         <Form.Item name="countriesOfCitizenship" className="w-full">
    //           <Select
    //             mode="multiple"
    //             allowClear
    //             onChange={handleChange}
    //             size="large"
    //             options={[
    //               {
    //                 value: "Grenada",
    //                 label: "Grenada",
    //               },
    //               {
    //                 value: "United States",
    //                 label: "United States",
    //               },
    //             ]}
    //             placeholder="Add countries"
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="p-2">Passport No</h2>
    //       <Form.Item name="passportNo" className="w-full">
    //         <Input size="large" />
    //       </Form.Item>
    //     </div>
    //   </div>

    //   <div className="lg:w-1/2">
    //     <>
    //       <div className="py-4">
    //         <h2 className=" text-lg">Previous Spouse(s)</h2>
    //         <div className="flex justify-between">
    //           <p>Select if applicant has been divorced previously</p>
    //           <Form.Item name="previousSpouse" noStyle>
    //             <Switch onChange={handleSwitchChange} />
    //           </Form.Item>
    //         </div>
    //       </div>
    //       {showPreviousSpouseInfo && (
    //         <>
    //           <div>
    //             <div className="newApplicantTextArea">
    //               <Form.Item name="dateOfDivorce" className="w-full">
    //                 <DatePicker
    //                   placeholder="Date of Divorce"
    //                   className="w-full"
    //                   size="large"
    //                 />
    //               </Form.Item>
    //               <Form.Item name="dateOfMarriage" className="w-full">
    //                 <DatePicker
    //                   placeholder="Date of Marriage"
    //                   className="w-full"
    //                   size="large"
    //                 />
    //               </Form.Item>
    //             </div>
    //             <div className="newApplicantTextArea">
    //               <Form.Item name="firstName" className="w-full">
    //                 <Input size="large" placeholder="First Name" />
    //               </Form.Item>
    //               <Form.Item name="middleName" className="w-full">
    //                 <Input size="large" placeholder="Middle Name" />
    //               </Form.Item>
    //             </div>
    //             <div className="newApplicantTextArea">
    //               <Form.Item name="maidenName" className="w-full">
    //                 <Input size="large" placeholder="Maiden Name" />
    //               </Form.Item>
    //               <Form.Item name="lastName" className="w-full">
    //                 <Input size="large" placeholder="Last Name" />
    //               </Form.Item>
    //             </div>
    //             <div className="newApplicantTextArea">
    //               <Form.Item name="dateOfDivorceeBirth" className="w-full">
    //                 <DatePicker
    //                   placeholder="Date of Birth"
    //                   className="w-full"
    //                   size="large"
    //                 />
    //               </Form.Item>
    //               <Form.Item name="divorceeGender" className="w-full">
    //                 <Select
    //                   size="large"
    //                   options={[
    //                     {
    //                       value: "Lagos",
    //                       label: "Lagos",
    //                     },
    //                   ]}
    //                   placeholder="Gender"
    //                 />
    //               </Form.Item>
    //             </div>
    //             <div className="newApplicantTextArea">
    //               <Form.Item
    //                 name="divorceeCountryOfBirth"
    //                 className="w-full"
    //                 required
    //               >
    //                 <Select
    //                   size="large"
    //                   options={[
    //                     {
    //                       value: "Nigeria",
    //                       label: "Nigeria",
    //                     },
    //                   ]}
    //                   placeholder="Country of Birth"
    //                 />
    //               </Form.Item>
    //               <Form.Item
    //                 name="divorceeCityOfBirth"
    //                 className="w-full"
    //                 required
    //               >
    //                 <Select
    //                   size="large"
    //                   options={[
    //                     {
    //                       value: "Lagos",
    //                       label: "Lagos",
    //                     },
    //                   ]}
    //                   placeholder="City of Birth"
    //                 />
    //               </Form.Item>
    //             </div>
    //             <div>
    //               <h2 className="p-2">Mobile Phone Number</h2>
    //               <Form.Item
    //                 name="divorceeMobilePhoneNumber"
    //                 className="w-full"
    //               >
    //                 <InputNumber
    //                   size="large"
    //                   addonBefore={selectBefore}
    //                   className="w-full"
    //                 />
    //               </Form.Item>
    //             </div>
    //             <div>
    //               <h2 className="p-2">Email Address</h2>
    //               <Form.Item name="divorceeEmail Address " className="w-full">
    //                 <Input size="large" />
    //               </Form.Item>
    //             </div>
    //             <div>
    //               <h2 className="p-2">Countries Of Citizenship</h2>
    //               <Form.Item name="countriesOfCitizenship" className="w-full">
    //                 <Select
    //                   mode="multiple"
    //                   allowClear
    //                   onChange={handleChange}
    //                   size="large"
    //                   options={[
    //                     {
    //                       value: "Grenada",
    //                       label: "Grenada",
    //                     },
    //                     {
    //                       value: "United States",
    //                       label: "United States",
    //                     },
    //                   ]}
    //                   placeholder="Add countries"
    //                 />
    //               </Form.Item>
    //             </div>
    //           </div>
    //         </>
    //       )}
    //     </>
    //     {showPreviousSpouseInfo && (
    //       <>
    //         <div className="py-4">
    //           <h2 className=" text-lg">Previous Spouse(2)</h2>
    //           <div className="flex justify-between">
    //             <p>Select if applicant has been divorced previously</p>
    //             <Form.Item name="previousSpouse2" noStyle>
    //               <Switch />
    //             </Form.Item>
    //           </div>
    //         </div>
    //         <div>
    //           <div className="newApplicantTextArea">
    //             <Form.Item name="dateOfDivorce2" className="w-full">
    //               <DatePicker
    //                 placeholder="Date of Divorce"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //             <Form.Item name="dateOfMarriage2" className="w-full">
    //               <DatePicker
    //                 placeholder="Date of Marriage"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="newApplicantTextArea">
    //             <Form.Item name="firstName2" className="w-full">
    //               <Input size="large" placeholder="First Name" />
    //             </Form.Item>
    //             <Form.Item name="middleName2" className="w-full">
    //               <Input size="large" placeholder="Middle Name" />
    //             </Form.Item>
    //           </div>
    //           <div className="newApplicantTextArea">
    //             <Form.Item name="maidenName2" className="w-full">
    //               <Input size="large" placeholder="Maiden Name" />
    //             </Form.Item>
    //             <Form.Item name="lastName2" className="w-full">
    //               <Input size="large" placeholder="Last Name" />
    //             </Form.Item>
    //           </div>
    //           <div className="newApplicantTextArea">
    //             <Form.Item name="dateOfDivorceeBirth2" className="w-full">
    //               <DatePicker
    //                 placeholder="Date of Birth"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //             <Form.Item name="divorceeGender2" className="w-full">
    //               <Select
    //                 size="large"
    //                 options={[
    //                   {
    //                     value: "Lagos",
    //                     label: "Lagos",
    //                   },
    //                 ]}
    //                 placeholder="Gender"
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="newApplicantTextArea">
    //             <Form.Item
    //               name="divorceeCountryOfBirth2"
    //               className="w-full"
    //               required
    //             >
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
    //             <Form.Item
    //               name="divorceeCityOfBirth2"
    //               className="w-full"
    //               required
    //             >
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
    //           </div>
    //           <div>
    //             <h2 className="p-2">Mobile Phone Number</h2>
    //             <Form.Item name="divorceeMobilePhoneNumber2" className="w-full">
    //               <InputNumber
    //                 size="large"
    //                 addonBefore={selectBefore}
    //                 className="w-full"
    //               />
    //             </Form.Item>
    //           </div>
    //           <div>
    //             <h2 className="p-2">Email Address</h2>
    //             <Form.Item name="divorceeEmail Address2" className="w-full">
    //               <Input size="large" />
    //             </Form.Item>
    //           </div>
    //           <div>
    //             <h2 className="p-2">Countries Of Citizenship</h2>
    //             <Form.Item name="countriesOfCitizenship2" className="w-full">
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
    //       </>
    //     )}
    //   </div>
    // </div>
  );
};
