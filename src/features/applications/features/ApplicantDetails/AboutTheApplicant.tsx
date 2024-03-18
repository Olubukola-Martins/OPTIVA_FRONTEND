import { AboutTheApplicantsTab } from "./AboutTheApplicantsTab";
import { IApplicantDetailsProps } from "./ApplicantBrief";

export const AboutTheApplicant: React.FC<IApplicantDetailsProps> = ({
  onNext,
  onPrev,
}) => {
  return <AboutTheApplicantsTab onNext={onNext} onPrev={onPrev}/>;
};
