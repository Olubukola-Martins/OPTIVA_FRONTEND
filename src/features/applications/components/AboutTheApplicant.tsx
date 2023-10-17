import { AppButton } from "src/components/button/AppButton";
import { AboutTheApplicantsTab } from "./AboutTheApplicantsTab";

export const AboutTheApplicant = () => {
  return (
    <div>
      <AboutTheApplicantsTab />
      <div className="w-full flex justify-end gap-4 items-center my-5">
        <AppButton
          label="Previous"
          variant="transparent"
          containerStyle="border border-primary text-primary"
        />
        <AppButton label="Next" />
      </div>
    </div>
  );
};
