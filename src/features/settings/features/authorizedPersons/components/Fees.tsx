import { Dropdown, Menu, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import DeleteIcon from "../assets/img/warning.png";
import { AppButton } from "src/components/button/AppButton";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  country: string;
  programName: string;
  investmentRoute: string;
  localProcessingFee: string;
  thresholdPayment: string;
  balancePayment: string;
};

export const Fees = () => {
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
      title: "Country",
      dataIndex: "country",
      key: "2",
    },
    {
      title: "Program Name",
      dataIndex: "programName",
      key: "3",
    },
    {
      title: "Investment Route",
      dataIndex: "investment Route",
      key: "4",
    },
    {
      title: "Local Processing Fee",
      dataIndex: "localProcessingFee",
      key: "5",
    },
    {
      title: "Threshold Payment",
      dataIndex: "thresholdPayment",
      key: "6",
    },
    {
      title: "Balance Payment",
      dataIndex: "balancePayment",
      key: "7",
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
                <Menu.Item key="2" onClick={showDeleteModal}>Delete</Menu.Item>
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
      country: "Grenada",
      programName: "Citizenship By Investment",
      investmentRoute: "Donation",
      localProcessingFee: "$400",
      thresholdPayment: "0%",
      balancePayment: "0%",
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
        <img src={DeleteIcon} className="mx-auto"/>
        <h2 className="text-center font-bold py-1">Delete Fee</h2>
        <p className="text-center py-2">Are you sure you would like to delete this fee?</p>
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
