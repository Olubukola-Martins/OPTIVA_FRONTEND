import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import AddFeesTab from "../components/AddFeesTab";
import { AppButton } from "src/components/button/AppButton";

export const AddFees = () => {
  return (
    <>
      <PageIntro
        title="Add Fees"
        linkBack={appRoute.defineFeesAndAuthorizedPersons}
      />

      <AddFeesTab />
      <div className="flex items-center justify-end gap-4">
        <AppButton label="Cancel" type="reset" variant="transparent" />
        <AppButton label="Save" type="submit" />
      </div>
    </>
  );
};
