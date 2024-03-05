import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/features/ApplicationRoles/OperationsRole/ActiveApplications";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/useFetchApplicantsByRole";
import { QUERY_KEY_FOR_APPLICATIONS } from "src/features/applications/hooks/useGetApplication";
import { useMarkApplicantAsComplete } from "src/features/applications/hooks/useMarkApplicantAsComplete";
import { openNotification } from "src/utils/notification";

interface IDRProps {
  pendingFilterActive: boolean;
  confirmedFilterActive: boolean;
  declinedFilterActive: boolean;
}

export const DRApplicant: React.FC<IDRProps> = ({ pendingFilterActive, confirmedFilterActive, declinedFilterActive }) => {
  const { data, isLoading } = useFetchApplicantsByRole();
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const { mutate } = useMarkApplicantAsComplete();
  const [applicantId, setApplicantId] = useState<number>();
  const queryClient = useQueryClient();
console.log('data', data)

  useEffect(() => {
    if (data) {
      let filteredData = data;
      if (pendingFilterActive || confirmedFilterActive || declinedFilterActive) {
        filteredData = data.filter(item => {
          return item.applicant_documents.some(doc => {
            if (pendingFilterActive && doc.handover_status === "pending") {
              return true;
            }
            if (confirmedFilterActive && doc.handover_status === "confirmed") {
              return true;
            }
            if (declinedFilterActive && doc.handover_status === "declined") {
              return true;
            }
            return false;
          });
        });
      }

      const activeApplicant: DataSourceItem[] = filteredData.map((item, index) => {
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
          documentsSubmitted: "-",
          investmentRoute: item.investmentroute,
        };
      });

      setDataArray(activeApplicant);
    }
  }, [data, pendingFilterActive, confirmedFilterActive, declinedFilterActive]);

  const markApplicationComplete = () => {
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
      title: "Uploaded Documents",
      dataIndex: "documentsUploaded",
      key: "9",
    },
    {
      title: "Documents Submitted",
      dataIndex: "documentsSubmitted",
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
                <Menu.Item key="1">
                  <Link
                    to={
                      appRoute.applicant_documents(val.key as unknown as number)
                        .path
                    }
                  >
                    Applicant's Documents
                  </Link>
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    markApplicationComplete();
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
        className="bg-white rounded-md shadow border mt-2"
        scroll={{ x: 600 }}
        loading={isLoading}
        rowSelection={{
          type: "checkbox",
          onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: DataSourceItem[]
          ) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
          },
        }}
      />
    </>
  );
};
