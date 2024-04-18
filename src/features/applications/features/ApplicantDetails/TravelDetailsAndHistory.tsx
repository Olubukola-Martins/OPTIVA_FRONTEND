import { Form, FormInstance, Skeleton, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { renderDetailsInput } from "./AcademicHistory";
import { useGetSectionResponse } from "../../hooks/Application hooks/useGetSectionResponse";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "../NewApplication/NewApplicantBrief";

export interface IDataResponseProps {
  subsectionName: string;
  onPrev?: () => void;
  form?: FormInstance;
}
export const TravelDetailsAndHistory: React.FC<IDataResponseProps> = ({
  subsectionName,
  onPrev,
  form,
}) => {
  const { id } = useParams();

  const { data: sectionTwoData } = useGetSectionResponse({
    subsection_name: subsectionName,

    currentUrl: `${id as unknown as number}/sectiontworesponse`,
  });

  const { data: sectionTwoQuestions, isLoading } = useGetSingleQuestion({
    id: 1,
    endpointUrl: "section-two",
  });

  useEffect(() => {
    if (sectionTwoData?.data && sectionTwoData.data.length > 0) {
      const initialValues: Record<string, any> = {};
      sectionTwoData.data.forEach((item) => {
        initialValues[item.question.schema_name] = item.response;
      });
      form?.setFieldsValue(initialValues);
    }
  }, [sectionTwoData]);

  return (
    <>
      {sectionTwoData?.data?.length ? (
        sectionTwoData.data.map(
          (item) =>
            item.subsection_name === subsectionName && (
              <Form.Item
                key={item.id}
                name={item.question.schema_name}
                label={item.question.form_question}
              >
                {renderDetailsInput(
                  item.question.input_type,
                  item.question.options
                )}
              </Form.Item>
            )
        )
      ) : (
        <Skeleton active loading={isLoading}>
          {sectionTwoQuestions?.map(
            (item) =>
              item.subsection_name === subsectionName && (
                <div className="w-full" key={item.id}>
                  <Form.Item
                    id={item.id as unknown as string}
                    name={item.schema_name}
                    // rules={generalValidationRules}
                    label={
                      item.form_question.charAt(0).toUpperCase() +
                      item.form_question.slice(1)
                    }
                    key={item.id}
                    className="w-full"
                  >
                    {renderInput(item.input_type, item.options)}
                  </Form.Item>
                </div>
              )
          )}
        </Skeleton>
      )}

      <div className="flex justify-between  my-5 py-2">
        <Tooltip title="Click to go to the previous section">
          <i
            className="ri-arrow-left-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onPrev && onPrev();
            }}
          ></i>
        </Tooltip>
      </div>
    </>
  );
};
