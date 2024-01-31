import { IProps } from "./NewApplicantBrief";
import { NewApplicantPeculiaritiesTab } from "./NewApplicantPeculiaritiesTab";

export const NewApplicantPeculiarites:React.FC<IProps> = ({ onNext }) => {
  return (
    <>
      <NewApplicantPeculiaritiesTab onNext={ onNext} />
      
    </>
  );
};
