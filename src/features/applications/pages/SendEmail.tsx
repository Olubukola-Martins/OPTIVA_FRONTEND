import { useParams } from "react-router-dom";
import { ApplicationApprovalEmail } from "../features/components/Emails/ApplicationApprovalEmail";
import { AppointmentConfirmationEmail } from "../features/components/Emails/AppointmentConfirmationEmail";
import { BankClearance } from "../features/components/Emails/BankClearance";
import { BankSubmissionEmail } from "../features/components/Emails/BankSubmissionEmail";
import { OnboardingEmail } from "../features/components/Emails/OnboardingEmail";
import { PassportEmail } from "../features/components/Emails/PassportEmail";

export const SendEmail = () => {
  const {id, emailId} = useParams();
  let renderEmail;
console.log('email', id)

  switch (emailId) {
    case "2":
      renderEmail = <OnboardingEmail />;
      break;
    case "3":
      renderEmail = <AppointmentConfirmationEmail />;
      break;
    case "4":
      renderEmail = <BankClearance />;
      break;
    case "5":
      renderEmail = <PassportEmail />;
      break;
    case "6":
      renderEmail = <ApplicationApprovalEmail />;
      break;
    case "7":
      renderEmail = <BankSubmissionEmail />;
      break;
    default:
      break;
  }
  return <>{renderEmail}</>;
};
