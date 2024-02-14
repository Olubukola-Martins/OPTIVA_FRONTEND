// import { PageIntro } from "src/components/PageIntro";
// import { appRoute } from "src/config/routeMgt/routePaths";
// import { GenerateAntiguaDonationQuote } from "../features/Quotes/GenerateAntiguaDonationQuote";
// import { useGlobalContext } from "src/stateManagement/GlobalContext";
// import { GenerateGrenadaDonation } from "../features/Quotes/GenerateGrenadaDonation";
// import { GenerateGrenadaRealEstateQuote } from "../features/Quotes/GenerateGrenadaRealEstateQuote";
// import { GenerateStKittsQuote } from "../features/Quotes/GenerateStKittsQuote";
// import { GenerateDominicaQuote } from "../features/Quotes/GenerateDominicaQuote";
// import { GenerateStLuciaQuote } from "../features/Quotes/GenerateStLuciaQuote";

// export const GenerateQuote = () => {
//   const { sharedData } = useGlobalContext();
//   return (
//     <>
//       <PageIntro
//         title="Generate Quote"
//         arrowBack={true}
//         linkBack={appRoute.applications}
//       />
//       {sharedData.countryId === 1 && sharedData.investmentId === 1 && (
//         <GenerateGrenadaDonation />
//       )}{" "}
//       ||{" "}
//       {sharedData.countryId === 1 && sharedData.investmentId === 2 && (
//         <GenerateGrenadaRealEstateQuote />
//       )}{" "}
//       ||{" "}
//       {sharedData.countryId === 2 && sharedData.investmentId === 5 && (
//         <GenerateStKittsQuote />
//       )}{" "}
//       ||{" "}
//       {sharedData.countryId === 3 && sharedData.investmentId === 4 && (
//         <GenerateDominicaQuote />
//       )}{" "}
//       ||{" "}
//       {sharedData.countryId === 4 && sharedData.investmentId === 3 && (
//         <GenerateStLuciaQuote />
//       )}{" "}
//       ||
//       {sharedData.countryId === 5 && sharedData.investmentId === 6 && (
//         <GenerateAntiguaDonationQuote />
//       )}{" "}
//       ||{" "}
//       {sharedData.countryId === 5 && sharedData.investmentId === 7 && (
//         <GenerateGrenadaRealEstateQuote />
//       )}{" "}
//       ||{" "}
//       {sharedData.countryId === 5 && sharedData.investmentId === 8 && (
//         <GenerateGrenadaRealEstateQuote />
//       )}
//     </>
//   );
// };


import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { GenerateAntiguaDonationQuote } from "../features/Quotes/GenerateAntiguaDonationQuote";
import { useGlobalContext } from "src/stateManagement/GlobalContext";
import { GenerateGrenadaDonation } from "../features/Quotes/GenerateGrenadaDonation";
import { GenerateGrenadaRealEstateQuote } from "../features/Quotes/GenerateGrenadaRealEstateQuote";
import { GenerateStKittsQuote } from "../features/Quotes/GenerateStKittsQuote";
import { GenerateDominicaQuote } from "../features/Quotes/GenerateDominicaQuote";
import { GenerateStLuciaQuote } from "../features/Quotes/GenerateStLuciaQuote";

export const GenerateQuote = () => {
  const { sharedData } = useGlobalContext();
  let countryId
  let investmentId

  let componentToRender;

  switch (`${countryId}-${investmentId}`) {
    case "1-1":
      componentToRender = <GenerateGrenadaDonation />;
      break;
    case "1-2":
      componentToRender = <GenerateGrenadaRealEstateQuote />;
      break;
    case "2-5":
      componentToRender = <GenerateStKittsQuote />;
      break;
    case "3-4":
      componentToRender = <GenerateDominicaQuote />;
      break;
    case "4-3":
      componentToRender = <GenerateStLuciaQuote />;
      break;
    case "5-6":
      componentToRender = <GenerateAntiguaDonationQuote />;
      break;
    case "5-7":
    case "5-8":
      componentToRender = <GenerateGrenadaRealEstateQuote />;
      break;
    default:
      componentToRender = null;
      break;
  }

  return (
    <>
      <PageIntro
        title="Generate Quote"
        arrowBack={true}
        linkBack={appRoute.applications}
      />
      {componentToRender}
    </>
  );
};
