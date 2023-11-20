import React, { useState } from "react";
import { NewDepartment } from "../documents/NewDepartment";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AppButton } from "src/components/button/AppButton";
import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
    key: React.Key;
    dependent: string;
    ageBracket: string;
    conditions: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
    },
  
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "head",
      dataIndex: "head",
    },
    {
        title: "description",
        dataIndex: "description",
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
                <Menu.Item key="2">Delete</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];
  
const Department = () => {
  const [addDepartment, setAddDepartment] = useState(false);
  return (
    <>
      <NewDepartment
        open={addDepartment}
        handleClose={() => setAddDepartment(false)}
      />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Department"
          description="Create, View & edit departments on the system"
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
            handleClick={() => setAddDepartment(true)}
          />
        </div>
      </div>

      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={[]}
        scroll={{ x: 768 }}
      />
    </>
  );
};
2;
export default Department;
