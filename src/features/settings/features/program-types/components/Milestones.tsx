import { Dropdown, Form, Input, Menu, Modal, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import DeleteIcon from "../assets/img/warning.png";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  milestones: string;
  duration: string;
  dateCreated: string;
  lastModified: string;
};

export const Milestones = () => {
  // Milestone Modal
  const [openMilestoneModal, setOpenMilestoneModal] = useState<boolean>(false);
  const showMilestoneModal = () => {
    setOpenMilestoneModal(true);
  };
  const handleMilestoneModalCancel = () => {
    setOpenMilestoneModal(false);
  };

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const showDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
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
      render: () => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={showMilestoneModal}>
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
      milestones: "Grenada",
      duration: "1 week",
      dateCreated: "dd/mm/yyyy",
      lastModified: "dd/mm/yyyy",
    });
  }
  const handleEditMilestoneSubmit = (val: any) => {
    console.log(val);
    
  };

  const selectTimeAfter = (
    <Select
      defaultValue="Day(s)"
      options={[
        {
          value: "Day(s)",
          label: "Day(s)",
        },
      ]}
    />
  );

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

      {/* MILESTONE MODAL */}
      <Modal
        open={openMilestoneModal}
        footer={null}
        onCancel={handleMilestoneModalCancel}
      >
        <h2 className="text-center text-lg font-bold">Edit Milestone</h2>
        <Form layout="vertical" onFinish={handleEditMilestoneSubmit}>
          <Form.Item name="milestone" label="Milestone" required>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="timeline" label="Timeline" required>
            <Input size="large" addonAfter={selectTimeAfter} />
          </Form.Item>
          <Form.Item name="processes" label="Processes">
            <Select
              size="large"
              options={[
                {
                  label: "",
                  value: "",
                },
              ]}
            />
          </Form.Item>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={handleMilestoneModalCancel}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal open={openDeleteModal} onCancel={handleDeleteCancel} footer={null}>
        <img src={DeleteIcon} className="mx-auto" />
        <h2 className="text-center font-bold p-2">Delete Milestone</h2>
        <p className="text-center">
          Are you sure you would like to delete this investment route?
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
