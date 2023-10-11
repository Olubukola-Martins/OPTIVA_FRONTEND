import { AboutTheApplicantsTab } from "../components/AboutTheApplicantsTab";
import { AppButton } from "src/components/button/AppButton";

const AboutTheApplicant = () => {
  return (
    <>
        <AboutTheApplicantsTab />
        <div className="flex justify-end gap-4 my-4">
          <AppButton label="Previous" type="button" variant="transparent" />
          <AppButton label="Next" type="button" />
        
      </div>
    </>
  );
};

export default AboutTheApplicant;
