import Table, { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { employeesProps } from "../types";
import { useFetchEmployees } from "../hooks/useFetchEmployees";

export const ActiveEmployees = () => {
  const {data, isLoading} = useFetchEmployees()
  
  const columns: ColumnsType<employeesProps> = [
    {
      title: "Full Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Department",
      dataIndex: "department_id",
      render: (_, val) => <span>{val?.department?.name}</span>
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Branch",
      dataIndex: "branches",
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
                <Menu.Item key="1">Edit</Menu.Item>
                <Menu.Item key="2">Delete</Menu.Item>
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
    <div>
      <Table
        className="bg-white rounded-md shadow border"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{ x: 800 }}
      />
    </div>
  );
};
