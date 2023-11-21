import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddBranch } from "../components/AddBranch";
import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { branchProps } from "../types";
import {
  QUERY_KEY_FOR_BRANCHES,
  useFetchBranches,
} from "../hooks/useFetchBranches";
import { useDelete } from "src/hooks/useDelete";
import Popconfirm from "antd/lib/popconfirm";

const Branches = () => {
  const [addBranch, setAddBranch] = useState(false);
  const { data, isLoading } = useFetchBranches();
  const { removeData } = useDelete({
    deleteEndPointUrl: "admin/branches/",
    queryKey: QUERY_KEY_FOR_BRANCHES,
  });
  const columns: ColumnsType<branchProps> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address_details",
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
                <Menu.Item key="1">Edit</Menu.Item>
                <Menu.Item key="2">
                  <Popconfirm
                    title="Delete branch"
                    description={`Are you sure to delete ${val.name}`}
                    onConfirm={() => removeData(val.id)}
                  >
                    Delete
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
      <AddBranch open={addBranch} handleClose={() => setAddBranch(false)} />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Branches"
          description="Create, View & edit branch on the system"
          linkBack={appRoute.settings}
        />
        <div>
          <AppButton label="Add New" handleClick={() => setAddBranch(true)} />
        </div>
      </div>

      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data}
        scroll={{ x: 500 }}
        loading={isLoading}
      />
    </>
  );
};

export default Branches;
