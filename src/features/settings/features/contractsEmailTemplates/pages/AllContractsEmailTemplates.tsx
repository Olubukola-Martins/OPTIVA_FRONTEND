import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import {
  QUERY_KEY_EMAIL_TEMPLATES,
  emailContractTemplatesURL,
} from "../hooks/useUpdateTemplate";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { IAllEmailTemplate } from "src/features/settings/types/settingsType";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";

type TemplateContent = Array<{ name: string; link: string }> | [];



interface IQueryDataType<TPageData> {
  data: TPageData | undefined;
  isLoading: boolean;
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, any>>;
}

// const deleteEndpointUrl = emailContractTemplatesURL;
// const contractsEmailTemplateRoutes = [
//   { name: "Contract Template", link: appRoute.contractsTemplate },
//   {
//     name: "Onboarding/Welcome Email Template",
//     link: appRoute.onboardingWelcomeTempl,
//   },
//   {
//     name: "Collation Appointment Confirmation  Email Template",
//     link: appRoute.collationAppointmentConfirmTempl,
//   },
//   {
//     name: "CBI Bank DD Clearance  Email Template",
//     link: appRoute.cbiBankDDclearance,
//   },
//   {
//     name: "CBI Bank Application Soft Copy Passport Receipt  Email Template",
//     link: appRoute.cbiBAsoftPassportReceipt,
//   },
//   {
//     name: "CBI Bank Application Approval  Email Template",
//     link: appRoute.cbiBAapprovalMailTemp,
//   },
//   {
//     name: "CBI Application Submission  Email Template",
//     link: appRoute.cbiApplicationSubmissionMailTemp,
//   },
// ];

const queryKey = QUERY_KEY_EMAIL_TEMPLATES;

const AllContractsEmailTemplates = () => {
  const {
    data: allEmailTemplates,
    isLoading: allEmailTemplatesLoading,
  }: IQueryDataType<IAllEmailTemplate> = useFetchAllItems({
    queryKey,
    urlEndPoint: emailContractTemplatesURL,
  });
  const [templatesData, settemplatesData] = useState<TemplateContent>([]);
  useEffect(() => {
    if (allEmailTemplates?.data && Array.isArray(allEmailTemplates.data)) {
      const contractsEmailTemplateRoutes = allEmailTemplates.data?.map(
        (template: { name: string; id?: number }) => {
          const { id, name } = template;
          return {
            name: name,
            link: appRoute.viewEditEmailTemplate(name, id).path,
          };
        }
      );
      settemplatesData(contractsEmailTemplateRoutes);
    }
  }, [allEmailTemplates, allEmailTemplatesLoading]);

  return (
    <div>
      <PageIntro
        title="Contract & Email Templates"
        description="Create & Edit Contract & Email Templates on the system"
        linkBack={appRoute.settings}
      />

      <Skeleton loading={allEmailTemplatesLoading} active={true} />
      <div className="mt-5">
        {templatesData?.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className="flex justify-between transition-all duration-300 ease-in-out hover:border-primary hover:text-primary items-center border shadow-sm rounded-md my-5 py-2 px-3 text-sm md:text-base text-accent"
          >
            <span> {item.name}</span>
            <i className="ri-arrow-drop-right-line text-2xl w-fit pl-2"></i>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllContractsEmailTemplates;
