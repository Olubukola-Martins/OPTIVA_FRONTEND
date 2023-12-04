import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import logo from "src/assets/logoSvg.svg";
import { Collapse } from "antd";
import { CollapseProps } from "antd/lib";
import { ProfileForm } from "../components/ProfileForm";

const CompanyProfile = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Company Information",
      children: <ProfileForm />,
    },
    {
      key: "2",
      label: "Branch Details",
      children: <p>Branch details here</p>,
    },
    {
      key: "3",
      label: "Bank Details",
      children: <p>Bank details here</p>,
    },
  ];
  return (
    <>
      <div className="lg:h-[40vh] lg:-mr-[31px] lg:-ml-[31px] companyProfileContainer bg-gradient sticky top-12">
        <div className="mb-5 pt-8 text-accent">
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

      <div
        className="bg-white rounded border px-2 py-5 lg:-mt-[7rem] sticky z-10"
        style={{
          boxShadow:
            "0px 3.555555582046509px 5.333333492279053px 0px #00000026",
        }}
      >
        <div className="flex justify-center mt-5">
          <div className="rounded-full h-40 w-40 p-3 border shadow-lg flex justify-center items-center">
            <img src={logo} alt="logo" className="object-cover" />
          </div>
        </div>

        <Collapse
          defaultActiveKey={["1"]}
          ghost
          items={items}
          expandIconPosition="right"
          className="mt-10 profileCollapse"
        />
      </div>
    </>
  );
};

export default CompanyProfile;
