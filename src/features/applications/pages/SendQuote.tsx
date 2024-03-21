import { AppButton } from "src/components/button/AppButton";
import { useSendQuote } from "../hooks/Quotes hooks/useSendQuote";
import { QUERY_KEY_QUOTES } from "src/features/payment/pages/Payments";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { DomincaQuoteTable } from "../features/Quotes/Quotes Table/DomincaQuoteTable";
import { useNavigate, useParams } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { GrenadaQuoteTable } from "../features/Quotes/Quotes Table/GrenadaQuoteTable";
import { GrenadaEstateQuoteTable } from "../features/Quotes/Quotes Table/GrenadaEstateQuoteTable";
import { StLuciaQuoteTable } from "../features/Quotes/Quotes Table/StLuciaQuoteTable";
import { StKittQuoteTable } from "../features/Quotes/Quotes Table/StKittQuoteTable";
import { AntiguaDonationQuoteTable } from "../features/Quotes/Quotes Table/AntiguaDonationQuoteTable";
import { AntiguaSingleEstateQuoteTable } from "../features/Quotes/Quotes Table/AntiguaSingleEstateQuoteTable";
import { AntiguaJointQuoteTable } from "../features/Quotes/Quotes Table/AntiguaJointQuoteTable";
import { END_POINT } from "src/config/environment";
// import { useGetSingleApplicant } from "../hooks/Application hooks/useGetSingleApplicant";

const today = new Date();
const dayOfMonth = today.getDate();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthIndex = today.getMonth();
const year = today.getFullYear();

const getDaySuffix = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const todaysDate = `${dayOfMonth}${getDaySuffix(dayOfMonth)} ${
  monthNames[monthIndex]
}, ${year}`;

export const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse",
  width: "100%",
};

export const thStyle: React.CSSProperties = {
  border: "1px solid black",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#801d22",
  color: "#fff",
  fontSize: "1.1rem",
};

export const tdPayment: React.CSSProperties = {
  border: "1px solid black",
  padding: "8px",
};
export const tdStyle: React.CSSProperties = {
  border: "1px solid black",
  padding: "8px",
  fontStyle: "italic",
  //   textAlign: "left",
};

export const colOneStyle: React.CSSProperties = {
  // backgroundColor: "#33cccc",
  border: "1px solid black",
  padding: "8px",
  color: "#28A745",
  fontSize: "1.3rem",
  textDecoration: "underline",
  fontWeight: "400",
};

export const SendQuote = () => {
  const { id, investId } = useParams();
  const queryClient = useQueryClient();
  const { mutate, isLoading: postLoading } = useSendQuote();

  let renderGenerateQuote;

  switch (`${investId}`) {
    case "1":
      renderGenerateQuote = <GrenadaQuoteTable id={id as unknown as number} />;
      break;
    case "2":
      renderGenerateQuote = (
        <GrenadaEstateQuoteTable id={id as unknown as number} />
      );
      break;
    case "3":
      renderGenerateQuote = <StLuciaQuoteTable id={id as unknown as number} />;
      break;
    case "4":
      renderGenerateQuote = <DomincaQuoteTable id={id as unknown as number} />;
      break;
    case "5":
      renderGenerateQuote = <StKittQuoteTable id={id as unknown as number} />;
      break;
    case "6":
      renderGenerateQuote = (
        <AntiguaDonationQuoteTable id={id as unknown as number} />
      );
      break;
    case "7":
      renderGenerateQuote = (
        <AntiguaSingleEstateQuoteTable id={id as unknown as number} />
      );
      break;
    case "8":
      renderGenerateQuote = (
        <AntiguaJointQuoteTable id={id as unknown as number} />
      );
      break;
    default:
      // renderGenerateQuote = <GenerateGrenadaRealEstateQuote />;
      break;
  }

  const handleDownload = (id: number) => {
    const anchor = document.createElement("a");

    anchor.href = `${END_POINT.BASE_URL}/admin/download-quote/${id}`;

    anchor.target = "_blank";

    anchor.setAttribute("download", "filename");

    document.body.appendChild(anchor);

    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleSendQuote = () => {
    mutate(
      { id: id as unknown as number },
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.response.data.message,
            duration: 8.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            title: "Success",
            state: "success",
            description: res.data.message,
            duration: 6.0,
          });
          queryClient.invalidateQueries([QUERY_KEY_QUOTES]);
        },
      }
    );
  };
  const navigate = useNavigate();
  return (
    <>
      <PageIntro title="Generate Quote" linkBack={appRoute.applications} />
      <div className="bg-[url('https://optiva-backend.techmur.com/assets/watermark.png')]  bg-contain bg-center bg-no-repeat p-2 m-3 z-10">
        <div className="flex justify-between items-baseline border-b border-b-[#801d22] mb-5 pb-3 ">
          <img src="https://optiva-backend.techmur.com/assets/optivaLogo.png" />
          <p>Quote No: </p>
        </div>
        {renderGenerateQuote}
        {/* {data?.investmentroute_id === 1 && (
          <GrenadaQuoteTable id={id as unknown as number} />
        )}
        {data?.investmentroute_id === 2 && (
          <GrenadaEstateQuoteTable id={id as unknown as number} />
        )}
        {data?.investmentroute_id === 3 && (
          <StLuciaQuoteTable id={id as unknown as number} />
        )}
        {data?.investmentroute_id === 4 && (
          <DomincaQuoteTable id={id as unknown as number} />
        )}
        {data?.investmentroute_id === 5 && (
          <StKittQuoteTable id={id as unknown as number} />
        )}
        {data?.investmentroute_id === 6 && (
          <AntiguaDonationQuoteTable id={id as unknown as number} />
        )}
        {data?.investmentroute_id === 7 && (
          <AntiguaSingleEstateQuoteTable id={id as unknown as number} />
        )}
        {data?.investmentroute_id === 8 && (
          <AntiguaJointQuoteTable id={id as unknown as number} />
        )} */}
      </div>
      <img
        src="https://optiva-backend.techmur.com/assets/optivaAddr.png"
        className="my-4 py-5"
      />
      <div className="flex justify-end items-center gap-5 my-4 py-5">
        <AppButton
          label="Cancel"
          variant="transparent"
          handleClick={() => {
            navigate(appRoute.applications);
          }}
        />
        <AppButton
          label="Download"
          variant="transparent"
          handleClick={() => handleDownload(id as unknown as number)}
        />

        <AppButton
          label="Send Quote"
          type="submit"
          handleClick={handleSendQuote}
          isLoading={postLoading}
        />
      </div>
    </>
  );
};
