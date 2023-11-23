import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { QUERY_KEY_FOR_ROLES, useFetchRoles } from "../hooks/useFetchRoles";
import dayjs from "dayjs";
import { Popconfirm, Skeleton } from "antd";
import { NewRole } from "../components/NewRole";
import { useDelete } from "src/hooks/useDelete";

const Roles = () => {
  const [addRole, setAddRole] = useState(false);
  const { isLoading: loadRoles, data: rolesData } = useFetchRoles();
  const { removeData } = useDelete({
    deleteEndPointUrl: "admin/roles/",
    queryKey: QUERY_KEY_FOR_ROLES,
  });

  return (
    <>
      <NewRole open={addRole} handleClose={() => setAddRole(false)} />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Roles & Permissions"
          description="Create, View & edit roles on the system"
          linkBack={appRoute.roles}
        />
        <div>
          <AppButton label="Add New" handleClick={() => setAddRole(true)} />
        </div>
      </div>

      {/* main body */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5 lg:gap-x-10 mt-5">
        <Skeleton active loading={loadRoles} className="mt-5">
          {rolesData?.map((item) => (
            <div
              className="border rounded-md bg-white"
              style={{ boxShadow: "0px 2px 4px 1px #0000001A" }}
            >
              <div className="lg:px-7 px-3 py-5 border-b flex items-center justify-between">
                <h4 className="font-medium">{item.name}</h4>
                <div className="flex items-center gap-3 text-xl">
                  <i className="ri-pencil-line cursor-pointer hover:text-primary"></i>
                  <Popconfirm
                    title="Delete department"
                    description={`Are you sure to delete ${item.name}`}
                    onConfirm={() => removeData(item.id)}
                  >
                    <i className="ri-delete-bin-line cursor-pointer hover:text-primary"></i>
                  </Popconfirm>
                </div>
              </div>
              <div className="lg:px-7 px-3 py-7 flex items-center justify-between text-sm">
                <div className="text-xs">
                  <p className="pb-2">
                    Date Created:{" "}
                    {dayjs(item.created_at).format("DD MMMM YYYY")}
                  </p>
                  <p>
                    Last Modified:{" "}
                    {dayjs(item.updated_at).format("DD MMMM YYYY")}
                  </p>
                </div>

                <button className="px-4 py-[5px] text-secondary bg-[#801D231A] rounded-2xl">
                  Add Permissions
                </button>
              </div>
            </div>
          ))}
        </Skeleton>
      </div>
    </>
  );
};

export default Roles;
