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
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

export const GenerateQuote = () => {
  const { data, isLoading } = useFetchApplicantsByRole();
  const { id } = useParams();
  const [countryId, setCountryId] = useState<number>();
  const [investmentId, setInvestmentId] = useState<number>();

  useEffect(() => {
    if (id) {
      const renderItem = data?.find(
        (item) => item.id === (+id as unknown as number)
      );
      if (renderItem) {
        setCountryId(renderItem.country_id);
        setInvestmentId(renderItem.investmentroute_id);
      }
    }
  }, [data, id]);

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
      renderGenerateQuote = <GenerateGrenadaRealEstateQuote />;
      break;
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
        {renderGenerateQuote}
      </Skeleton>
    </>
  );
};
