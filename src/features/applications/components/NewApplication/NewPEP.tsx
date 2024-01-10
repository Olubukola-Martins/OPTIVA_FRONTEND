import { Form, Skeleton,  } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "src/features/settings/features/appTemplate/hooks/useGetApplicationTemplate";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetSingleQuestion";
import { renderInput } from "./NewApplicantBrief";

export const NewPEP = () => {

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
            item.subsection_name === "PEP" && (
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
    //   <div className="p-2 my-4">
    //     <p>
    //       A PEP may be past or current government office holders, or individuals
    //       who are or were formerly entrusted with high-level public functions.
    //       For example, senior officials, heads of state government, senior
    //       judicial or military officials, officials of political parties and
    //       senior executives of stateowned enterprises (SOE). PEP definition
    //       included family members and close associates of
    //     </p>
    //   </div>
    //   <div className="py-2">
    //     <AppButton label="Add PEP details" handleClick={onAddNewDetail} />
    //   </div>

    //   <div className="p-2 lg:w-[1200px] mx-auto">
    //     <Table
    //       columns={columns}
    //       dataSource={dataSource}
    //       className="bg-white rounded-md shadow border mt-2"
    //       scroll={{ x: 200 }}
    //     />
    //   </div>
    //   <>
    //     <Modal
    //       open={isEditing}
    //       footer={null}
    //       onCancel={() => setIsEditing(false)}
    //     >
    //       <h2 className="text-center font-bold text-lg p-2">
    //         Edit Other Dependent Details
    //       </h2>
    //       <div>
    //         <h2 className="py-1">
    //           Are you related/closely associated to someone in the military?
    //         </h2>
    //         <Form.Item name="relatedMilitaryYourself">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Are you related/closely associated to someone in government?
    //         </h2>
    //         <Form.Item name="relatedGovernmentYourself">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Are you related/closely associated to a political figure?
    //         </h2>
    //         <Form.Item name="relatedPoliticalYourself">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Is your spouse related/closely associated to someone in the
    //           military?
    //         </h2>
    //         <Form.Item name="relatedGovernmentYourself">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Is your spouse related/closely associated with someone in the
    //           government?
    //         </h2>
    //         <Form.Item name="relatedGovernmentSpouse">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Is your spouse related/closely associated to a political figure?
    //         </h2>
    //         <Form.Item name="relatedGovernmentSpouse">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Is your family member related/closely associated to someone in the
    //           military?
    //         </h2>
    //         <Form.Item name="relatedMilitaryFamily">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Is your family member related/closely associated with someone in
    //           the government?
    //         </h2>
    //         <Form.Item name="relatedGovernmentFamily">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Is your family member related/closely associated with someone a
    //           political figure?
    //         </h2>
    //         <Form.Item name="relatedPoliticalFamily">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Is a close associate of yours related/closely associated to
    //           someone in the military?
    //         </h2>
    //         <Form.Item name="relatedMilitaryAssociate">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Is a close associate of yours related/closely associated to
    //           someone in the government?
    //         </h2>
    //         <Form.Item name="relatedGovernmentAssociate">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <h2 className="py-1">
    //           Is a close associate of yours related/closely associated to a
    //           political figure?
    //         </h2>
    //         <Form.Item name="relatedPoliticalAssociate">
    //           <Select
    //             size="large"
    //             options={[
    //               {
    //                 value: "Yes",
    //                 label: "Yes",
    //               },
    //               {
    //                 value: "No",
    //                 label: "No",
    //               },
    //             ]}
    //           />
    //         </Form.Item>
    //       </div>
    //       <div className="flex justify-end">
    //         <div className="flex gap-5">
    //           <AppButton
    //             label="Cancel"
    //             variant="transparent"
    //             type="reset"
    //             handleClick={() => {
    //               resetEditing();
    //               setIsEditing(false);
    //             }}
    //           />
    //           <AppButton
    //             label="Save"
    //             handleClick={() => {
    //               setDataSource((pre) => {
    //                 return pre.map((applicant) => {
    //                   if (applicant.key === editApplicantData.key) {
    //                     return editApplicantData;
    //                   } else {
    //                     return applicant;
    //                   }
    //                 });
    //               });
    //               resetEditing();
    //             }}
    //           />
    //         </div>
    //       </div>
    //     </Modal>
    //     <div className="py-4 mt-5">
    //       <h2 className="py-1">
    //         If “Yes” to any of the above, please explain:
    //       </h2>
    //       <Form.Item name="explainPEP">
    //         <Input.TextArea rows={5} />
    //       </Form.Item>
    //     </div>
    //   </>
    // </>
  );
};
