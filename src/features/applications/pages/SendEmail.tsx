import { useParams } from "react-router-dom";
import { ApplicationApprovalEmail } from "./Emails/ApplicationApprovalEmail";
import { AppointmentConfirmationEmail } from "./Emails/AppointmentConfirmationEmail";
import { BankClearance } from "./Emails/BankClearance";
import { BankSubmissionEmail } from "./Emails/BankSubmissionEmail";
import { OnboardingEmail } from "./Emails/OnboardingEmail";
import { PassportEmail } from "./Emails/PassportEmail";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";

export const SendEmail = () => {
  const { id, emailId } = useParams();
  console.log(id);
  let renderEmail;

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
  return (
    <>
      <div className="my-5">
        <PageIntro title="Send Email" linkBack={appRoute.applications} />
      </div>
      {renderEmail}
    </>
  );
};
