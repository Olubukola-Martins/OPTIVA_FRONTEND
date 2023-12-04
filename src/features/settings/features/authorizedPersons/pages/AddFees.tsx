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
     
    </>
  );
};
