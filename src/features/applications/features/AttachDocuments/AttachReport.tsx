import React from "react";
import { IDocumentProps } from "../UplodedDocuments/IdentityDocument";
import { Button, Empty, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useGetDocuments } from "../../hooks/Documet hooks/useGetDocuments";

export const AttachReport: React.FC<IDocumentProps> = ({ docId
}) => {
  const { data } = useGetDocuments();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const documentType = queryParams.get("documentType");

  const filteredData = data?.filter(
    (item) => item.document_type === documentType
  );

  return (
    <>
      {filteredData?.map((item) =>
        item.document_category_id === docId ? (
            <div className="m-2 p-3">
            <Form.Item key={item.id} label={item.name}>
              <Upload maxCount={1} className="w-full">
                <Button
                  icon={<UploadOutlined />}
                  className="w-[300px] md:w-[600px]"
                >
                  Upload File
                </Button>
              </Upload>
            </Form.Item>
            <p className="mt-1 font-medium">
              [Only png, jpeg and pdf formats are supported]
            </p>
            <p className="">Maximum upload file size is 5MB</p>
          </div>
        ) : (
          <Empty className="m-5 p-3" description="No document requirements have been created. Create a document requirement in settings"
          />
        )
      )}
    </>
  );
};
