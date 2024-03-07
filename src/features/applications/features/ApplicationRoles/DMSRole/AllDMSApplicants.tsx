import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/features/ApplicationRoles/OperationsRole/ActiveApplications";
import { useAcceptApplicant } from "src/features/applications/hooks/useAcceptApplicant";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/useFetchApplicantsByRole";
import { QUERY_KEY_FOR_APPLICATIONS } from "src/features/applications/hooks/useGetApplication";
import { useMarkApplicantAsComplete } from "src/features/applications/hooks/useMarkApplicantAsComplete";
import { openNotification } from "src/utils/notification";

interface IDMSProps {
  selectedFilter: string;
}

export const AllDMSApplicants: React.FC<IDMSProps> = ({ selectedFilter }) => {
  const { data, isLoading } = useFetchApplicantsByRole();
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const [applicantId, setApplicantId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate } = useAcceptApplicant();
  const { mutate: completeApplicationMutate } = useMarkApplicantAsComplete();

  console.log(data);
  useEffect(() => {
    if (data) {
      let filteredApplicants = [...data]; // Create a copy of the data array
  
      if (selectedFilter === "1") {
        filteredApplicants = filteredApplicants.filter(
          (applicant) => applicant.applicant_documents.length > 0
        );
      } else if (selectedFilter === "2") {
        filteredApplicants = filteredApplicants.filter(
          (applicant) => applicant.applicant_documents.length === 0
        );
      }
  
      const activeApplicant: DataSourceItem[] = filteredApplicants.map(
        (item, index) => {
          return {
            key: item.id,
            sn: index + 1,
            applicantId: item.applicant_id,
            applicantName: capitalizeName(item.applicant_name),
            country: item.country,
            programType: item.program_type,
            numberOfDependents: item.no_of_dependents,
            applicationStage: item.process,
            documentsUploaded: item.uploaded,
            investmentRoute: item.investmentroute,
          };
        }
      );
  
      setDataArray(activeApplicant);
      console.log(dataArray)
    }
  }, [data, selectedFilter]);

  
 
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
      title: "Documents Uploaded",
      dataIndex: "documentsUploaded",
      key: "9",
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
                    View Applicant's Details
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link
                    to={
                      appRoute.attach_supporting_documents(val.key as unknown as number)
                        .path
                    }
                  >
                    Attach Required Documents
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link
                    to={
                      appRoute.applicant_documents(val.key as unknown as number)
                        .path
                    }
                  >
                    Applicant's Documents
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
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
                  key="6"
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
    </>
  );
};
