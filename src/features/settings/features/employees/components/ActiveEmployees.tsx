import Table, { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { employeesProps } from "../types";

const data: employeesProps[] = [];
for (let i = 0; i < 3; i++) {
  data.push({
    name: "Godswill Omenuko",
    email: "godswill@gmail.com",
    last_sent: "10th December 2009",
    department_id: "CSI",
    roles: [],
    branches: [],
    id: 0
  });
}

export const ActiveEmployees = () => {
  const columns: ColumnsType<employeesProps> = [
    {
      title: "Full Name",
      dataIndex: "name",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Department",
      dataIndex: "department_id",
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
        // scroll={{ x: 500 }}
      />
    </div>
  );
};
