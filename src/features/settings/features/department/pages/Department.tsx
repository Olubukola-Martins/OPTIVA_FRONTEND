import { useState } from "react";
import { NewDepartment } from "../components/NewDepartment";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AppButton } from "src/components/button/AppButton";
import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  QUERY_KEY_FOR_DEPARTMENT,
  useFetchDepartment,
} from "../hooks/useFetchDepartment";
import { departmentProps } from "../types";
import { useDelete } from "src/hooks/useDelete";
import Popconfirm from "antd/lib/popconfirm";

const Department = () => {
  const [addDepartment, setAddDepartment] = useState(false);
  const { data, isLoading } = useFetchDepartment();
  const [departmentId, setDepartmentId] = useState<number>();
  const { removeData } = useDelete({
    deleteEndPointUrl: "admin/departments/",
    queryKey: QUERY_KEY_FOR_DEPARTMENT,
  });

  const handleDepartment = (id: number) => {
    setDepartmentId(id);
    setAddDepartment(true);
  };

  const handleAddDepartment = () => {
    setDepartmentId(undefined);
    setAddDepartment(true);
  };

  const columns: ColumnsType<departmentProps> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "head",
      dataIndex: "head",
      render: (_, val) => <span>{val?.head?.name}</span>
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
                <Menu.Item key="1" onClick={() => handleDepartment(val.id)}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2">
                  <Popconfirm
                    title="Delete department"
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
      <NewDepartment
        id={departmentId}
        open={addDepartment}
        handleClose={() => setAddDepartment(false)}
      />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Department"
          description="Create, View & edit departments on the system"
          linkBack={appRoute.settings}
        />

        <div>
          <AppButton
            label="Add New"
            handleClick={() => handleAddDepartment()}
          />
        </div>
      </div>

      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        // scroll={{ x: 500 }}
      />
    </>
  );
};
2;
export default Department;
