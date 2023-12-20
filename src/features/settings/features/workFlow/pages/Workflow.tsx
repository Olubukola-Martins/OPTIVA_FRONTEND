import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { Empty, Pagination, Popconfirm, Skeleton } from "antd";
import {
  QUERY_KEY_FOR_WORKFLOW,
  useGetWorkflow,
} from "../hooks/useGetWorkflow";
import { usePagination } from "src/hooks/usePagination";
import { useDelete } from "src/hooks/useDelete";
import { EditWorkflow } from "../components/EditWorkflow";
import { useState } from "react";

const Workflow = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [workflowId, setWorkflowId] = useState<number>();

  const { pagination, onChange } = usePagination();
  const { isLoading, data } = useGetWorkflow({
    pagination,
  });
  const { removeData } = useDelete({
    EndPointUrl: "admin/workflow/",
    queryKey: QUERY_KEY_FOR_WORKFLOW,
  });

  const handleEdit = (id: number) => {
    setOpenEdit(true);
    setWorkflowId(id);
  };

  return (
    <>
      <EditWorkflow
        id={workflowId}
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
      />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Workflows"
          description="Create, View & edit workflows on the system"
          linkBack={appRoute.settings}
        />
        <Link to={appRoute.addWorkflow}>
          <AppButton label="Create New" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-5 lg:gap-x-8 mt-5">
        <Skeleton active loading={isLoading} className="mt-5">
          {(data?.data?.length ?? []) !== 0 ? (
            data?.data?.map((item) => (
              <div
                className="border rounded-md bg-white"
                style={{ boxShadow: "0px 2px 4px 1px #0000001A" }}
              >
                <div className="lg:px-5 px-3 py-5 border-b flex items-center justify-between">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="flex items-center gap-3 text-xl">
                    <i
                      onClick={() => handleEdit(item.id as number)}
                      className="ri-pencil-line cursor-pointer hover:text-primary"
                    ></i>
                    <Popconfirm
                      title="Delete workflow"
                      description={`Are you sure to delete ${item.name}`}
                      onConfirm={() => removeData(item.id as number)}
                    >
                      <i className="ri-delete-bin-line cursor-pointer hover:text-primary"></i>
                    </Popconfirm>
                  </div>
                </div>
                <div className="lg:px-5 px-3 py-7 flex items-center justify-between text-sm">
                  <Link
                    to={appRoute.workflow_details(item.id).path}
                    className="px-4 py-[5px] text-secondary border hover:border-secondary bg-[#801D231A] rounded-2xl"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3">
              <Empty className="mt-2" />
            </div>
          )}
        </Skeleton>
      </div>
      <div className={isLoading ? "hidden" : "flex justify-end mt-5"}>
        <Pagination
          total={data?.total}
          onChange={onChange}
          current={pagination.current}
        />
      </div>
    </>
  );
};

export default Workflow;
