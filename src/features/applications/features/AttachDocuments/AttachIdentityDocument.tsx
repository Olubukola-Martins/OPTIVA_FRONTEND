// import React, { useState } from "react";
// import { IDocumentProps } from "../UplodedDocuments/IdentityDocument";
// import { Button, Form, Upload, UploadFile, UploadProps } from "antd";
// import { useLocation, useParams } from "react-router-dom";
// import { useGetDocuments } from "../../hooks/Documet hooks/useGetDocuments";
// // import { FormFileInput } from "src/features/settings/features/authorizedPersons/components/FormFileInput";
// import { UploadOutlined } from "@ant-design/icons";
// import { RcFile } from "antd/es/upload";
// import { useQueryClient } from "react-query";
// // import useUploadFile from "src/features/payment/hooks/useUploadFile";
// import { fileRuleOptions } from "src/features/settings/features/authorizedPersons/types";
// import { createFileValidationRule } from "src/utils/formHelpers/validations";
// import { openNotification } from "src/utils/notification";
// import { QUERY_KEY_FOR_APPLICANT_DOCUMENT } from "../../hooks/Documet hooks/useGetApplicantDocumentCategory";
// import useUploadFile from "src/features/settings/features/authorizedPersons/hooks/useUploadFile";
// import { useUploadApplicantDoc } from "../../hooks/Documet hooks/useUploadApplicantDoc";
// import { AppButton } from "src/components/button/AppButton";

// export const AttachIdentityDocument: React.FC<IDocumentProps> = ({ docId }) => {
//   const { id } = useParams();
//   const { data } = useGetDocuments();
//   const queryClient = useQueryClient();
//   const [form] = Form.useForm();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const documentType = queryParams.get("documentType");
//   const { mutate, isLoading } = useUploadApplicantDoc();

//   const filteredData = data?.filter(
//     (item) => item.document_type === documentType
//   );

//   console.log("filtered data", filteredData);
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const { fileData, fileUploading, uploadFile } = useUploadFile();

  // const props: UploadProps = {
  //   onRemove: (file) => {
  //     const index = fileList.indexOf(file);
  //     const newFileList = fileList.slice();
  //     newFileList.splice(index, 1);
  //     setFileList(newFileList);
  //   },
  //   beforeUpload: (file) => {
  //     setFileList([...fileList, file]);

  //     return false;
  //   },
  //   fileList,
  // };

//   const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//     // return e
//   };

  // const handleSubmit = async (values: any) => {
  //   console.log("form values", values);
  //   const fileUploadData = new FormData();
  //   fileList.forEach((file) => {
  //     fileUploadData.append("files[]", file as RcFile);
  //   });

  //   await uploadFile({ file: values.chooseFile[0].originFileObj });
  //   console.log("file data", fileData);
  //   if (fileData?.data) {
  //     mutate(
  //       {
  //         applicants_id: id as unknown as number,
  //         document_category_id: docId as unknown as number,
  //         document_requirement_id: 1,
  //         file: fileData?.data.path,
  //         name: "",
  //       },
  //       {
  //         onError: (err: any) => {
  //           openNotification({
  //             title: "Error",
  //             state: "error",
  //             description: err.response.data.message,
  //             duration: 8.0,
  //           });
  //         },
  //         onSuccess: (res: any) => {
  //           openNotification({
  //             title: "Success",
  //             state: "success",
  //             description: res.data.message,
  //             duration: 6.0,
  //           });
  //           form.resetFields();
  //           queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICANT_DOCUMENT]);
  //         },
  //       }
  //     );
  //   }
  // };
//   return (
//     <>
//       <Form form={form} onFinish={handleSubmit} requiredMark={false}>
//         {filteredData?.map((item) => (
//           <div className="p-2 m-2" key={item.id}>
//             <Form.Item
//               name={`${item.id}`}
//               label={`Upload the ${item.name} document`}
//               rules={[createFileValidationRule(fileRuleOptions)]}
//               getValueFromEvent={normFile}
//             >
//               <Upload {...props} multiple={true} maxCount={data?.length}>
//                 <Button icon={<UploadOutlined />}>
//                   Choose files to upload
//                 </Button>
//               </Upload>
//             </Form.Item>
//           </div>
//         ))}

//         <AppButton type="submit" isLoading={isLoading || fileUploading} />
//       </Form>
//        {filteredData && filteredData.length > 0 ? <></> : ""}
//        {filteredData && filteredData.length > 0 ? (
//         <Form>
//           {filteredData.map(
//             (item) =>
//               item.document_category_id === docId && (
//                 <div className="m-2 p-3" key={item.id}>
//                   <FormFileInput
//                     Form={Form}
//                     multiple={true}
//                     triggerComp
//                     name=""
//                     ruleOptions={{
//                       required: true,
//                       maxFileSize: 1024 * 1024 * 5,
//                       allowedFileTypes: [
//                         "image/jpeg",
//                         "image/png",
//                         "application/pdf",
//                       ],
//                       maxFileUploadCount: 1,
//                     }}
//                   />
//                 </div>
//               )
//           )}
//           <Button type="default">Save</Button>
//         </Form>
//       ) : (
//         <Empty
//           className="m-5 p-3"
//           description="No document requirements have been created. Create a document requirement in settings"
//         />
//       )}
//     </>
//   );
// };


import React, { useState } from "react";
import { IDocumentProps } from "../UplodedDocuments/IdentityDocument";
import { Button, Form, Upload,  } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { useGetDocuments } from "../../hooks/Documet hooks/useGetDocuments";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useQueryClient } from "react-query";
import { createFileValidationRule } from "src/utils/formHelpers/validations";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICANT_DOCUMENT } from "../../hooks/Documet hooks/useGetApplicantDocumentCategory";
import useUploadFile from "src/features/settings/features/authorizedPersons/hooks/useUploadFile";
import { useUploadApplicantDoc } from "../../hooks/Documet hooks/useUploadApplicantDoc";
import { AppButton } from "src/components/button/AppButton";
import { fileRuleOptions } from "src/features/settings/features/authorizedPersons/types";

export const AttachIdentityDocument: React.FC<IDocumentProps> = ({ docId }) => {
  const { id } = useParams();
  const { data } = useGetDocuments();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const documentType = queryParams.get("documentType");
  const { mutate, isLoading } = useUploadApplicantDoc();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { fileData, fileUploading, uploadFile } = useUploadFile();

  const filteredData = data?.filter(
    (item) => item.document_type === documentType
  );

  console.log("filtered data", filteredData);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
    // return e
  };

  // const handleSubmit = async (values: any) => {
  //   console.log("form values", values);
  //   const fileUploadData = new FormData();
  //   fileList.forEach((file) => {
  //     fileUploadData.append("files[]", file as RcFile);
  //   });

  //   await uploadFile({ file: values.chooseFile.originFileObj });
  //   console.log("file data", fileData);
  //   if (fileData?.data) {
  //     mutate(
  //       {
  //         applicants_id: id as unknown as number,
  //         document_category_id: docId as unknown as number,
  //         document_requirement_id: 1,
  //         file: fileData?.data.path,
  //         name: "",
  //       },
  //       {
  //         onError: (err: any) => {
  //           openNotification({
  //             title: "Error",
  //             state: "error",
  //             description: err.response.data.message,
  //             duration: 8.0,
  //           });
  //         },
  //         onSuccess: (res: any) => {
  //           openNotification({
  //             title: "Success",
  //             state: "success",
  //             description: res.data.message,
  //             duration: 6.0,
  //           });
  //           form.resetFields();
  //           queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICANT_DOCUMENT]);
  //         },
  //       }
  //     );
  //   }
  //   }
  
  const handleSubmit = async (values: any) => {
    console.log("form values", values);
  
    // Iterate over each form item
    for (const item of filteredData || []) {
      // Get the fileList for the current form item
      const fileList = values[item.id];
  
      // Check if fileList exists and is not empty
      if (fileList && fileList.length > 0) {
        // Access the originFileObj for each file in the fileList
        for (const file of fileList) {
          const originFileObj = file.originFileObj;
          // Use originFileObj as needed
          console.log("Origin File Object:", originFileObj);
  
          // Perform upload and mutation logic here
          await uploadFile({ file: originFileObj });
  
          // Check if upload was successful
          if (fileData?.data) {
            mutate(
              {
                applicants_id: id as unknown as number,
                document_category_id: docId as unknown as number,
                document_requirement_id: 1,
                file: fileData?.data.path,
                name: "",
              },
              {
                onError: (err: any) => {
                  openNotification({
                    title: "Error",
                    state: "error",
                    description: err.response.data.message,
                    duration: 8.0,
                  });
                },
                onSuccess: (res: any) => {
                  openNotification({
                    title: "Success",
                    state: "success",
                    description: 'Documents successfully uploaded',
                    duration: 6.0,
                  });
                  form.resetFields();
                  queryClient.invalidateQueries([
                    QUERY_KEY_FOR_APPLICANT_DOCUMENT,
                  ]);
                },
              }
            );
          }
        }
      }
    }
  };
  
  return (
    <>
      <Form form={form} onFinish={handleSubmit} requiredMark={false}>
        {filteredData?.map((item) => (
          <div className="p-2 m-2" key={item.id}>
            <Form.Item
              name={`${item.id}`}
              label={`Upload the ${item.name} document`}
              rules={[createFileValidationRule(fileRuleOptions)]}
              getValueFromEvent={normFile}
            >
              <Upload {...props} maxCount={1}>
                <Button icon={<UploadOutlined />}>Choose files to upload</Button>
              </Upload>
            </Form.Item>
          </div>
        ))}
        <AppButton type="submit" isLoading={isLoading || fileUploading} />
      </Form>
    </>
  );
};
