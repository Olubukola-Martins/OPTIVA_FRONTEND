import { AntiguaBarbacudaDonationQuestions } from "./AntiguaBarbacudaDonationQuestions";
import { AntiguaBarbacudaJointEstate } from "./AntiguaBarbacudaJointEstate";
import { AntiguaBarbacudaSingleEstate } from "./AntiguaBarbacudaSingleEstate";
import { DominicaDonationQuestions } from "./DominicaDonationQuestions";
import { GrenadaDonation } from "./GrenadaDonation";
import { GrenadaRealEstate } from "./GrenadaRealEstate";
import { StKittsNevisQuestions } from "./StKittsNevisQuestions";
import { StLuciaNefiRealEstate } from "./StLuciaNefiRealEstate";

export const ProgramFeesBreakdown = ({
  selectedInvestment,
}: {
  selectedInvestment: number | undefined;
}) => {
  switch (selectedInvestment) {
    case 1:
      return <GrenadaDonation />;
    case 2:
      return <GrenadaRealEstate />;
    case 3:
      return <StLuciaNefiRealEstate />;
    case 4:
      return <DominicaDonationQuestions />;
    case 5:
      return <StKittsNevisQuestions />;
    case 6:
      return <AntiguaBarbacudaDonationQuestions />;
    case 7:
      return <AntiguaBarbacudaSingleEstate />;
    case 8:
      return <AntiguaBarbacudaJointEstate />;

    default:
      return 'Select an investment route to view this form section';
  }
};
