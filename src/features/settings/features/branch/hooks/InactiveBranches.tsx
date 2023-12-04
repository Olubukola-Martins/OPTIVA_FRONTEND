import { usePagination } from "src/hooks/usePagination";
import { QUERY_KEY_FOR_BRANCHES, useFetchBranches } from "./useFetchBranches";
import { Dropdown, Menu, Popconfirm } from "antd";
import { branchProps } from "../types";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { useBranchUpdate } from "./useBranchUpdate";
import { AddBranch } from "../components/AddBranch";
import { useDeactivate } from "src/hooks/useDeactivate";
import { searchValueProps } from "src/types";

export const InactivateBranches = ({ searchValue }: searchValueProps) => {
  const { pagination, onChange } = usePagination();
  const { data, isLoading } = useFetchBranches({
    pagination,
    currentUrl: "inactive-branches",
    search: searchValue,
  });
  const { removeData } = useDeactivate({
    EndPointUrl: "admin/deactivate-branch/",
    queryKey: QUERY_KEY_FOR_BRANCHES,
    is_active: true,
  });
  const { addBranch, setAddBranch, branchId } = useBranchUpdate();

  const columns: ColumnsType<branchProps> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address_details",
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
                <Menu.Item key="2">
                  <Popconfirm
                    title="Activate branch"
                    description={`Are you sure to activate ${val.name}`}
                    onConfirm={() => removeData(val.id)}
                  >
                    Activate branch
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
      <AddBranch
        id={branchId}
        open={addBranch}
        handleClose={() => setAddBranch(false)}
      />
      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data?.data}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
        scroll={{ x: 800 }}
        loading={isLoading}
      />
    </>
  );
};
