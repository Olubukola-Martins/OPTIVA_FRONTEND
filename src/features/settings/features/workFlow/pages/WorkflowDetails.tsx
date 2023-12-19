import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useGetSingleWorkflow } from "../hooks/useGetSingleWorkflow";
import { useParams } from "react-router-dom";
import { Collapse, Skeleton } from "antd";

const WorkflowDetails = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useGetSingleWorkflow({
    id: id as unknown as number,
  });

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title={`${data?.name} Workflow`}
          description={`${data?.name} workflow details`}
          linkBack={appRoute.workflow}
        />
      </div>

      <Skeleton active loading={isLoading}>
        <Collapse accordion defaultActiveKey={0}>
          {data?.stages.map((stage, index) => {
            return (
              <Collapse.Panel header={stage.name} key={index}>
                <h3 className="font-semibold text-base">
                  Approval Type:{" "}
                  <span className="text-sm font-normal pl-1">
                    {stage.approver_type}
                  </span>
                </h3>
                <ul className="list-disc pl-4 mt-3">
                  {stage.approver_type === "Employee" &&
                    stage.employees.map((employee) => (
                      <li key={employee.id}>
                        {employee.name}{" "}
                        <span className="text-xs">({employee.email})</span>
                      </li>
                    ))}

                  {stage.approver_type === "Department" &&
                    stage.departments.map((d) => <li key={d.id}>{d.name} </li>)}
                  {stage.approver_type === "Role" &&
                    stage.roles.map((role) => (
                      <li key={role.id}>{role.name} </li>
                    ))}
                </ul>
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </Skeleton>
    </>
  );
};

export default WorkflowDetails;
