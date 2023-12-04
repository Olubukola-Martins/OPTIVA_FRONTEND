import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ApplicationTemplateTab } from "../components/ApplicationTemplateTab";
const NewApplicationTemplate = () => {
  return (
    <>
      <PageIntro
        title="New Application Template "
        description="Create a new application template on the system"
        linkBack={appRoute.app_template}
      />
      <div className="border rounded shadow p-5">
        <ApplicationTemplateTab />
      </div>
    </>
  );
};

export default NewApplicationTemplate;
