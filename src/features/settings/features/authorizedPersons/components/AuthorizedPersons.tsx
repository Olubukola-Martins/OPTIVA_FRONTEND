import { Dropdown, Menu, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import DeleteIcon from "../assets/img/warning.png";
import { AppButton } from "src/components/button/AppButton";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  name: string;
  dateCreated: string;
};
export const AuthorizedPersons = () => {
  // DELETE MODAL
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "3",
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
                <Menu.Item key="1" onClick={showDeleteModal}>
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
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 4; i++) {
    dataSource.push({
      key: i,
      sn: i + 1,
      name: "Ruth Godwin",
      dateCreated: "dd/mm/yyyy",
    });
  }
  return (
    <>
      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={dataSource}
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

      {/* DELETE MODAL */}
      <Modal open={isDeleteModalOpen} footer={null} onCancel={handleDeleteModalCancel}>
        <img src={DeleteIcon} className="mx-auto" />
        <h2 className="text-center font-bold py-1">
          Delete Authorized Person(s)
        </h2>
        <p className="text-center py-2">
          Are you sure you would like to delete this authorized person(s)?
        </p>
        <div className="py-3 flex items-center justify-center gap-4">
          <AppButton
            variant="transparent"
            label="Cancel"
            handleClick={handleDeleteModalCancel}
          />
          <AppButton label="Delete" />
        </div>
      </Modal>
    </>
  );
};
