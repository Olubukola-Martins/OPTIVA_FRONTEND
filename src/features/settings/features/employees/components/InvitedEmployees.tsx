import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { employeesProps } from "../types";
import { useFetchEmployees } from "../hooks/useFetchEmployees";

export const InvitedEmployees = () => {
  const { data, isLoading } = useFetchEmployees("inactive-employees");
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
      render: (_, val) => <span>{val?.department?.name}</span>,
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
      title: "Created at",
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
                <Menu.Item key="1">Send Reminder</Menu.Item>
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
    <div className="overflow-x-hidden">
      <Table
        className="bg-white rounded-md shadow border overflow-x-hidden"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{ x: 800 }}
      />
    </div>
  );
};
