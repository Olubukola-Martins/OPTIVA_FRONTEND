import { PageIntro } from "src/components/PageIntro";
import { Icon } from "@iconify/react";
import { Select } from "antd";
import { ApplicantDocumentTab } from "../components/UplodedDocuments/ApplicantDocumentTab";
import { appRoute } from "src/config/routeMgt/routePaths";

const ApplicantDocument = () => {
  return (
    <>
      <div className="flex justify-between p-2 gap-4 items-center">
        <PageIntro
          linkBack={appRoute.applications}
          title="Applicant's Documents"
          description="Please upload the required documents"
        />
        <div className="flex p-2 gap-4 items-center">
          <Icon icon="ri:download-fill hover:text-primary" />
          <Icon icon="zondicons:list hover:text-primary" />
          <Select
            defaultValue="Applicant"
            options={[
              {
                value: "Applicant",
                label: "Applicant",
              },
              {
                value: "Spouse",
                label: "Spouse",
              },
              {
                value: "Sibling",
                label: "Sibling",
              },
              {
                value: "Child 1",
                label: "Child 1",
              },
            ]}
          />
          <Select
            defaultValue="requiredDocument"
            options={[
              {
                value: "requiredDocument",
                label: "Required Document",
              },
              {
                value: "supportingDocument",
                label: "Supporting Document",
              },
            ]}
          />
        </div>
      </div>
      <ApplicantDocumentTab />
      
    </>
  );
};

export default ApplicantDocument;
