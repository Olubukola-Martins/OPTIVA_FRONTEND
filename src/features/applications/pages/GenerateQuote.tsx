import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { GenerateAntiguaDonationQuote } from "../features/Quotes/Generate Quotes/GenerateAntiguaDonationQuote";
import { GenerateGrenadaDonation } from "../features/Quotes/Generate Quotes/GenerateGrenadaDonation";
import { GenerateGrenadaRealEstateQuote } from "../features/Quotes/Generate Quotes/GenerateGrenadaRealEstateQuote";
import { GenerateStKittsQuote } from "../features/Quotes/Generate Quotes/GenerateStKittsQuote";
import { GenerateDominicaQuote } from "../features/Quotes/Generate Quotes/GenerateDominicaQuote";
import { GenerateStLuciaQuote } from "../features/Quotes/Generate Quotes/GenerateStLuciaQuote";
import { useFetchApplicantsByRole } from "../hooks/Application hooks/useFetchApplicantsByRole";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";
import { GenerateAntiguaSingleEstate } from "../features/Quotes/Generate Quotes/GenerateAntiguaSingleEstate";
import { GenerateAntiguaJointEstateQuote } from "../features/Quotes/Generate Quotes/GenerateAntiguaJointEstateQuote";

export const GenerateQuote = () => {
  const { isLoading } = useFetchApplicantsByRole();
 
 const {countryId, investId}= useParams()
  

  let renderGenerateQuote;

  switch (`${countryId}-${investId}`) {
    case "1-1":
      renderGenerateQuote = <GenerateGrenadaDonation />;
      break;
    case "2-1":
      renderGenerateQuote = <GenerateGrenadaRealEstateQuote />;
      break;
    case "5-2":
      renderGenerateQuote = <GenerateStKittsQuote />;
      break;
    case "4-3":
      renderGenerateQuote = <GenerateDominicaQuote />;
      break;
    case "3-4":
      renderGenerateQuote = <GenerateStLuciaQuote />;
      break;
    case "6-5":
      renderGenerateQuote = <GenerateAntiguaDonationQuote />;
      break;
    case "7-5":
      renderGenerateQuote = <GenerateAntiguaSingleEstate />;
      break;
    case "8-5":
      renderGenerateQuote = <GenerateAntiguaJointEstateQuote />;
      break;
    default:
      
      break;
  }

  return (
    <>
      <PageIntro
        title="Generate Quote"
        arrowBack={true}
        linkBack={appRoute.applications}
      />
      <Skeleton loading={isLoading} active>
        {renderGenerateQuote}
        {/* <GenerateGrenadaDonation/> */}
      </Skeleton>
    </>
  );
};
