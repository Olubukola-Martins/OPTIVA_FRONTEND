import { Dropdown, Menu, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { employeesProps } from "../types";
import {
  QUERY_KEY_FOR_EMPLOYEES,
  useFetchEmployees,
} from "../hooks/useFetchEmployees";
import dayjs from "dayjs";
import { usePagination } from "src/hooks/usePagination";
import { searchValueProps } from "src/types";
import { useSendReminder } from "../hooks/useSendReminder";
import { useDelete } from "src/hooks/useDelete";

export const InvitedEmployees = ({ searchValue }: searchValueProps) => {
  const { onChange, pagination } = usePagination();
  const { remindUser } = useSendReminder();
  const { data, isLoading } = useFetchEmployees({
    currentUrl: "inactive-employees",
    pagination,
    search: searchValue,
  });
  const { removeData } = useDelete({
    EndPointUrl: "admin/employees/",
    queryKey: QUERY_KEY_FOR_EMPLOYEES,
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
      render: (_, val) => <div>{val?.user?.roles?.name}</div>,
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

      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="2" onClick={() => remindUser(val.id)}>
                  Send reminder
                </Menu.Item>
                <Menu.Item key="1">
                  <Popconfirm
                    title="Remove employee"
                    description={`Are you sure to remove ${val.name}`}
                    onConfirm={() => removeData(val.id)}
                  >
                    Remove employee
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
