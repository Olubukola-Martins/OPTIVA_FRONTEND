import { PageIntro } from "src/components/PageIntro";
import { Select } from "antd";
import { ApplicantDocumentTab } from "../components/UplodedDocuments/ApplicantDocumentTab";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useGetEligibleDependent } from "src/features/settings/features/program-types/hooks/useGetEligibleDependent";
import { useState } from "react";

export const ApplicantDocument = () => {
  const { data } = useGetEligibleDependent();
  const [filterValue, setFilterValue] = useState<string>("required");

  return (
    <>
      <div className="flex justify-between p-2 gap-4 items-center ">
        <div className="w-1/3">
          <PageIntro
            linkBack={appRoute.applications}
            title="Applicant's Documents"
            description="View applicant's documents"
          />
        </div>
        <div className="flex p-2 gap-4 items-center">
          <div className="text-lg hover:cursor-pointer mt-3">
            <i className="ri-download-fill "></i>
          </div>

          <div className="flex gap-3">
            <Select defaultValue="applicant">
              <Select.Option value="applicant">Applicant</Select.Option>
              {data?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.dependant}
                </Select.Option>
              ))}
            </Select>

            <Select
              // className="w-1/2"
              defaultValue={filterValue}
              onChange={(value) => setFilterValue(value)}
            >
              <Select.Option value="required">Required Document</Select.Option>
              <Select.Option value="supportingDocument">
                Supporting Document
              </Select.Option>
            </Select>
          </div>
        </div>
      </div>

      <ApplicantDocumentTab filterValue={filterValue} />
    </>
  );
};
