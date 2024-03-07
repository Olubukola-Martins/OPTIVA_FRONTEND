import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
// import { useGetDocuments } from "../hooks/Documet hooks/useGetDocuments";
// import { Form, } from "antd";
import { useLocation } from "react-router-dom";
import { DocumentsTab } from "../features/AttachDocuments/DocumentsTab";

export const AttachDocuments = () => {
  // const { data,  } = useGetDocuments();
  // const [form] = Form.useForm();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const documentType = queryParams.get("documentType");

  // const filteredData = data?.filter(
  //   (item) => item.document_type === documentType
  // );

  return (
    <>
      <PageIntro
        title="Applicant's Documents"
        description={`Please upload the ${documentType} documents`}
        linkBack={appRoute.applications}
      />
      {/* <Skeleton active loading={isLoading}>
        <Form form={form} layout="vertical">
          {filteredData?.map((item) => (
            <div className="my-2 py-2 border-b">
              <h2 className="text-lg my-3 font-semibold">
                {item.document_category_id}
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}:
              </h2>
              <Form.Item name={`${item.name}`} key={item.id}>
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
          ))}
          <div className="flex justify-end items-center gap-5 my-5">
            <AppButton label="Cancel" type="reset" variant="transparent" />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Skeleton> */}
      <DocumentsTab/>
    </>
  );
};
