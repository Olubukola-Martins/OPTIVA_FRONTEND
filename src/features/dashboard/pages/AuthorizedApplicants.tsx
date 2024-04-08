import { Dropdown, Input, Menu, Popconfirm } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { IGetAuthorizedApplicant } from "src/features/applications/types/types";
import { useFetchAuthorizedApplicant } from "../hooks/useFetchAuthorizedApplicant";
import { usePagination } from "src/hooks/usePagination";
import { useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import { useDashboardFilterValues } from "../hooks/useDashboardFilterValues";
import { useApproveorRejectApplicant } from "src/features/applications/hooks/Application hooks/useApproveorRejectApplicant";
// import { FilterDrawer } from "../components/FilterDrawer";

const AuthorizedApplicants = () => {
  const { onChange, pagination } = usePagination();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { filterValues } = useDashboardFilterValues();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { data, isLoading } = useFetchAuthorizedApplicant({
    pagination,
    search: debouncedSearchTerm,
  });
  const { patchData } = useApproveorRejectApplicant("approve");
  const { patchData: rejectData } = useApproveorRejectApplicant("reject");
  // const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  console.log("filetr values", filterValues);

  const approveApplicant = (id: number) => {
    patchData(id);
  };
  const rejectApplicant = (id: number) => {
    rejectData(id);
  };
  const columns: ColumnsType<IGetAuthorizedApplicant> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      title: "Applicant ID",
      dataIndex: "applicant_id",
      key: "applicant_id",
    },
    {
      title: " Applicant Name",
      dataIndex: "applicant_name",
      key: "applicant_name",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Program Type",
      dataIndex: "program_type",
      key: "program_type",
    },
    {
      title: "Route Name",
      dataIndex: "investmentroute",
      key: "investmentroute",
    },
    {
      title: "Number Of Dependents",
      dataIndex: "no_of_dependents",
      key: "no_of_dependents",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "8",
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
                <Menu.Item key="1">
                  <Link to={appRoute.new_application(val.id).path}>
                    View Applicant Details
                  </Link>
                </Menu.Item>

                <Menu.Item key="2">
                  <Link to={appRoute.paymentProof(val.id).path}>
                    View Proof of Payment
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Popconfirm
                    title={`Do you want to approve ${val.applicant_name}'s application?`}
                    onConfirm={() => approveApplicant(val.id)}
                    okType="default"
                  >
                    Approve
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="4">
                  {" "}
                  <Popconfirm
                    title={`Do you want to reject ${val.applicant_name}'s application?`}
                    onConfirm={() => rejectApplicant(val.id)}
                    okType="default"
                  >
                    Reject
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
      <PageIntro
        title="Authorized Applicants"
        description="View, Approve or Reject Applicant"
        linkBack={appRoute.home}
      />

      <div className="mt-6 py-4 border rounded-md border-[rgba(229, 231, 235, 1)]">
        <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row sm:items-start items-center sm:pl-5">
          <Input.Search
            placeholder="Search"
            className=" w-52"
            onSearch={(val) => setSearchTerm(val)}
            onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />
          {/* <Button
            onClick={() => {
              setDrawerOpen(true);

            }}
          >
            Filter
          </Button> */}
        </div>

        <Table
          dataSource={data?.data}
          columns={columns}
          loading={isLoading}
          // bordered={true}
          scroll={{ x: 900 }}
          className="mt-4"
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
      {/* <FilterDrawer
        handleClose={() => setDrawerOpen(false)}
        isDrawerOpen={drawerOpen}
      /> */}

      {/* <FilterDrawer
        handleClose={() => setDrawerOpen(false)}
        isDrawerOpen={drawerOpen}
      /> */}
    </>
  );
};

export default AuthorizedApplicants;
