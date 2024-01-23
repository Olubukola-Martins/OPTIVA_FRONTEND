import { PageIntro } from "src/components/PageIntro";
import { AppTemplateDetails } from "../components/ApplicationTemplateDetails/AppTemplateDetails";
import { ApplicationTemplateDetailsTab } from "../components/ApplicationTemplateDetails/ApplicationTemplateDetailsTab";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useGetSingleQuestion } from "../hooks/useGetTemplateQuestion";
import { useParams } from "react-router-dom";
import { QUERY_KEY_FOR_FEES } from "../../authorizedPersons/hooks/useGetFees";
import { Skeleton } from "antd";

const ApplicationTemplateDetails = () => {
  const { id } = useParams();
  const { isLoading } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-one",
    queryKey: QUERY_KEY_FOR_FEES,
  });
  return (
    <>
      <PageIntro
        title="Application Template "
        description="View application templates on the system"
        linkBack={appRoute.app_template}
      />
      <div>
        <div className="p-5 my-5">
          <AppTemplateDetails />
        </div>
        <Skeleton active loading={isLoading}>
          <div className="border rounded shadow p-5">
            <ApplicationTemplateDetailsTab />
          </div>
        </Skeleton>
      </div>
    </>
  );
};

export default ApplicationTemplateDetails;
