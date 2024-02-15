import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { DataSourceItem, capitalizeName } from "src/features/applications/components/ActiveApplications";
import { AssignToModal } from "../../components/AssignToModal";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/useFetchApplicantsByRole";

export const AllServiceManagerApplicants = () => {
  const [openAssignModal, setOpenAssignModal] = useState<boolean>(false);
  const { data, isLoading } = useFetchApplicantsByRole();
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);

  console.log("data", data);
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
         assignedTo: "added by",
         milestone: "",
          investmentRoute: item.investmentroute,
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
      title: "Application Milestone",
      dataIndex: "milestone",
      key: "8",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
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
                <Menu.Item key="1">
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
                <Menu.Item key="3" onClick={() => setOpenAssignModal(true)}>
                  Assign to
                </Menu.Item>
                <Menu.Item key="4">
                  <Link
                    to={
                      appRoute.applicant_documents(val.key as unknown as number)
                        .path
                    }
                  >
                    Applicant's documents
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
                <Menu.Item key="6">
                  {/* Login as User */}
                  <Link to={appRoute.login_in}>Login as User</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <a target="_blank" href="">
                    View Soft Copy Passport
                  </a>
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
