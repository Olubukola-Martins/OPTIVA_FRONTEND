import { Form, Modal, Select, Upload, message } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { AppButton } from 'src/components/button/AppButton';
import { IdentifierProps } from 'src/types';

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
};
  
export const AddAuthorizedPerson = ({ handleClose, open }: IdentifierProps) => {
  return (
    <Modal
        open={open}
        footer={null}
        onCancel={()=>handleClose()}
      >
        <h2 className="text-center font-bold p-4">Add Authorized Person</h2>
        <Form layout="vertical">
          <div>
            <h2>Select Employee</h2>
            <Form.Item name="selectEmployee" required>
              <Select
                size="large"
                options={[
                  {
                    value: "Ruth Godwin",
                    label: "Ruth Godwin",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="mb-3">
            <h2 className="mb-2">Upload Signature</h2>
            <Form.Item name="chooseFile" required>
              <Upload
                {...props}
                className="border p-1 rounded border-zinc-950 "
              >
                Choose file to Upload
              </Upload>
            </Form.Item>
            <p className="my-2 text-center text-lg">
              [only xls,xlsx and csv formats are supported]
            </p>
            <p className="text-center my-2">
              Maximum upload file size is 5 MB.
            </p>
          </div>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={()=>handleClose()}
              variant="transparent"
            />
            <AppButton
              label="Save"
              type="submit"
             
            />
          </div>
        </Form>
      </Modal>
  )
}
