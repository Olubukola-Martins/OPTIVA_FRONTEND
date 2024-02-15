import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/components/ActiveApplications";
import { useAcceptApplicant } from "src/features/applications/hooks/useAcceptApplicant";
import { useApproveorRejectApplicant } from "src/features/applications/hooks/useApproveorRejectApplicant";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/useFetchApplicantsByRole";
import { QUERY_KEY_FOR_APPLICATIONS } from "src/features/applications/hooks/useGetApplication";
import { openNotification } from "src/utils/notification";

export const AuditPortfolio = () => {
  // const [openSubmitModal, setOpenSubmitModal] = useState<boolean>(false);
  // const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

  const { data, isLoading } = useFetchApplicantsByRole();
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const { mutate } = useAcceptApplicant();
  const [applicantId, setApplicantId] = useState<number>();
  const queryClient = useQueryClient();
  const { patchData } = useApproveorRejectApplicant("approve");
  const { patchData: rejectPatch } = useApproveorRejectApplicant("reject");

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
          validatedDocuments: "-",
          applicationStage: "application stage",
          reviewStatus: "-",
          investmentRoute:item.investmentroute
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

  const approveApplicant = () => {
    patchData(applicantId as unknown as number);
  };
  const rejectApplicant = () => {
    rejectPatch(applicantId as unknown as number);
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
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    applicantId && acceptApplicant();
                  }}
                >
                  Accept Applicant
                </Menu.Item>
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
                <Menu.Item
                  key="4"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    applicantId && approveApplicant();
                  }}
                >
                  Approve
                </Menu.Item>
                <Menu.Item
                  key="5"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    applicantId && rejectApplicant();
                  }}
                >
                  Reject
                </Menu.Item>
                <Menu.Item key="6">Submit to International Partners</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  // const handleClose = () => {
  //   setOpenSubmitModal(false);
  // };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataArray}
        scroll={{ x: 700 }}
        loading={isLoading}
        className="bg-white rounded-md shadow border mt-2"
      />

      {/* <UploadModal
      header="Proof of Payment"
      open={openUploadModal}
      onCancel={handleUploadCancel}
    /> */}
    </>
  );
};
