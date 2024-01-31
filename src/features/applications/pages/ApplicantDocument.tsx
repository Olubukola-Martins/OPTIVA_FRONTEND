import { PageIntro } from "src/components/PageIntro";
import { Select } from "antd";
import { ApplicantDocumentTab } from "../features/UplodedDocuments/ApplicantDocumentTab";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useGetEligibleDependent } from "src/features/settings/features/program-types/hooks/useGetEligibleDependent";
import { useState } from "react";
import { useGetApplicantDocumentCategory } from "../hooks/useGetApplicantDocumentCategory";
import { useGetDependentDoc } from "../hooks/useGetDependentDoc";
import { useParams } from "react-router-dom";

export const ApplicantDocument = () => {
  const { data } = useGetEligibleDependent();
  const { data: dependentData } = useGetApplicantDocumentCategory(1);
  const { id } = useParams();
  const [filterValue, setFilterValue] = useState<string>("required");
  console.log("data", data);
  console.log("dependent data", dependentData);
  const [dependantId, setDependentId] = useState<number>();

  const getDependentId = (value: number) => {
    setDependentId(value);
  };

  console.log("dependent id", dependantId);

  const { data: dependantDocData } = useGetDependentDoc({
    applicantId: id as unknown as number,
    dependentId: dependantId as unknown as number,
  });

  console.log("dependent doc data", dependantDocData);
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
            <Select defaultValue={0} onChange={getDependentId}>
              <Select.Option value={0}>Applicant</Select.Option>

              {dependentData?.map((item) =>
                item.dependants.map((dependant) => {
                  const matchingData = data?.find(
                    (item) => item.id === dependant.eligible_dependant_id
                  );

                  if (matchingData) {
                    return (
                      <Select.Option
                        key={matchingData.id}
                        value={matchingData.id}
                      >
                        {matchingData.dependant}
                      </Select.Option>
                    );
                  }
                })
              )}
            </Select>

            {/* <Select>
              {dependentData?.dependants.map((dependant) => {
                const matchingData = data.age_brackets.find(
                  (ageBracket) =>
                    ageBracket.eligible_dependant_id === dependant.id
                );

                if (matchingData) {
                  return (
                    <Select.Option
                      key={dependant.id}
                      value={dependant.eligible_dependant_id}
                    >
                      {dependant.dependant}
                    </Select.Option>
                  );
                }

                return null;
              })}
            </Select> */}

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
