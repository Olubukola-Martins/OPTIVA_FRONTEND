import { Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/es/table";
import Popconfirm from "antd/lib/popconfirm";
import { searchValueProps } from "src/types";
import { departmentProps } from "../types";
import { Table } from "antd/lib";
import { usePagination } from "src/hooks/usePagination";
import { QUERY_KEY_FOR_DEPARTMENT, useFetchDepartment } from "../hooks/useFetchDepartment";
import { useHandleDepartment } from "../hooks/useHandleDepartment";
import { NewDepartment } from "./NewDepartment";
import { useDeactivate } from "src/hooks/useDeactivate";

export const InactivateDepartment = ({ searchValue }: searchValueProps) => {
  const { onChange, pagination } = usePagination();
  const { handleDepartment, departmentId, addDepartment, setAddDepartment } =
    useHandleDepartment();
  const { data, isLoading } = useFetchDepartment({
    currentUrl: "inactive-departments",
    pagination,
    search: searchValue,
  });
  const { removeData } = useDeactivate({
    EndPointUrl: "admin/deactivate-department/",
    queryKey: QUERY_KEY_FOR_DEPARTMENT,
    is_active: true,
  });

  const columns: ColumnsType<departmentProps> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "head of department",
      dataIndex: "head",
      render: (_, val) => <span>{val?.head?.name}</span>,
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
                <Menu.Item key="1" onClick={() => handleDepartment(val.id)}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2">
                  <Popconfirm
                    title="activate department"
                    description={`Are you sure to activate ${val.name}`}
                    onConfirm={() => removeData(val.id)}
                  >
                   Activate department
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
    <>
      <NewDepartment
        id={departmentId}
        open={addDepartment}
        handleClose={() => setAddDepartment(false)}
      />
      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data?.data}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
        loading={isLoading}
        // scroll={{ x: 500 }}
      />
    </>
  );
};
