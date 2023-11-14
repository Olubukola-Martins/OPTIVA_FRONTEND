import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, Table } from "antd/lib";
import React, { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddDependent } from "../components/AddDependent";

interface DataType {
  key: React.Key;
  dependent: string;
  ageBracket: string;
  conditions: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Dependents",
    dataIndex: "dependent",
  },

  {
    title: "Age Bracket",
    dataIndex: "ageBracket",
  },
  {
    title: "Conditions",
    dataIndex: "conditions",
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

const data: DataType[] = [];
for (let i = 0; i < 6; i++) {
  data.push({
    key: i,
    dependent: "Mother",
    ageBracket: "<20",
    conditions: "unmarried",
  });
}
const Dependents = () => {
  const [addNewD, setAddNewD] = useState(false);
  return (
    <>
      <AddDependent open={addNewD} handleClose={() => setAddNewD(false)} />
      <div className="flex justify-between flex-col md:flex-row  md:items-center">
        <PageIntro
          title="Eligible Dependents"
          description="Create, View & edit eligible dependents  routes on the system"
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
          <AppButton label="Add New" handleClick={() => setAddNewD(true)} />
        </div>
      </div>

      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data}
        scroll={{ x: 768 }}
      />
    </>
  );
};

export default Dependents;
