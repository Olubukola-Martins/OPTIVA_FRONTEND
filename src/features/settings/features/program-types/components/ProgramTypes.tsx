import { Dropdown, Menu, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import DeleteIcon from "../assets/img/warning.png";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  country: string;
  programType: string;
  investmentRoute: string;
  eligibleDependent: string;
  applicationTemplate: string;
  documentRequirements: string;
  milestones: string;
};

export const ProgramTypes = () => {
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Program Type",
      dataIndex: "programType",
      key: "2",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "3",
    },
    {
      title: "Investment Route",
      dataIndex: "investmentRoute",
      key: "4",
    },
    {
      title: "Eligible Dependents",
      dataIndex: " eligibleDependent",
      key: "5",
    },
    {
      title: "Application Template",
      dataIndex: "applicationTemplate",
      key: "6",
    },
    {
      title: "Document Requirements",
      dataIndex: "documentRequirements",
      key: "7",
    },
    {
      title: "Milestones",
      dataIndex: "milestones",
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
      milestones: "Lorem Ipsum, Lorem Ipsum",
      programType: "Citizenship By Investment",
      applicationTemplate: "Caribbean Template ",
      country: "Grenada",
      documentRequirements: "Passport",
      eligibleDependent: "Parents",
      investmentRoute: "Real Estate",
    });
    }
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
      <Modal open={openDeleteModal} onCancel={handleDeleteCancel} footer={null}>
        <img src={DeleteIcon} className="mx-auto" />
        <h2 className="text-center font-bold p-2">Delete Program Type</h2>
        <p className="text-center">
          Are you sure you would like to delete this program type?
        </p>
        <div className="flex items-center justify-center gap-5 mt-5">
          <AppButton
            label="Cancel"
            handleClick={handleDeleteCancel}
            variant="transparent"
          />
          <AppButton label="Delete" type="submit" />
        </div>
      </Modal>
    </>
  );
};
