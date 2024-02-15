import { Button, Drawer, Dropdown, Form, Input, Menu, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { END_POINT } from "src/config/environment";
import {
  IAllProspectsData,
  IProspectDatum,
} from "src/features/meetings/types/types";
import { useGetCountry } from "src/features/settings/features/program-types/hooks/useGetCountry";
import { useGetProgramType } from "src/features/settings/features/program-types/hooks/useGetProgramType";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import { useWindowWidth } from "src/hooks/useWindowWidth";

export const QUERY_KEY_FOR_PROSPECTS = "AllProspects";
export const prospectsURL = `${END_POINT.BASE_URL}/admin/prospect-list/applicants`;

const Prospects = () => {
  const { data: allProgramTypes, isLoading: loadingProgramTypes } =
    useGetProgramType();
  const { data: countries, isLoading: loadingCountries } = useGetCountry();
  const [dataSource, setDataSource] = useState<IProspectDatum[]>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const {drawerSize } = useWindowWidth();
  const [filterForm] = useForm();
  const {
    data,
    isLoading,
  }: { data: IAllProspectsData | undefined; isLoading: boolean } =
    useFetchAllItems({
      queryKey: QUERY_KEY_FOR_PROSPECTS,
      urlEndPoint: prospectsURL,
    });

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
      render: (_, record) => (
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

  const handleFilter = (values) => {
    
  };

  useEffect(() => {
    if (data?.data) {
      setDataSource(data.data);
    }
  }, [isLoading, data]);

  useEffect(() => {}, [loadingCountries, loadingProgramTypes]);

  return (
    <>
      <PageIntro
        title="Prospects"
        description="View, Approve or Reject Applicant."
      />

      <div className="mt-6 py-4 border rounded-md border-[rgba(229, 231, 235, 1)]">
        <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row sm:items-start items-center sm:pl-5">
          <Input.Search placeholder="Search" className=" w-52" />
          <Button
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            Filter
          </Button>
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          bordered={true}
          scroll={{ x: 900 }}
          className="mt-4"
        />
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          size={"default"}
          title="Filter Prospects"
        >
          <Form
            name="modalFilter"
            form={filterForm}
            layout="vertical"
            className="pt-8 px-4"
            // onValuesChange={handleFilterValuesChange}
            onFinish={handleFilter}
          >
              <Form.Item
                label="Filter by Country"
                name="countryFilter"
                className="w-56"
              >
                <Select
                  mode="multiple"
                  loading={loadingCountries}
                  options={
                    countries?.map((country) => {
                      return { value: country.id, label: country.country_name };
                    }) || []
                  }
                />
              </Form.Item>
              <Form.Item
                label="Filter by Program Type"
                name="filterProgram"
                className="w-56"
              >
                <Select
                  mode="multiple"
                  loading={loadingProgramTypes}
                  options={
                    allProgramTypes?.map((programType) => {
                      return {
                        value: programType.id,
                        label: programType.program_name,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            <AppButton label="Apply Filter" />
          </Form>
        </Drawer>
      </div>
    </>
  );
};

export default Prospects;
