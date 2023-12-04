import { Form, Modal, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { QUERY_KEY_FOR_EMPLOYEE, useGetEmployee } from "../hooks/useGetEmployee";
import { usePostAuthorizedPersons } from "../hooks/usePostAuthorizedPersons";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";

const props: UploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  beforeUpload(file) {
    return false;
  },
  customRequest(options) {},
};

export const AddAuthorizedPerson = ({ handleClose, open }: IdentifierProps) => {
  const [form] = Form.useForm();
  const { data: employeeData } = useGetEmployee();
  const { token } = useGetUserInfo();
  const { mutate } = usePostAuthorizedPersons();
  const queryClient = useQueryClient();
  const handleSubmit = (val: any) => {
    mutate(
      {
        authorizedId: val.selectEmployee,
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
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_EMPLOYEE]);
          form.resetFields();
        },
      }
    );
  };
  return (
    <Modal open={open} footer={null} onCancel={() => handleClose()}>
      <h2 className="text-center font-bold p-4 text-lg">
        Add Authorized Person
      </h2>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div>
          <h2 className="mb-2">Select Employee</h2>
          <Form.Item name="selectEmployee" required>
            <Select>
              {employeeData?.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="mb-3">
          <h2 className="mb-2">Upload Signature</h2>
          <Form.Item
            name="chooseFile"
            required
            className="border rounded-md my-2"
          >
            <Upload {...props} className="p-2 mt-5">
              <UploadOutlined /> Choose file to Upload
            </Upload>
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
