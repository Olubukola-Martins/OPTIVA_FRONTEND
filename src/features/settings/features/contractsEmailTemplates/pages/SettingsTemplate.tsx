import { Drawer, Form, Skeleton, UploadProps } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { JoditEditorComponent } from "src/features/settings/components/JoditEditor";
import { UseWindowWidth } from "src/features/settings/hooks/UseWindowWidth";
import useUpdateTemplate, {
  IPropData,
  QUERY_KEY_EMAIL_TEMPLATES,
} from "../hooks/useUpdateTemplate";
import { useGetSingleTemplate } from "../hooks/useGetSingleTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import UploadFileComp from "src/components/formItem/UploadFileComp";
import { UploadFile } from "antd/es/upload";
import {
  TFileType,
  createFileValidationRule,
} from "src/utils/formHelpers/validations";
import useUploadFile from "src/features/payment/hooks/useUploadFile";
import { END_POINT } from "src/config/environment";

// interface IProps {
//   title: string;
//   id: number;
//   name: string;
// }
const SettingsTemplate = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const typeStr = type as string;
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data, isLoading } = useGetSingleTemplate(typeStr);
  const [template, setTemplate] = useState(data?.data[0]);
  const [open, setOpen] = useState(false);
  const [preSelectedFile, setPreSelectedFile] = useState<string>();
  const {  fileUploading, fileMutate } = useUploadFile();
  const { mutate, isLoading: updateLoading } = useUpdateTemplate();
  const { drawerSize } = UseWindowWidth();
  const editEmailTemplate = ({ content, name, type, file }: IPropData) => {
    mutate(
      { content, name, type, file },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.message,
            duration: 5,
          });
        },
        onSuccess: (response: any) => {
          openNotification({
            state: "success",
            title: "Success",
            duration: 5,
            description: response.message,
          });
          form.resetFields();
          navigate(appRoute.contractsEmailTemplates);
          queryClient.invalidateQueries([QUERY_KEY_EMAIL_TEMPLATES, type]);
        },
      }
    );
  };

  useEffect(() => {
    setTemplate(data?.data[0]);
    if (data?.data) {
      const itemData = data.data[0];
      setPreSelectedFile(itemData.file);
      form.setFieldValue("templateDescription", `${itemData.content}`);
    }
  }, [form, type, data, data?.data, isLoading]);
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

  const fileRuleOptions = {
    required: false,
    allowedFileTypes: [
      // "image/jpeg",
      // "image/png",
      // "image/jpg",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ] as TFileType[],
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
  };
  // const handlePreview = () => {
  //   const values = form.getFieldsValue();
  //   console.log(values)
  //   setOpen(true);
  // };
  const handleSave = (values: {
    attachedFileTemplate: any;
    templateDescription: JSX.Element;
  }) => {
    console.log(values);
    const selectedFile = values.attachedFileTemplate[0].originFileObj;
    if (fileList.length > 0) {
      fileMutate(
        {
          newData: { file: selectedFile },
          url: `${END_POINT.BASE_URL}/admin/upload-file`,
        },
        {
          onError: (error: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description: error.response.data.message,
              duration: 5,
            });
          },
          onSuccess: (res: any) => {
            // queryClient.invalidateQueries([
            //   QUERY_KEY_ALLPAYMENT_DETAILS,
            //    selectedFile,
            // ]);
            editEmailTemplate({
              content: `${values.templateDescription}`,
              name: template?.name,
              type: typeStr,
              file: res.data.path,
            });
          },
        }
      );
    } else {
      editEmailTemplate({
        content: `${values.templateDescription}`,
        name: template?.name,
        type: typeStr,
        file: undefined,
      });
    }
  };
  const trimOutTitle = () => {
    const originalString = `${template?.name || "Template"} `;
    const lastIndex = originalString.lastIndexOf(" Email Template");
    const trimmedString =
      lastIndex !== -1 ? originalString.slice(0, lastIndex) : originalString;

    return trimmedString;
  };
  return (
    <>
      <PageIntro
        title={`${trimOutTitle()}`}
        linkBack={appRoute.contractsEmailTemplates}
      />
      {/* <Pagination
        current={currentPage}
        defaultCurrent={1}
        total={allPages.length}
        pageSize={1}
        onChange={handlePageChange}
      /> */}

      <Skeleton active loading={isLoading} paragraph={{ rows: 6 }} title={true}>
        <Form
          form={form}
          onFinish={handleSave}
          name={template?.name?.replace(/[^\w\s]/gi, "")}
        >
          <UploadFileComp
            label="Upload a pre-existing template here"
            name="attachedFileTemplate"
            extraStyles="font-bold"
            rules={[createFileValidationRule(fileRuleOptions)]}
            uploadProps={props}
          />
          {preSelectedFile && (
            <p
              className={`p-1 bg-gray-200 border-2 rounded w-fit mb-10 ${
                fileList.length !== 0 && "hidden"
              }`}
            >
              {preSelectedFile}
            </p>
          )}
          <JoditEditorComponent />
          <div className="flex justify-between">
            <AppButton
              label="Cancel"
              type="button"
              variant="transparent"
              containerStyle="h-fit"
              handleClick={handleCancel}
            />

            <div className="flex flex-row gap-4">
              {/* <div
                // onClick={handlePreview}
                className="text-[#012168] hover:text-[#801D23] underline decoration-2 decoration-[#012168] hover:decoration-[#801D23] pt-2 font-semibold cursor-pointer "
              >
                Preview
              </div> */}
              <FormItem>
                <AppButton
                  label="Save"
                  type="submit"
                  isLoading={updateLoading || fileUploading}
                />
              </FormItem>
            </div>
          </div>
        </Form>
      </Skeleton>
      <Drawer
        title={`${template?.name} Preview`}
        placement="right"
        onClose={onClose}
        open={open}
        size={drawerSize}
      ></Drawer>
    </>
  );
};

export default SettingsTemplate;
