import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { GenerateAntiguaDonationQuote } from "../features/Quotes/GenerateAntiguaDonationQuote";
import { GenerateGrenadaDonation } from "../features/Quotes/GenerateGrenadaDonation";
import { GenerateGrenadaRealEstateQuote } from "../features/Quotes/GenerateGrenadaRealEstateQuote";
import { GenerateStKittsQuote } from "../features/Quotes/GenerateStKittsQuote";
import { GenerateDominicaQuote } from "../features/Quotes/GenerateDominicaQuote";
import { GenerateStLuciaQuote } from "../features/Quotes/GenerateStLuciaQuote";
import { useFetchApplicantsByRole } from "../hooks/useFetchApplicantsByRole";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

export const GenerateQuote = () => {
  const { data, isLoading } = useFetchApplicantsByRole();
  const { id } = useParams();
 
  
  const [countryId, setCountryId] = useState<number>();
  const [investmentId, setInvestmentId] = useState<number>();

  // const applicantId = data?.find(
  //   (item) => item.id === (id as unknown as number)
  // );
  // return applicantId;

  // const getApplicantDetails = (countryId: number, investId: number) => {
  //   const applicantId = data?.find(
  //     (item) => item.id === (id as unknown as number)
  //   );
  //   setCountryId(applicantId?.country_id)
  //   setInvestmentId(applicantId?.investmentroute_id)
  // };
  //   const getApplicantDetails = () => {
  //     ;
  // //  setCountryId()



  useEffect(() => {
    if (id) {
      const foundItem = data?.find((item) => item.id === +id as unknown as number);
      console.log('id', foundItem)
      if (foundItem) {
        console.log(foundItem.country_id);
        setCountryId(foundItem.country_id)
        setInvestmentId(foundItem.investmentroute_id)
      }
    
    }
  }, [data, id]);
  
  


  // setCountryId(applicantId?.country_id);
  // setInvestmentId(applicantId?.investmentroute_id);

  // console.log("country:", countryId, "invest:", investmentId);
  let renderGenerateQuote;

  switch (`${countryId}-${investmentId}`) {
    case "1-1":
      renderGenerateQuote = <GenerateGrenadaDonation />;
      break;
    case "1-2":
      renderGenerateQuote = <GenerateGrenadaRealEstateQuote />;
      break;
    case "2-5":
      renderGenerateQuote = <GenerateStKittsQuote />;
      break;
    case "3-4":
      renderGenerateQuote = <GenerateDominicaQuote />;
      break;
    case "4-3":
      renderGenerateQuote = <GenerateStLuciaQuote />;
      break;
    case "5-6":
      renderGenerateQuote = <GenerateAntiguaDonationQuote />;
      break;
    case "5-7":
    case "5-8":
      renderGenerateQuote = <GenerateGrenadaRealEstateQuote />;
      break;
    default:
      // renderGenerateQuote = <GenerateGrenadaRealEstateQuote />;
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
        {" "}
        {renderGenerateQuote}
      </Skeleton>
    </>
  );
};
