import { ApplicationsTab } from "../components/ApplicationsTab";
import { DashboardLayout } from "src/components/layout/Layout";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";

const Applications = () => {
  return (
    <>
      <DashboardLayout>
        <div className="flex justify-between p-3">
          <PageIntro
            title="Applicants (Operations) List"
            description="View & Edit Applicant Details"
            
          />
          <div className="flex justify-center items-center gap-4 cursor-pointer">
            <div className="flex justify-center items-center gap-4 cursor-pointer text-2xl">
              <Icon icon="grommet-icons:document-transfer" />
              <Icon icon="grommet-icons:document-transfer" hFlip={true} />
            </div>
            <AppButton label="Add New" />
          </div>
        </div>

        <ApplicationsTab />
      </DashboardLayout>
    </>
  );
};

export default Applications;
