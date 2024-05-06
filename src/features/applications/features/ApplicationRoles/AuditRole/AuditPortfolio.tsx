import { LoadingOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/features/ApplicationRoles/OperationsRole/ActiveApplications";
import { useAcceptApplicant } from "src/features/applications/hooks/Application hooks/useAcceptApplicant";
import { useApproveorRejectApplicant } from "src/features/applications/hooks/Application hooks/useApproveorRejectApplicant";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/Application hooks/useFetchApplicantsByRole";
import { QUERY_KEY_FOR_APPLICATIONS } from "src/features/applications/hooks/Application hooks/useGetApplication";
import { useDebounce } from "src/hooks/useDebounce";
import { usePagination } from "src/hooks/usePagination";
import { openNotification } from "src/utils/notification";

export interface IPortfolioProps {
  searchTerm: string;
  roleId?: number;
  status?: string;
}

export const AuditPortfolio: React.FC<IPortfolioProps> = ({
  searchTerm,
  roleId,
  status,
}) => {
  const { onChange, pagination } = usePagination();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { data, isLoading } = useFetchApplicantsByRole({
    pagination,
    search: debouncedSearchTerm,
    role_id: roleId,
    status: status,
  });
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const { mutate } = useAcceptApplicant();
  const [applicantId, setApplicantId] = useState<number>();
  const queryClient = useQueryClient();
  const { patchData } = useApproveorRejectApplicant("approve");
  const { patchData: rejectPatch } = useApproveorRejectApplicant("reject");

  useEffect(() => {
    if (data?.data) {
      const activeApplicant: DataSourceItem[] = data.data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          applicantId: item.applicant_id,
          applicantName: capitalizeName(item.applicant_name),
          country: item.country,
          programType: item.program_type,
          // numberOfDependents: item.no_of_dependents,
          validatedDocuments: item.validated,
          applicationStage: item.process,
          reviewStatus: item.status,
          investmentRoute: item.investmentroute,
        };
      });

      setDataArray(activeApplicant);
    }
  }, [data?.data]);

  const acceptApplicant = () => {
    openNotification({
      state: "info",
      title: "Wait a second ...",
      description: <LoadingOutlined />,
    });
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
          console.log("res", res);
          openNotification({
            state: "success",
            title: "Success",
            // description: res.data.message,
            description: "Applicaant accepted successfully",
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
          // setOpenAcceptConfirm(false);
        },
      }
    );
  };

  const approveApplicant = () => {
    if (applicantId !== undefined) patchData(applicantId);
    // setOpenApproveConfirm(false);
  };
  const rejectApplicant = () => {
    rejectPatch(applicantId as unknown as number);
    // setOpenRejectConfirm(false);
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
      title: "Country Program",
      dataIndex: "country",
      key: "4",
    },
    // {
    //   title: "Program Type",
    //   dataIndex: "programType",
    //   key: "5",
    // },
    {
      title: "Route Name",
      dataIndex: "investmentRoute",
      key: "6",
    },
    // {
    //   title: "Number Of Dependents",
    //   dataIndex: "numberOfDependents",
    //   key: "7",
    // },
    {
      title: "Application Stage",
      dataIndex: "applicationStage",
      key: "8",
    },
    {
      title: "Validated Documents",
      dataIndex: "validatedDocuments",
      key: "9",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "10",
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
                {status === "internal" && (
                  <Menu.Item
                    key="1"
                    onClick={() => {
                      setApplicantId(val.key as unknown as number);
                      // setOpenAcceptConfirm(true);
                    }}
                  >
                    <Popconfirm
                      title="Accept Applicant"
                      description={`Are you sure to accept ${val.applicantName}'s application?`}
                      onConfirm={() => acceptApplicant()}
                      okType="default"
                      // open={openAcceptConfirm}
                    >
                      Accept Applicant
                    </Popconfirm>
                  </Menu.Item>
                )}
                {status === "external" && (
                  <Menu.Item key="8">Reason for review</Menu.Item>
                )}
                <Menu.Item key="2">
                  <Link
                    to={
                      appRoute.applicant_details(val.key as unknown as number)
                        .path
                    }
                  >
                    View Applicant Details
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link
                    to={
                      appRoute.applicant_documents(val.key as unknown as number)
                        .path
                    }
                  >
                    View Uploaded Documents
                  </Link>
                </Menu.Item>
                <Menu.Item key="9">
                  <Link
                    to={
                      appRoute.timeline_extensions(val.key as unknown as number)
                        .path
                    }
                  >
                    Timeline Extensions
                  </Link>
                </Menu.Item>
                {status === "internal" && (
                  <Menu.Item
                    key="4"
                    onClick={() => {
                      setApplicantId(val.key as unknown as number);
                      // setOpenApproveConfirm(true);
                    }}
                  >
                    <Popconfirm
                      title="Approve"
                      description={`Are you sure to approve ${val.applicantName}'s application?`}
                      onConfirm={approveApplicant}
                      okType="default"
                      // open={openApproveConfirm}
                    >
                      Approve
                    </Popconfirm>
                  </Menu.Item>
                )}

                {status === "internal" && (
                  <Menu.Item
                    key="5"
                    onClick={() => {
                      setApplicantId(val.key as unknown as number);
                      // setOpenRejectConfirm(true)
                    }}
                  >
                    <Popconfirm
                      title="Reject"
                      description={`Are you sure to reject ${val.applicantName}'s application?`}
                      onConfirm={rejectApplicant}
                      okType="default"
                      // open={openRejectConfirm}
                    >
                      Reject
                    </Popconfirm>
                  </Menu.Item>
                )}

                {status === "internal" && (
                  <Menu.Item key="6">
                    Submit to International Partners
                  </Menu.Item>
                ) }

                {status === "external" && (
                  <Menu.Item key="7">Mark as resolved</Menu.Item>
                )}

                {status === "submitted" && (
                  <Menu.Item key="10">View softcopy passport</Menu.Item>
                )}
                {status === "submitted" && (
                  <Menu.Item key="11">Submit softcopy passport</Menu.Item>
                )}
                {status === "submitted" && (
                  <Menu.Item key="12">Mark as completed</Menu.Item>
                )}
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
        scroll={{ x: 700 }}
        loading={isLoading}
        className="bg-white rounded-md shadow border mt-2"
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </>
  );
};
