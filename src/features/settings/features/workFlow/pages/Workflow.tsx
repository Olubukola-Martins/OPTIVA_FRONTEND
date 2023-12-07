import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";

const Workflow = () => {
  return (
    <>
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Workflows"
          description="Create, View & edit workflows on the system"
          linkBack={appRoute.settings}
        />
        <Link to={appRoute.addWorkflow}>
          <AppButton label="Create New" />
        </Link>
      </div>
    </>
  );
};

export default Workflow;
