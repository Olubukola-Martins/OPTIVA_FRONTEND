import { Skeleton } from "antd";
import { useGetSingleTemplate } from "src/features/settings/features/contractsEmailTemplates/hooks/useGetSingleTemplate";
import { removeHtmlTags } from "./OnboardingEmail";
import { AppButton } from "src/components/button/AppButton";
import { useSendEmail } from "../../hooks/useSendEmail";
import { useParams } from "react-router-dom";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/useGetApplication";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";

export const ApplicationApprovalEmail = () => {
  const { data, isLoading } = useGetSingleTemplate("approval");
  const { mutate, isLoading: postLoading } = useSendEmail();
  const { id, emailId } = useParams();
  const queryClient = useQueryClient();

  const handleSendEmail = () => {
    mutate(
      { application_id: id as unknown as number, emailtemplate_id: emailId as unknown as number},
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
     
        },
      }
    );
  };
  return (
    <>
      <Skeleton active loading={isLoading}>
        <div className="bg-[url('https://optiva-backend.techmur.com/assets/watermark.png')]  bg-contain bg-center bg-no-repeat p-2 m-3 z-10">
          <img src="https://optiva-backend.techmur.com/assets/optivaLogo.png" />
          <div className="p-2">
            <p>Wednesday, September 6th, 2023.</p>
            <p>Mr. John Smith Doe </p>
            <p>14th Floor, Churchgate Towers 2,</p>
            <p>PC 30, Churchgate Street,</p>
            <p>Victoria Island, Lagos,</p>
            <p>Nigeria.</p>
          </div>
          {data?.data.map((item) => (
            <div className='my-3'
              dangerouslySetInnerHTML={{ __html: removeHtmlTags(item.content) }}
            />

          ))}
        </div>
        <img src="https://optiva-backend.techmur.com/assets/optivaAddr.png" className='my-4 py-5'/>
        <div className="flex justify-end items-center gap-5 my-4 py-5">
          <AppButton
            label="Cancel"
            type="reset"
            variant="transparent"
            // isDisabled={isSuccess}
          />
          <AppButton
            label="Save"
            type="submit"
            handleClick={handleSendEmail}
            isLoading={postLoading}
          />
        </div>
      </Skeleton>
    </>
  );
};
