import { Button, Form, Pagination, Skeleton, Tooltip, UploadProps } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { JoditEditorComponent } from "src/features/settings/components/JoditEditor";
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
import { ContractEmailTemplateDatum } from "src/features/meetings/types/types";
const SettingsTemplate = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const typeStr = type as string;
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [showVariablesList, setShowVariablesList] = useState<boolean>(true);
  const { data, isLoading } = useGetSingleTemplate(typeStr);
  const [template, setTemplate] = useState<ContractEmailTemplateDatum>();
  const [preSelectedFile, setPreSelectedFile] = useState<string>();
  const { fileUploading, fileMutate } = useUploadFile();
  const { mutate, isLoading: updateLoading } = useUpdateTemplate();
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState<React.ReactElement[]>([
    <JoditEditorComponent
      control={{
        label: `1-templateDescription`,
        name: `1-templateDescription`,
      }}
    />,
  ]);

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
      if (itemData.type === "contract") {
        let pages: React.ReactElement[] = [];
        itemData.pages.map((page, i: number) => {
          pages.push(
            <JoditEditorComponent
              control={{
                label: `${i + 1}-templateDescription`,
                name: `${i + 1}-templateDescription`,
              }}
            />
          );
          form.setFieldValue(`${i + 1}-templateDescription`, `${page.content}`);
        });
        setAllPages(pages);
      } else {
        form.setFieldValue("templateDescription", `${itemData.content}`);
      }
    }
  }, [type, data, data?.data, isLoading]);

  useEffect(() => {}, [allPages, form, currentPage]);

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
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCancel = () => {
    form.resetFields();
  };
  const handleSave = (values: any) => {
    console.log(values);
    const selectedFile = Array.isArray(values.attachedFileTemplate)
      ? values.attachedFileTemplate[0].originFileObj
      : null;
    let content = "";
    if (typeStr === "contract") {
      for (let i = 1; i <= allPages.length; i++) {
        let currentTemplate = `${i}-templateDescription`;
        content += `{{page${i}}}${values[currentTemplate]}{{endofPage${i}}}`;
      }
    } else {
      content = `${values.templateDescription}`;
    }
    console.log("content", content);
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
            editEmailTemplate({
              content,
              name: template?.name as string,
              type: typeStr,
              file: res.data.path,
            });
          },
        }
      );
    } else {
      editEmailTemplate({
        content,
        name: template?.name as string,
        type: typeStr,
        file: template?.file,
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
const variableInformation = () => {
  const data =
    typeStr === "contract"
      ? [
          { label: "{{applicant_name}} ", information: "Applicant's name" },
          {
            label: "{{applicant_address}}",
            information: "Applicant's address",
          },
          { label: "{{country}}", information: "Investment country" },
          { label: "{{amount_paid}}", information: "Amount paid" },
          {
            label: "{{ day }},  {{ month}},   {{ year}} ",
            information:
              "To be utilized for dates e.g “payment made on  {{day}}, {{month}} {{year}} “.",
          },
          { label: "{{investment_route}}", information: "Investment route" },
          { label: "{{program_type}}", information: "Program type" },
        ]
      : [
          { label: "{{email}} ", information: "Recipient's email Address" },
          { label: "{{password}}", information: "Recipient's password" },
        ];

  return (
    <div>
      <table
        border={2}
        style={{
          border: "1px solid #ddd",
          borderCollapse: "collapse",
          margin: "4px",
          borderRadius: "8px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "2px",
                color: "#F4F6F8",
              }}
            >
              Variable to Insert
            </th>
            <th style={{ border: "1px solid #ddd", padding: "2px" }}>
              Representation
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.label}>
              <td style={{ border: "1px solid #ddd", padding: "2px" }}>
                {item.label}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "2px" }}>
                {item.information}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  return (
    <>
      <div className="flex justify-between items-center py-4 ">
        <PageIntro
          title={`${trimOutTitle()}`}
          linkBack={appRoute.contractsEmailTemplates}
        />
        <Tooltip
          title={variableInformation}
          open={showVariablesList}
          color="#012168"
          placement="left"
          overlayClassName="min-w-[290px]"
        >
          <Button onClick={()=>{setShowVariablesList((prev)=>!prev)}}>{`${showVariablesList ? "Hide" : "View"} variables`} </Button>
        </Tooltip>
      </div>

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
              className={`p-1 bg-gray-200 border-2 rounded w-fit max-w-[80vw] break-words mb-10 ${
                fileList.length !== 0 && "hidden"
              }`}
            >
              {preSelectedFile}
            </p>
          )}
          {typeStr === "contract" ? (
            <>
              {/* {pageToDisplay} */}
              {allPages.map((page) => {
                return !page.props.control.name.includes(currentPage) ? (
                  <div className="hidden">{page}</div>
                ) : (
                  <div>{page}</div>
                );
              })}
              <Pagination
                className="mb-4"
                current={currentPage}
                defaultCurrent={1}
                total={allPages.length}
                pageSize={1}
                onChange={handlePageChange}
              />
            </>
          ) : (
            <JoditEditorComponent />
          )}

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
    </>
  );
};

export default SettingsTemplate;
