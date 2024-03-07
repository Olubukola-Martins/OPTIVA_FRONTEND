import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useGetDocuments } from "../hooks/useGetDocuments";
import { Button, Form, Skeleton, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AppButton } from "src/components/button/AppButton";

interface IDocs {
  documentType: string;
}

export const AttachDocuments: React.FC<IDocs> = ({ documentType }) => {
  const { data, isLoading } = useGetDocuments();
  const [form] = Form.useForm();

  // Filter data based on documentType
  const filteredData = data?.filter(
    (item) => item.document_type === documentType
  );

  console.log('data', data)
  console.log('filtered data', filteredData)

  return (
    <>
      <PageIntro
        title="Applicant's Documents"
        description={`Please upload the ${documentType} documents`}
        linkBack={appRoute.applications}
      />
      <Form form={form}>
        {filteredData?.map((item) => (
          <Skeleton active loading={isLoading} key={item.id}>
            <div className="my-2 py-2 border-b">
              <h2 className="text-lg my-3 font-semibold">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}:
              </h2>
              <Form.Item name={`${item.name}`} key={item.id}>
                <Upload maxCount={1} className="w-full">
                  <Button
                    icon={<UploadOutlined />}
                    className="w-[300px] md:w-[600px]"
                  >
                    Upload File
                  </Button>
                </Upload>
              </Form.Item>
              <p className="mt-1 font-medium">
                [Only png, jpeg and pdf formats are supported]
              </p>
              <p className="">Maximum upload file size is 5MB</p>
            </div>
          </Skeleton>
        ))}
        <div className="flex justify-end items-center gap-5 my-5">
          <AppButton label="Cancel" type="reset" variant="transparent" />
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </>
  );
};

// export const AttachDocuments = () => {
//   const { data, isLoading } = useGetDocuments();
//   const [form] = Form.useForm();
//   return (
//     <>
//       <PageIntro
//         title="Applicant's Documents"
//         description="Please upload the supporting documents"
//         linkBack={appRoute.applications}
//       />
//       <Form form={form}>
//         {data?.map(
//           (item) =>
//             item.document_type === "supporting" && (
//               <Skeleton active loading={isLoading}>
//                 <div className="my-2 py-2 border-b">
//                   <h2 className="text-lg my-3 font-semibold">
//                     {item.name.charAt(0).toUpperCase() + item.name.slice(1)}:
//                   </h2>
//                   <Form.Item
//                     name={`${item.name}`}
//                     key={item.id}
//                     // label={`${
//                     //   item.name.charAt(0).toUpperCase() + item.name.slice(1)
//                     // }`}
//                   >
//                     <Upload maxCount={1} className="w-full">
//                       <Button
//                         icon={<UploadOutlined />}
//                         className="w-[300px] md:w-[600px]"
//                       >
//                         Upload File
//                       </Button>
//                     </Upload>
//                   </Form.Item>
//                   <p className="mt-1 font-medium">
//                     [Only png, jpeg and pdf formats are supported]
//                   </p>
//                   <p className="">Maximum upload file size is 5MB</p>
//                 </div>
//               </Skeleton>
//             )
//         )}
//         <div className="flex justify-end items-center gap-5 my-5">
//           <AppButton label="Cancel" type="reset" variant="transparent" />
//           <AppButton label="Save" type="submit" />
//         </div>
//       </Form>
//     </>
//   );
// };
