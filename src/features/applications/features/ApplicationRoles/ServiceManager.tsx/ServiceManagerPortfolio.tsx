import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/components/ActiveApplications";
import { AssignToModal } from "../../components/AssignToModal";
import { useEffect, useState } from "react";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/useFetchApplicantsByRole";
import { useQueryClient } from "react-query";
import { useAcceptApplicant } from "src/features/applications/hooks/useAcceptApplicant";
import { QUERY_KEY_FOR_APPLICATIONS } from "src/features/applications/hooks/useGetApplication";
import { openNotification } from "src/utils/notification";
import { useMarkApplicantAsComplete } from "src/features/applications/hooks/useMarkApplicantAsComplete";

export const ServiceManagerPortfolio = () => {
  const { data, isLoading } = useFetchApplicantsByRole();
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const { mutate } = useAcceptApplicant();
  const [applicantId, setApplicantId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate: completeApplicationMutate } = useMarkApplicantAsComplete();

  const [openAssignModal, setOpenAssignModal] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const activeApplicant: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          applicantId: item.applicant_id,
          applicantName: capitalizeName(item.applicant_name),
          country: item.country,
          programType: item.program_type,
          numberOfDependents: 1234567890,
          investmentRoute: item.investmentroute,
          milestone: item.milestone,
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

  // setSharedData((prevData: any) => ({
  //   ...prevData,
  //   applicantId,
  // }));

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
                    applicantId && acceptApplicant();
                  }}
                >
                  Accept Applicant
                </Menu.Item>
                {/* <Menu.Item key="2" title="Send Email"> */}
                <Menu.SubMenu title="Send Email" key="2">
                  <Menu.Item key="2-1">Onboarding/Welcome Email</Menu.Item>
                  <Menu.Item key="2-2">
                    Collation Appointment Confirmation Email
                  </Menu.Item>
                  <Menu.Item key="2-3">CBI DD Bank Clearance</Menu.Item>
                  <Menu.Item key="2-4">
                    CBI Bank Application Soft Copy Passport Receipt
                  </Menu.Item>
                  <Menu.Item key="2-5">CBI Bank Application Approval</Menu.Item>
                  <Menu.Item key="2-6">CBI Bank Submission</Menu.Item>
                </Menu.SubMenu>
                {/* </Menu.Item> */}
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
                <Menu.Item key="8">
                  {/* Login as User */}
                  <Link to={appRoute.login_in}>Login as User</Link>
                </Menu.Item>
                <Menu.Item key="9">Move to Next Stage</Menu.Item>
                <Menu.Item key="10">Send to audit</Menu.Item>
                <Menu.Item key="11">View Soft Copy Passport</Menu.Item>
                <Menu.Item key="12">
                  <a target="_blank" href="">
                    Send Soft Copy Passport
                  </a>
                </Menu.Item>
                <Menu.Item
                  key="12"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    applicantId && markApplicationComplete();
                  }}
                >
                  Mark as completed
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
      />

      <AssignToModal
        onCancel={() => setOpenAssignModal(false)}
        open={openAssignModal}
      />
    </>
  );
};
