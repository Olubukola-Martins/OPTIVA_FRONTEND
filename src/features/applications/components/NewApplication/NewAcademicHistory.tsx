import { Form,  Skeleton } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "src/features/settings/features/appTemplate/hooks/useGetApplicationTemplate";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetSingleQuestion";
import { renderInput } from "./NewApplicantBrief";

export const NewAcademicHistory = () => {
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
            item.subsection_name === "academicHistory" && (
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
    //   <div className="flex flex-col lg:flex-row lg:gap-10">
    //     <div className="lg:w-1/2">
    //       <h2 className="py-4">School 1</h2>
    //       <div className="flex gap-4">
    //         <Form.Item name="courseOfStudy" className="w-full">
    //           <Input
    //             placeholder="Course of Study"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>

    //         <Form.Item name="Institution" className="w-full">
    //           <Input
    //             placeholder="Name of Institution"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>
    //       </div>

    //       <div className="flex gap-4">
    //         <Form.Item name="city" className="w-full">
    //           <Input
    //             placeholder="City"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>

    //         <Form.Item name="country" className="w-full">
    //           <Input
    //             placeholder="Country"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>
    //       </div>
    //       <div className="flex gap-4">
    //         <Form.Item name="qualification" className="w-full">
    //           <Input
    //             placeholder="Qualification Obtained"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>
    //       </div>
    //       <div className="flex gap-4">
    //         <Form.Item name="dateOfEducation" className="w-full">
    //           <DatePicker.RangePicker className="w-full" size="large" />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div className="lg:w-1/2">
    //       <h2 className="py-4">School 2</h2>
    //       <div className="flex gap-4">
    //         <Form.Item name="courseOfStudyTwo" className="w-full">
    //           <Input
    //             placeholder="Course of Study"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>
    //         <Form.Item name="institutionTwo" className="w-full">
    //           <Input
    //             placeholder="Name of Institution"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>
    //       </div>
    //       <div className="flex gap-4">
    //         <Form.Item name="cityTwo" className="w-full">
    //           <Input
    //             placeholder="City"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>
    //         <Form.Item name="countryTwo" className="w-full">
    //           <Input
    //             placeholder="Country"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>
    //       </div>
    //       <div className="flex gap-4">
    //         <Form.Item name="qualificationTwo" className="w-full">
    //           <Input
    //             placeholder="Qualification Obtained"
    //             className="w-full"
    //             size="large"
    //             required
    //           />
    //         </Form.Item>
    //       </div>
    //       <div className="flex gap-4">
    //         <Form.Item name="dateOfEducationTwo" className="w-full">
    //           <DatePicker.RangePicker className="w-full" size="large" />
    //         </Form.Item>
    //       </div>
    //     </div>
    //   </div>

    //   <div>
    //     <Form.List name="newAcademicHistory">
    //       {(fields, { add, remove }) => (
    //         <>
    //           {fields.map((field, index) => (
    //             <div key={field.key}>
    //               <div className="flex flex-col lg:flex-row lg:gap-10">
    //                 <div className="lg:w-1/2">
    //                   <h2 className="py-4">School </h2>
    //                   <div className="flex gap-4">
    //                     <Form.Item name="courseOfStudy" className="w-full">
    //                       <Input
    //                         placeholder="Course of Study"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>

    //                     <Form.Item name="Institution" className="w-full">
    //                       <Input
    //                         placeholder="Name of Institution"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>
    //                   </div>

    //                   <div className="flex gap-4">
    //                     <Form.Item name="city" className="w-full">
    //                       <Input
    //                         placeholder="City"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>

    //                     <Form.Item name="country" className="w-full">
    //                       <Input
    //                         placeholder="Country"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>
    //                   </div>
    //                   <div className="flex gap-4">
    //                     <Form.Item name="qualification" className="w-full">
    //                       <Input
    //                         placeholder="Qualification Obtained"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>
    //                   </div>
    //                   <div className="flex gap-4">
    //                     <Form.Item name="dateOfEducation" className="w-full">
    //                       <DatePicker.RangePicker
    //                         className="w-full"
    //                         size="large"
    //                       />
    //                     </Form.Item>
    //                   </div>
    //                 </div>
    //                 <div className="lg:w-1/2">
    //                   <h2 className="py-4">School </h2>
    //                   <div className="flex gap-4">
    //                     <Form.Item name="courseOfStudyTwo" className="w-full">
    //                       <Input
    //                         placeholder="Course of Study"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>
    //                     <Form.Item name="institutionTwo" className="w-full">
    //                       <Input
    //                         placeholder="Name of Institution"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>
    //                   </div>
    //                   <div className="flex gap-4">
    //                     <Form.Item name="cityTwo" className="w-full">
    //                       <Input
    //                         placeholder="City"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>
    //                     <Form.Item name="countryTwo" className="w-full">
    //                       <Input
    //                         placeholder="Country"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>
    //                   </div>
    //                   <div className="flex gap-4">
    //                     <Form.Item name="qualificationTwo" className="w-full">
    //                       <Input
    //                         placeholder="Qualification Obtained"
    //                         className="w-full"
    //                         size="large"
    //                         required
    //                       />
    //                     </Form.Item>
    //                   </div>
    //                   <div className="flex gap-4">
    //                     <Form.Item name="dateOfEducationTwo" className="w-full">
    //                       <DatePicker.RangePicker
    //                         className="w-full"
    //                         size="large"
    //                       />
    //                     </Form.Item>
    //                   </div>
    //                 </div>
    //               </div>
    //               <i
    //                 className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
    //                 onClick={() => {
    //                   handleRemoveAcademicField(index);
    //                   remove(field.name);
    //                 }}
    //               ></i>
    //             </div>
    //           ))}

    //           <button
    //             className="text-[#28A745] py-4"
    //             onClick={() => {
    //               handleAddAcademicField();
    //               add();
    //             }}
    //           >
    //             Add More
    //           </button>
    //         </>
    //       )}
    //     </Form.List>
    //   </div>
    // </>
  );
};
