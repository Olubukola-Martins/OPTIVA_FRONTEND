import Table, { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, Popconfirm } from "antd";
import { employeesProps } from "../types";
import {
  QUERY_KEY_FOR_EMPLOYEES,
  useFetchEmployees,
} from "../hooks/useFetchEmployees";
import { useHandleUpdate } from "../hooks/useHandleUpdate";
import { NewEmployee } from "./NewEmployee";
import { usePagination } from "src/hooks/usePagination";
import { searchValueProps } from "src/types";
import { useDeactivate } from "src/hooks/useDeactivate";
// import { useDisableEmployee } from "../hooks/useDisableEmployee";

export const ActiveEmployees = ({ searchValue }: searchValueProps) => {
  const { onChange, pagination } = usePagination();
  // const { disableUser } = useDisableEmployee();
  const { data, isLoading } = useFetchEmployees({
    currentUrl: "active-employees",
    pagination,
    search: searchValue,
  });
  const { removeData } = useDeactivate({
    EndPointUrl: "admin/deactivate-employee/",
    queryKey: QUERY_KEY_FOR_EMPLOYEES,
    is_active: false,
  });
  const { handleEmployee, addEmployee, setAddEmployee, employeeId } =
    useHandleUpdate();

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
      title: "Action",
      dataIndex: "action",

      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => handleEmployee(val.id)}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2">
                  <Popconfirm
                    title="Deactivate employee"
                    description={`Are you sure to deactivate ${val.name}`}
                    onConfirm={() => removeData(val.id)}
                  >
                    Disable employee
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
    <div>
      <NewEmployee
        id={employeeId}
        open={addEmployee}
        handleClose={() => setAddEmployee(false)}
      />
      <Table
        className="bg-white rounded-md shadow border overflow-x-hidden"
        columns={columns}
        dataSource={data?.data}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
        loading={isLoading}
        // scroll={{ x: 800 }}
      />
    </div>
  );
};
