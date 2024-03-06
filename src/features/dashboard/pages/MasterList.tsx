import { Dropdown, Input, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useFetchMastersList } from "../hooks/useFetchMastersList";
import { IMasterList } from "../types";

const MasterList = () => {
  const { data, isLoading } = useFetchMastersList();

  const columns: ColumnsType<IMasterList> = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
      // width: 20,
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      title: "Applicant ID",
      dataIndex: "applicant_id",
      key: "applicant_id",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicant_name",
      key: "applicant_name",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Program Type",
      dataIndex: "program_type",
      key: "program_type",
    },
    {
      title: "Investment Route",
      dataIndex: "investmentroute",
      key: "investmentroute",
      // width: 35,
    },
    {
      title: "Number of Dependents",
      dataIndex: "no_of_dependents",
      key: "no_of_dependents",
      // width: 35,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link to={appRoute.applicant_details().path}>
                    View Applicant Details
                  </Link>
                </Menu.Item>

                <Menu.Item key="2">
                  <Link to={appRoute.applicant_documents().path}>
                    View Applicant Document
                  </Link>
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
      <PageIntro
        title="Master List"
        description="View, Approve or Reject Applicant"
        linkBack={appRoute.home}
      />

      <div className="mt-6 py-4 border rounded-md border-[rgba(229, 231, 235, 1)]">
        <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row sm:items-start items-center sm:pl-5">
          <Input.Search placeholder="Search" className=" w-52" />
        </div>

        <Table
          dataSource={data}
          columns={columns}
          loading={isLoading}
          // bordered={true}
          scroll={{ x: 900 }}
          className="mt-4"
        />
      </div>
    </>
  );
};

export default MasterList;
