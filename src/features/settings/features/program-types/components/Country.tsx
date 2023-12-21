import { Dropdown, Menu,  Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { QUERY_KEY_FOR_COUNTRY, useGetCountry } from "../hooks/useGetCountry";
import { formatDate } from "../../authorizedPersons/components/AuthorizedPersons";
import { EditCountryModal } from "./EditCountryModal";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  country: string;
  dateCreated: string;
  lastModified: string;
};

export const Country = () => {
  // GET REQUEST
  const { data, isLoading } = useGetCountry();
  const [dataArray, setDataArray] = useState<DataSourceItem[]>([]);
  useEffect(() => {
    if (data) {
      const country: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          country: item.country_name,
          dateCreated: formatDate(item.created_at),
          lastModified: formatDate(item.updated_at),
        };
      });
      setDataArray(country);
    }
  }, [data]);

  const [countryId, setCountryId] = useState<number>();



const {removeData}=  useDelete({queryKey: QUERY_KEY_FOR_COUNTRY, EndPointUrl:"admin/countries/",})

  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "2",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "3",
    },
    {
      title: "Last Modified",
      dataIndex: "lastModified",
      key: "4",
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
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setCountryId(val.key as unknown as number);
                    showCountryModal();
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setCountryId(val.key as unknown as number);
                    showDeleteModal();
                  }}
                >
                  Delete
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

  const [openCountryModal, setOpenCountryModal] = useState<boolean>(false);
  const showCountryModal = () => {
    setOpenCountryModal(true);
  };
  const handleCountryModalCancel = () => {
    setOpenCountryModal(false);
  };

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const showDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };
  return (
    <>
      {/* TABLE */}
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={dataArray}
          className="bg-white rounded-md shadow border mt-2"
          scroll={{ x: 600 }}
          rowSelection={{
            type: "checkbox",
            onChange: (
              selectedRowKeys: React.Key[],
              selectedRows: DataSourceItem[]
            ) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
              );
            },
          }}
        />

      {/* Country MODAL */}
      {countryId &&  <EditCountryModal
        handleClose={handleCountryModalCancel}
        open={openCountryModal}
        countryId={countryId}
      />}
     

      {/* DELETE MODAL */}
      {countryId && <DeleteModal
        open={openDeleteModal}
        header="Country"
        text="country"
        onCancel={handleDeleteCancel}
        onDelete={() => removeData(countryId)}
        // isLoading={deleteIsLoading}
      />}
      
    </>
  );
};
