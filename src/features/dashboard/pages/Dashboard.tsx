import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";
import { Admin } from "../components/Admin";
import { ServiceManager } from "../components/ServiceManager";
import { DSM } from "../components/DSM";
import { DPO } from "../components/DPO";
import { Audit } from "../components/Audit";
import { DR } from "../components/DR";
import { CustomerExperience } from "../components/CustomerExperience";
import { CE } from "../components/CE";
import { NewApplicationModal } from "src/features/applications/features/NewApplication/NewApplicationModal";
import { useState } from "react";
import { Skeleton } from "antd";

const Dashboard = () => {
  const { data, isLoading } = useFetchUserProfile();
  const [openNewApplicationsModal, setOpenNewApplicationsModal] =
    useState<boolean>(false);
  const showNewApplicationsModal = () => {
    setOpenNewApplicationsModal(true);
  };
  const handleNewApplicationsCancel = () => {
    setOpenNewApplicationsModal(false);
  };

  return (
    <>
      <Skeleton
        active
        loading={isLoading}
        className="w-full mt-5"
        paragraph={{ rows: 15 }}
      >
        <div>
          <div className="flex items-center justify-between">
            <PageIntro title="Dashboard" arrowBack={false} />
            <AppButton
              label="Add Applicants"
              handleClick={showNewApplicationsModal}
            />
          </div>
          <NewApplicationModal
            open={openNewApplicationsModal}
            handleClose={handleNewApplicationsCancel}
          />
          {data?.roles?.id === 1 && <Admin />}
          {data?.roles?.id === 2 && <ServiceManager />}
          {data?.roles?.id === 3 && <DSM />}
          {data?.roles?.id === 4 && <DPO />}
          {data?.roles?.id === 5 && <Audit />}
          {data?.roles?.id === 6 && <DR />}
          {data?.roles?.id === 8 && <CustomerExperience />}
          {data?.roles?.id === 9 && <CE />}
        </div>
      </Skeleton>
    </>
  );
};

export default Dashboard;
