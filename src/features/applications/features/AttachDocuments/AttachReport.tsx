import React, { useState } from "react";
import { IDocumentProps } from "../UplodedDocuments/IdentityDocument";
import {
  Button,
  Empty,
  Form,
  Skeleton,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useLocation, useParams } from "react-router-dom";
import { useGetDocuments } from "../../hooks/Documet hooks/useGetDocuments";
import { UploadOutlined } from "@ant-design/icons";
import { useQueryClient } from "react-query";
import { AppButton } from "src/components/button/AppButton";
import { fileRuleOptions } from "src/features/settings/features/authorizedPersons/types";
import { createFileValidationRule } from "src/utils/formHelpers/validations";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICANT_DOCUMENT } from "../../hooks/Documet hooks/useGetApplicantDocumentCategory";
import { useUploadApplicantDoc } from "../../hooks/Documet hooks/useUploadApplicantDoc";
import { IUploadMultipleFiles } from "../../types/types";
import useUploadFile from "src/features/settings/features/authorizedPersons/hooks/useUploadFile";

export const AttachReport: React.FC<IDocumentProps> = ({
  docId,
  onNext,
  onPrev,
}) => {
  const { id } = useParams();
  const { data, isLoading: dataLoading } = useGetDocuments();
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
  const [docRequiredId, setDocRequiredId] = useState<number>();

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
  };

  const handleSubmit = async (values: any) => {
    const uploadData: IUploadMultipleFiles[] = [];
    if (documentType === "required") {
      setDocRequiredId(1);
    } else if (documentType === "supporting") {
      setDocRequiredId(2);
    }
    // Iterate over each form item
    for (const item of filteredData || []) {
      const fileList = values[item.id];

      if (fileList && fileList.length > 0) {
        for (const file of fileList) {
          const originFileObj = file.originFileObj;

          // Perform upload and mutation logic here
          await uploadFile({ file: originFileObj });

          // Check if upload was successful
          if (fileData?.data) {
            // Construct data object for the current file
            const fileUploadData: IUploadMultipleFiles = {
              name: item.name, // Use the document name from the filteredData
              applicants_id: id as unknown as number,
              document_category_id: docId as unknown as number,
              document_requirement_id: docRequiredId as unknown as number,
              file: fileData?.data, // Use the uploaded file data
            };

            // Push the data object to the uploadData array
            uploadData.push(fileUploadData);
          }
        }
      }
    }

    mutate(uploadData, {
      onError: (err: any) => {
        openNotification({
          title: "Error",
          state: "error",
          description: err.response.data.message,
          duration: 8.0,
        });
        setFileList([])
      },
      onSuccess: (res: any) => {
        console.log(res);
        openNotification({
          title: "Success",
          state: "success",
          description: "Documents successfully uploaded",
          duration: 6.0,
        });
        setFileList([])
        queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICANT_DOCUMENT]);
      },
    });
  };

  const renderComponent = filteredData && filteredData?.length > 0;
  const isEmpty =
    !renderComponent ||
    !filteredData.some((item) => item.document_category_id === docId);

  return (
    <>
      {isEmpty ? (
        <Empty
          className="m-5 p-3"
          description="No document requirements have been created for this category. Create a document requirement in settings"
        />
      ) : (
        <Skeleton active loading={dataLoading}>
          <Form
            form={form}
            onFinish={handleSubmit}
            requiredMark={false}
            layout="vertical"
          >
            {filteredData?.map(
              (item) =>
                item.document_category_id === docId && (
                  <div className="p-2 m-2" key={item.id}>
                    <Form.Item
                      name={`${item.id}`}
                      label={`Upload the ${item.name} document`}
                      rules={[createFileValidationRule(fileRuleOptions)]}
                      getValueFromEvent={normFile}
                    >
                      <Upload {...props} maxCount={1}>
                        <Button icon={<UploadOutlined />}>
                          Choose file to upload
                        </Button>
                      </Upload>
                    </Form.Item>
                    <p className="text-base p-1">
                      Only {item.document_format.join(", ")} are allowed
                    </p>
                    <p className="px-1">
                      Maximum upload size is {""}
                      {Math.round(item.document_size / 1024)} MB
                    </p>
                  </div>
                )
            )}

            <div className="flex items-center justify-between gap-5">
              <AppButton
                label="Prev"
                type="button"
                handleClick={() => {
                  onPrev && onPrev();
                }}
              />
              <div className="flex gap-2 items-center">
                <AppButton
                  label="Next"
                  type="button"
                  handleClick={() => {
                    onNext && onNext();
                  }}
                  variant="transparent"
                />
                <AppButton
                  label="Submit"
                  type="submit"
                  isLoading={isLoading || fileUploading}
                />
              </div>
            </div>
          </Form>
        </Skeleton>
      )}
    </>
  );
};
