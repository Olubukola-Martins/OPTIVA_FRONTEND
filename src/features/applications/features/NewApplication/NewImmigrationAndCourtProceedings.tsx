import { Skeleton, Form, Empty, Tooltip } from "antd";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "./NewApplicantBrief";
import { useGlobalContext } from "src/stateManagement/GlobalContext";

export interface IApplicationFormResponseProps {
  onNextTabItem?: () => void;
  onPrevTabItem?: () => void;
  subsectionName: string;
}

export const NewImmigrationAndCourtProceedings: React.FC<
  IApplicationFormResponseProps
> = ({ onNextTabItem, subsectionName }) => {
  const { sharedData } = useGlobalContext();
  const { data, isLoading } = useGetSingleQuestion({
    id: sharedData.templateId as unknown as number,
    endpointUrl: "section-three",
  });

  return (
    <>
      <Skeleton active loading={isLoading}>
        {data?.length !== 0 ? (
          data?.map(
            (item) =>
              item.subsection_name === subsectionName && (
                <div className="w-full" key={item.id}>
                  <Form.Item
                    required={false}
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
          )
        ) : (
          <Empty />
        )}

        <div className="flex justify-end  my-5 py-2">
          <Tooltip title="Click to go to the next section of the form">
            <i
              className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
              onClick={() => {
                onNextTabItem && onNextTabItem();
              }}
            ></i>
          </Tooltip>
        </div>
      </Skeleton>
    </>
  );
};
