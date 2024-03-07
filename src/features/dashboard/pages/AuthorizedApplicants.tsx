import { Button, Dropdown, Input, Menu } from "antd";
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
import {FilterDrawer} from "../components/FilterDrawer";

const AuthorizedApplicants = () => {
  const { onChange, pagination } = usePagination();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { filterValues } = useDashboardFilterValues();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { data, isLoading } = useFetchAuthorizedApplicant({
    pagination,
    search: debouncedSearchTerm,
  });
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  console.log("filetr values", filterValues);

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
      title: "Investment Route",
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
      render: () => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link to={appRoute.applicant_details().path}>
                    View Applicant Details
                  </Link>
                </Menu.Item>

                <Menu.Item key="2">
                  <Link to={appRoute.paymentProof().path}>
                    View Proof of Payment
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">Approve</Menu.Item>
                <Menu.Item key="4">Reject</Menu.Item>
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
          <Button
            onClick={() => {
              setDrawerOpen(true);

            }}
          >
            Filter
          </Button>
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

      <FilterDrawer
        handleClose={() => setDrawerOpen(false)}
        isDrawerOpen={drawerOpen}
      />
    </>
  );
};

export default AuthorizedApplicants;
