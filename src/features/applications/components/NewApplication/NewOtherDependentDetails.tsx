import { Form, Skeleton } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "src/features/settings/features/appTemplate/hooks/useGetApplicationTemplate";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetSingleQuestion";
import { renderInput } from "./NewApplicantBrief";

export const NewOtherDependentDetails = () => {
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
            item.subsection_name === "otherDependentsDetails" && (
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

    // <div>
    //   <div className="p-4">
    //     <AppButton
    //       label="Add other dependent details"
    //       handleClick={onAddNewDetail}
    //     />
    //   </div>
    //   <div className="p-2 lg:w-[1200px] mx-auto">
    //     <Table
    //       columns={columns}
    //       dataSource={dataSource}
    //       className="bg-white rounded-md shadow border mt-2"
    //       scroll={{ x: 200 }}
    //     />
    //   </div>

    //   <Modal
    //     title="Edit Other Dependent Details"
    //     open={isEditing}
    //     okText="Save"
    //     onCancel={resetEditing}
    //     onOk={() => {
    //       setDataSource((pre) => {
    //         return pre.map((applicant) => {
    //           if (applicant.key === editApplicantData.key) {
    //             return editApplicantData;
    //           } else {
    //             return applicant;
    //           }
    //         });
    //       });
    //       resetEditing();
    //     }}
    //   >
    //     <div>
    //       <h2 className="p-1">Dependent's Name (First, Middle & Last Name)</h2>
    //       <Form.Item name="dependentName">
    //         <Input
    //           value={editApplicantData?.dependentName}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               dependentName: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>

    //     <div>
    //       <h2 className="p-1">Relationship with Applicant</h2>

    //       <Form.Item name="relationshipApplicant">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.relationshipApplicant}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               relationshipApplicant: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Gender</h2>
    //       <Form.Item name="gender">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.gender}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               gender: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Marital Status</h2>
    //       <Form.Item name="maritalStatus">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.maritalStatus}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               maritalStatus: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Date of Birth</h2>{" "}
    //       <Form.Item name="dateOfBirth">
    //         <Input
    //           size="large"
    //           placeholder="dd/mm/yyyy"
    //           value={editApplicantData?.dateOfBirth}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               dateOfBirth: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">City of Birth</h2>
    //       <Form.Item name="cityOfBirth">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.cityOfBirth}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               cityOfBirth: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Country of Birth</h2>
    //       <Form.Item name="countryOfBirth">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.countryOfBirth}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               countryOfBirth: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">
    //         Date of Death (Leave blank if the dependent is still alive)
    //       </h2>
    //       <Form.Item name="dateOfDeath">
    //         <Input
    //           size="large"
    //           placeholder="dd/mm/yyyy"
    //           value={editApplicantData?.dateOfDeath}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               dateOfDeath: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">
    //         City of Death (Leave blank if the dependent is still alive)
    //       </h2>
    //       <Form.Item name="cityOfDeath">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.cityOfDeath}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               cityOfDeath: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">
    //         Country of Death (Leave blank if the dependent is still alive)
    //       </h2>

    //       <Form.Item name="countryOfDeath">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.countryOfDeath}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               countryOfDeath: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">State of Origin (Applies to only parents)</h2>
    //       <Form.Item name="stateOfOrigin">
    //         <Input
    //           size="large"
    //           placeholder="dd/mm/yyyy"
    //           value={editApplicantData?.stateOfOrigin}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               stateOfOrigin: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">LGA of Origin (Applies to only parents)</h2>
    //       <Form.Item name="lgaOfOrigin">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.lgaOfOrigin}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               lgaOfOrigin: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Hometown (Applies for only parents)</h2>
    //       <Form.Item name="hometown">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.hometown}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               hometown: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Height (cm)</h2>
    //       <Form.Item name="height">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.height}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               height: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Eye Color</h2>
    //       <Form.Item name="eyeColor">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.eyeColor}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               eyeColor: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Hair Color</h2>
    //       <Form.Item name="hairColor">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.hairColor}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               hairColor: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Dual Citizen? </h2>
    //       <Form.Item name="dualCitizen">
    //         <Select
    //           options={[
    //             { value: "Yes", label: "Yes" },
    //             { value: "No", label: "No" },
    //           ]}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">
    //         Countries of Citizenship (Leave blank if the child is not a citizen
    //         of another country)
    //       </h2>
    //       <Form.Item name="countryOfCitizenship">
    //         <Select
    //           size="large"
    //           mode="multiple"
    //           allowClear
    //           onChange={handleCountryChange}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Passport No</h2>
    //       <Form.Item name="passportNo">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.passportNo}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               passportNo: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Occupation</h2>
    //       <Form.Item name="occupation">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.occupation}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               occupation: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Phone Number</h2>
    //       <Form.Item name="phoneNumber">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.phoneNumber}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               phoneNumber: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Email Address</h2>
    //       <Form.Item name="emailAddress">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.emailAddress}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               emailAddress: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">
    //         Residential Address - Apt/Floor/Suite (if different from your
    //         residential address)
    //       </h2>
    //       <Form.Item name="residentialAddressApt">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.residentialAddressApt}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               residentialAddressApt: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Residential Address - Street</h2>
    //       <Form.Item name="residentialAddressStreet">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.residentialAddressStreet}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               residentialAddressStreet: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Residential Address - City</h2>
    //       <Form.Item name="residentialAddressCity">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.residentialAddressCity}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               residentialAddressCity: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Residential Address - State</h2>
    //       <Form.Item name="residentialAddressState">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.residentialAddressState}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               residentialAddressState: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Residential Address - Country</h2>
    //       <Form.Item name="residentialAddressCountry">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.residentialAddressCountry}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               residentialAddressCountry: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Residential Address - Zip/Postcode</h2>
    //       <Form.Item name="residentialAddressCode">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.residentialAddressCode}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               residentialAddressCode: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2 className="p-1">Residential Address - Date they moved in</h2>
    //       <Form.Item name="residentialAddressDate">
    //         <Input
    //           size="large"
    //           value={editApplicantData?.residentialAddressDate}
    //           onChange={(e) => {
    //             setEditApplicantData((prev: any) => ({
    //               ...prev,
    //               residentialAddressCode: e.target.value,
    //             }));
    //           }}
    //         />
    //       </Form.Item>
    //     </div>
    //     <div>
    //       <h2>On Application? </h2>
    //       <Form.Item name="onApplicationYes">
    //         <Select
    //           options={[
    //             { value: "Yes", label: "Yes" },
    //             { value: "No", label: "No" },
    //           ]}
    //         />
    //       </Form.Item>
    //     </div>
    //   </Modal>
    // </div>
  );
};
