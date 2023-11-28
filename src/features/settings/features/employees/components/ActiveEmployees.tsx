import Table, { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { employeesProps } from "../types";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { useHandleUpdate } from "../hooks/useHandleUpdate";
import { NewEmployee } from "./NewEmployee";

export const ActiveEmployees = () => {
  const { data, isLoading } = useFetchEmployees("active-employees");
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
      <NewEmployee
        id={employeeId}
        open={addEmployee}
        handleClose={() => setAddEmployee(false)}
      />
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
