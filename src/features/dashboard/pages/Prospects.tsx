import { Dropdown, Input, Menu, Select } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";

const Prospects = () => {
  const [dataSource, setDataSource] = useState();

  // TABLE DATA FOR STAGE 3
  interface DataType {
    key: number | string;
    applicantID: number | string;
    applicantName: string;
    phoneNumber: string;
    email: string;
    country: string;
    numberDependents: number;
    onboardedBy: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
      width: 20,
    },
    {
      title: "Applicant ID",
      dataIndex: "applicantID",
      key: "applicantID",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Program Type",
      dataIndex: "programType",
      key: "programType",
    },
    {
      title: "Number of Dependents",
      dataIndex: "numberDependents",
      key: "numberDependents",
      width: 35,
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                }}
              >
                Update Proof of Payment
              </Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <PageIntro
        title="Prospects"
        description="View, Approve or Reject Applicant."
      />

      <div className="mt-6 py-4 border rounded-md border-[rgba(229, 231, 235, 1)]">
        <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row sm:items-start items-center sm:pl-5">
          <Input.Search placeholder="Search" className=" w-52" />
          <Select allowClear placeholder="Filter" className="w-52 " />
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          bordered={true}
          scroll={{ x: 900 }}
        />
      </div>
    </>
  );
};

export default Prospects;
