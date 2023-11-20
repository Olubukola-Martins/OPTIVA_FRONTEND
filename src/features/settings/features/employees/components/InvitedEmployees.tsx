import { Dropdown, Menu, Table } from "antd";
import { DataType } from "../../department/pages/Department";
import { ColumnsType } from "antd/es/table";


export const InvitedEmployees = () => {
    const columns: ColumnsType<DataType> = [
        {
          title: "Employee Id",
          dataIndex: "id",
        },
        {
          title: "Full Name",
          dataIndex: "name",
        },
        {
          title: "email",
          dataIndex: "email",
        },
        {
          title: "Last sent",
          dataIndex: "date",
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
        dataSource={[]}
        // scroll={{ x: 500 }}
      />
    </div>
  )
}
