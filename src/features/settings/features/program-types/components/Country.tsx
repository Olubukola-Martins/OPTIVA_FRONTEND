import { Dropdown, Form, Input, Menu, Modal, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import Success from "../assets/img/success.png";
import DeleteIcon from "../assets/img/warning.png";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  country: string;
  dateCreated: string;
  lastModified: string;
};

export const Country = () => {
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
                <Menu.Item key="1" onClick={showCountryModal}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2" onClick={showDeleteModal}>
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
      country: "Grenada",
      dateCreated: "dd/mm/yyyy",
      lastModified: "dd/mm/yyyy",
    });
  }

  // Country Modal
  const [openCountryModal, setOpenCountryModal] = useState<boolean>(false);
  const showCountryModal = () => {
    setOpenCountryModal(true);
  };
  const handleCountryModalCancel = () => {
    setOpenCountryModal(false);
  };
  const handleEditCountrySubmit = (val: any) => {};

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

      {/* Country MODAL */}
      <Modal
        open={openCountryModal}
        footer={null}
        onCancel={handleCountryModalCancel}
      >
        <h2 className="text-center text-lg font-bold">Edit Country</h2>
        <Form layout="vertical" onFinish={handleEditCountrySubmit}>
          <Form.Item name="country" label="Country" required>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="programType" label="Select Program Type" required>
            <Select
              size="large"
              options={[{ value: "Grenda,", label: "Grenada" }]}
            />
          </Form.Item>

          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={handleCountryModalCancel}
              variant="transparent"
            />
            <AppButton
              label="Save"
              type="submit"
              handleClick={() => {
                renderSuccessModal();
                handleCountryModalCancel();
              }}
            />
          </div>
        </Form>
      </Modal>

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
      <Modal open={openDeleteModal} onCancel={handleDeleteCancel} footer={null}>
        <img src={DeleteIcon} className="mx-auto" />
        <h2 className="text-center font-bold p-2">Delete Country</h2>
        <p className="text-center">
          Are you sure you would like to delete this country?
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
