import React, { useState } from "react";
import { IDocumentProps } from "../UplodedDocuments/IdentityDocument";
import { Button, Empty, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useGetDocuments } from "../../hooks/Documet hooks/useGetDocuments";
import axios from "axios";
import { END_POINT } from "src/config/environment";
import { UploadChangeParam } from "antd/es/upload";
import { FormFileInput } from "src/features/settings/features/authorizedPersons/components/FormFileInput";

export const AttachIdentityDocument: React.FC<IDocumentProps> = ({ docId }) => {
  const { data } = useGetDocuments();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const documentType = queryParams.get("documentType");

  const filteredData = data?.filter(
    (item) => item.document_type === documentType
  );

  const [file, setFile] = useState<any | null>(null);
  const handleUpload = () => {
    if (!file) {
      return;
    }

    const fd = new FormData();
    fd.append("file", file);

    axios
      .post(`${END_POINT.BASE_URL}/admin/upload-file`, fd, {
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res: any) => {
        console.log("response", res.data);
      })
      .catch((err: any) => {
        console.log("error", err);
      });
  };

  return (
    <>
      {filteredData && filteredData.length > 0 ? (
        <Form>
          <FormFileInput Form={Form} name=""  ruleOptions={{ // Pass validation rule options
        required: true, // File upload is required
        maxFileSize: 1024 * 1024 * 5, // Maximum file size in bytes (e.g., 5 MB)
        allowedFileTypes: ["image/jpeg", "image/png", "application/pdf"], // Array of allowed file types
        maxFileUploadCount: 3 // Maximum number of files to upload
      }} />
          {/* {filteredData.map(
            (item) =>
              item.document_category_id === docId && (
                <div className="m-2 p-3" key={item.id}>
                  <Form.Item label={item.name}>
                    <Upload
                      maxCount={1}
                      className="w-full"
                      fileList={file ? [file] : []}
                      onChange={(info: UploadChangeParam) => {
                        if (info.fileList.length > 0) {
                          setFile(info.fileList[0].originFileObj);
                        } 
                      }}
                      beforeUpload={()=>{}}
                    >
                      <Button
                        icon={<UploadOutlined />}
                        className="w-[300px] md:w-[600px]"
                        
                      >
                        Upload File
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
              )
          )} */}
          <Button type="primary" onClick={handleUpload}>Save</Button>
        </Form>
      ) : (
        <Empty
          className="m-5 p-3"
          description="No document requirements have been created. Create a document requirement in settings"
        />
      )}
    </>
  );
};
