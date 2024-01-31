import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
// import { GenerateDominicaQuote } from "../features/Quotes/GenerateDominicaQuote";
// import { GenerateGrenadaRealEstateQuote } from "../features/Quotes/GenerateGrenadaRealEstateQuote";
// import { GenerateGrenadaDonation } from "../features/Quotes/GenerateGrenadaDonation";
// import { GenerateAntiguaJointEstateQuote } from "../features/Quotes/GenerateAntiguaJointEstateQuote";
// import { GenerateAntiguaSingleEstate } from "../features/Quotes/GenerateAntiguaSingleEstate";
import { GenerateAntiguaDonationQuote } from "../features/Quotes/GenerateAntiguaDonationQuote";

export const GenerateQuote = () => {
  return (
    <>
      <PageIntro
        title="Generate Quote"
        arrowBack={true}
        linkBack={appRoute.applications}
      />
      {/* <GenerateStKittsQuote /> */}
      {/* <GenerateStLuciaQuote /> */}
      {/* <GenerateDominicaQuote/> */}
      {/* <GenerateGrenadaRealEstateQuote /> */}
      {/* <GenerateGrenadaDonation /> */}
      {/* <GenerateAntiguaJointEstateQuote /> */}
      {/* <GenerateAntiguaSingleEstate /> */}
      <GenerateAntiguaDonationQuote />
    </>
  );
};
