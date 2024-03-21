import { Dropdown, Menu, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/features/ApplicationRoles/OperationsRole/ActiveApplications";
import { AssignToModal } from "../../components/AssignToModal";
import { useEffect, useState } from "react";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/Application hooks/useFetchApplicantsByRole";
import { useQueryClient } from "react-query";
import { useAcceptApplicant } from "src/features/applications/hooks/Application hooks/useAcceptApplicant";
import { QUERY_KEY_FOR_APPLICATIONS } from "src/features/applications/hooks/Application hooks/useGetApplication";
import { openNotification } from "src/utils/notification";
import { useMarkApplicantAsComplete } from "src/features/applications/hooks/Application hooks/useMarkApplicantAsComplete";
import { SignOut } from "src/components/layout/SignOut";
import { useMoveToNextStage } from "src/features/applications/hooks/Application hooks/useMoveToNextStage";
import { SendToRoleHead } from "../../components/SendToRoleHead";
import { IPortfolioProps } from "../AuditRole/AuditPortfolio";
import { useDebounce } from "src/hooks/useDebounce";
import { usePagination } from "src/hooks/usePagination";

export const ServiceManagerPortfolio: React.FC<IPortfolioProps> = ({
  searchTerm,
}) => {
  const { onChange, pagination } = usePagination();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { data, isLoading } = useFetchApplicantsByRole({
    pagination,
    search: debouncedSearchTerm,
  });
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const { mutate } = useAcceptApplicant();
  const [applicantId, setApplicantId] = useState<number>();
  const [milestoneId, setMilestoneId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate: completeApplicationMutate } = useMarkApplicantAsComplete();
  const [openAssignModal, setOpenAssignModal] = useState<boolean>(false);
  const [openRoleModal, setOpenRoleModal] = useState<boolean>(false);
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const { patchData } = useMoveToNextStage();
  useEffect(() => {
    if (data) {
      const activeApplicant: DataSourceItem[] = data.data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          applicantId: item.applicant_id,
          applicantName: capitalizeName(item.applicant_name),
          country: item.country,
          programType: item.program_type,
          numberOfDependents: item.no_of_dependents,
          investmentRoute: item.investmentroute,
          milestone: item.milestone,
          milestoneId: item.milestone_id,
        };
      });

      setDataArray(activeApplicant);
    }
  }, [data]);

  const acceptApplicant = () => {
    mutate(
      {
        application_id: applicantId as unknown as number,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
        },
      }
    );
  };

  const markApplicationComplete = () => {
    completeApplicationMutate(
      { application_id: applicantId as unknown as number },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
        },
      }
    );
  };

  const moveApplicantToNextStage = () => {
    // patchMutate({ id: applicantId as unknown as number, milestone_id: milestoneId as number});
    patchData(
      applicantId as unknown as number,
      milestoneId as unknown as number
    );
  };

  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Applicant ID",
      dataIndex: "applicantId",
      key: "2",
    },
    {
      title: " Applicant Name",
      dataIndex: "applicantName",
      key: "3",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "4",
    },
    {
      title: "Program Type",
      dataIndex: "programType",
      key: "5",
    },
    {
      title: "Investment Route",
      dataIndex: "investmentRoute",
      key: "6",
    },
    {
      title: "Number Of Dependents",
      dataIndex: "numberOfDependents",
      key: "7",
    },
    {
      title: "Application Milestone",
      dataIndex: "milestone",
      key: "8",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                  }}
                >
                  <Popconfirm
                    title="Accept Applicant"
                    description={`Are you sure to accept ${val.applicantName}'s application?`}
                    onConfirm={acceptApplicant}
                    okType="default"
                  >
                    Accept Applicant
                  </Popconfirm>
                </Menu.Item>
                <Menu.SubMenu title="Send Email" key="2">
                  <Menu.Item key="2-1">
                    <Link
                      to={
                        appRoute.send_email(val.key as unknown as number, 2)
                          .path
                      }
                    >
                      Onboarding/Welcome Email
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2-2">
                    <Link
                      to={
                        appRoute.send_email(val.key as unknown as number, 3)
                          .path
                      }
                    >
                      Collation Appointment Confirmation Email
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2-3">
                    <Link
                      to={
                        appRoute.send_email(val.key as unknown as number, 4)
                          .path
                      }
                    >
                      CBI DD Bank Clearance
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2-4">
                    <Link
                      to={
                        appRoute.send_email(val.key as unknown as number, 5)
                          .path
                      }
                    >
                      CBI Bank Application Soft Copy Passport Receipt
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2-5">
                    <Link
                      to={
                        appRoute.send_email(val.key as unknown as number, 6)
                          .path
                      }
                    >
                      CBI Bank Application Approval
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2-6">
                    <Link
                      to={
                        appRoute.send_email(val.key as unknown as number, 7)
                          .path
                      }
                    >
                      CBI Bank Submission
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="3">
                  <Link
                    to={
                      appRoute.processing_strategy_steps(
                        val.key as unknown as number
                      ).path
                    }
                  >
                    Processing Strategy & Steps
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="4"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    setOpenAssignModal(true);
                  }}
                >
                  Assign To
                </Menu.Item>
                <Menu.Item key="5">
                  <Link
                    to={
                      appRoute.applicant_documents(val.key as unknown as number)
                        .path
                    }
                  >
                    Applicant's documents
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link
                    to={
                      appRoute.applicant_details(val.key as unknown as number)
                        .path
                    }
                  >
                    View Applicant Details
                  </Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link
                    to={
                      appRoute.timeline_extensions(val.key as unknown as number)
                        .path
                    }
                  >
                    Timeline Extensions
                  </Link>
                </Menu.Item>
                <Menu.Item key="8" onClick={() => setOpenLogout(true)}>
                  Login as User
                </Menu.Item>
                <Menu.Item
                  key="9"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    console.log("applicant id", applicantId);
                    setMilestoneId(val.milestoneId as unknown as number);
                  }}
                >
                  <Popconfirm
                    title="Move to Next Stage"
                    description={`Are you sure to move ${val.applicantName}' to the next stage?`}
                    onConfirm={moveApplicantToNextStage}
                    okType="default"
                  >
                    Move to Next Stage
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item
                  key="10"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    setOpenRoleModal(true);
                  }}
                >
                  Send to audit
                </Menu.Item>
                <Menu.Item key="11">View Soft Copy Passport</Menu.Item>
                <Menu.Item key="12">
                  <a target="_blank" href="">
                    Send Soft Copy Passport
                  </a>
                </Menu.Item>
                <Menu.Item
                  key="13"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                  }}
                >
                  <Popconfirm
                    title="Mark as completed"
                    description={`Are you sure to complete ${val.applicantName}'s application?`}
                    onConfirm={markApplicationComplete}
                    okType="default"
                  >
                    Mark as completed
                  </Popconfirm>
                </Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataArray}
        loading={isLoading}
        scroll={{ x: 700 }}
        className="bg-white rounded-md shadow border mt-2"
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />

      {applicantId && (
        <AssignToModal
          onCancel={() => setOpenAssignModal(false)}
          open={openAssignModal}
          applicantId={applicantId}
        />
      )}

      <SignOut open={openLogout} handleClose={() => setOpenLogout(false)} />

      {applicantId && (
        <SendToRoleHead
          applicantId={applicantId}
          onCancel={() => setOpenRoleModal(false)}
          open={openRoleModal}
        />
      )}
    </>
  );
};
