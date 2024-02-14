import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/components/ActiveApplications";
import { AssignToDAO } from "../../components/AssignToDAO";
import { useEffect, useState } from "react";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/useFetchApplicantsByRole";

export const AuditApplicant = () => {
  const [openDAOModal, setOpenDAOModal] = useState<boolean>(false);
  const { data, isLoading } = useFetchApplicantsByRole();
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);


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
          assignedTo: 'assigned to',
          validatedDocuments: "-",
          applicationStage: 'application stage',
          reviewStatus: '-',
          submittedPartner: "-",
          investmentRoute:item.investmentroute
        };
      });

      setDataArray(activeApplicant);
    }
  }, [data]);
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
      title: "Validated Documents",
      dataIndex: "validatedDocuments",
      key: "8",
    },
    {
      title: " Application Stage",
      dataIndex: "applicationStage",
      key: "9",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "10",
    },
    {
      title: "Review Status",
      dataIndex: "reviewStatus",
      key: "11",
    },
    {
      title: "Partner Submitted To",
      dataIndex: "submittedPartner",
      key: "12",
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
                      appRoute.applicant_details(val.key as unknown as number)
                        .path
                    }
                  >
                    View Applicant Details
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link
                    to={
                      appRoute.applicant_documents(val.key as unknown as number)
                        .path
                    }
                  >
                    View Uploaded Documents
                  </Link>
                </Menu.Item>
                <Menu.Item key="3" onClick={() => setOpenDAOModal(true)}>
                  Assign to DAO
                </Menu.Item>
                <Menu.Item key="4">
                  <Link
                    to={
                      appRoute.timeline_extensions(val.key as unknown as number)
                        .path
                    }
                  >
                    Timeline Extensions
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">View Soft Copy Passport</Menu.Item>
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
      />

      <AssignToDAO
        onCancel={() => setOpenDAOModal(false)}
        open={openDAOModal}
      />
    </>
  );
};
