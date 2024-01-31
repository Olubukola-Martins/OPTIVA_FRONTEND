import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ApplicationTemplateTab } from "../components/NewApplicationTemplate/ApplicationTemplateTab";
import { AppTemplate } from "../components/NewApplicationTemplate/AppTemplate";
import { useState } from "react";

const NewApplicationTemplate = () => {
  const [templateCreated, setTemplateCreated] = useState<boolean>(true);
  const [resId, setResId] = useState<number>();
  

  return (
    <>
      <PageIntro
        title="New Application Template "
        description="Create a new application template on the system"
        linkBack={appRoute.app_template}
      />
      <div>
        <div className="p-5 my-5">
          <AppTemplate setTemplateCreated={setTemplateCreated} setResId={setResId} />
        </div>
        <div className="border rounded shadow p-5">
          <ApplicationTemplateTab templateCreated={templateCreated} resId={resId} />
        </div>
      </div>
    </>
  );
};

export default NewApplicationTemplate;
