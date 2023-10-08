import { PageIntro } from "src/components/PageIntro";
import { DashboardLayout } from "src/components/layout/Layout";
import { appRoute } from "src/config/routeMgt/routePaths";

const PaymentDetails = () => {
  return (
    <DashboardLayout>
      <PageIntro title="Update Payment Details" linkBack={appRoute.payments}/>
    </DashboardLayout>
  );
};

export default PaymentDetails;
