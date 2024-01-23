import { Button, Form, Modal, Upload, UploadFile, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps, RcFile } from "antd/lib/upload/interface";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { usePostAuthorizedPersons } from "../hooks/usePostAuthorizedPersons";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { FormEmployeeInput } from "../../employees/components/FormEmployeeInput";
import { QUERY_KEY_FOR_AUTHORIZED_PERSON } from "../hooks/useGetAuthorizedPersons";
import { useState } from "react";
import { Rule } from "antd/es/form";
import useUploadFile from "../hooks/useUploadFile";

export type TFileType =
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "text/plain"
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "text/csv";
 
export type TCeateFileValidationRuleProps = {
  required?: boolean;
  maxFileSize?: number;
  allowedFileTypes: TFileType[];
  maxFileUploadCount?: number;
};
export const DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB = 2;
export const DEFAULT_MAX_FILE_UPLOAD_COUNT = 1;
 
export const createFileValidationRule = (
  props: TCeateFileValidationRuleProps
): Rule => {
  const {
    required = true,
    maxFileSize = DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB,
    allowedFileTypes,
    maxFileUploadCount = DEFAULT_MAX_FILE_UPLOAD_COUNT,
  } = props;
  return {
    required,
 
    validator: async (_, value) => {
      // non required
      if (
        required === false &&
        (Array.isArray(value) === false || value?.length === 0)
      ) {
        return true;
      }
     
      // required
      if (Array.isArray(value) === false || value?.length === 0) {
        throw new Error("Please upload a file");
      }
      if (Array.isArray(value) === true && value?.length > maxFileUploadCount) {
        throw new Error(
          "You can only upload a maximum of " + maxFileUploadCount + " files"
        );
      }
      (value as any[]).forEach((item, i) => {
        const file = item?.originFileObj;
        const isLt2M = file.size / 1024 / 1024 <= maxFileSize;
 
        if (!isLt2M) {
          throw new Error(
            `File ${i + 1} must smaller than or equal to ${maxFileSize}MB!`
          );
        }
        if (!allowedFileTypes.includes(file.type as TFileType)) {
          throw new Error(
            `File ${i + 1}: This file type (${file.type}) is not allowed!`
          );
        }
      });
 
      return true;
    },
  };
};

export const AddAuthorizedPerson = ({ handleClose, open }: IdentifierProps) => {
  const [form] = Form.useForm();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = usePostAuthorizedPersons();
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { fileData, fileUploading, uploadFile } = useUploadFile()

  const fileRuleOptions = {
    required: true,
    allowedFileTypes: [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ] as TFileType[],
  };
 

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
    const fileUploadData = new FormData();
    fileList.forEach((file) => {
      fileUploadData.append("files[]", file as RcFile);
    });
    await uploadFile({ file: values.chooseFile[0].originFileObj });

    console.log('file data',fileData?.data.path)
 console.log('form vals', values)
    if ( fileData?.data) {
      mutate(
        {
          employee_id: values.employee_id,
          signature: fileData?.data.path,
          token
        },
        {
          onError: (error: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description: error.response.data.message,
              duration: 5,
            });
            handleClose();
            setFileList([]);
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",
              title: "Success",
              description: res.data.message,
            });
            queryClient.invalidateQueries([QUERY_KEY_FOR_AUTHORIZED_PERSON]);
            form.resetFields();
            handleClose();
            setFileList([]);
          },
        }
      );
    }
 
  };
  

  return (
    <Modal open={open} footer={null} onCancel={() => handleClose()}>
      <h2 className="text-center font-bold p-4 text-lg">
        Add Authorized Person
      </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <div>
          <h2 className="mb-2">Select Employee</h2>

          <FormEmployeeInput Form={Form} showLabel={false} />
        </div>
        {/* <div>
          <h2 className="mb-2">Upload File</h2>
          <Form.Item
            name="fileContent"
            rules={generalValidationRules}
          >
            <div className="border border-slate-200 px-3 py-2 rounded-md">
              <Upload {...props}  maxCount={1}>
                <UploadOutlined /> {""} Choose file to upload
              </Upload>
            </div>
          </Form.Item>

          <p className="my-2 text-center text-lg">
            [only xls,xlsx and csv formats are supported]
          </p>
          <p className="text-center my-2">Maximum upload file size is 5 MB.</p>
        </div> */}
         <Form.Item
              name="chooseFile"
              label="Choose file to upload"
              rules={[createFileValidationRule(fileRuleOptions)]}
              // valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload {...props} maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload File</Button>
              </Upload>
            </Form.Item>
        <div className="flex items-center justify-center gap-5">
          <AppButton
            label="Cancel"
            type="reset"
            handleClick={() => handleClose()}
            variant="transparent"
          />
          <AppButton label="Save" type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
