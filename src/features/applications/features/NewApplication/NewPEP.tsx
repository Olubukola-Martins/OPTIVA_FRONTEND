import { Empty, Form, Skeleton, Tooltip } from "antd";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "./NewApplicantBrief";
import { IApplicationFormResponseProps } from "./NewImmigrationAndCourtProceedings";
import { useGlobalContext } from "src/stateManagement/GlobalContext";
import { generalValidationRules, generalValidationRulesOpt } from "src/utils/formHelpers/validations";

export const NewPEP: React.FC<IApplicationFormResponseProps> = ({
  onNextTabItem,
  onPrevTabItem,
  subsectionName,
}) => {
  const { sharedData } = useGlobalContext();
  const { data, isLoading } = useGetSingleQuestion({
    // id: 9,
    id: sharedData.templateId as unknown as number,
    endpointUrl: "section-two",
  });

  return (
    <>
      {data?.length === 0 ? (
        <Empty />
      ) : (
        <Skeleton active loading={isLoading}>
          {data?.map(
            (item) =>
              item.subsection_name === subsectionName && (
                <div className="w-full" key={item.id}>
                  <Form.Item
                    name={item.schema_name}
                    rules={item.is_required === 1 ? generalValidationRules : generalValidationRulesOpt}
                   
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
        <Tooltip title="Click to go to the previous section of the form">
          <i
            className="ri-arrow-left-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onPrevTabItem && onPrevTabItem();
            }}
          ></i>
        </Tooltip>

        <Tooltip title="Click to go to the next section of the form">
          <i
            className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onNextTabItem && onNextTabItem();
            }}
          ></i>
        </Tooltip>
      </div>
    </>
  );
};