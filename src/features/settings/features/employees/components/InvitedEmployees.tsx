import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { employeesProps } from "../types";


const data: employeesProps[] = [];
for (let i = 0; i < 3; i++) {
  data.push({
    name: "Peter Smith",
    email: "peter@gmail.com",
    last_sent: "10th December 2009",
    department_id: "Dev",
    roles: [],
    branches: []
  });
}

export const InvitedEmployees = () => {
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
          title: "Last sent",
          dataIndex: "last_sent",
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
                    <Menu.Item key="1">Resend Invite</Menu.Item>
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
  )
}
