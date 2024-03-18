import { IApplicantDetailsProps } from "./ApplicantBrief";
import { ApplicantPeculiaritiesTab } from "./ApplicantPeculiaritiesTab";

export const ApplicantPeculiarites: React.FC<IApplicantDetailsProps> = ({
  onNext,
  onPrev,
}) => {
  return (
    <>
      <ApplicantPeculiaritiesTab onNext={onNext} onPrev={onPrev}/>
    </>
  );
};
