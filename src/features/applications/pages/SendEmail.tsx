import { useParams } from "react-router-dom";
import { ApplicationApprovalEmail } from "./Emails/ApplicationApprovalEmail";
import { AppointmentConfirmationEmail } from "./Emails/AppointmentConfirmationEmail";
import { BankClearance } from "./Emails/BankClearance";
import { BankSubmissionEmail } from "./Emails/BankSubmissionEmail";
import { OnboardingEmail } from "./Emails/OnboardingEmail";
import { PassportEmail } from "./Emails/PassportEmail";

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
