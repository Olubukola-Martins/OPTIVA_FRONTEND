import { Skeleton } from "antd";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useGetSingleTemplate } from "src/features/settings/features/contractsEmailTemplates/hooks/useGetSingleTemplate";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { useSendEmail } from "../../hooks/Application hooks/useSendEmail";
import { AppButton } from "src/components/button/AppButton";
import { useGetSingleApplicant } from "../../hooks/Application hooks/useGetSingleApplicant";
import { todaysDate } from "../SendQuote";

export const removeHtmlTags = (htmlString: string | null) => {
  // Check if htmlString is null or undefined
  if (!htmlString) {
    return ""; // Or return null or any default value as needed
  }

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

export const optivaAddr = (
  <div className="flex gap-6 justify-center">
    <div className="flex gap-2 font-semibold">
      <>
        <i className="ri-map-pin-line text-[#F33C45]"></i>
      </>
      <div>
        <p>Head Office:</p>
        <p>14th Floor, Churchgate Towers 2,</p>
        <p>PC 30, Churchgate street,</p>
        <p>Victoria Island, Lagos</p>
        <p>Nigeria.</p>
      </div>
    </div>
    <div className="flex gap-2 font-semibold">
      <>
        <i className="ri-map-pin-line text-[#F33C45]"></i>
      </>
      <div>
        <p>Abuja Office:</p>
        <p>8th Floor, World Trade Center,</p>
        <p>1113, Constitutional Ave.,</p>
        <p>Central Business District,</p>
        <p>Abuja, Nigeria.</p>
      </div>
    </div>
    <div className="flex gap-2 font-semibold">
      <>
        <i className="ri-map-pin-line text-[#F33C45]"></i>
      </>

      <div>
        <p> Lekki Office:</p>
        <p>3rd Floor, CAPPA House, 1, Udeco</p>
        <p>Medical Road, Off Chevron Drive,</p>
        <p> By Chevy View Estate, </p>
        <p> Lekki, Lagos Nigeria.</p>
      </div>
    </div>
    <div className="flex gap-2 font-semibold">
      <>
        <i className="ri-map-pin-line text-[#F33C45]"></i>
      </>

      <div>
        <p> Enugu Office:</p>
        <p>Centers 57 & 59,</p>
        <p>Palms Polo Park Mall,</p>
        <p>Abakaliki Road, </p>
        <p>Enugu, Nigeria.</p>
      </div>
    </div>

    <div className="flex gap-2 font-semibold">
      <>
        <i className="ri-map-pin-line text-[#F33C45]"></i>
      </>

      <div>
        <p>East Africa Regional Office:</p>
        <p>Pearle Heaven, House B7, </p>
        <p>Westlands Avenue,</p>
        <p>Off Rhapta Road,</p>
        <p> Westlands, Nairobi Kenya.</p>
      </div>
    </div>
  </div>
);
export const OnboardingEmail = () => {
  const { data, isLoading } = useGetSingleTemplate("onboarding");
  const { mutate, isLoading: postLoading } = useSendEmail();
  const { id, emailId } = useParams();
  const queryClient = useQueryClient();
  const { data: applicantData } = useGetSingleApplicant({
    id: id as unknown as number,
  });
  const handleSendEmail = () => {
    mutate(
      {
        application_id: id as unknown as number,
        emailtemplate_id: emailId as unknown as number,
      },
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
          <img
            src="https://optivateststorage.blob.core.windows.net/optiva/uploads/1713776055_new logo.png"
            className="object-contain p-3 h-32"
          />
          <img
            src="https://optivateststorage.blob.core.windows.net/optiva/uploads/1713776533_Group 1000001758.png"
            className="object-fill w-full"
          />
          {/* <p className=" border-b-[#801d22]"/> */}
          <div className="p-2 m-4 ">
            <p className="mt-2">{todaysDate}</p>
            <p>{applicantData?.applicant_name} </p>
            <p>14th Floor, Churchgate Towers 2,</p>
            <p>PC 30, Churchgate Street,</p>
            <p>Victoria Island, Lagos,</p>
            <p>Nigeria.</p>
          </div>
          {data?.data.map((item) => (
            <div
              className="my-3"
              dangerouslySetInnerHTML={{ __html: removeHtmlTags(item.content) }}
            />
          ))}
        </div>
        <div>
          {optivaAddr}

          {/* <div className="flex justify-center my-5 gap-10 items-center p-3">
            <p className="flex justify-center">
              <i className="ri-smartphone-line"> +234 1 330 3100</i>
            </p>

            <p className="flex">
              <i className="ri-smartphone-line"> +234 811 570 5056</i>
            </p>
            <p className="flex">
              <i className="ri-mail-line"></i>
              <a href="mailto:Legal@OptivaCP.com">Legal@OptivaCP.com</a>
            </p>
            <p>
              <i className="ri-global-line">
                <a href="www.OPTIVACP.com" target="_blank">
                  www.OPTIVACP.com
                </a>
              </i>
            </p>
          </div> */}
        </div>

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
