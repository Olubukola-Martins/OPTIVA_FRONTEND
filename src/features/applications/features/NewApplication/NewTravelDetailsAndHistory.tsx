import { Empty, Form, Skeleton, Tooltip } from "antd";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "./NewApplicantBrief";
import { ISubmitApplicationResponseProps } from "./NewCriminalHistory";
import { AppButton } from "src/components/button/AppButton";
import { useGlobalContext } from "src/stateManagement/GlobalContext";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export const NewTravelDetailsAndHistory: React.FC<
  ISubmitApplicationResponseProps
> = ({
  onCollectResponses,
  subsectionName,
  isLoading: postLoading,
  isSuccess,
  onPrevTabItem,
}) => {
  const { sharedData } = useGlobalContext();
  const { data, isLoading } = useGetSingleQuestion({
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

          {/* <AppButton
          label="Save"
          type="submit"
          handleClick={() => {
            onCollectResponses(data || [], subsectionName);
          }}
          isLoading={postLoading}
        /> */}
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
      </div>

      {!isSuccess && (
        <div className="flex justify-end items-center gap-5 my-5">
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
    </>
  );
};
