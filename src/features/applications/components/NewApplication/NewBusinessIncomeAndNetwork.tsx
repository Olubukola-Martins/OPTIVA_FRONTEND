import { Form, Skeleton } from "antd";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "./NewApplicantBrief";
import { AppButton } from "src/components/button/AppButton";
import { IApplicationFormResponseProps } from "./NewImmigrationAndCourtProceedings";
import { useGlobalContext } from "src/stateManagement/GlobalContext";

export const NewBusinessIncomeAndNetwork: React.FC<
  IApplicationFormResponseProps
> = ({ onNext, subsectionName }) => {
  const { sharedData } = useGlobalContext();
  const { data, isLoading } = useGetSingleQuestion({
    id: sharedData.templateId as unknown as number,
    endpointUrl: "section-two",
  });


  return (
    <>
      <Skeleton active loading={isLoading}>
        {data?.map(
          (item) =>
            item.subsection_name === subsectionName && (
              <div className="w-full" key={item.id}>
                <Form.Item
                  name={item.schema_name}
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

        <AppButton
          label="Next"
          type="button"
          handleClick={() => {
            onNext();
          }}
        />
      </Skeleton>
    </>
  );
};
