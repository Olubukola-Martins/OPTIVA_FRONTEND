import { Skeleton } from "antd";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useGetSingleTemplate } from "src/features/settings/features/contractsEmailTemplates/hooks/useGetSingleTemplate";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/useGetApplication";
import { useSendEmail } from "../../hooks/useSendEmail";
import { AppButton } from "src/components/button/AppButton";

export const removeHtmlTags = (htmlString: string) => {
  // Regular expression to match HTML tags
  const htmlTagRegex = /<([^>]+)>/g;

  // Replace HTML tags with appropriate tags based on characteristics
  return htmlString.replace(htmlTagRegex, (_, tagName) => {
    if (tagName.startsWith("/")) {
      // Closing tag, so return as is
      return `</${tagName.substring(1)}>`;
    } else {
      // Opening tag, determine if it's a block or inline element
      const blockElements = [
        "div",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "table",
        "tr",
        "th",
        "td",
      ];
      const isBlockElement = blockElements.includes(tagName);

      // Define padding style
      const paddingStyle = isBlockElement ? "padding: 10px;" : ""; // Adjust padding value as needed

      // Return the appropriate opening tag with padding
      return `<${tagName}${paddingStyle ? ` style="${paddingStyle}"` : ""}${
        isBlockElement ? "" : ' style="display:inline"'
      }>`;
    }
  });
};

export const OnboardingEmail = () => {
  const { data, isLoading } = useGetSingleTemplate("onboarding");
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
