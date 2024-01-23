import { Skeleton, Form, Empty } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "./NewApplicantBrief";
import { useGlobalContext } from "src/stateManagement/GlobalContext";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export interface IApplicationFormResponseProps {
  onNext?: () => void;
  onPrev?: () => void;
  subsectionName: string;
}

export const NewImmigrationAndCourtProceedings: React.FC<
  IApplicationFormResponseProps
> = ({ onNext, subsectionName, onPrev }) => {
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
                    name={item.schema_name}
                    rules={generalValidationRules}
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

        {/* <div className="flex justify-end gap-3 my-5 py-2">
          <AppButton
            label="Previous"
            variant="transparent"
            type="button"
            handleClick={() => {
              onPrev && onPrev();
            }}
          />

          <AppButton
            label="Next"
            type="button"
            handleClick={() => {
              onNext && onNext();
            }}
          />
        </div> */}
      </Skeleton>
    </>
  );
};
