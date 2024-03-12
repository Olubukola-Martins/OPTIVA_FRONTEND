import React from "react";
import { IDocumentProps } from "../UplodedDocuments/IdentityDocument";
import { Button, Empty, Form, } from "antd";
import { useLocation } from "react-router-dom";
import { useGetDocuments } from "../../hooks/Documet hooks/useGetDocuments";
import { FormFileInput } from "src/features/settings/features/authorizedPersons/components/FormFileInput";

export const AttachIdentityDocument: React.FC<IDocumentProps> = ({ docId }) => {
  const { data } = useGetDocuments();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const documentType = queryParams.get("documentType");

  const filteredData = data?.filter(
    (item) => item.document_type === documentType
  );

  return (
    <>
      {filteredData && filteredData.length > 0 ? (
        <Form>
          {filteredData.map(
            (item) =>
              item.document_category_id === docId && (
                <div className="m-2 p-3" key={item.id}>
                  <FormFileInput
                    Form={Form}
                    multiple={true}
                    name=""
                    ruleOptions   ={{
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
                  {/* <Form.Item label={item.name}>
                  <Upload
                    maxCount={1}
                    className="w-full"
                   
                    beforeUpload={()=>{}}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      className="w-[300px] md:w-[600px]"
                      
                    >
                      Upload File
                    </Button>
                  </Upload>
                </Form.Item> */}
                </div>
              )
          )}
          <Button type="primary">Save</Button>
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
