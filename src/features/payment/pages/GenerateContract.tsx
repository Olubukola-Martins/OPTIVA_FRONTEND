import React from "react";
import { PageIntro } from "src/components/PageIntro";
import { DashboardLayout } from "src/components/layout/Layout";
import { appRoute } from "src/config/routeMgt/routePaths";

const GenerateContract = () => {

return (  <DashboardLayout>
    <PageIntro
      title="A^0B ENGAGEMENT AGREEMENT S1323"
      linkBack={appRoute.payments}
    />
  </DashboardLayout>
)};

export default GenerateContract;
