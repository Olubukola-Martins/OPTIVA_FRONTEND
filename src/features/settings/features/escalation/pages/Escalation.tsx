import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";

import type { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "src/features/settings/components/DeleteModal";

interface DataType {
  key: React.Key;
  sn: number;
  role: string;
  task: string;
  taskDeadline: string;
  reminder: string;
  escalationLevels: string;
}

const Escalation = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Task Deadline",
      dataIndex: "taskDeadline",
      key: "taskDeadline",
    },
    {
      title: "Reminder",
      dataIndex: "reminder",
      key: "reminder",
    },
    {
      title: "Escalation Levels",
      dataIndex: "escalationLevels",
      key: "escalationLevels",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record: DataType) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link
                    to={
                      appRoute.editEscalation(record.key as unknown as number)
                        .path
                    }
                  >
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setShowDeleteModal(true);
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

  const data: DataType[] = [];
  for (let i = 1; i <= 4; i++) {
    data.push({
      key: i,
      sn: i,
      role: "Service Manager",
      task: "Accept Client",
      taskDeadline: "8 Hours",
      reminder: "After 3 Hours",
      escalationLevels: "4 Levels",
    });
  }
 const [hideDeleteBtn, setHideDeleteBtn] = useState<boolean>(true)
  // rowSelection object
  const rowSelection = {
    onChange: (_selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      selectedRows.length === 0 || !selectedRows ? setHideDeleteBtn(true) : setHideDeleteBtn(false)
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    getCheckboxProps: (_record: DataType) => ({
      //   name: record.name,
    }),
  };

  // Handle Add New/ Define Escalation
  const handleDefineEscalation = () => {
    navigate(appRoute.defineEscalation);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <DeleteModal
          open={showDeleteModal}
          heading="Delete Escalation"
          description="Are you sure you would like to delete escalation?"
          handleClose={() => {
            setShowDeleteModal(false);
          }}
          handleDelete={() => {}}
        />
        <PageIntro
          title="Escalation "
          description="Define, Edit and delete escalation rules on the system"
          linkBack={appRoute.settings}
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon
              icon="uil:file-import"
              className="text-3xl cursor-pointer hover:text-primary"
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
            />
          </div>
          <AppButton
            label="Add New"
            handleClick={() => {
              handleDefineEscalation();
            }}
          />
        </div>
      </div>
      <div className={`${hideDeleteBtn ? "hidden" : ""}`}>
        <AppButton type="button" variant="transparent" label="Delete" handleClick={()=>{setShowDeleteModal(true)}}/>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data}
        scroll={{ x: 768 }}
      />
    </>
  );
};

export default Escalation;
