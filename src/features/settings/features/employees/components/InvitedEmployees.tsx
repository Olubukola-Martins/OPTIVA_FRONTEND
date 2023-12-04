import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { employeesProps } from "../types";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import dayjs from "dayjs";
import { usePagination } from "src/hooks/usePagination";
import { searchValueProps } from "src/types";

export const InvitedEmployees = ({ searchValue }: searchValueProps) => {
  const { onChange, pagination } = usePagination();
  const { data, isLoading } = useFetchEmployees({
    currentUrl: "inactive-employees",
    pagination,
    search: searchValue,
  });
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
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                {val?.user?.roles?.map((item) => (
                  <Menu.Item key={item.id}>{item.name}</Menu.Item>
                ))}
              </Menu>
            }
          >
            <i className="ri-eye-line text-lg cursor-pointer font-medium"></i>
          </Dropdown>
        </div>
      ),
    },
    {
      title: "Branch",
      dataIndex: "branches",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                {val?.user?.branches?.map((item) => (
                  <Menu.Item key={item.id}>{item.name}</Menu.Item>
                ))}
              </Menu>
            }
          >
            <i className="ri-eye-line text-lg cursor-pointer font-medium"></i>
          </Dropdown>
        </div>
      ),
    },
    {
      title: "Created at",
      dataIndex: "last_sent",
      render: (_, val) => (
        <span> {dayjs(val?.created_at).format("DD MMMM YYYY")}</span>
      ),
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
        dataSource={data?.data}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
        loading={isLoading}
        scroll={{ x: 800 }}
      />
    </div>
  );
};
