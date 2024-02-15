import { Input, Select, Tabs } from "antd";
import { ActiveApplications } from "../../components/ActiveApplications";
import { InactiveApplications } from "../../components/InactiveApplications";
import { IRoleTabProps } from "../ApplicationRoles/AuditRole/AuditTab";

export const ApplicationsTab: React.FC<IRoleTabProps> = ({ onRoleSelect }) => {
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      label: "Active Applications",
      children: <ActiveApplications />,
      key: "Active Applications",
    },
    {
      label: "Inactive Applications",
      children: <InactiveApplications />,
      key: "Inactive Applications",
    },
  ];
  return (
    <>
      <Tabs
        items={tabItems}
        className="hover:bg-caramel active:text-primary"
        tabBarExtraContent={
          <div className="flex gap-4">
            <Input.Search
              placeholder="Search"
              className="md:flex hidden w-[250px]"
            />
            <Select
              allowClear
              placeholder="Role"
              className="md:flex hidden w-[250px]"
              onChange={onRoleSelect}
              options={[
                {
                  value: `DR's List`,
                  label: `DR's List`,
                },
                {
                  value: `DPO's List`,
                  label: `DPO's List`,
                },
                {
                  value: `DMS's List`,
                  label: `DMS's List`,
                },
                {
                  value: `Audit's List`,
                  label: `Audit's List`,
                },
                {
                  value: `Operations List`,
                  label: `Operations  List`,
                },
                {
                  value: `Service Manager's List`,
                  label: `Service Manager's  List`,
                },
                {
                  value: `Customer Engager's List`,
                  label: `Customer Engager's  List`,
                },
              ]}
            />
          </div>
        }
      />
    </>
  );
};
