import { NewAboutTheApplicantsTab } from "./NewAboutTheApplicantsTab";
import { IProps } from "./NewApplicantBrief";

export const NewAboutTheApplicant:React.FC<IProps> = ({ onNext }) => {
  return (
    <>
      <NewAboutTheApplicantsTab onNext={ onNext} />
    
    </>
  );
};
