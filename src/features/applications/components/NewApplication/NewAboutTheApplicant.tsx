import { AppButton } from "src/components/button/AppButton";
import { NewAboutTheApplicantsTab } from "./NewAboutTheApplicantsTab";

export const NewAboutTheApplicant = () => {
  return (
    <div>
      <NewAboutTheApplicantsTab />
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
