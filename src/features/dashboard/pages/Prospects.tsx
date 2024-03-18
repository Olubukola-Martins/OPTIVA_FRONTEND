import { Dropdown, Input, Menu } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { END_POINT } from "src/config/environment";
import {
  IAllProspectsData,
  IProspectDatum,
} from "src/features/meetings/types/types";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
// import {FilterDrawer} from "../components/FilterDrawer";


export const QUERY_KEY_FOR_PROSPECTS = "AllProspects";
export const prospectsURL = `${END_POINT.BASE_URL}/admin/prospect-list/applicants`;

const Prospects = () => {
  const {
    data,
    isLoading,
  }: { data: IAllProspectsData | undefined; isLoading: boolean } =
    useFetchAllItems({
      queryKey: QUERY_KEY_FOR_PROSPECTS,
      urlEndPoint: prospectsURL,
    });
  const [dataSource, setDataSource] = useState<IProspectDatum[]>();
  // const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const columns: ColumnsType<IProspectDatum> = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
      width: 20,
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
      title: "Applicant Name",
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
      title: "Number of Dependents",
      dataIndex: "numberDependents",
      key: "numberDependents",
      width: 35,
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => {}}>
                Update Proof of Payment
              </Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    if (data?.data) {
      setDataSource(data.data);
    }
  }, [isLoading, data]);

  return (
    <>
      <PageIntro
        title="Prospects"
        description="View, Approve or Reject Applicant."
      />

      <div className="mt-6 py-4 border rounded-md border-[rgba(229, 231, 235, 1)]">
        <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row sm:items-start items-center sm:pl-5">
          <Input.Search placeholder="Search" className=" w-52 hidden" />
          {/* <Button
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            Filter
          </Button> */}
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          bordered={true}
          scroll={{ x: 900 }}
          className="mt-4"
        />
        {/* <FilterDrawer
          isDrawerOpen={drawerOpen}
          handleClose={() => {
            setDrawerOpen(false);
          }}
        /> */}
      </div>
    </>
  );
};

export default Prospects;
