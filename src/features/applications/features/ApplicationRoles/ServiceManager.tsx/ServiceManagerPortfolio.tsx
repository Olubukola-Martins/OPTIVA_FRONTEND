import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { DataSourceItem } from "src/features/applications/components/ActiveApplications";
import { AssignToModal } from "../../components/AssignToModal";
import { useState } from "react";

export const ServiceManagerPortfolio = () => {
  const [openAssignModal, setOpenAssignModal] = useState<boolean>(false);

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
                <Menu.Item key="1">Accept Applicant</Menu.Item>
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
                <Menu.Item key="4" onClick={() => setOpenAssignModal(true)}>
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
                      appRoute.timeline_extensions(val.key as unknown as number)
                        .path
                    }
                  >
                    Timeline Extensions
                  </Link>
                </Menu.Item>
                <Menu.Item key="7">
                  {/* Login as User */}
                  <Link to={appRoute.login_in}>Login as User</Link>
                </Menu.Item>
                <Menu.Item key="8">Send to audit</Menu.Item>
                <Menu.Item key="9">View Soft Copy Passport</Menu.Item>
                <Menu.Item key="10">
                  <a target="_blank" href="">
                    Send Soft Copy Passport
                  </a>
                </Menu.Item>
                <Menu.Item key="11">Mark as completed</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 10; i++) {
    dataSource.push({
      key: i,
      sn: i + 1,
      applicantId: "2000-01",
      applicantName: "John",
      country: "Grenada",
      numberOfDependents: 1,
      programType: "CBI",
      milestone: "Stage 1 - Document Upload",
      investmentRoute: "",
    });
  }
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
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
