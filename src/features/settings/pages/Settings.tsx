import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { DashboardLayout } from "src/components/layout/Layout";

interface settingsLinkProps {
    name: string;
    link: string;
}

const Settings = () => {
  const settingsLink:settingsLinkProps[] = [
    {
      name: "Application Templates",
      link: "",
    },
  ];

  return (
    <div>
      <PageIntro
        title="Settings"
        description="Complete all necessary settings"
      />

      <div>
        <Link to="/"> </Link>
      </div>
    </div>
  );
};

export default Settings;
