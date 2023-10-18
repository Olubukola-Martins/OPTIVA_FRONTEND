import { AppButton } from "src/components/button/AppButton";
import { ApplicantPeculiaritiesTab } from "./ApplicantPeculiaritiesTab";

export const ApplicantPeculiarites = () => {
  return (
    <>
      <ApplicantPeculiaritiesTab />
      <div className="w-full flex justify-end gap-4 items-center">
        <AppButton
          label="Previous"
          variant="transparent"
          containerStyle="border border-primary text-primary"
        />
        <AppButton label="Next" />
      </div>
    </>
  );
};
