import { Skeleton, Form } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "./NewApplicantBrief";
import { useGlobalContext } from "src/stateManagement/GlobalContext";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export interface ISubmitApplicationResponseProps {
  onCollectResponses: (data: any[], subsectionName: string) => void;
  subsectionName: string;
  isLoading: boolean;
  isSuccess:boolean;
}

export const NewCriminalHistory: React.FC<ISubmitApplicationResponseProps> = ({
  onCollectResponses,
  subsectionName,
  isLoading: postLoading,
  isSuccess,
}) => {
  const { sharedData } = useGlobalContext();
  const { data, isLoading } = useGetSingleQuestion({
    id: sharedData.templateId as unknown as number,
    endpointUrl: "section-three",
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
        )}
        {!isSuccess && (
          <div className="flex justify-end items-center gap-5">
            <AppButton label="Cancel" type="reset" variant="transparent" />
            <AppButton
              label="Save"
              type="submit"
              // isLoading={postLoading}
              handleClick={() => {
                onCollectResponses(data || [], subsectionName);
              }}
              isLoading={postLoading}
              isDisabled={isSuccess}
              containerStyle={isSuccess ? "cursor-not-allowed" : ""}
            />
          </div>
        )}
        {/* <AppButton
          label="Save"
          type="submit"
          handleClick={() => {
            onCollectResponses(data || [], subsectionName);
          }}
          isLoading={postLoading}
        /> */}
      </Skeleton>
    </>
  );
};
