import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";
import { SimpleCard } from "src/components/cards/SimpleCard";
import { Banner } from "./Banner";

export const ServiceManager = () => {
  const { data: rolesData } = useFetchUserProfile();
  return (
    <div>
      <Banner title={rolesData?.roles?.name || ""} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-7">
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="blue"
          title="Master List"
          count={0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="oxblood"
          title="Authorized  
            Applicants"
          count={0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="green"
          title="Paid
          Applicants"
          count={0}
        />
        <SimpleCard
          icon="ph:user-list-duotone"
          cardColor="yellow"
          title="Prospects"
          count={0}
        />
      </div>
    </div>
  );
};
