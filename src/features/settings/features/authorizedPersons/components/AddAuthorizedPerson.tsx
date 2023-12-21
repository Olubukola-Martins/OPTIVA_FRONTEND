import { Form, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { usePostAuthorizedPersons } from "../hooks/usePostAuthorizedPersons";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { FormEmployeeInput } from "../../employees/components/FormEmployeeInput";
import { QUERY_KEY_FOR_AUTHORIZED_PERSON } from "../hooks/useGetAuthorizedPersons";
import { generalValidationRules } from "src/utils/formHelpers/validations";

const props: UploadProps = {
  name: "chooseFile",
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  // headers: {
  //   authorization: "authorization-text",
  // },
  onChange(info) {
    console.log("file information", info);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  beforeUpload() {},
  customRequest() { },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

export const AddAuthorizedPerson = ({ handleClose, open }: IdentifierProps) => {
  const [form] = Form.useForm();
  const { token } = useGetUserInfo();
  const { mutate } = usePostAuthorizedPersons();
  const queryClient = useQueryClient();

  const handleSubmit = (val: any) => {
    console.log("values of form", val);
    mutate(
      {
        employee_id: val.employee_id,
        signature: val.chooseFile,
        token,
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
        },
      }
    );
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
        <div>
          <h2 className="mb-2">Upload Signature</h2>
          <Form.Item name="chooseFile" rules={generalValidationRules}>
            <div className="border border-slate-200 px-3 py-2 rounded-md">
              <Upload {...props} className="">
                <UploadOutlined /> {""} Choose file to Upload
              </Upload>
            </div>
          </Form.Item>

          <p className="my-2 text-center text-lg">
            [only xls,xlsx and csv formats are supported]
          </p>
          <p className="text-center my-2">Maximum upload file size is 5 MB.</p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <AppButton
            label="Cancel"
            type="reset"
            handleClick={() => handleClose()}
            variant="transparent"
          />
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
};
