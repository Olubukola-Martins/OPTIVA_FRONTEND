import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { DataType } from "../../department/pages/Department";
import { appRoute } from "src/config/routeMgt/routePaths";

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
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Role",
    dataIndex: "role",
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

const Employees = () => {
  return (
    <>
      {/* <NewDepartment
        open={addDepartment}
        handleClose={() => setAddDepartment(false)}
      /> */}
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Employees"
          description="Create, View & edit employees on the system"
          linkBack={appRoute.settings}
        />

        <div>
          <AppButton
            label="Add New"
            // handleClick={() => setAddDepartment(true)}
          />
        </div>
      </div>

      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={[]}
        // scroll={{ x: 500 }}
      />
    </>
  );
};

export default Employees;
