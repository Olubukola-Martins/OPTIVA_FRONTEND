import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { settingsLink } from "../utils";
import { Switch } from "antd";

const Settings = () => {
  return (
    <div>
      <PageIntro
        title="Settings"
        description="Complete all necessary settings"
      />
      <div className="mt-5">
        {settingsLink.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className="flex justify-between transition-all duration-300 ease-in-out hover:border-primary hover:text-primary items-center border shadow-sm rounded-md my-5 py-2 px-3 text-sm md:text-base text-accent"
          >
            <span> {item.name}</span>
            <i className="ri-arrow-drop-right-line text-2xl"></i>
          </Link>
        ))}

        <div className="flex justify-between transition-all duration-300 ease-in-out hover:border-primary hover:text-primary items-center border shadow-sm rounded-md my-4 py-3 px-3 text-sm md:text-base text-accent">
          <span>Notification</span>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  );
};

export default Settings;
