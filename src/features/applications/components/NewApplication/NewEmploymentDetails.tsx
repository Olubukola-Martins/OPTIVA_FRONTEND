import {  Form, Skeleton,  } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "src/features/settings/features/appTemplate/hooks/useGetApplicationTemplate";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetSingleQuestion";
import { renderInput } from "./NewApplicantBrief";

export const NewEmploymentDetails = () => {
  const [form] = Form.useForm();

 

  const { data, isLoading } = useGetSingleQuestion({
    id: 3,
    endpointUrl: "section-two",
    queryKey: QUERY_KEY_FOR_APPLICATION_TEMPLATE,
  });
  const handleSubmit = (val: any) => {
    console.log("Values of form:", val);
  };

  return (
    <Skeleton active loading={isLoading}>
      <Form onFinish={handleSubmit} form={form} layout="vertical">
        {data?.map(
          (item) =>
            item.subsection_name === "employmentDetails" && (
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
    // <>
    //   <div className="py-4">
    //     <h2 className=" text-lg">Employment</h2>
    //     <div className="flex justify-between">
    //       <p>Select if applicant is an employee of a company</p>
    //       <Form.Item name="employment" noStyle>
    //         <Switch onChange={toggleEmploymentVisibility} />
    //       </Form.Item>
    //     </div>
    //   </div>
    //   {isEmploymentVisible && (
    //     <>
    //       <div className="flex flex-col lg:flex-row lg:gap-10">
    //         <div className="lg:w-1/2">
    //           <h2 className="py-4">Employment 1</h2>
    //           <div className="flex gap-4">
    //             <Form.Item name="jobTitle" className="w-full">
    //               <Input
    //                 placeholder="Job Title"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="nameOfEmployer" className="w-full">
    //               <Input
    //                 placeholder="Name of Employer "
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="natureOfBusiness" className="w-full">
    //               <Input
    //                 placeholder="Nature of Business"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="aptFloorSuite" className="w-full">
    //               <Input
    //                 placeholder="Apt/Floor/Suite"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="city" className="w-full">
    //               <Input
    //                 placeholder="City"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="state" className="w-full">
    //               <Input
    //                 placeholder="State"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="country" className="w-full">
    //               <Input
    //                 placeholder="Country"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="zipCode" className="w-full">
    //               <Input
    //                 placeholder="Zip/Postcode"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="website" className="w-full">
    //               <Input
    //                 placeholder="Website"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="phoneNumber" className="w-full">
    //               <Input
    //                 placeholder="Phone Number"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="startOfEmployment" className="w-full">
    //               <Input
    //                 placeholder="Start of Employment"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="endOfEmployment" className="w-full">
    //               <Input
    //                 placeholder="End of Employment"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //           </div>
    //         </div>
    //         <div className="lg:w-1/2">
    //           <h2 className="py-4">Employment 2</h2>
    //           <div className="flex gap-4">
    //             <Form.Item name="jobTitleTwo" className="w-full">
    //               <Input
    //                 placeholder="Job Title"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //             <Form.Item name="nameOfEmployerTwo" className="w-full">
    //               <Input
    //                 placeholder="Name of Employer "
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="natureOfBusinessTwo" className="w-full">
    //               <Input
    //                 placeholder="Nature of Business"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //             <Form.Item name="aptFloorSuiteTwo" className="w-full">
    //               <Input
    //                 placeholder="Apt/Floor/Suite"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="cityTwo" className="w-full">
    //               <Input placeholder="City" className="w-full" size="large" />
    //             </Form.Item>
    //             <Form.Item name="stateTwo" className="w-full">
    //               <Input placeholder="State" className="w-full" size="large" />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="countryTwo" className="w-full">
    //               <Input
    //                 placeholder="Country"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //             <Form.Item name="zipCodeTwo" className="w-full">
    //               <Input
    //                 placeholder="Zip/Postcode"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="websiteTwo" className="w-full">
    //               <Input
    //                 placeholder="Website"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //             <Form.Item name="phoneNumberTwo" className="w-full">
    //               <Input
    //                 placeholder="Phone Number"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="startOfEmploymentTwo" className="w-full">
    //               <Input
    //                 placeholder="Start of EmploymentTwo"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //             <Form.Item name="endOfEmploymentTwo" className="w-full">
    //               <Input
    //                 placeholder="End of Employment"
    //                 className="w-full"
    //                 size="large"
    //               />
    //             </Form.Item>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="py-4">
    //         <h2 className="p-1">
    //           Has the applicant or spouse ever worked in any country without
    //           permission? If “Yes”, please explain, if no leave blank:
    //         </h2>
    //         <Form.Item name="workWithoutPermission">
    //           <Input.TextArea rows={4} />
    //         </Form.Item>
    //       </div>

    //       {/* come back to this */}
    //       <div>
    //         <Form.List name="newEmployment">
    //           {(fields, { add, remove }) => (
    //             <>
    //               {fields.map((field, index) => (
    //                 <div key={field.key}>
    //                   <div className="flex flex-col lg:flex-row lg:gap-10">
    //                     <div className="lg:w-1/2">
    //                       <h2 className="py-4">Employment {index + 1}</h2>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           //  name={[field.name, "employmentName"]}
    //                           className="w-full"
    //                           {...field}
    //                         >
    //                           <Input
    //                             placeholder="Job Title"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="nameOfEmployer" className="w-full">
    //                           <Input
    //                             placeholder="Name of Employer "
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="natureOfBusiness"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="Nature of Business"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="aptFloorSuite" className="w-full">
    //                           <Input
    //                             placeholder="Apt/Floor/Suite"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="city" className="w-full">
    //                           <Input
    //                             placeholder="City"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="state" className="w-full">
    //                           <Input
    //                             placeholder="State"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="country" className="w-full">
    //                           <Input
    //                             placeholder="Country"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="zipCode" className="w-full">
    //                           <Input
    //                             placeholder="Zip/Postcode"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="website" className="w-full">
    //                           <Input
    //                             placeholder="Website"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="phoneNumber" className="w-full">
    //                           <Input
    //                             placeholder="Phone Number"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="startOfEmployment"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="Start of Employment"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item
    //                           name="endOfEmployment"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="End of Employment"
    //                             className="w-full"
    //                             size="large"
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                     </div>
    //                     <div className="lg:w-1/2">
    //                       <h2 className="py-4">Employment 2</h2>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="jobTitleTwo" className="w-full">
    //                           <Input
    //                             placeholder="Job Title"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item
    //                           name="nameOfEmployerTwo"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="Name of Employer "
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="natureOfBusinessTwo"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="Nature of Business"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item
    //                           name="aptFloorSuiteTwo"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="Apt/Floor/Suite"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="cityTwo" className="w-full">
    //                           <Input
    //                             placeholder="City"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="stateTwo" className="w-full">
    //                           <Input
    //                             placeholder="State"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="countryTwo" className="w-full">
    //                           <Input
    //                             placeholder="Country"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="zipCodeTwo" className="w-full">
    //                           <Input
    //                             placeholder="Zip/Postcode"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="websiteTwo" className="w-full">
    //                           <Input
    //                             placeholder="Website"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="phoneNumberTwo" className="w-full">
    //                           <Input
    //                             placeholder="Phone Number"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="startOfEmployment"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="Start of EmploymentTwo"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item
    //                           name="endOfEmploymentTwo"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="End of Employment"
    //                             className="w-full"
    //                             size="large"
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <i
    //                     className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
    //                     onClick={() => {
    //                       handleRemoveEmploymentField(index);
    //                       remove(field.name);
    //                     }}
    //                   ></i>
    //                 </div>
    //               ))}

    //               <button
    //                 className="text-[#28A745] py-4"
    //                 onClick={() => {
    //                   handleAddEmploymentField();
    //                   add();
    //                 }}
    //               >
    //                 Add More Employment Details
    //               </button>
    //             </>
    //           )}
    //         </Form.List>
    //       </div>
    //     </>
    //   )}

    //   <div className="py-4">
    //     <h2 className=" text-lg">Professional Certificates/ Licenses </h2>
    //     <div className="flex justify-between">
    //       <p>Select if applicant has any professional certificate/license</p>
    //       <Form.Item name="professionalLicense" noStyle>
    //         <Switch onChange={toggleLicenseVisibility} />
    //       </Form.Item>
    //     </div>
    //   </div>
    //   {isLicenseVisible && (
    //     <>
    //       <div className="flex flex-col lg:flex-row lg:gap-10">
    //         <div className="lg:w-1/2">
    //           <h2 className="py-4">Certificate/License 1</h2>
    //           <div className="flex gap-4">
    //             <Form.Item name="certificate" className="w-full">
    //               <Input
    //                 placeholder="Certificate"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="issuingBody" className="w-full">
    //               <Input
    //                 placeholder="Issuing body"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="dateObtained" className="w-full">
    //               <Input
    //                 placeholder="Date obtained"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="expirationDate" className="w-full">
    //               <Input
    //                 placeholder="Expiration date"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //         </div>
    //         <div className="lg:w-1/2">
    //           <h2 className="py-4">Certificate/License 2</h2>
    //           <div className="flex gap-4">
    //             <Form.Item name="certificateTwo" className="w-full">
    //               <Input
    //                 placeholder="Certificate"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="issuingBodyTwo" className="w-full">
    //               <Input
    //                 placeholder="Issuing body"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="dateObtainedTwo" className="w-full">
    //               <Input
    //                 placeholder="Date obtained"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="expirationDateTwo" className="w-full">
    //               <Input
    //                 placeholder="Expiration date"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //         </div>
    //       </div>

    //       <div>
    //         <Form.List name="newLicense">
    //           {(fields, { add, remove }) => (
    //             <>
    //               {fields.map((field, index) => (
    //                 <div key={field.key}>
    //                   <div className="flex flex-col lg:flex-row lg:gap-10">
    //                     <div className="lg:w-1/2">
    //                       <h2 className="py-4">Certificate/License </h2>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="certificate" className="w-full">
    //                           <Input
    //                             placeholder="Certificate"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="issuingBody" className="w-full">
    //                           <Input
    //                             placeholder="Issuing body"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="dateObtained" className="w-full">
    //                           <Input
    //                             placeholder="Date obtained"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="expirationDate" className="w-full">
    //                           <Input
    //                             placeholder="Expiration date"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                     </div>
    //                     <div className="lg:w-1/2">
    //                       <h2 className="py-4">Certificate/License </h2>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="certificateTwo" className="w-full">
    //                           <Input
    //                             placeholder="Certificate"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="issuingBodyTwo" className="w-full">
    //                           <Input
    //                             placeholder="Issuing body"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="dateObtainedTwo"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="Date obtained"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item
    //                           name="expirationDateTwo"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="Expiration date"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <i
    //                     className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
    //                     onClick={() => {
    //                       handleRemoveLicenseField(index);
    //                       remove(field.name);
    //                     }}
    //                   ></i>
    //                 </div>
    //               ))}

    //               <button
    //                 className="text-[#28A745] py-4"
    //                 onClick={() => {
    //                   handleAddLicenseField();
    //                   add();
    //                 }}
    //               >
    //                 Add More Professional Certificates/ Licenses
    //               </button>
    //             </>
    //           )}
    //         </Form.List>
    //       </div>
    //     </>
    //   )}

    //   <div className="py-4">
    //     <h2 className=" text-lg">Military Service</h2>
    //     <div className="flex justify-between">
    //       <p>
    //         Select if applicant has ever served in the military or paramilitary
    //         of any country?
    //       </p>
    //       <Form.Item name="militaryService" noStyle>
    //         <Switch onChange={toggleMilitaryVisibility} />
    //       </Form.Item>
    //     </div>
    //   </div>
    //   {isMilitaryVisible && (
    //     <>
    //       <div className="flex flex-col lg:flex-row lg:gap-10">
    //         <div className="lg:w-1/2">
    //           <h2 className="py-4">Service</h2>
    //           <div className="flex gap-4">
    //             <Form.Item name="branchOfService" className="w-full">
    //               <Input
    //                 placeholder="Branch of service"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="country" className="w-full">
    //               <Input
    //                 placeholder="Country"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="rank" className="w-full">
    //               <Input
    //                 placeholder="Rank"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="unitNumber" className="w-full">
    //               <Input
    //                 placeholder="Unit Number"
    //                 className="w-full"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="militaryTimePeriod" className="w-full">
    //               <DatePicker.RangePicker className="w-full" size="large" />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="commandingOfficer" className="w-full">
    //               <Input.TextArea
    //                 placeholder="Name of commanding officers (1)"
    //                 className="w-full"
    //                 size="large"
    //                 rows={3}
    //                 required
    //               />
    //             </Form.Item>
    //             <Form.Item name="commandingOfficerTwo" className="w-full">
    //               <Input.TextArea
    //                 placeholder="Name of commanding officers (2)"
    //                 className="w-full"
    //                 size="large"
    //                 rows={3}
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="commandingOfficerThree" className="w-full">
    //               <Input.TextArea
    //                 placeholder="Name of commanding officers (3)"
    //                 className="w-full"
    //                 size="large"
    //                 rows={3}
    //               />
    //             </Form.Item>
    //             <Form.Item name="commandingOfficerFour" className="w-full">
    //               <Input.TextArea
    //                 placeholder="Name of commanding officers (4)"
    //                 className="w-full"
    //                 size="large"
    //                 rows={3}
    //               />
    //             </Form.Item>
    //           </div>
    //         </div>
    //         <div className="lg:w-1/2">
    //           <h2 className="py-4">Active Combat</h2>
    //           <div className="flex gap-4">
    //             <Form.Item name="activeCombatDate" className="w-full">
    //               <DatePicker.RangePicker className="w-full" size="large" />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="location" className="w-full">
    //               <Input
    //                 placeholder="Location"
    //                 className="w-1/2"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="activeCombatDateTwo" className="w-full">
    //               <DatePicker.RangePicker className="w-full" size="large" />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="locationTwo" className="w-full">
    //               <Input
    //                 placeholder="Location"
    //                 className="w-1/2"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="activeCombatDateThree" className="w-full">
    //               <DatePicker.RangePicker className="w-full" size="large" />
    //             </Form.Item>
    //           </div>
    //           <div className="flex gap-4">
    //             <Form.Item name="locationThree" className="w-full">
    //               <Input
    //                 placeholder="Location"
    //                 className="w-1/2"
    //                 size="large"
    //                 required
    //               />
    //             </Form.Item>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="py-4">
    //         <h2>Reason for end of service</h2>
    //         <Form.Item name="endOfServiceReason">
    //           <Input.TextArea rows={4} />
    //         </Form.Item>
    //       </div>

    //       <div>
    //         <Form.List name="newMilitary">
    //           {(fields, { add, remove }) => (
    //             <>
    //               {fields.map((field, index) => (
    //                 <div key={field.key}>
    //                   <div className="flex flex-col lg:flex-row lg:gap-10">
    //                     <div className="lg:w-1/2">
    //                       <h2 className="py-4">Service</h2>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="branchOfService"
    //                           className="w-full"
    //                         >
    //                           <Input
    //                             placeholder="Branch of service"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="country" className="w-full">
    //                           <Input
    //                             placeholder="Country"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="rank" className="w-full">
    //                           <Input
    //                             placeholder="Rank"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item name="unitNumber" className="w-full">
    //                           <Input
    //                             placeholder="Unit Number"
    //                             className="w-full"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="militaryTimePeriod"
    //                           className="w-full"
    //                         >
    //                           <DatePicker.RangePicker
    //                             className="w-full"
    //                             size="large"
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="commandingOfficer"
    //                           className="w-full"
    //                         >
    //                           <Input.TextArea
    //                             placeholder="Name of commanding officers (1)"
    //                             className="w-full"
    //                             size="large"
    //                             rows={3}
    //                             required
    //                           />
    //                         </Form.Item>
    //                         <Form.Item
    //                           name="commandingOfficerTwo"
    //                           className="w-full"
    //                         >
    //                           <Input.TextArea
    //                             placeholder="Name of commanding officers (2)"
    //                             className="w-full"
    //                             size="large"
    //                             rows={3}
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="commandingOfficerThree"
    //                           className="w-full"
    //                         >
    //                           <Input.TextArea
    //                             placeholder="Name of commanding officers (3)"
    //                             className="w-full"
    //                             size="large"
    //                             rows={3}
    //                           />
    //                         </Form.Item>
    //                         <Form.Item
    //                           name="commandingOfficerFour"
    //                           className="w-full"
    //                         >
    //                           <Input.TextArea
    //                             placeholder="Name of commanding officers (4)"
    //                             className="w-full"
    //                             size="large"
    //                             rows={3}
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                     </div>
    //                     <div className="lg:w-1/2">
    //                       <h2 className="py-4">Active Combat</h2>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="activeCombatDate"
    //                           className="w-full"
    //                         >
    //                           <DatePicker.RangePicker
    //                             className="w-full"
    //                             size="large"
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="location" className="w-full">
    //                           <Input
    //                             placeholder="Location"
    //                             className="w-1/2"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="activeCombatDateTwo"
    //                           className="w-full"
    //                         >
    //                           <DatePicker.RangePicker
    //                             className="w-full"
    //                             size="large"
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="locationTwo" className="w-full">
    //                           <Input
    //                             placeholder="Location"
    //                             className="w-1/2"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item
    //                           name="activeCombatDateThree"
    //                           className="w-full"
    //                         >
    //                           <DatePicker.RangePicker
    //                             className="w-full"
    //                             size="large"
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                       <div className="flex gap-4">
    //                         <Form.Item name="locationThree" className="w-full">
    //                           <Input
    //                             placeholder="Location"
    //                             className="w-1/2"
    //                             size="large"
    //                             required
    //                           />
    //                         </Form.Item>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <i
    //                     className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
    //                     onClick={() => {
    //                       handleRemoveMilitaryField(index);
    //                       remove(field.name);
    //                     }}
    //                   ></i>
    //                 </div>
    //               ))}

    //               <button
    //                 className="text-[#28A745] py-4"
    //                 onClick={() => {
    //                   handleAddMilitaryField();
    //                   add();
    //                 }}
    //               >
    //                 Add More Military Details
    //               </button>
    //             </>
    //           )}
    //         </Form.List>
    //       </div>
    //     </>
    //   )}
    // </>
  );
};
