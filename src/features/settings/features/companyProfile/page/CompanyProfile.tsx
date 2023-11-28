import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";

const CompanyProfile = () => {
  return (
    <>
      <div className="h-[40vh] lg:-mr-[31px] lg:-ml-[31px] companyProfileContainer bg-gradient">
        <div className="mb-5 pt-5 text-accent">
          <h3 className="flex items-center gap-x-2 font-semibold text-xl">
            <Link to={appRoute.settings}>
              <i className="ri-arrow-left-line cursor-pointer hover:text-secondary"></i>
            </Link>

            <span>Company Profile</span>
          </h3>
          <p className={`text-sm pt-1`}>
            {"View & edit your Company profile on this page"}
          </p>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
