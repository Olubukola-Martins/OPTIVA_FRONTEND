import { Dropdown, Form, Menu, Modal, Skeleton, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import Success from "../assets/img/success.png";
import { QUERY_KEY_FOR_COUNTRY, useGetCountry } from "../hooks/useGetCountry";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { formatDate } from "../../authorizedPersons/components/AuthorizedPersons";
import { useDeleteHandler } from "src/features/settings/hooks/handleDelete";
import { useQueryClient } from "react-query";
import { EditCountryModal } from "./EditCountryModal";
import { DeleteModal } from "src/components/modals/DeleteModal";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  country: string;
  dateCreated: string;
  lastModified: string;
};

export const Country = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

  const { removeData, deleteIsLoading } = useDeleteHandler({
    deleteEndPointUrl: "admin/countries",
    queryKey: QUERY_KEY_FOR_COUNTRY,
  });

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

  const handleDeleteCheckbox = () => {
    showDeleteModal();
    // handleDelete({
    //   id: id as unknown as number,
    //   deleteEndPointUrl: "/admin/countries",
    //   token,
    // });

    setSelectedRowKeys([]);
  };

  // Country Modal
  const [openCountryModal, setOpenCountryModal] = useState<boolean>(false);
  const showCountryModal = () => {
    setOpenCountryModal(true);
  };
  const handleCountryModalCancel = () => {
    setOpenCountryModal(false);
  };

  // Add Success
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const renderSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const cancelSuccessModal = () => {
    setShowSuccessModal(false);
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
      {/* DELETE CHECKBOX BUTTON */}
      {selectedRowKeys.length > 0 && (
        <div>
          <AppButton
            variant="transparent"
            label="Delete"
            handleClick={handleDeleteCheckbox}
          />
        </div>
      )}

      {/* TABLE */}
      <Skeleton loading={isLoading} active>
        <Table
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
      </Skeleton>

      {/* Country MODAL */}
      <EditCountryModal
        handleClose={handleCountryModalCancel}
        open={openCountryModal}
        countryId={countryId as unknown as number}
      />
      {/* ADD SUCCESS MODAL */}
      <Modal
        open={showSuccessModal}
        footer={null}
        onCancel={cancelSuccessModal}
      >
        <div className="flex flex-col items-center gap-4 font-bold">
          <img src={Success} className="mx-auto" />
          <div className="text-center text-lg">
            <h2>Country</h2>
            <h2>Added Successfully</h2>
          </div>

          <AppButton label="Back" handleClick={cancelSuccessModal} />
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <DeleteModal
        open={openDeleteModal}
        header="Country"
        text="country"
        onCancel={handleDeleteCancel}
        onDelete={() => removeData(countryId as unknown as number)}
        isLoading={deleteIsLoading}
      />
    </>
  );
};
