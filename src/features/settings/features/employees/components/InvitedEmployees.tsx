import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { employeesProps } from "../types";
import { useFetchEmployees } from "../hooks/useFetchEmployees";


export const InvitedEmployees = () => {
  const {data, isLoading} = useFetchEmployees()
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
          render: (_, val) => <span>{val?.department?.name}</span>
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
        loading={isLoading}
        scroll={{ x: 800 }}
      />
    </div>
  )
}
