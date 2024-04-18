import { Dropdown, Menu, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/features/ApplicationRoles/OperationsRole/ActiveApplications";
import { useEffect, useState } from "react";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/Application hooks/useFetchApplicantsByRole";
import { useAcceptApplicant } from "src/features/applications/hooks/Application hooks/useAcceptApplicant";
import { QUERY_KEY_FOR_APPLICATIONS } from "src/features/applications/hooks/Application hooks/useGetApplication";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { useMarkApplicantAsComplete } from "src/features/applications/hooks/Application hooks/useMarkApplicantAsComplete";
import { useDebounce } from "src/hooks/useDebounce";
import { usePagination } from "src/hooks/usePagination";
import { IPortfolioProps } from "../AuditRole/AuditPortfolio";
import { OutstandingDocuments } from "../../components/OutstandingDocuments";

export const DPOPortfolio: React.FC<IPortfolioProps> = ({ searchTerm,}) => {
  const { onChange, pagination } = usePagination();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { data, isLoading } = useFetchApplicantsByRole({
    pagination,
    search: debouncedSearchTerm,
    
  });
  const [openSupportingDocModal, setOpenSupportingDocModal] =
    useState<boolean>(false);

  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const { mutate } = useAcceptApplicant();
  const [applicantId, setApplicantId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate: completeApplicationMutate } = useMarkApplicantAsComplete();

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
          numberOfDependents: item.no_of_dependents,
          applicationStage: item.process,
          addedBy: item.added_by,
          documentsUploaded: item.uploaded,
          investmentRoute: item.investmentroute,
          verifiedDocuments: item.verified,
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
          console.log(error);
          openNotification({
            state: "error",
            title: "Error Occurred",
            // description: error.response.data.message,
            duration: 5,
            description: "Request failed with status code 404",
          });
        },
        onSuccess: (res: any) => {
          console.log("res", res);
          openNotification({
            state: "success",
            title: "Success",
            // description: res.data.message,
            description: "Applicants marked as completed successfully",
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
        },
      }
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
      title: "Route Name",
      dataIndex: "investmentRoute",
      key: "6",
    },
    {
      title: "Number Of Dependents",
      dataIndex: "numberOfDependents",
      key: "7",
    },
    {
      title: "Application Stage",
      dataIndex: "applicationStage",
      key: "8",
    },
    {
      title: "Uploaded Documents",
      dataIndex: "documentsUploaded",
      key: "9",
    },
    {
      title: "Verified Documents",
      dataIndex: "verifiedDocuments",
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
                <Menu.Item key="2">
                  <Link
                    to={
                      appRoute.applicant_details(val.key as unknown as number)
                        .path
                    }
                  >
                    View Applicant's Details
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
                <Menu.Item
                  key="4"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    setOpenSupportingDocModal(true);
                  }}
                >
                  Outline Outstanding Documents
                </Menu.Item>
                <Menu.Item key="5">
                  <Link
                    to={{
                      pathname: appRoute.attach_supporting_documents(
                        val.key as unknown as number
                      ).path,
                      search: "?documentType=supporting",
                    }}
                  >
                    Attach Supporting Documents
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link
                    to={
                      appRoute.timeline_extensions(val.key as unknown as number)
                        .path
                    }
                  >
                    Timeline Extensions
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="7"
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

      <OutstandingDocuments
        open={openSupportingDocModal}
        onCancel={() => setOpenSupportingDocModal(false)}
        applicantId={applicantId}
      />
    </>
  );
};
