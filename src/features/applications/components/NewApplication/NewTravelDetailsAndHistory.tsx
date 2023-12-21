import { Form, Skeleton,  } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "src/features/settings/features/appTemplate/hooks/useGetApplicationTemplate";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetSingleQuestion";
import { renderInput } from "./NewApplicantBrief";


export const NewTravelDetailsAndHistory = () => {
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
          item.subsection_name === "travelDetails" && (
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
    //   <div className="p-2 mt-2">
    //     <h2>
    //       Ignore this section if this is the first time the applicant is
    //       applying
    //     </h2>
    //     <div >
    //       <h2 className="font-bold py-2 mt-5">
    //         Passport & Citizenship Details
    //       </h2>
    //       <div className="py-2 mb-3">
    //         <AppButton
    //           label="Add passport and citizenship details"
    //           handleClick={onAddNewPassportDetail}
    //         />
    //       </div>
    //       <div className="p-2 lg:w-[1200px] mx-auto">
    //         <Table
    //           columns={passportColumns}
    //           dataSource={passportDataSource}
    //           className="bg-white rounded-md shadow border mt-2"
    //           scroll={{ x: 200 }}
    //         />
    //       </div>
    //     </div>

    //     <div >
    //       <h2 className="font-bold py-2 mt-5">Residency History</h2>
    //       <div className="py-2 mb-3">
    //         <AppButton
    //           label="Add residency details"
    //           handleClick={onAddNewResidencyDetail}
    //         />
    //       </div>
    //       <div className="p-2 lg:w-[1200px] mx-auto">
    //         <Table
    //           columns={residencyColumns}
    //           dataSource={residencyDataSource}
    //           className="bg-white rounded-md shadow border mt-2"
    //           scroll={{ x: 200 }}
    //         />
    //       </div>
    //     </div>

    //     <div >
    //       <h2 className="font-bold py-2 mt-5">Travel History</h2>
    //       <div className="py-2 mb-3">
    //         <AppButton
    //           label="Add travel history details"
    //           handleClick={onAddNewTravelDetail}
    //         />
    //       </div>
    //       <div className="p-2 lg:w-[1200px] mx-auto">
    //         <Table
    //           columns={travelColumns}
    //           dataSource={travelDataSource}
    //           className="bg-white rounded-md shadow border mt-2"
    //           scroll={{ x: 200 }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   {/* PASSPORT MODAL */}
    //   <Modal
    //     open={isEditingPassport}
    //     footer={null}
    //     onCancel={() => setIsEditingPassport(false)}
    //   >
    //     <h2 className="text-center font-bold py-2 text-lg">
    //       Edit Passport Details
    //     </h2>
    //     <div>
    //       <h2 className="py-1">
    //         What country issued your passport (Passport One)?
    //       </h2>
    //       <div>
    //         <Form.Item name="issuingCountryOne" required>
    //           <Input
    //             size="large"
    //             value={editPassportData?.issuingCountryOne}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 issuingCountryOne: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What is the passport number (Passport One)?</h2>
    //       <div>
    //         <Form.Item name="passportNumberOne" required>
    //           <Input
    //             size="large"
    //             value={editPassportData?.passportNumberOne}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 passportNumberOne: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What is the date of issue (Passport One)?</h2>
    //       <div>
    //         <Form.Item name="dateOfIssueOne" required>
    //           <Input
    //             size="large"
    //             value={editPassportData?.dateOfIssueOne}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 dateOfIssueOne: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the date of expiration (Passport One)?
    //       </h2>
    //       <div>
    //         <Form.Item name="dateOfExpiryOne" required>
    //           <Input
    //             size="large"
    //             value={editPassportData?.dateOfExpiryOne}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 dateOfExpiryOne: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What is the place of issue (Passport One)?</h2>
    //       <div>
    //         <Form.Item name="placeOfIssueOne" required>
    //           <Input
    //             size="large"
    //             value={editPassportData?.placeOfIssueOne}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 placeOfIssueOne: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div>
    //       <h2 className="py-1">
    //         What country issued your passport (Passport Two)?
    //       </h2>
    //       <div>
    //         <Form.Item name="issuingCountryTwo">
    //           <Input
    //             size="large"
    //             value={editPassportData?.issuingCountryTwo}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 issuingCountryTwo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What is the passport number (Passport Two)?</h2>
    //       <div>
    //         <Form.Item name="passportNumberTwo">
    //           <Input
    //             size="large"
    //             value={editPassportData?.passportNumberTwo}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 passportNumberTwo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What is the date of issue (Passport Two)?</h2>
    //       <div>
    //         <Form.Item name="dateOfIssueTwo">
    //           <Input
    //             size="large"
    //             value={editPassportData?.dateOfIssueTwo}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 dateOfIssueTwo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the date of expiration (Passport Two)?
    //       </h2>
    //       <div>
    //         <Form.Item name="dateOfExpiryTwo">
    //           <Input
    //             size="large"
    //             value={editPassportData?.dateOfExpiryTwo}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 dateOfExpiryTwo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What is the place of issue (Passport Two)?</h2>
    //       <div>
    //         <Form.Item name="placeOfIssueTwo">
    //           <Input
    //             size="large"
    //             value={editPassportData?.placeOfIssueTwo}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 placeOfIssueTwo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div>
    //       <h2 className="py-1">
    //         What country issued your passport (Passport Three)?
    //       </h2>
    //       <div>
    //         <Form.Item name="issuingCountryThree">
    //           <Input
    //             size="large"
    //             value={editPassportData?.issuingCountryThree}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 issuingCountryThree: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the passport number (Passport Three)?
    //       </h2>
    //       <div>
    //         <Form.Item name="passportNumberThree">
    //           <Input
    //             size="large"
    //             value={editPassportData?.passportNumberThree}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 passportNumberThree: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What is the date of issue (Passport Three)?</h2>
    //       <div>
    //         <Form.Item name="dateOfIssueThree">
    //           <Input
    //             size="large"
    //             value={editPassportData?.dateOfIssueThree}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 dateOfIssueThree: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the date of expiration (Passport Three)?
    //       </h2>
    //       <div>
    //         <Form.Item name="dateOfExpiryThree">
    //           <Input
    //             size="large"
    //             value={editPassportData?.dateOfExpiryThree}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 dateOfExpiryThree: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What is the place of issue (Passport Three)?</h2>
    //       <div>
    //         <Form.Item name="placeOfIssueThree">
    //           <Input
    //             size="large"
    //             value={editPassportData?.placeOfIssueThree}
    //             onChange={(e) => {
    //               setEditPassportData((prev: any) => ({
    //                 ...prev,
    //                 placeOfIssueThree: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div className="flex justify-end">
    //       <div className="flex gap-5">
    //         <AppButton
    //           label="Cancel"
    //           variant="transparent"
    //           type="reset"
    //           handleClick={() => {
    //             resetPassportEditing();
    //             setIsEditingPassport(false);
    //           }}
    //         />
    //         <AppButton
    //           label="Save"
    //           handleClick={() => {
    //             setPassportDataSource((pre) => {
    //               return pre.map((applicant) => {
    //                 if (applicant.key === editPassportData.key) {
    //                   return editPassportData;
    //                 } else {
    //                   return applicant;
    //                 }
    //               });
    //             });
    //             resetPassportEditing();
    //           }}
    //         />
    //       </div>
    //     </div>
    //   </Modal>

    //   {/* RESIDENCY MODAL */}
    //   <Modal
    //     open={isEditingResidency}
    //     footer={null}
    //     onCancel={() => setIsEditingResidency(false)}
    //   >
    //     <h2 className="text-center font-bold py-2 text-lg">
    //       Edit Residency Details
    //     </h2>
    //     <div>
    //       <h2 className="py-1">
    //         What country issued your residency permit (Permit One)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyIssuingCountryOne" required>
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyIssuingCountryOne}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyIssuingCountryOne: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the date of residency issue (Permit One)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyDateOfIssueOne" required>
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyDateOfIssueOne}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyDateOfIssueOne: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the date of residency expiration (Permit One)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyDateOfExpiryOne" required>
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyDateOfExpiryOne}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyDateOfExpiryOne: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the place of residency issue (Permit One)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyPlaceOfIssueOne" required>
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyPlaceOfIssueOne}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyPlaceOfIssueOne: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div>
    //       <h2 className="py-1">
    //         What country issued your residency permit (Permit Two)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyIssuingCountryTwo">
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyIssuingCountryTwo}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyIssuingCountryTwo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the date of residency issue (Permit Two)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyDateOfIssueTwo">
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyDateOfIssueTwo}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyDateOfIssueTwo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the date of residency expiration (Permit Two)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyDateOfExpiryTwo">
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyDateOfExpiryTwo}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyDateOfExpiryTwo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the place of residency issue (Permit Two)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyPlaceOfIssueTwo">
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyPlaceOfIssueTwo}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyPlaceOfIssueTwo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div>
    //       <h2 className="py-1">
    //         What country issued your residency permit (Permit Three)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyIssuingCountryThree">
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyIssuingCountryThree}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyIssuingCountryThree: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the date of residency issue (Permit Three)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyDateOfIssueThree">
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyDateOfIssueThree}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyDateOfIssueThree: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the date of residency expiration (Permit Three)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyDateOfExpiryThree">
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyDateOfExpiryThree}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyDateOfExpiryThree: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">
    //         What is the place of residency issue (Permit Three)?
    //       </h2>
    //       <div>
    //         <Form.Item name="residencyPlaceOfIssueThree">
    //           <Input
    //             size="large"
    //             value={editResidencyData?.residencyPlaceOfIssueThree}
    //             onChange={(e) => {
    //               setEditResidencyData((prev: any) => ({
    //                 ...prev,
    //                 residencyPlaceOfIssueThree: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div className="flex justify-end">
    //       <div className="flex gap-5">
    //         <AppButton
    //           label="Cancel"
    //           variant="transparent"
    //           type="reset"
    //           handleClick={() => {
    //             resetResidencyEditing();
    //             setIsEditingResidency(false);
    //           }}
    //         />
    //         <AppButton
    //           label="Save"
    //           handleClick={() => {
    //             setResidencyDataSource((pre) => {
    //               return pre.map((applicant) => {
    //                 if (applicant.key === editResidencyData.key) {
    //                   return editResidencyData;
    //                 } else {
    //                   return applicant;
    //                 }
    //               });
    //             });
    //             resetResidencyEditing();
    //           }}
    //         />
    //       </div>
    //     </div>
    //   </Modal>

    //   {/* TRAVEL MODAL */}
    //   <Modal
    //     open={isEditingTravel}
    //     footer={null}
    //     onCancel={() => setIsEditingResidency(false)}
    //   >
    //     <h2 className="text-center font-bold py-2 text-lg">
    //       Edit Travel Details
    //     </h2>
    //     <div>
    //       <h2 className="py-1">How long was your stay?</h2>
    //       <div>
    //         <Form.Item name="travelLengthOfStay" required>
    //           <Input
    //             size="large"
    //             value={editTravelData?.travelLengthOfStay}
    //             onChange={(e) => {
    //               setEditTravelData((prev: any) => ({
    //                 ...prev,
    //                 travelLengthOfStay: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">When did your stay start?</h2>
    //       <div>
    //         <Form.Item name="residencyDateOfIssueOne" required>
    //           <Input
    //             size="large"
    //             value={editTravelData?.travelFrom}
    //             onChange={(e) => {
    //               setEditTravelData((prev: any) => ({
    //                 ...prev,
    //                 travelFrom: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">When did your stay end?</h2>
    //       <div>
    //         <Form.Item name="residencyDateOfExpiryOne" required>
    //           <Input
    //             size="large"
    //             value={editTravelData?.travelTo}
    //             onChange={(e) => {
    //               setEditTravelData((prev: any) => ({
    //                 ...prev,
    //                 travelTo: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What city and country?</h2>
    //       <div>
    //         <Form.Item name="cityAndCountry" required>
    //           <Input
    //             size="large"
    //             value={editTravelData?.cityAndCountry}
    //             onChange={(e) => {
    //               setEditTravelData((prev: any) => ({
    //                 ...prev,
    //                 cityAndCountry: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="py-1">What was the purpose of travel?</h2>
    //       <div>
    //         <Form.Item name="cityAndCountry" required>
    //           <Input
    //             size="large"
    //             value={editTravelData?.purposeOfTravel}
    //             onChange={(e) => {
    //               setEditTravelData((prev: any) => ({
    //                 ...prev,
    //                 purposeOfTravel: e.target.value,
    //               }));
    //             }}
    //           />
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div className="flex justify-end">
    //       <div className="flex gap-5">
    //         <AppButton
    //           label="Cancel"
    //           variant="transparent"
    //           type="reset"
    //           handleClick={() => {
    //             resetTravelEditing();
    //             setIsEditingTravel(false);
    //           }}
    //         />
    //         <AppButton
    //           label="Save"
    //           handleClick={() => {
    //             setTravelDataSource((pre) => {
    //               return pre.map((applicant) => {
    //                 if (applicant.key === editTravelData.key) {
    //                   return editTravelData;
    //                 } else {
    //                   return applicant;
    //                 }
    //               });
    //             });
    //             resetTravelEditing();
    //           }}
    //         />
    //       </div>
    //     </div>
    //   </Modal>
    // </>
  );
};
