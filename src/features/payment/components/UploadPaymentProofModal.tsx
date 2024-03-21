import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { FormFileInput } from "src/features/settings/features/authorizedPersons/components/FormFileInput";
import useUploadFile from "../hooks/useUploadFile";

type IProps = {open:boolean;onCancel:()=>void,handleUploadSubmit:(val:any)=>void,fileUploading:boolean, onSetUploadForm:(form:FormInstance<any>)=>void}

 const UploadPaymentProofModal = ({open,onCancel,handleUploadSubmit,fileUploading,onSetUploadForm}:IProps) => {
    // const { fileData, fileMutate, fileUploading } = useUploadFile();
    // const queryClient = useQueryClient();
    const [uploadForm] = Form.useForm();
    onSetUploadForm(uploadForm);

    // const [form, setForm] = useState(uploadForm);
  

    // const handleSubmit = (val: any) => {
    //   console.log("form values", val);
    //   console.log("file data", fileData);
    //   fileMutate(
    //     {
    //       url: `${END_POINT.BASE_URL}/admin/upload-proof-of-payment/${
    //         props.applicantId as unknown as string
    //       }`,
    //       newData: val.uploadFile[0],
    //     },
    //     {
    //       onError: (error: any) => {
    //         openNotification({
    //           state: "error",
    //           title: "Error Occurred",
    //           description: error.response.data.message,
    //           duration: 5,
    //         });
    //         form.resetFields();
    //       },
    //       onSuccess: (res: any) => {
    //         console.log("success", res);
    //         openNotification({
    //           state: "success",
    //           title: "Success",
    //           description: res.data.message,
    //         });
    //         queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
    //         form.resetFields();
    //         props.onCancel();
    //       },
    //     }
    //   );
    // };
    return (
      <>
        <Modal open={open} onCancel={onCancel} footer={null}>
          <div className="p-3">
            <svg
              width="62"
              height="62"
              viewBox="0 0 62 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-1/5 mx-auto"
            >
              <rect
                width="62"
                height="62"
                rx="31"
                fill="#28A745"
                fill-opacity="0.5"
              />
              <path
                d="M29.6667 41.6667H23C22.6464 41.6667 22.3072 41.5263 22.0572 41.2762C21.8071 41.0262 21.6667 40.687 21.6667 40.3334V21.6667C21.6667 21.3131 21.8071 20.974 22.0572 20.7239C22.3072 20.4739 22.6464 20.3334 23 20.3334H29.6667V24.3334C29.6667 25.3943 30.0881 26.4117 30.8382 27.1618C31.5884 27.912 32.6058 28.3334 33.6667 28.3334H37.6667V31.0001C37.6667 31.3537 37.8071 31.6928 38.0572 31.9429C38.3072 32.1929 38.6464 32.3334 39 32.3334C39.3536 32.3334 39.6928 32.1929 39.9428 31.9429C40.1929 31.6928 40.3333 31.3537 40.3333 31.0001V26.9201C40.3194 26.7976 40.2926 26.6769 40.2533 26.5601V26.4401C40.1863 26.3006 40.1011 26.1706 40 26.0534L32 18.0534C31.8828 17.9523 31.7528 17.8672 31.6133 17.8001C31.5735 17.7944 31.5331 17.7944 31.4933 17.8001L31.08 17.6667H23C21.9391 17.6667 20.9217 18.0882 20.1716 18.8383C19.4214 19.5885 19 20.6059 19 21.6667V40.3334C19 41.3943 19.4214 42.4117 20.1716 43.1618C20.9217 43.912 21.9391 44.3334 23 44.3334H29.6667C30.0203 44.3334 30.3594 44.1929 30.6095 43.9429C30.8595 43.6928 31 43.3537 31 43.0001C31 42.6465 30.8595 42.3073 30.6095 42.0573C30.3594 41.8072 30.0203 41.6667 29.6667 41.6667ZM32.3333 22.2134L35.7867 25.6667H33.6667C33.313 25.6667 32.9739 25.5263 32.7239 25.2762C32.4738 25.0262 32.3333 24.687 32.3333 24.3334V22.2134ZM40.3333 35.0001H32.88L34.6133 33.2801C34.8644 33.029 35.0055 32.6885 35.0055 32.3334C35.0055 31.9783 34.8644 31.6378 34.6133 31.3867C34.3623 31.1357 34.0217 30.9946 33.6667 30.9946C33.3116 30.9946 32.9711 31.1357 32.72 31.3867L28.72 35.3867C28.6022 35.5163 28.5075 35.6652 28.44 35.8267C28.3066 36.1514 28.3066 36.5155 28.44 36.8401C28.5011 37.0049 28.5965 37.1549 28.72 37.2801L32.72 41.2801C32.8439 41.4051 32.9914 41.5042 33.1539 41.5719C33.3164 41.6396 33.4907 41.6745 33.6667 41.6745C33.8427 41.6745 34.017 41.6396 34.1794 41.5719C34.3419 41.5042 34.4894 41.4051 34.6133 41.2801C34.7383 41.1561 34.8375 41.0087 34.9052 40.8462C34.9729 40.6837 35.0077 40.5094 35.0077 40.3334C35.0077 40.1574 34.9729 39.9831 34.9052 39.8206C34.8375 39.6582 34.7383 39.5107 34.6133 39.3867L32.88 37.6667H40.3333C40.687 37.6667 41.0261 37.5263 41.2761 37.2762C41.5262 37.0262 41.6667 36.687 41.6667 36.3334C41.6667 35.9798 41.5262 35.6407 41.2761 35.3906C41.0261 35.1406 40.687 35.0001 40.3333 35.0001Z"
                fill="white"
              />
              <rect
                x="3.5"
                y="3.5"
                width="55"
                height="55"
                rx="27.5"
                stroke="#28A745"
                stroke-opacity="0.05"
                stroke-width="7"
              />
            </svg>
          </div>
          <h1 className="p-4 font-bold text-center text-lg">
            Upload Proof of Payment
          </h1>
          <Form form={uploadForm} onFinish={handleUploadSubmit} requiredMark={false}>
            <div className="flex items-center justify-center">
              <FormFileInput
                Form={Form}
                name="uploadFile"
                triggerComp={
                  <Button icon={<UploadOutlined />} className="flex w-full">
                    Click to upload
                  </Button>
                }
                ruleOptions={{
                  required: true,
                  maxFileSize: 1024 * 1024 * 5,
                  allowedFileTypes: [
                    "image/jpeg",
                    "image/png",
                    "application/pdf",
                  ],
                  maxFileUploadCount: 1,
                }}
              />
            </div>
            <p className="mt-2 text-center">
              [Only png, jpeg, and pdf formats are supported]
            </p>
            <p className="text-center">Maximum upload file size is 5 MB.</p>
            <div className="flex items-center justify-center gap-4 p-4 mt-2">
              <AppButton
                label="Cancel"
                variant="transparent"
                containerStyle="border border-secondary text-secondary"
                type="reset"
                handleClick={onCancel}
              />
              <AppButton label="Submit" type="submit" isLoading={fileUploading} />
            </div>
          </Form>
        </Modal>
      </>
    );
  };
  

export default UploadPaymentProofModal